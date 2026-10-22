import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
const read = path => readFileSync(new URL('../' + path, import.meta.url));
const manifest = JSON.parse(read('hacs.json'));
const pkg = JSON.parse(read('package.json'));

test('Marketplace can resolve the declared dashboard module in dist', () => {
  assert.equal(typeof manifest.name, 'string');
  assert.ok(manifest.name.trim());
  assert.equal(manifest.filename, pkg.name + '.js');
  assert.notEqual(manifest.content_in_root, true, 'root-only lookup would bypass dist and release assets');
  assert.notEqual(manifest.zip_release, true, 'this card is distributed as a single JS asset');
  assert.deepEqual(readdirSync(new URL('../dist/', import.meta.url)), [manifest.filename]);
  const bundle = read('dist/' + manifest.filename);
  assert.ok(bundle.length > 0 && bundle.length < 100 * 1024 * 1024);
});

test('the built distribution and source identify the prepared package version', () => {
  const label = 'VinylMatrix Card ' + pkg.version;
  assert.ok(read('src/vinylmatrix-card.ts').toString().includes(label));
  assert.ok(read('dist/' + manifest.filename).toString().includes(label));
});
