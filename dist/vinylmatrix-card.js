const B = globalThis, tt = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, et = /* @__PURE__ */ Symbol(), nt = /* @__PURE__ */ new WeakMap();
let bt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== et) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (tt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = nt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && nt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ut = (i) => new bt(typeof i == "string" ? i : i + "", void 0, et), $t = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, r, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[n + 1], i[0]);
  return new bt(e, i, et);
}, Ot = (i, t) => {
  if (tt) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), r = B.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  }
}, at = tt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Ut(e);
})(i) : i;
const { is: Rt, defineProperty: zt, getOwnPropertyDescriptor: Nt, getOwnPropertyNames: Lt, getOwnPropertySymbols: Ht, getPrototypeOf: Vt } = Object, K = globalThis, ot = K.trustedTypes, It = ot ? ot.emptyScript : "", Bt = K.reactiveElementPolyfillSupport, U = (i, t) => i, Y = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? It : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, yt = (i, t) => !Rt(i, t), lt = { attribute: !0, type: String, converter: Y, reflect: !1, useDefault: !1, hasChanged: yt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), K.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let E = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = lt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && zt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: n } = Nt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: r, set(a) {
      const d = r?.call(this);
      n?.call(this, a), this.requestUpdate(t, d, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? lt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const t = Vt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const e = this.properties, s = [...Lt(e), ...Ht(e)];
      for (const r of s) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, r] of e) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const r = this._$Eu(e, s);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s) e.unshift(at(r));
    } else t !== void 0 && e.push(at(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ot(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : Y).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Y;
      this._$Em = r;
      const d = a.fromAttribute(e, n.type);
      this[r] = d ?? this._$Ej?.get(r) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, r = !1, n) {
    if (t !== void 0) {
      const a = this.constructor;
      if (r === !1 && (n = this[t]), s ??= a.getPropertyOptions(t), !((s.hasChanged ?? yt)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: r, wrapped: n }, a) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: a } = n, d = this[r];
        a !== !0 || this._$AL.has(r) || d === void 0 || this.C(r, void 0, n, d);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[U("elementProperties")] = /* @__PURE__ */ new Map(), E[U("finalized")] = /* @__PURE__ */ new Map(), Bt?.({ ReactiveElement: E }), (K.reactiveElementVersions ??= []).push("2.1.2");
const it = globalThis, ct = (i) => i, j = it.trustedTypes, dt = j ? j.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, _t = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, xt = "?" + y, Dt = `<${xt}>`, w = document, z = () => w.createComment(""), N = (i) => i === null || typeof i != "object" && typeof i != "function", st = Array.isArray, jt = (i) => st(i) || typeof i?.[Symbol.iterator] == "function", G = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ht = /-->/g, ut = />/g, _ = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pt = /'/g, mt = /"/g, wt = /^(?:script|style|textarea|title)$/i, At = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), m = At(1), kt = At(2), b = /* @__PURE__ */ Symbol.for("lit-noChange"), c = /* @__PURE__ */ Symbol.for("lit-nothing"), gt = /* @__PURE__ */ new WeakMap(), x = w.createTreeWalker(w, 129);
function Et(i, t) {
  if (!st(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return dt !== void 0 ? dt.createHTML(t) : t;
}
const Wt = (i, t) => {
  const e = i.length - 1, s = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = M;
  for (let d = 0; d < e; d++) {
    const o = i[d];
    let h, u, l = -1, p = 0;
    for (; p < o.length && (a.lastIndex = p, u = a.exec(o), u !== null); ) p = a.lastIndex, a === M ? u[1] === "!--" ? a = ht : u[1] !== void 0 ? a = ut : u[2] !== void 0 ? (wt.test(u[2]) && (r = RegExp("</" + u[2], "g")), a = _) : u[3] !== void 0 && (a = _) : a === _ ? u[0] === ">" ? (a = r ?? M, l = -1) : u[1] === void 0 ? l = -2 : (l = a.lastIndex - u[2].length, h = u[1], a = u[3] === void 0 ? _ : u[3] === '"' ? mt : pt) : a === mt || a === pt ? a = _ : a === ht || a === ut ? a = M : (a = _, r = void 0);
    const f = a === _ && i[d + 1].startsWith("/>") ? " " : "";
    n += a === M ? o + Dt : l >= 0 ? (s.push(h), o.slice(0, l) + _t + o.slice(l) + y + f) : o + y + (l === -2 ? d : f);
  }
  return [Et(i, n + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class L {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let n = 0, a = 0;
    const d = t.length - 1, o = this.parts, [h, u] = Wt(t, e);
    if (this.el = L.createElement(h, s), x.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = x.nextNode()) !== null && o.length < d; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(_t)) {
          const p = u[a++], f = r.getAttribute(l).split(y), $ = /([.?@])?(.*)/.exec(p);
          o.push({ type: 1, index: n, name: $[2], strings: f, ctor: $[1] === "." ? Kt : $[1] === "?" ? Zt : $[1] === "@" ? Gt : Z }), r.removeAttribute(l);
        } else l.startsWith(y) && (o.push({ type: 6, index: n }), r.removeAttribute(l));
        if (wt.test(r.tagName)) {
          const l = r.textContent.split(y), p = l.length - 1;
          if (p > 0) {
            r.textContent = j ? j.emptyScript : "";
            for (let f = 0; f < p; f++) r.append(l[f], z()), x.nextNode(), o.push({ type: 2, index: ++n });
            r.append(l[p], z());
          }
        }
      } else if (r.nodeType === 8) if (r.data === xt) o.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = r.data.indexOf(y, l + 1)) !== -1; ) o.push({ type: 7, index: n }), l += y.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = w.createElement("template");
    return s.innerHTML = t, s;
  }
}
function C(i, t, e = i, s) {
  if (t === b) return t;
  let r = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = N(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(i), r._$AT(i, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = r : e._$Cl = r), r !== void 0 && (t = C(i, r._$AS(i, t.values), r, s)), t;
}
class qt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, r = (t?.creationScope ?? w).importNode(e, !0);
    x.currentNode = r;
    let n = x.nextNode(), a = 0, d = 0, o = s[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let h;
        o.type === 2 ? h = new V(n, n.nextSibling, this, t) : o.type === 1 ? h = new o.ctor(n, o.name, o.strings, this, t) : o.type === 6 && (h = new Ft(n, this, t)), this._$AV.push(h), o = s[++d];
      }
      a !== o?.index && (n = x.nextNode(), a++);
    }
    return x.currentNode = w, r;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class V {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, r) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = C(this, t, e), N(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== b && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : jt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && N(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = L.createElement(Et(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const n = new qt(r, this), a = n.u(this.options);
      n.p(e), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = gt.get(t.strings);
    return e === void 0 && gt.set(t.strings, e = new L(t)), e;
  }
  k(t) {
    st(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const n of t) r === e.length ? e.push(s = new V(this.O(z()), this.O(z()), this, this.options)) : s = e[r], s._$AI(n), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = ct(t).nextSibling;
      ct(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Z {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, r, n) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = c;
  }
  _$AI(t, e = this, s, r) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = C(this, t, e, 0), a = !N(t) || t !== this._$AH && t !== b, a && (this._$AH = t);
    else {
      const d = t;
      let o, h;
      for (t = n[0], o = 0; o < n.length - 1; o++) h = C(this, d[s + o], e, o), h === b && (h = this._$AH[o]), a ||= !N(h) || h !== this._$AH[o], h === c ? t = c : t !== c && (t += (h ?? "") + n[o + 1]), this._$AH[o] = h;
    }
    a && !r && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Kt extends Z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class Zt extends Z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class Gt extends Z {
  constructor(t, e, s, r, n) {
    super(t, e, s, r, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = C(this, t, e, 0) ?? c) === b) return;
    const s = this._$AH, r = t === c && s !== c || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== c && (s === c || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ft {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const Yt = it.litHtmlPolyfillSupport;
Yt?.(L, V), (it.litHtmlVersions ??= []).push("3.3.3");
const Jt = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = r = new V(t.insertBefore(z(), n), n, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
const rt = globalThis;
let S = class extends E {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Jt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return b;
  }
};
S._$litElement$ = !0, S.finalized = !0, rt.litElementHydrateSupport?.({ LitElement: S });
const Xt = rt.litElementPolyfillSupport;
Xt?.({ LitElement: S });
(rt.litElementVersions ??= []).push("4.2.2");
const A = { ATTRIBUTE: 1, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, St = (i) => (...t) => ({ _$litDirective$: i, values: t });
let Ct = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this._$Ct = t, this._$AM = e, this._$Ci = s;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
};
const Qt = (i) => i.strings === void 0, te = {}, Mt = (i, t = te) => i._$AH = t;
const ee = St(class extends Ct {
  constructor(i) {
    if (super(i), i.type !== A.PROPERTY && i.type !== A.ATTRIBUTE && i.type !== A.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!Qt(i)) throw Error("`live` bindings can only contain a single expression");
  }
  render(i) {
    return i;
  }
  update(i, [t]) {
    if (t === b || t === c) return t;
    const e = i.element, s = i.name;
    if (i.type === A.PROPERTY) {
      if (t === e[s]) return b;
    } else if (i.type === A.BOOLEAN_ATTRIBUTE) {
      if (!!t === e.hasAttribute(s)) return b;
    } else if (i.type === A.ATTRIBUTE && e.getAttribute(s) === t + "") return b;
    return Mt(i), t;
  }
});
const ie = St(class extends Ct {
  constructor() {
    super(...arguments), this.key = c;
  }
  render(i, t) {
    return this.key = i, t;
  }
  update(i, [t, e]) {
    return t !== this.key && (Mt(i), this.key = t), e;
  }
}), g = {
  PAUSE: 1,
  SEEK: 2,
  VOLUME_SET: 4,
  VOLUME_MUTE: 8,
  PREVIOUS_TRACK: 16,
  NEXT_TRACK: 32,
  STOP: 4096,
  PLAY: 16384
};
function se(i) {
  const t = i.entities ?? (i.entity ? [i.entity] : []);
  if (!Array.isArray(t) || t.length === 0 || t.some((e) => typeof e != "string" || !/^media_player\.[a-z0-9_]+$/.test(e)))
    throw new Error("VinylMatrix: configure at least one media_player in entities.");
  if (i.theme && !["vinyl", "minimal", "classic", "ambient"].includes(i.theme)) throw new Error("VinylMatrix: invalid theme.");
  if (i.color_mode && !["auto", "light", "dark"].includes(i.color_mode)) throw new Error("VinylMatrix: invalid color_mode.");
  if (i.language && !["auto", "en", "it"].includes(i.language)) throw new Error("VinylMatrix: invalid language.");
  if (i.name !== void 0 && typeof i.name != "string") throw new Error("VinylMatrix: name must be text.");
  return { ...i, entities: [...new Set(t)], theme: i.theme ?? "vinyl", color_mode: i.color_mode ?? "auto", language: i.language ?? "auto" };
}
function H(i) {
  return !!i && !["unavailable", "unknown"].includes(i.state);
}
function Tt(i) {
  return H(i) && !["off", "standby"].includes(i.state);
}
function re(i, t, e) {
  const s = i.filter((r) => t[r]?.state === "playing");
  return e && s.includes(e) ? e : s.length ? s[0] : e && i.includes(e) && H(t[e]) ? e : i.find((r) => H(t[r])) ?? i[0];
}
function v(i, t) {
  const e = i?.attributes.supported_features;
  return Tt(i) && typeof e == "number" && (e & t) === t;
}
function O(i) {
  return typeof i == "number" && Number.isFinite(i) ? i : void 0;
}
function T(i) {
  return typeof i == "string" ? i : "";
}
function R(i) {
  const t = O(i?.attributes.media_duration);
  return t !== void 0 && t > 0 ? t : void 0;
}
function P(i, t = Date.now()) {
  const e = O(i?.attributes.media_position);
  if (e === void 0) return;
  const s = Date.parse(T(i?.attributes.media_position_updated_at)), r = i?.state === "playing" && Number.isFinite(s) ? Math.max(0, (t - s) / 1e3) : 0;
  return Math.max(0, Math.min(e + r, R(i) ?? 1 / 0));
}
function F(i) {
  return JSON.stringify([i?.attributes.media_content_id, i?.attributes.media_title, i?.attributes.media_artist, i?.attributes.media_duration]);
}
function ft(i) {
  return v(i, g.SEEK) && R(i) !== void 0 && P(i) !== void 0;
}
function I(i) {
  if (i === void 0 || !Number.isFinite(i)) return "—:—";
  const t = Math.max(0, Math.floor(i)), e = Math.floor(t / 3600);
  return `${e ? `${e}:` : ""}${String(Math.floor(t / 60) % 60).padStart(e ? 2 : 1, "0")}:${String(t % 60).padStart(2, "0")}`;
}
function ne(i) {
  if (Tt(i)) {
    if (i.state === "playing") {
      if (v(i, g.PAUSE)) return { service: "media_pause", feature: g.PAUSE, icon: "pause" };
      if (v(i, g.STOP)) return { service: "media_stop", feature: g.STOP, icon: "stop" };
    } else if (v(i, g.PLAY)) return { service: "media_play", feature: g.PLAY, icon: "play" };
  }
}
function vt(i, t = (e) => e) {
  if (typeof i != "string" || !i.trim()) return;
  const e = i.trim();
  if (/^https?:\/\//i.test(e)) return e;
  if (e.startsWith("/") && !e.startsWith("//") && !e.includes("\\")) return t(e);
}
const ae = {
  play: "Play",
  pause: "Pause",
  stop: "Stop",
  previous: "Previous track",
  next: "Next track",
  volume: "Volume",
  progress: "Playback position",
  mute: "Mute",
  unmute: "Unmute",
  idle: "Nothing playing",
  paused: "Paused",
  playing: "Playing",
  buffering: "Buffering",
  unavailable: "Player unavailable",
  off: "Off",
  unknown: "Unknown",
  on: "Ready",
  standby: "Standby",
  artist: "Unknown artist",
  loading: "Waiting for Home Assistant",
  error: "The player could not complete the action.",
  players: "Media players · priority order",
  add: "Add player",
  remove: "Remove player",
  name: "Custom name",
  theme: "Style",
  color: "Color mode",
  language: "Language",
  auto: "Automatic",
  light: "Light",
  dark: "Dark",
  vinyl: "Vinyl · floating disc",
  minimal: "Minimal",
  classic: "Classic",
  ambient: "Ambient",
  hint: "The playing player is selected automatically. Order determines priority when the card first opens."
}, oe = {
  play: "Riproduci",
  pause: "Pausa",
  stop: "Ferma",
  previous: "Brano precedente",
  next: "Brano successivo",
  volume: "Volume",
  progress: "Posizione di riproduzione",
  mute: "Disattiva audio",
  unmute: "Riattiva audio",
  idle: "Nessuna riproduzione",
  paused: "In pausa",
  playing: "In riproduzione",
  buffering: "Caricamento",
  unavailable: "Lettore non disponibile",
  off: "Spento",
  unknown: "Sconosciuto",
  on: "Pronto",
  standby: "Standby",
  artist: "Artista sconosciuto",
  loading: "In attesa di Home Assistant",
  error: "Il lettore non ha completato il comando.",
  players: "Lettori multimediali · ordine di priorità",
  add: "Aggiungi lettore",
  remove: "Rimuovi lettore",
  name: "Nome personalizzato",
  theme: "Stile",
  color: "Colore",
  language: "Lingua",
  auto: "Automatico",
  light: "Chiaro",
  dark: "Scuro",
  vinyl: "Vinyl · disco libero",
  minimal: "Minimal",
  classic: "Classic",
  ambient: "Ambient",
  hint: "Viene selezionato automaticamente il lettore in riproduzione. L’ordine determina la priorità all’apertura della card."
};
function D(i, t) {
  return (i?.language && i.language !== "auto" ? i.language : t?.locale?.language ?? t?.language ?? "en").toLowerCase().startsWith("it") ? oe : ae;
}
function k(i) {
  const t = {
    play: "M8 5v14l11-7Z",
    pause: "M8 5v14M16 5v14",
    stop: "M6 6h12v12H6Z",
    previous: "M5 5v14M19 5 8 12l11 7Z",
    next: "M19 5v14M5 5l11 7-11 7Z",
    volume: "M4 9v6h4l5 4V5L8 9ZM17 8c3 2 3 6 0 8M20 5c5 4 5 10 0 14",
    mute: "M4 9v6h4l5 4V5L8 9ZM17 9l5 6M22 9l-5 6",
    progress: "M12 7v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0"
  };
  return kt`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d=${t[i] ?? t.play}/></svg>`;
}
function le(i) {
  return kt`<svg class="tonearm" viewBox="0 0 320 300" aria-hidden="true">
    <g class="arm-rest"><path d="M274 101v20"/><path d="M268 101h12"/></g>
    <g class="arm-moving">
      <path class="shaft-shadow" d=${i ? "M260 18V105C260 140 283 155 278 185S260 229 255 241" : "M260 18V191Q260 224 247 245"}/>
      <path class="shaft" d=${i ? "M260 18V105C260 140 283 155 278 185S260 229 255 241" : "M260 18V191Q260 224 247 245"}/>
      <rect class="weight" x="250" y="13" width="20" height="18" rx="2"/>
      <circle class="pivot-outer" cx="260" cy="44" r="13"/>
      <circle class="pivot" cx="260" cy="44" r="8"/>
      <g transform=${i ? "translate(256 238) rotate(22)" : "translate(250 239) rotate(22)"}>
        <rect class="cartridge" x="-6" y="-1" width="12" height="27" rx="3"/>
        <path class="needle" d="M0 26v5"/><circle class="screw" cx="0" cy="17" r="2"/>
      </g>
    </g>
  </svg>`;
}
const ce = $t`
  :host { display:block; min-width:0; container-type:inline-size; }
  * { box-sizing:border-box; }
  .card { --surface:#edece8; --ink:#292c2e; --muted:#656866; --line:rgba(55,58,58,.23);
    --arm:#c2c4c2; --disc:#171919; --button:#303334; --button-ink:#fafafa;
    display:block; position:relative; isolation:isolate; overflow:hidden; border-radius:var(--ha-card-border-radius,18px);
    border:var(--ha-card-border-width,1px) solid var(--ha-card-border-color,rgba(125,125,125,.18));
    background:var(--surface); color:var(--ink); font-family:var(--primary-font-family,system-ui,sans-serif);
    padding:16px; box-shadow:var(--ha-card-box-shadow,none);
  }
  .card.dark { --surface:#282c2e; --ink:#f0efec; --muted:#bbbcb8; --line:rgba(225,225,225,.25); --arm:#b9bcb9; --button:#f1f0ec; --button-ink:#242728; }
  .card.vinyl,.card.ambient { background:linear-gradient(150deg,var(--surface),color-mix(in srgb,var(--surface),#888 16%)); }
  .backdrop { position:absolute; z-index:-2; inset:-35px; width:calc(100% + 70px); height:calc(100% + 70px); object-fit:cover; filter:blur(30px) saturate(.35); opacity:.27; pointer-events:none; }
  .card.vinyl::after,.card.ambient::after { content:""; position:absolute; z-index:-1; inset:0; background:linear-gradient(180deg,transparent,var(--surface) 96%); opacity:.65; pointer-events:none; }
  .stage { display:grid; grid-template-columns:minmax(0,1fr); align-items:stretch; gap:2px; }
  .stage.lateral { grid-template-columns:minmax(0,1fr) 62px; }
  .deck { position:relative; min-width:0; aspect-ratio:320 / 300; }
  .record { position:absolute; z-index:0; width:82%; aspect-ratio:1; left:1%; top:8%; border-radius:50%; background:var(--disc);
    box-shadow:0 2px 5px #0003,inset 0 0 0 1px #8885; overflow:hidden; }
  .record::after { content:""; position:absolute; inset:1%; border-radius:50%; pointer-events:none;
    background:repeating-radial-gradient(circle at center,transparent 0 2px,#ffffff08 2.3px 2.7px),conic-gradient(from 35deg,transparent,#ffffff12 12%,transparent 26%,transparent 45%,#ffffff0c 62%,transparent 77%); }
  .rotor { position:absolute; inset:0; border-radius:50%; animation:spin 10s linear infinite; animation-play-state:paused; }
  .playing .rotor { animation-play-state:running; }
  .cover { position:absolute; z-index:1; inset:12%; border-radius:50%; overflow:hidden;
    background:radial-gradient(circle at 25% 30%,#bcb5a4,transparent 60%),linear-gradient(145deg,#8d928b,#343d3a); box-shadow:0 0 0 1px #ffffff15; }
  .cover img { width:100%; height:100%; object-fit:cover; display:block; }
  .fallback { width:100%; height:100%; display:grid; place-items:center; color:#f1efdfb3; font-size:clamp(24px,14cqi,80px); font-weight:200; }
  .spindle { position:absolute; z-index:3; left:50%; top:50%; width:9px; height:9px; border-radius:50%; transform:translate(-50%,-50%); background:linear-gradient(135deg,#eceee9,#808786); box-shadow:0 1px 2px #0007; }
  .tonearm { position:absolute; z-index:1; inset:0; width:100%; height:100%; overflow:visible; pointer-events:none; }
  .arm-moving { transform-origin:260px 44px; transform:rotate(-4deg); transition:transform 900ms cubic-bezier(.4,0,.2,1); }
  .playing .arm-moving { transform:rotate(14deg); }
  .minimal.playing .arm-moving { transform:rotate(11deg); }
  .shaft { stroke:var(--arm); stroke-width:4; fill:none; stroke-linecap:round; }
  .shaft-shadow { stroke:#0004; stroke-width:6; fill:none; transform:translate(1px,1px); }
  .pivot-outer { fill:#292c2b; stroke:#555b59; stroke-width:1; }
  .pivot { fill:#818582; stroke:#d1d4cc; stroke-width:1; }
  .weight { fill:#8f9490; stroke:#c8ccc4; stroke-width:.5; }
  .cartridge { fill:#282d2a; stroke:#666e67; stroke-width:.5; }
  .needle,.arm-rest { stroke:#888e86; stroke-width:2; fill:none; }
  .screw { fill:none; stroke:#b9c1b6; stroke-width:1; }
  .minimal .record { box-shadow:none; }
  .minimal .record::after { display:none; }
  .minimal .cover { inset:5%; box-shadow:none; }
  .minimal .shaft-shadow,.minimal .weight,.minimal .screw { display:none; }
  .minimal .shaft { stroke-width:3; }
  .minimal .pivot { fill:#757a77; stroke:none; }
  .classic { background:linear-gradient(135deg,var(--surface),color-mix(in srgb,var(--surface),#888 22%)); }
  .classic .record { border:4px dotted #90938d; outline:2px solid #5b605b; box-shadow:0 2px 6px #0005; }
  .classic .cover { inset:20%; }
  .classic .pivot-outer { r:19px; }
  .classic .shaft { stroke-width:6; }
  .classic .shaft-shadow { stroke-width:8; }
  .classic .weight { height:23px; }
  .classic .transport .primary { border-radius:6px; border:1px solid var(--muted); background:linear-gradient(135deg,#e1e2db,#a2a7a1); color:#252927; width:48px; }
  .classic .transport .primary svg { width:19px; }
  .classic .transport .primary span { font-size:7px; letter-spacing:.07em; }
  .classic .transport .primary { display:flex; flex-direction:column; gap:1px; }
  .meta { min-width:0; margin:9px 0 8px; }
  .title { margin:0; font-size:clamp(16px,5.2cqi,23px); line-height:1.3; letter-spacing:-.025em; font-weight:550; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
  .artist { margin:4px 0 0; font-size:clamp(12px,3.7cqi,15px); line-height:1.4; color:var(--muted); overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
  .player { margin:0; font-size:10px; letter-spacing:.025em; color:var(--muted); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .player .dot { display:inline-block; width:4px; height:4px; border-radius:50%; background:currentColor; margin:0 5px 2px 0; }
  .horizontal { margin-top:12px; }
  .times { display:flex; justify-content:space-between; font-size:10px; color:var(--muted); font-variant-numeric:tabular-nums; margin-top:-3px; }
  .side { display:flex; gap:0; padding:16px 0 10px 2px; min-height:0; }
  .vertical { display:flex; flex:1; min-width:0; flex-direction:column; align-items:center; justify-content:space-between; gap:4px; }
  .vertical > svg { width:16px; height:16px; flex-shrink:0; }
  .vertical input[type=range] { writing-mode:vertical-lr; direction:rtl; width:28px; height:100%; min-height:45px; flex:1; padding:8px 10px; }
  .vertical output { height:12px; font-size:9px; color:var(--muted); font-variant-numeric:tabular-nums; }
  input[type=range] { display:block; appearance:none; background:transparent; color:var(--ink); accent-color:var(--ink); width:100%; height:28px; padding:10px 0; margin:0; cursor:pointer; touch-action:pan-y; }
  .vertical input[type=range] { touch-action:pan-x; }
  input[type=range]::-webkit-slider-runnable-track { background:var(--line); height:3px; border-radius:3px; }
  input[type=range]::-webkit-slider-thumb { appearance:none; background:var(--ink); border:0; width:10px; height:10px; border-radius:50%; margin-top:-3.5px; }
  .vertical input[type=range]::-webkit-slider-runnable-track { width:3px; height:100%; }
  .vertical input[type=range]::-webkit-slider-thumb { margin-top:0; margin-left:-3.5px; }
  input[type=range]::-moz-range-track { background:var(--line); height:3px; border-radius:3px; }
  input[type=range]::-moz-range-thumb { background:var(--ink); border:0; width:10px; height:10px; border-radius:50%; }
  .vertical input[type=range]::-moz-range-track { width:3px; height:100%; }
  input[type=range]:disabled { cursor:default; opacity:.32; }
  input[type=range]:disabled::-webkit-slider-thumb { opacity:0; }
  .transport { display:flex; justify-content:center; align-items:center; gap:12px; margin-top:9px; }
  button { border:0; font:inherit; color:inherit; background:transparent; cursor:pointer; display:grid; place-items:center; width:38px; height:38px; padding:8px; border-radius:50%; flex-shrink:0; }
  button svg { width:21px; height:21px; }
  button.primary { background:var(--button); color:var(--button-ink); width:46px; height:46px; }
  button:disabled { opacity:.3; cursor:default; }
  button:hover:enabled { background:color-mix(in srgb,var(--ink),transparent 90%); }
  button.primary:hover:enabled { background:var(--button); filter:brightness(.92); }
  button:focus-visible,input:focus-visible { outline:2px solid var(--ink); outline-offset:2px; }
  .volume-popover { display:flex; align-items:center; gap:5px; padding:4px 8px; margin:8px 0 0; border-radius:10px; background:var(--line); }
  .volume-popover output { font-size:11px; min-width:32px; text-align:right; }
  .volume-popover button { width:30px; height:30px; }
  .error { font-size:12px; padding:8px; margin:8px 0 0; border:1px solid var(--muted); border-radius:8px; }
  .empty { padding:24px; color:var(--primary-text-color,#777); font-size:14px; }
  @keyframes spin { to { transform:rotate(360deg); } }
  @media (prefers-reduced-motion:reduce) { .rotor { animation:none; } .arm-moving { transition:none; } }
  @container (max-width:280px) { .card { padding:10px; } .stage.lateral { grid-template-columns:minmax(0,1fr) 54px; } .transport { gap:5px; } .side { padding-top:8px; } .title { font-size:16px; } }
`, W = class W extends S {
  constructor() {
    super(...arguments), this.config = { type: "custom:vinylmatrix-card", entities: [] };
  }
  setConfig(t) {
    this.config = { ...t, entities: [...t.entities ?? (t.entity ? [t.entity] : [])] };
  }
  updateConfig(t) {
    this.config = { ...this.config, ...t };
    const e = { ...this.config };
    delete e.entity, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: e }, bubbles: !0, composed: !0 }));
  }
  render() {
    const t = D(this.config, this.hass), e = this.config.entities ?? [];
    return m`
      <label>${t.players}</label>
      ${e.map((s, r) => m`<div class="row"><input aria-label=${`${t.players} ${r + 1}`} list="players" .value=${s} @change=${(n) => {
      const a = [...e];
      a[r] = n.target.value.trim(), this.updateConfig({ entities: a });
    }}/><button aria-label=${`${t.remove} ${r + 1}`} @click=${() => this.updateConfig({ entities: e.filter((n, a) => a !== r) })}>×</button></div>`)}
      <datalist id="players">${Object.keys(this.hass?.states ?? {}).filter((s) => s.startsWith("media_player.")).sort().map((s) => m`<option value=${s}>${this.hass?.states[s].attributes.friendly_name}</option>`)}</datalist>
      <button @click=${() => this.updateConfig({ entities: [...e, ""] })}>+ ${t.add}</button><p>${t.hint}</p>
      <label for="name">${t.name}</label><input id="name" .value=${this.config.name ?? ""} @change=${(s) => this.updateConfig({ name: s.target.value })}/>
      <label for="theme">${t.theme}</label><select id="theme" .value=${this.config.theme ?? "vinyl"} @change=${(s) => this.updateConfig({ theme: s.target.value })}>${["vinyl", "minimal", "classic", "ambient"].map((s) => m`<option value=${s}>${t[s]}</option>`)}</select>
      <label for="color">${t.color}</label><select id="color" .value=${this.config.color_mode ?? "auto"} @change=${(s) => this.updateConfig({ color_mode: s.target.value })}>${["auto", "light", "dark"].map((s) => m`<option value=${s}>${t[s]}</option>`)}</select>
      <label for="language">${t.language}</label><select id="language" .value=${this.config.language ?? "auto"} @change=${(s) => this.updateConfig({ language: s.target.value })}><option value="auto">${t.auto}</option><option value="en">English</option><option value="it">Italiano</option></select>
    `;
  }
};
W.properties = { hass: { attribute: !1 }, config: { state: !0 } }, W.styles = $t`
    :host { display:block; color:var(--primary-text-color); font-family:var(--primary-font-family,system-ui); }
    * { box-sizing:border-box; } label { display:block; font-size:14px; margin:16px 0 6px; }
    input,select { font:inherit; padding:10px; width:100%; color:var(--primary-text-color); background:var(--card-background-color,#fff); border:1px solid var(--divider-color,#888); border-radius:6px; }
    .row { display:flex; gap:8px; margin-bottom:8px; } button { cursor:pointer; padding:8px 12px; border-radius:6px; border:1px solid var(--divider-color,#888); background:var(--card-background-color,#fff); color:var(--primary-text-color); }
    p { font-size:13px; color:var(--secondary-text-color,#888); line-height:1.5; }
  `;
let J = W;
customElements.get("vinylmatrix-card-editor") || customElements.define("vinylmatrix-card-editor", J);
const q = class q extends S {
  constructor() {
    super(...arguments), this.clock = Date.now(), this.failedArt = "", this.error = "", this.busy = !1, this.volumeOpen = !1, this.commandGeneration = 0, this.visibilityChanged = () => {
      this.clock = Date.now(), this.syncTimer();
    };
  }
  static getConfigElement() {
    return document.createElement("vinylmatrix-card-editor");
  }
  static getStubConfig(t) {
    return { entities: Object.keys(t.states).filter((s) => s.startsWith("media_player.")).slice(0, 1), theme: "vinyl", color_mode: "auto" };
  }
  setConfig(t) {
    this.config = se(t), this.gesture && (this.gesture = { ...this.gesture, canceled: !0 }), this.error = "";
  }
  getCardSize() {
    return this.config?.theme === "vinyl" ? 8 : 7;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("visibilitychange", this.visibilityChanged), this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("visibilitychange", this.visibilityChanged), this.stopTimer(), this.gesture = void 0, this.commandGeneration++, this.busy = !1;
  }
  stopTimer() {
    this.timer && clearInterval(this.timer), this.timer = void 0;
  }
  syncTimer() {
    this.isConnected && !document.hidden && this.player?.state === "playing" && P(this.player) !== void 0 ? this.timer || (this.timer = setInterval(() => {
      this.clock = Date.now();
    }, 1e3)) : this.stopTimer();
  }
  get player() {
    return this.active ? this.hass?.states[this.active] : void 0;
  }
  willUpdate(t) {
    if (this.config && this.hass) {
      const e = re(this.config.entities, this.hass.states, this.active);
      e !== this.active && (this.active = e, this.gesture && (this.gesture = { ...this.gesture, canceled: !0 }), this.volumeOpen = !1, this.error = "", this.busy = !1, this.commandGeneration++), this.gesture && (this.gesture.entity !== this.active || this.gesture.kind === "seek" && this.gesture.key !== F(this.player)) && (this.gesture = { ...this.gesture, canceled: !0 });
    }
    t.has("hass") && (this.clock = Date.now());
  }
  updated() {
    this.syncTimer();
  }
  art() {
    const t = (e) => this.hass?.hassUrl?.(e) ?? e;
    return vt(this.player?.attributes.entity_picture_local, t) ?? vt(this.player?.attributes.entity_picture, t);
  }
  capture(t, e) {
    this.active && (this.gesture = { kind: t, entity: this.active, key: F(this.player), value: e });
  }
  async commitSlider(t, e) {
    const s = Number(e.target.value), r = this.gesture;
    if (this.gesture = void 0, !(!r || r.canceled || r.entity !== this.active || r.kind !== t)) {
      if (t === "seek") {
        if (!ft(this.player) || r.key !== F(this.player)) return;
        await this.command("media_seek", g.SEEK, { seek_position: Math.min(R(this.player), Math.max(0, s)) }, r.entity);
      } else
        await this.command("volume_set", g.VOLUME_SET, { volume_level: Math.max(0, Math.min(1, s)) }, r.entity);
      this.requestUpdate();
    }
  }
  async command(t, e, s = {}, r = this.active) {
    if (!r || r !== this.active || !this.hass || this.busy || !v(this.hass.states[r], e)) return;
    const n = ++this.commandGeneration;
    this.busy = !0, this.error = "";
    try {
      await this.hass.callService("media_player", t, { ...s, entity_id: r });
    } catch {
      n === this.commandGeneration && (this.error = D(this.config, this.hass).error);
    } finally {
      n === this.commandGeneration && (this.busy = !1);
    }
  }
  slider(t, e = !1) {
    const s = D(this.config, this.hass), r = this.player, n = t === "seek", a = n ? R(r) ?? 1 : 1, d = n ? P(r, this.clock) ?? 0 : Math.max(0, Math.min(1, O(r?.attributes.volume_level) ?? 0)), o = this.gesture?.kind === t && !this.gesture.canceled ? this.gesture.value : d, h = n ? ft(r) : v(r, g.VOLUME_SET) && O(r?.attributes.volume_level) !== void 0, u = n ? s.progress : s.volume;
    return m`<div class=${e ? "vertical" : "horizontal"}>
      ${e ? k(n ? "progress" : "volume") : c}
      <input data-kind=${t} type="range" min="0" max=${a} step=${n ? "1" : "0.01"}
        .value=${ee(String(o))} ?disabled=${!h || this.busy} aria-label=${u}
        aria-orientation=${e ? "vertical" : "horizontal"}
        aria-valuetext=${n ? I(o) : `${Math.round(o * 100)}%`}
        @pointerdown=${() => this.capture(t, o)} @pointercancel=${() => {
      this.gesture = void 0;
    }}
        @keydown=${() => {
      this.gesture || this.capture(t, o);
    }}
        @input=${(l) => {
      const p = Number(l.target.value);
      this.gesture ? this.gesture = { ...this.gesture, value: p } : this.capture(t, p);
    }}
        @change=${(l) => this.commitSlider(t, l)} @blur=${() => {
      this.gesture = void 0;
    }}/>
      ${e ? m`<output>${n ? I(P(r, this.clock)) : O(r?.attributes.volume_level) === void 0 ? "—" : `${Math.round(o * 100)}%`}</output>` : n ? m`<div class="times"><span>${I(P(r, this.clock))}</span><span>${I(R(r))}</span></div>` : c}
    </div>`;
  }
  render() {
    const t = D(this.config, this.hass);
    if (!this.config || !this.hass) return m`<div class="empty">${t.loading}</div>`;
    const e = this.player, s = e?.state === "playing", r = this.config.theme, n = this.config.color_mode === "dark" || this.config.color_mode === "auto" && (this.hass.themes?.darkMode ?? !1), a = this.art(), d = a && a !== this.failedArt ? a : void 0, o = H(e) ? e.state in t ? t[e.state] : e.state : t.unavailable, h = H(e) ? T(e.attributes.media_title) || t.idle : t.unavailable, u = T(e?.attributes.media_artist) || T(e?.attributes.media_album_artist) || t.artist, l = this.config.name || T(e?.attributes.friendly_name) || this.active, p = ne(e), f = p ? t[p.icon] : t.play, $ = this.active, Pt = d ? m`<img src=${d} alt="" referrerpolicy="no-referrer" @error=${() => {
      this.failedArt = d;
    }}/>` : c;
    return m`<ha-card class="card ${r} ${n ? "dark" : "light"} ${s ? "playing" : ""}" data-player=${this.active ?? ""} aria-label=${`VinylMatrix · ${l}`}>
      ${(r === "vinyl" || r === "ambient") && d ? m`<img class="backdrop" src=${d} alt="" referrerpolicy="no-referrer"/>` : c}
      <div class="stage ${r !== "vinyl" ? "lateral" : ""}">
        <div class="deck" role="img" aria-label=${`${h} · ${o}`}>
          <div class="record"><div class="rotor"><div class="cover">${ie(d ?? "fallback", d ? Pt : m`<div class="fallback" aria-hidden="true">♫</div>`)}</div></div><span class="spindle"></span></div>
          ${le(r === "classic")}
        </div>
        ${r !== "vinyl" ? m`<div class="side">${this.slider("seek", !0)}${this.slider("volume", !0)}</div>` : c}
      </div>
      <div class="meta"><h2 class="title" title=${h}>${h}</h2><p class="artist" title=${u}>${u}</p></div>
      <p class="player" title=${`${l} · ${o}`}><span class="dot"></span>${l} · ${o}</p>
      ${r === "vinyl" ? this.slider("seek") : c}
      <div class="transport">
        <button aria-label=${t.previous} title=${t.previous} ?disabled=${!v(e, g.PREVIOUS_TRACK) || this.busy} @click=${() => this.command("media_previous_track", g.PREVIOUS_TRACK, {}, $)}>${k("previous")}</button>
        <button class="primary" aria-label=${f} title=${f} ?disabled=${!p || this.busy} @click=${() => p && this.command(p.service, p.feature, {}, $)}>${k(p?.icon ?? "play")}${r === "classic" ? m`<span>START / STOP</span>` : c}</button>
        <button aria-label=${t.next} title=${t.next} ?disabled=${!v(e, g.NEXT_TRACK) || this.busy} @click=${() => this.command("media_next_track", g.NEXT_TRACK, {}, $)}>${k("next")}</button>
        ${r === "vinyl" ? m`<button aria-label=${t.volume} title=${t.volume} aria-expanded=${this.volumeOpen} ?disabled=${!v(e, g.VOLUME_SET) && !v(e, g.VOLUME_MUTE)} @click=${() => {
      this.volumeOpen = !this.volumeOpen;
    }}>${k(e?.attributes.is_volume_muted ? "mute" : "volume")}</button>` : c}
      </div>
      ${r === "vinyl" && this.volumeOpen ? m`<div class="volume-popover"><button aria-label=${e?.attributes.is_volume_muted ? t.unmute : t.mute} ?disabled=${!v(e, g.VOLUME_MUTE) || this.busy} @click=${() => this.command("volume_mute", g.VOLUME_MUTE, { is_volume_muted: !e?.attributes.is_volume_muted }, $)}>${k(e?.attributes.is_volume_muted ? "mute" : "volume")}</button><div style="flex:1">${this.slider("volume")}</div></div>` : c}
      ${this.error ? m`<p class="error" role="alert">${this.error}</p>` : c}
    </ha-card>`;
  }
};
q.properties = {
  hass: { attribute: !1 },
  config: { state: !0 },
  active: { state: !0 },
  clock: { state: !0 },
  failedArt: { state: !0 },
  error: { state: !0 },
  busy: { state: !0 },
  volumeOpen: { state: !0 },
  gesture: { state: !0 }
}, q.styles = ce;
let X = q;
customElements.get("vinylmatrix-card") || customElements.define("vinylmatrix-card", X);
const Q = window;
Q.customCards ??= [];
Q.customCards.some((i) => i.type === "vinylmatrix-card") || Q.customCards.push({ type: "vinylmatrix-card", name: "VinylMatrix Card", description: "An animated turntable for your music players", preview: !0 });
console.info("VinylMatrix Card 0.1.0");
export {
  X as VinylMatrixCard
};
