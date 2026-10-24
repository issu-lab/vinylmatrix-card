const Y = globalThis, ut = Y.ShadowRoot && (Y.ShadyCSS === void 0 || Y.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, mt = /* @__PURE__ */ Symbol(), xt = /* @__PURE__ */ new WeakMap();
let Tt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== mt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ut && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = xt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && xt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Gt = (s) => new Tt(typeof s == "string" ? s : s + "", void 0, mt), C = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, a, r) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + s[r + 1], s[0]);
  return new Tt(e, s, mt);
}, Wt = (s, t) => {
  if (ut) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), a = Y.litNonce;
    a !== void 0 && i.setAttribute("nonce", a), i.textContent = e.cssText, s.appendChild(i);
  }
}, $t = ut ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Gt(e);
})(s) : s;
const { is: Kt, defineProperty: Zt, getOwnPropertyDescriptor: Yt, getOwnPropertyNames: Ft, getOwnPropertySymbols: Qt, getPrototypeOf: Jt } = Object, tt = globalThis, wt = tt.trustedTypes, Xt = wt ? wt.emptyScript : "", te = tt.reactiveElementPolyfillSupport, I = (s, t) => s, nt = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Xt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, Ut = (s, t) => !Kt(s, t), kt = { attribute: !0, type: String, converter: nt, reflect: !1, useDefault: !1, hasChanged: Ut };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), tt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let T = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = kt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), a = this.getPropertyDescriptor(t, i, e);
      a !== void 0 && Zt(this.prototype, t, a);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: a, set: r } = Yt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: a, set(n) {
      const c = a?.call(this);
      r?.call(this, n), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? kt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const t = Jt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const e = this.properties, i = [...Ft(e), ...Qt(e)];
      for (const a of i) this.createProperty(a, e[a]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, a] of e) this.elementProperties.set(i, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const a = this._$Eu(e, i);
      a !== void 0 && this._$Eh.set(a, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const a of i) e.unshift($t(a));
    } else t !== void 0 && e.push($t(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Wt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), a = this.constructor._$Eu(t, i);
    if (a !== void 0 && i.reflect === !0) {
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : nt).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(a) : this.setAttribute(a, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, a = i._$Eh.get(t);
    if (a !== void 0 && this._$Em !== a) {
      const r = i.getPropertyOptions(a), n = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : nt;
      this._$Em = a;
      const c = n.fromAttribute(e, r.type);
      this[a] = c ?? this._$Ej?.get(a) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, a = !1, r) {
    if (t !== void 0) {
      const n = this.constructor;
      if (a === !1 && (r = this[t]), i ??= n.getPropertyOptions(t), !((i.hasChanged ?? Ut)(r, e) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: a, wrapped: r }, n) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), a === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [a, r] of this._$Ep) this[a] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [a, r] of i) {
        const { wrapped: n } = r, c = this[a];
        n !== !0 || this._$AL.has(a) || c === void 0 || this.C(a, void 0, r, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
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
T.elementStyles = [], T.shadowRootOptions = { mode: "open" }, T[I("elementProperties")] = /* @__PURE__ */ new Map(), T[I("finalized")] = /* @__PURE__ */ new Map(), te?.({ ReactiveElement: T }), (tt.reactiveElementVersions ??= []).push("2.1.2");
const gt = globalThis, _t = (s) => s, F = gt.trustedTypes, At = F ? F.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Ot = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, Rt = "?" + _, ee = `<${Rt}>`, M = document, j = () => M.createComment(""), D = (s) => s === null || typeof s != "object" && typeof s != "function", ft = Array.isArray, ie = (s) => ft(s) || typeof s?.[Symbol.iterator] == "function", st = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qt = /-->/g, Et = />/g, A = RegExp(`>|${st}(?:([^\\s"'>=/]+)(${st}*=${st}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), St = /'/g, Mt = /"/g, Lt = /^(?:script|style|textarea|title)$/i, Nt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), o = Nt(1), f = Nt(2), x = /* @__PURE__ */ Symbol.for("lit-noChange"), d = /* @__PURE__ */ Symbol.for("lit-nothing"), Ct = /* @__PURE__ */ new WeakMap(), q = M.createTreeWalker(M, 129);
function Ht(s, t) {
  if (!ft(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return At !== void 0 ? At.createHTML(t) : t;
}
const se = (s, t) => {
  const e = s.length - 1, i = [];
  let a, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = H;
  for (let c = 0; c < e; c++) {
    const l = s[c];
    let u, h, p = -1, g = 0;
    for (; g < l.length && (n.lastIndex = g, h = n.exec(l), h !== null); ) g = n.lastIndex, n === H ? h[1] === "!--" ? n = qt : h[1] !== void 0 ? n = Et : h[2] !== void 0 ? (Lt.test(h[2]) && (a = RegExp("</" + h[2], "g")), n = A) : h[3] !== void 0 && (n = A) : n === A ? h[0] === ">" ? (n = a ?? H, p = -1) : h[1] === void 0 ? p = -2 : (p = n.lastIndex - h[2].length, u = h[1], n = h[3] === void 0 ? A : h[3] === '"' ? Mt : St) : n === Mt || n === St ? n = A : n === qt || n === Et ? n = H : (n = A, a = void 0);
    const b = n === A && s[c + 1].startsWith("/>") ? " " : "";
    r += n === H ? l + ee : p >= 0 ? (i.push(u), l.slice(0, p) + Ot + l.slice(p) + _ + b) : l + _ + (p === -2 ? c : b);
  }
  return [Ht(s, r + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class V {
  constructor({ strings: t, _$litType$: e }, i) {
    let a;
    this.parts = [];
    let r = 0, n = 0;
    const c = t.length - 1, l = this.parts, [u, h] = se(t, e);
    if (this.el = V.createElement(u, i), q.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (a = q.nextNode()) !== null && l.length < c; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const p of a.getAttributeNames()) if (p.endsWith(Ot)) {
          const g = h[n++], b = a.getAttribute(p).split(_), k = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: r, name: k[2], strings: b, ctor: k[1] === "." ? re : k[1] === "?" ? ne : k[1] === "@" ? oe : et }), a.removeAttribute(p);
        } else p.startsWith(_) && (l.push({ type: 6, index: r }), a.removeAttribute(p));
        if (Lt.test(a.tagName)) {
          const p = a.textContent.split(_), g = p.length - 1;
          if (g > 0) {
            a.textContent = F ? F.emptyScript : "";
            for (let b = 0; b < g; b++) a.append(p[b], j()), q.nextNode(), l.push({ type: 2, index: ++r });
            a.append(p[g], j());
          }
        }
      } else if (a.nodeType === 8) if (a.data === Rt) l.push({ type: 2, index: r });
      else {
        let p = -1;
        for (; (p = a.data.indexOf(_, p + 1)) !== -1; ) l.push({ type: 7, index: r }), p += _.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = M.createElement("template");
    return i.innerHTML = t, i;
  }
}
function R(s, t, e = s, i) {
  if (t === x) return t;
  let a = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const r = D(t) ? void 0 : t._$litDirective$;
  return a?.constructor !== r && (a?._$AO?.(!1), r === void 0 ? a = void 0 : (a = new r(s), a._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = a : e._$Cl = a), a !== void 0 && (t = R(s, a._$AS(s, t.values), a, i)), t;
}
class ae {
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
    const { el: { content: e }, parts: i } = this._$AD, a = (t?.creationScope ?? M).importNode(e, !0);
    q.currentNode = a;
    let r = q.nextNode(), n = 0, c = 0, l = i[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let u;
        l.type === 2 ? u = new G(r, r.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (u = new le(r, this, t)), this._$AV.push(u), l = i[++c];
      }
      n !== l?.index && (r = q.nextNode(), n++);
    }
    return q.currentNode = M, a;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class G {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, a) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = a, this._$Cv = a?.isConnected ?? !0;
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
    t = R(this, t, e), D(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== x && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ie(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && D(this._$AH) ? this._$AA.nextSibling.data = t : this.T(M.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, a = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = V.createElement(Ht(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === a) this._$AH.p(e);
    else {
      const r = new ae(a, this), n = r.u(this.options);
      r.p(e), this.T(n), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Ct.get(t.strings);
    return e === void 0 && Ct.set(t.strings, e = new V(t)), e;
  }
  k(t) {
    ft(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, a = 0;
    for (const r of t) a === e.length ? e.push(i = new G(this.O(j()), this.O(j()), this, this.options)) : i = e[a], i._$AI(r), a++;
    a < e.length && (this._$AR(i && i._$AB.nextSibling, a), e.length = a);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = _t(t).nextSibling;
      _t(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class et {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, a, r) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = a, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(t, e = this, i, a) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = R(this, t, e, 0), n = !D(t) || t !== this._$AH && t !== x, n && (this._$AH = t);
    else {
      const c = t;
      let l, u;
      for (t = r[0], l = 0; l < r.length - 1; l++) u = R(this, c[i + l], e, l), u === x && (u = this._$AH[l]), n ||= !D(u) || u !== this._$AH[l], u === d ? t = d : t !== d && (t += (u ?? "") + r[l + 1]), this._$AH[l] = u;
    }
    n && !a && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class re extends et {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class ne extends et {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class oe extends et {
  constructor(t, e, i, a, r) {
    super(t, e, i, a, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = R(this, t, e, 0) ?? d) === x) return;
    const i = this._$AH, a = t === d && i !== d || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== d && (i === d || a);
    a && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class le {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    R(this, t);
  }
}
const ce = gt.litHtmlPolyfillSupport;
ce?.(V, G), (gt.litHtmlVersions ??= []).push("3.3.3");
const de = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let a = i._$litPart$;
  if (a === void 0) {
    const r = e?.renderBefore ?? null;
    i._$litPart$ = a = new G(t.insertBefore(j(), r), r, void 0, e ?? {});
  }
  return a._$AI(s), a;
};
const bt = globalThis;
let E = class extends T {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = de(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return x;
  }
};
E._$litElement$ = !0, E.finalized = !0, bt.litElementHydrateSupport?.({ LitElement: E });
const pe = bt.litElementPolyfillSupport;
pe?.({ LitElement: E });
(bt.litElementVersions ??= []).push("4.2.2");
const z = { ATTRIBUTE: 1, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, It = (s) => (...t) => ({ _$litDirective$: s, values: t });
let Bt = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
};
const he = (s) => s.strings === void 0, ue = {}, jt = (s, t = ue) => s._$AH = t;
const ot = It(class extends Bt {
  constructor(s) {
    if (super(s), s.type !== z.PROPERTY && s.type !== z.ATTRIBUTE && s.type !== z.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!he(s)) throw Error("`live` bindings can only contain a single expression");
  }
  render(s) {
    return s;
  }
  update(s, [t]) {
    if (t === x || t === d) return t;
    const e = s.element, i = s.name;
    if (s.type === z.PROPERTY) {
      if (t === e[i]) return x;
    } else if (s.type === z.BOOLEAN_ATTRIBUTE) {
      if (!!t === e.hasAttribute(i)) return x;
    } else if (s.type === z.ATTRIBUTE && e.getAttribute(i) === t + "") return x;
    return jt(s), t;
  }
});
const at = It(class extends Bt {
  constructor() {
    super(...arguments), this.key = d;
  }
  render(s, t) {
    return this.key = s, t;
  }
  update(s, [t, e]) {
    return t !== this.key && (jt(s), this.key = t), e;
  }
}), m = {
  PAUSE: 1,
  SEEK: 2,
  VOLUME_SET: 4,
  VOLUME_MUTE: 8,
  PREVIOUS_TRACK: 16,
  NEXT_TRACK: 32,
  STOP: 4096,
  PLAY: 16384
};
function Dt(s) {
  if (!s || s === "vinyl" || s === "ambient") return "minimal";
  if (s === "minimal" || s === "minimal_small" || s === "classic" || s === "cassette") return s;
  throw new Error("VinylMatrix: invalid theme.");
}
function me(s) {
  const t = s.entities ?? (s.entity ? [s.entity] : []);
  if (!Array.isArray(t) || t.length === 0 || t.some((i) => typeof i != "string" || !/^media_player\.[a-z0-9_]+$/.test(i)))
    throw new Error("VinylMatrix: configure at least one media_player in entities.");
  const e = Dt(s.theme);
  if (s.color_mode && !["auto", "light", "dark"].includes(s.color_mode)) throw new Error("VinylMatrix: invalid color_mode.");
  if (s.language && !["auto", "en", "it"].includes(s.language)) throw new Error("VinylMatrix: invalid language.");
  if (s.name !== void 0 && typeof s.name != "string") throw new Error("VinylMatrix: name must be text.");
  if (s.show_playlists !== void 0 && typeof s.show_playlists != "boolean") throw new Error("VinylMatrix: show_playlists must be boolean.");
  if (s.playlist_entity !== void 0 && (typeof s.playlist_entity != "string" || !/^media_player\.[a-z0-9_]+$/.test(s.playlist_entity))) throw new Error("VinylMatrix: playlist_entity must be a media_player.");
  return { ...s, entities: [...new Set(t)], theme: e, color_mode: s.color_mode ?? "auto", language: s.language ?? "auto" };
}
function $(s) {
  return !!s && !["unavailable", "unknown"].includes(s.state);
}
function Vt(s) {
  return $(s) && !["off", "standby"].includes(s.state);
}
function ge(s, t, e) {
  const i = s.filter((a) => t[a]?.state === "playing");
  return e && i.includes(e) ? e : i.length ? i[0] : e && s.includes(e) && $(t[e]) ? e : s.find((a) => $(t[a])) ?? s[0];
}
function v(s, t) {
  const e = s?.attributes.supported_features;
  return Vt(s) && typeof e == "number" && (e & t) === t;
}
function B(s) {
  return typeof s == "number" && Number.isFinite(s) ? s : void 0;
}
function w(s) {
  return typeof s == "string" ? s : "";
}
function O(s) {
  const t = B(s?.attributes.media_duration);
  return t !== void 0 && t > 0 ? t : void 0;
}
function U(s, t = Date.now()) {
  const e = B(s?.attributes.media_position);
  if (e === void 0) return;
  const i = Date.parse(w(s?.attributes.media_position_updated_at)), a = s?.state === "playing" && Number.isFinite(i) ? Math.max(0, (t - i) / 1e3) : 0;
  return Math.max(0, Math.min(e + a, O(s) ?? 1 / 0));
}
function fe(s, t = Date.now()) {
  const e = O(s), i = U(s, t);
  return e === void 0 || i === void 0 ? void 0 : Math.min(1, i / e);
}
function rt(s) {
  return JSON.stringify([s?.attributes.media_content_id, s?.attributes.media_title, s?.attributes.media_artist, s?.attributes.media_duration]);
}
function zt(s) {
  return v(s, m.SEEK) && O(s) !== void 0 && U(s) !== void 0;
}
function Z(s) {
  if (s === void 0 || !Number.isFinite(s)) return "—:—";
  const t = Math.max(0, Math.floor(s)), e = Math.floor(t / 3600);
  return `${e ? `${e}:` : ""}${String(Math.floor(t / 60) % 60).padStart(e ? 2 : 1, "0")}:${String(t % 60).padStart(2, "0")}`;
}
function be(s) {
  if (Vt(s)) {
    if (s.state === "playing") {
      if (v(s, m.PAUSE)) return { service: "media_pause", feature: m.PAUSE, icon: "pause" };
      if (v(s, m.STOP)) return { service: "media_stop", feature: m.STOP, icon: "stop" };
    } else if (v(s, m.PLAY)) return { service: "media_play", feature: m.PLAY, icon: "play" };
  }
}
function lt(s, t = (e) => e) {
  if (typeof s != "string" || !s.trim()) return;
  const e = s.trim();
  if (/^https?:\/\//i.test(e)) return e;
  if (e.startsWith("/") && !e.startsWith("//") && !e.includes("\\")) return t(e);
}
const ye = {
  playlists: "Playlists",
  playlistPlayer: "Play on",
  playlistSearch: "Search playlists",
  playlistLoading: "Loading playlists…",
  playlistStarting: "Sending playback request…",
  playlistStarted: "Playback request sent.",
  playlistReplace: "Select a playlist to play now and replace this player’s queue.",
  playlistEmpty: "No playlists found in this Music Assistant library.",
  loadMore: "Load more",
  retry: "Retry",
  playlistConnectError: "Could not connect to Music Assistant. Check its integration and your Home Assistant permissions.",
  playlistNoTarget: "Add a Music Assistant player to the card or choose a playlist player in the card settings.",
  playlistLoadError: "Could not load playlists. Check Music Assistant and try again.",
  playlistPlayError: "Playback could not be confirmed. Check the player before trying again.",
  showPlaylists: "Music Assistant playlist button",
  enabled: "Enabled when Music Assistant is available",
  disabled: "Hidden",
  playlistTarget: "Preferred playlist player",
  playlistAuto: "Automatic · active Music Assistant player first",
  recordSpeed: "Record animation speed",
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
  minimal: "Minimal",
  minimal_small: "Minimal Small",
  classic: "Classic",
  cassette: "Cassette",
  searchPlayers: "Search media players",
  choosePlayer: "Choose a media player",
  noPlayers: "No matching media players",
  hint: "The playing player is selected automatically. Order determines priority when the card first opens."
}, ve = {
  playlists: "Playlist",
  playlistPlayer: "Riproduci su",
  playlistSearch: "Cerca playlist",
  playlistLoading: "Caricamento playlist…",
  playlistStarting: "Invio richiesta di riproduzione…",
  playlistStarted: "Richiesta di riproduzione inviata.",
  playlistReplace: "Seleziona una playlist per riprodurla subito e sostituire la coda di questo lettore.",
  playlistEmpty: "Nessuna playlist trovata nella libreria di Music Assistant.",
  loadMore: "Carica altre",
  retry: "Riprova",
  playlistConnectError: "Connessione a Music Assistant non riuscita. Controlla l’integrazione e i tuoi permessi in Home Assistant.",
  playlistNoTarget: "Aggiungi alla card un lettore Music Assistant oppure scegli il lettore playlist nelle impostazioni della card.",
  playlistLoadError: "Impossibile caricare le playlist. Controlla Music Assistant e riprova.",
  playlistPlayError: "Riproduzione non confermata. Controlla il lettore prima di riprovare.",
  showPlaylists: "Pulsante playlist Music Assistant",
  enabled: "Attivo quando Music Assistant è disponibile",
  disabled: "Nascosto",
  playlistTarget: "Lettore preferito per le playlist",
  playlistAuto: "Automatico · prima il lettore Music Assistant attivo",
  recordSpeed: "Velocità animazione disco",
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
  minimal: "Minimal",
  minimal_small: "Minimal Small",
  classic: "Classic",
  cassette: "Cassette",
  searchPlayers: "Cerca lettori multimediali",
  choosePlayer: "Scegli un lettore multimediale",
  noPlayers: "Nessun lettore corrispondente",
  hint: "Viene selezionato automaticamente il lettore in riproduzione. L’ordine determina la priorità all’apertura della card."
};
function S(s, t) {
  return (s?.language && s.language !== "auto" ? s.language : t?.locale?.language ?? t?.language ?? "en").toLowerCase().startsWith("it") ? ve : ye;
}
function P(s) {
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
  return f`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d=${t[s] ?? t.play}/></svg>`;
}
function xe() {
  return f`<svg class="tonearm reference-arm" viewBox="0 0 1000 837" aria-hidden="true">
    <defs>
      <linearGradient id="vm-metal" x1="0" x2="1"><stop stop-color="#1b1b1b"/><stop offset=".24" stop-color="#747474"/><stop offset=".46" stop-color="#ededeb"/><stop offset=".65" stop-color="#939392"/><stop offset="1" stop-color="#292929"/></linearGradient>
      <linearGradient id="vm-head" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#353535"/><stop offset="1" stop-color="#101010"/></linearGradient>
      <radialGradient id="vm-pivot"><stop stop-color="#6f706e"/><stop offset=".62" stop-color="#484947"/><stop offset="1" stop-color="#202120"/></radialGradient>
    </defs>
    <g class="reference-rest"><path d="M889 578h24m-12-12v28"/></g>
    <g class="arm-moving">
      <path d="M870 68 856 194 828 532Q823 603 802 633L776 660" fill="none" stroke="#0008" stroke-width="14" transform="translate(3 3)"/>
      <path d="M870 68 856 194 828 532Q823 603 802 633L776 660" fill="none" stroke="#414141" stroke-width="10"/>
      <path d="M868 68 854 194 826 532Q821 601 800 632L774 658" fill="none" stroke="#c4c4c2" stroke-width="5"/>
      <path d="M867 68 853 194 825 532Q820 601 799 632L773 658" fill="none" stroke="#fff9" stroke-width="1.5"/>
      <rect x="839" y="93" width="53" height="42" rx="2" fill="url(#vm-metal)" stroke="#222" stroke-width="2" transform="rotate(6 865 114)"/>
      <circle cx="856" cy="194" r="29" fill="#111" stroke="#41413e" stroke-width="3"/>
      <circle cx="856" cy="194" r="17" fill="url(#vm-pivot)" stroke="#bfc0bb" stroke-width="2.5"/>
      <g transform="translate(774 659) rotate(39)">
        <path class="stylus" d="M0 44v20" stroke="#93938e" stroke-width="2"/>
        <rect x="-19" y="-8" width="38" height="65" rx="12" fill="url(#vm-head)" stroke="#141414" stroke-width="2"/>
        <circle cx="0" cy="32" r="7" fill="#181818" stroke="#d3d5cf" stroke-width="2"/>
      </g>
    </g>
  </svg>`;
}
const $e = C`
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
  .backdrop { position:absolute; z-index:-2; inset:-35px; width:calc(100% + 70px); height:calc(100% + 70px); object-fit:cover; filter:blur(30px) saturate(.35); opacity:.27; pointer-events:none; }
  vinylmatrix-playlists { grid-column:1 / -1; margin-top:8px; }
  .minimal vinylmatrix-playlists { margin:8px 10% 0; }
  .classic vinylmatrix-playlists,.cassette vinylmatrix-playlists { margin:0 4% 16px; }
  .stage { display:grid; grid-template-columns:minmax(0,1fr); align-items:stretch; gap:2px; }
  .deck { position:relative; min-width:0; aspect-ratio:320 / 300; }
  .record { position:absolute; z-index:0; width:82%; aspect-ratio:1; left:1%; top:8%; border-radius:50%; background:var(--disc);
    box-shadow:0 2px 5px #0003,inset 0 0 0 1px #8885; overflow:hidden; }
  .record::after { content:""; position:absolute; inset:1%; border-radius:50%; pointer-events:none;
    background:repeating-radial-gradient(circle at center,transparent 0 2px,#ffffff08 2.3px 2.7px),conic-gradient(from 35deg,transparent,#ffffff12 12%,transparent 26%,transparent 45%,#ffffff0c 62%,transparent 77%); }
  .rotor { position:absolute; inset:0; border-radius:50%; animation:spin var(--record-period,12s) linear infinite; animation-play-state:paused; }
  .playing .rotor { animation-play-state:running; }
  .cover { position:absolute; z-index:1; inset:12%; border-radius:50%; overflow:hidden;
    background:radial-gradient(circle at 25% 30%,#bcb5a4,transparent 60%),linear-gradient(145deg,#8d928b,#343d3a); box-shadow:0 0 0 1px #ffffff15; }
  .cover img { width:100%; height:100%; object-fit:cover; display:block; }
  .fallback { width:100%; height:100%; display:grid; place-items:center; color:#f1efdfb3; font-size:clamp(24px,14cqi,80px); font-weight:200; }
  .spindle { position:absolute; z-index:3; left:50%; top:50%; width:9px; height:9px; border-radius:50%; transform:translate(-50%,-50%); background:linear-gradient(135deg,#eceee9,#808786); box-shadow:0 1px 2px #0007; }
  .tonearm { position:absolute; z-index:1; inset:0; width:100%; height:100%; overflow:visible; pointer-events:none; }
  .arm-moving { transform-origin:260px 44px; transform:rotate(-4deg); transition:transform 900ms cubic-bezier(.4,0,.2,1); }
  .playing .arm-moving { transform:rotate(14deg); }
  .shaft { stroke:var(--arm); stroke-width:4; fill:none; stroke-linecap:round; }
  .shaft-shadow { stroke:#0004; stroke-width:6; fill:none; transform:translate(1px,1px); }
  .pivot-outer { fill:#292c2b; stroke:#555b59; stroke-width:1; }
  .pivot { fill:#818582; stroke:#d1d4cc; stroke-width:1; }
  .weight { fill:#8f9490; stroke:#c8ccc4; stroke-width:.5; }
  .cartridge { fill:#282d2a; stroke:#666e67; stroke-width:.5; }
  .needle,.arm-rest { stroke:#888e86; stroke-width:2; fill:none; }
  .screw { fill:none; stroke:#b9c1b6; stroke-width:1; }
  .meta { min-width:0; margin:9px 0 8px; }
  .title { margin:0; font-size:clamp(16px,5.2cqi,23px); line-height:1.3; letter-spacing:-.025em; font-weight:550; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
  .artist { margin:4px 0 0; font-size:clamp(12px,3.7cqi,15px); line-height:1.4; color:var(--muted); overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
  .player { margin:0; font-size:10px; letter-spacing:.025em; color:var(--muted); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .player .dot { display:inline-block; width:4px; height:4px; border-radius:50%; background:currentColor; margin:0 5px 2px 0; }
  .horizontal { margin-top:12px; }
  .times { display:flex; justify-content:space-between; font-size:10px; color:var(--muted); font-variant-numeric:tabular-nums; margin-top:-3px; }
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
`, we = C`
  .card.minimal {
    --surface:#dedbd6; --ink:#292827; --muted:#615e5a; --line:#57534d55;
    padding:0 0 8.7cqi; border:0;
    background:radial-gradient(ellipse at 23% 14%,#eeeae244,transparent 60%),linear-gradient(145deg,#dedbd6,#bcb8b1);
  }
  .card.minimal.dark {
    --surface:#343230; --ink:#f3f2ef; --muted:#c1beba; --line:#c6c3bf66;
    --button:#f0efec; --button-ink:#30302f;
    background:radial-gradient(ellipse at 23% 12%,#8d877c55,transparent 63%),linear-gradient(145deg,#494640,#2c2b2a);
  }
  .minimal .backdrop { opacity:.22; filter:blur(4cqi) saturate(.08); inset:-8%; width:116%; height:116%; }
  .minimal::after { content:""; position:absolute; z-index:-1; inset:0; pointer-events:none; background:linear-gradient(180deg,transparent 48%,var(--surface) 100%); opacity:.55; }
  /* WebKit can collapse an empty aspect-ratio grid item to 0 × 0. */
  .minimal .stage { display:block; }
  .minimal .deck { width:100%; height:83.7cqi; aspect-ratio:auto; }
  .minimal .record {
    left:13.8%; top:8.24%; width:72.3%; background:#080808;
    box-shadow:0 .5cqi 1.1cqi #0007,inset 0 0 0 .65cqi #080808,inset 0 0 0 .9cqi #343434;
  }
  .minimal .record::after {
    inset:1%; z-index:1;
    background:repeating-radial-gradient(circle,transparent 0 1px,#ffffff0b 1.3px,transparent 1.7px),conic-gradient(from -20deg,#0b0b0b,#353535 7%,#121212 15%,#060606 28%,#181818 41%,#333 51%,#111 61%,#070707 76%,#171717 91%,#0b0b0b);
    box-shadow:inset 0 0 .8cqi #000;
  }
  .minimal .rotor { z-index:2; }
  .minimal .cover { inset:27%; box-shadow:0 0 0 .8cqi #080808,0 0 0 .95cqi #8884; }
  .minimal .spindle { width:3%; height:3%; background:radial-gradient(circle at 35% 27%,#fff 0%,#d4d5d2 16%,#929490 35%,#444 68%,#151515 100%); box-shadow:.1cqi .3cqi .35cqi #000a; }
  .minimal .arm-moving { transform-origin:856px 194px; transform:rotate(-15deg); filter:drop-shadow(.2cqi .3cqi .25cqi #0006); }
  /* Sweep the stylus from the outer grooves to just outside the artwork. */
  .minimal.playing .arm-moving { transform:rotate(calc(3deg + 19deg * var(--arm-progress,.35))); transition:transform 1s linear; }
  .reference-rest { fill:none; stroke:#8d8d8870; stroke-width:3; opacity:1; transition:opacity .3s; }
  .minimal.playing .reference-rest { opacity:0; }
  .minimal .meta { text-align:center; margin:1.6cqi 8% 0; }
  .minimal .title { font-size:clamp(16px,4.75cqi,48px); line-height:1.25; font-weight:600; letter-spacing:0; }
  .minimal .artist { font-size:clamp(12px,3.65cqi,37px); line-height:1.35; margin:.9cqi 0 0; font-weight:400; }
  .minimal .player { position:absolute; width:1px; height:1px; overflow:hidden; clip-path:inset(50%); white-space:nowrap; }
  .minimal > .horizontal { margin:.8cqi 10% 0; }
  .minimal input[type=range] { height:4cqi; min-height:22px; padding:0; }
  .minimal input[type=range]::-webkit-slider-runnable-track { height:max(2px,.65cqi); background:linear-gradient(to right,var(--ink) var(--range-fill,0%),var(--line) var(--range-fill,0%)); }
  .minimal input[type=range]::-webkit-slider-thumb { width:max(9px,2.4cqi); height:max(9px,2.4cqi); margin-top:min(-3.5px,-.875cqi); }
  .minimal input[type=range]::-moz-range-track { height:max(2px,.65cqi); background:linear-gradient(to right,var(--ink) var(--range-fill,0%),var(--line) var(--range-fill,0%)); }
  .minimal input[type=range]::-moz-range-thumb { width:max(9px,2.4cqi); height:max(9px,2.4cqi); }
  .minimal .times { font-size:clamp(10px,2.45cqi,25px); line-height:1.3; margin-top:0; }
  .minimal .transport { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); margin:1.5cqi 10% 0; gap:0; }
  .minimal .transport button { justify-self:center; width:max(32px,7cqi); height:max(32px,7cqi); padding:1.2cqi; }
  .minimal .transport button:nth-child(1) { grid-column:2; }
  .minimal .transport button svg { width:5.5cqi; height:5.5cqi; min-width:17px; min-height:17px; }
  .minimal .transport .primary { width:max(40px,11cqi); height:max(40px,11cqi); }
  .minimal .transport .primary svg { width:6.3cqi; height:6.3cqi; min-width:24px; min-height:24px; stroke-width:3.5; }
  .minimal .transport button:not(.primary) svg { fill:currentColor; }
  .minimal .transport button:last-child svg { fill:none; }
  .minimal .volume-popover { margin:3cqi 10% 0; }
  .minimal .volume-popover .horizontal { margin:0; }
  .minimal .error { margin:3cqi 10% 0; }
  @media(prefers-reduced-motion:reduce) { .minimal .arm-moving,.minimal.playing .arm-moving,.reference-rest { transition:none; } }
`, ke = C`
  .card.minimal_small {
    --surface:#dedbd6; --ink:#292827; --muted:#615e5a; --line:#57534d55;
    display:grid; grid-template-columns:minmax(0,34%) minmax(0,1fr); gap:0 14px;
    align-items:center; padding:16px;
    background:radial-gradient(ellipse at 23% 14%,#eeeae244,transparent 60%),linear-gradient(145deg,#dedbd6,#bcb8b1);
  }
  .card.minimal_small.dark {
    --surface:#343230; --ink:#f3f2ef; --muted:#c1beba; --line:#c6c3bf66;
    --button:#f0efec; --button-ink:#30302f;
    background:radial-gradient(ellipse at 23% 12%,#8d877c55,transparent 63%),linear-gradient(145deg,#494640,#2c2b2a);
  }
  .minimal_small .backdrop { opacity:.16; filter:blur(20px) saturate(.08); }
  .small-art { position:relative; min-width:0; width:100%; aspect-ratio:1.25; }
  .minimal_small .record { width:76%; left:24%; top:2.5%; background:#0c0c0c; box-shadow:0 2px 5px #0005; }
  .minimal_small .record::after { display:none; }
  .minimal_small .rotor {
    background:repeating-radial-gradient(circle,transparent 0 2px,#ffffff0b 2.3px 2.7px),conic-gradient(from -20deg,#090909,#343434 8%,#101010 19%,#080808 34%,#292929 51%,#101010 64%,#080808 80%,#090909);
  }
  .small-label { position:absolute; inset:34%; border-radius:50%; background:#b4ac9c; box-shadow:0 0 0 2px #080808; }
  .minimal_small .spindle { width:4px; height:4px; }
  .sleeve { position:absolute; z-index:4; left:0; top:2.5%; width:76%; aspect-ratio:1; overflow:hidden; border-radius:4px;
    background:linear-gradient(145deg,#8d928b,#343d3a); box-shadow:2px 2px 7px #0006,inset 0 0 0 1px #ffffff18; }
  .sleeve img { display:block; width:100%; height:100%; object-fit:cover; }
  .sleeve .fallback { font-size:clamp(24px,8cqi,60px); }
  .small-footer { min-width:0; }
  .minimal_small .meta { margin:0; }
  .minimal_small .title { font-size:clamp(13px,3.6cqi,20px); line-height:1.3; font-weight:600; letter-spacing:0; }
  .minimal_small .artist { font-size:clamp(11px,2.8cqi,14px); margin:3px 0 0; }
  .minimal_small .player { margin:3px 0 0; font-size:10px; }
  .minimal_small .horizontal { margin:5px 0 0; }
  .minimal_small input[type=range] { height:26px; }
  .minimal_small input[type=range]::-webkit-slider-runnable-track { background:linear-gradient(to right,var(--ink) var(--range-fill,0%),var(--line) var(--range-fill,0%)); }
  .minimal_small input[type=range]::-moz-range-track { background:linear-gradient(to right,var(--ink) var(--range-fill,0%),var(--line) var(--range-fill,0%)); }
  .minimal_small .times { font-size:10px; }
  .minimal_small .transport { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:0; margin:5px 0 0; }
  .minimal_small .transport button { justify-self:center; width:100%; max-width:44px; height:44px; padding:6px; }
  .minimal_small .transport .primary { width:36px; max-width:100%; height:36px; }
  .minimal_small .transport button svg { width:19px; height:19px; }
  .minimal_small .volume-popover,.minimal_small .error { grid-column:1 / -1; }
  .minimal_small .volume-popover .horizontal { margin:0; }
  @container(max-width:300px) {
    .card.minimal_small { padding:10px; column-gap:10px; grid-template-columns:minmax(0,31%) minmax(0,1fr); }
    .minimal_small .player { font-size:9px; }
    .minimal_small .transport button { padding:4px; }
  }
`, _e = C`
  .card.classic {
    --surface:#c9c9c9; --ink:#2b2b2b; --muted:#656565; --line:#39393944;
    padding:0; border:1px solid #95959566; border-radius:3.2cqi;
    background:repeating-linear-gradient(95deg,#ffffff01 0 1px,#00000001 1px 2px),linear-gradient(125deg,#e4e4e4,#c8c8c8 48%,#b6b6b6);
    box-shadow:inset 0 1px 1px #ffffff77,0 1.5cqi 3cqi #00000033;
  }
  .card.classic.dark {
    --surface:#2b2b2b; --ink:#efefef; --muted:#b2b2b2; --line:#c9c9c933;
    border-color:#8d8d8d33;
    background:repeating-linear-gradient(95deg,#ffffff01 0 1px,#00000002 1px 2px),linear-gradient(120deg,#3c3c3c,#2a2a2a 58%,#252525);
  }
  /* Keep the deck sized even when WebKit lays out an empty grid item. */
  .classic .stage { display:block; }
  .classic .deck { width:100%; height:58.6cqi; aspect-ratio:auto; }
  .classic .platter-rim { position:absolute; left:13.5%; top:1.29cqi; width:56.2%; height:auto; aspect-ratio:1; filter:drop-shadow(.2cqi .5cqi .45cqi #000000aa); }
  .classic .record {
    width:51.4%; left:15.9%; top:3.69cqi; background:#0a0a0a; border:0; outline:0;
    box-shadow:inset 0 0 0 .15cqi #070707,inset 0 0 0 .4cqi #242424;
  }
  .classic .record::after {
    inset:.6%; z-index:1;
    background:repeating-radial-gradient(circle,transparent 0 1px,#ffffff05 1.3px,transparent 1.8px),conic-gradient(from -25deg,#080808,#363636 7%,#181818 17%,#080808 30%,#1a1a1a 43%,#323232 53%,#141414 63%,#090909 78%,#171717 92%,#080808);
  }
  .classic .rotor { z-index:2; animation-duration:var(--record-period); }
  .classic .cover { inset:32.5%; box-shadow:0 0 0 .15cqi #99999999,0 0 0 .9cqi #0a0a0a; }
  .classic .spindle { width:2.8%; height:2.8%; background:radial-gradient(circle at 34% 27%,#ffffff,#c9c9c9 20%,#737373 42%,#282828 80%); box-shadow:.12cqi .25cqi .35cqi #000000cc; }
  .classic .arm-moving { transform-origin:814px 120px; transform:rotate(-31deg); transition:transform 1.2s cubic-bezier(.4,0,.2,1); }
  /* The S arm needs a shorter sweep than Minimal to stay outside its label. */
  .classic.playing .arm-moving { transform:rotate(calc(-6deg + 17deg * var(--arm-progress,.35))); transition:transform 1s linear; }
  .classic .classic-arm { height:58.6cqi; filter:drop-shadow(.15cqi .35cqi .3cqi #00000077); }
  .classic .deck-buttons { position:absolute; left:3.8%; bottom:3.4cqi; display:flex; align-items:end; gap:2.1cqi; }
  .classic .start-stop {
    width:max(32px,8cqi); height:max(34px,8.2cqi); padding:0; border-radius:.6cqi; border:.25cqi solid #090909;
    color:#242424; background:repeating-linear-gradient(0deg,#ffffff06 0 1px,#00000006 1px 2px),linear-gradient(115deg,#d9d9d9,#8d8d8d);
    box-shadow:inset 0 0 0 .15cqi #e6e6e6,inset 0 0 .6cqi #00000088,0 .3cqi .3cqi #00000077;
    font-size:clamp(7px,1.1cqi,15px); line-height:1.35; letter-spacing:.04em;
  }
  .classic .start-stop:hover:enabled { filter:brightness(1.1); background-color:#b7b7b7; }
  .classic .speed-buttons { display:flex; gap:.8cqi; }
  .classic .speed-buttons button {
    position:relative; width:max(23px,4.6cqi); height:max(24px,3.7cqi); padding:.7cqi; border-radius:.35cqi; border:1px solid #161616;
    color:#cbcbcb; background:linear-gradient(135deg,#3d3d3d,#232323); box-shadow:inset 0 1px 1px #8b8b8b77,0 .12cqi .25cqi #00000088;
    font-size:clamp(9px,1.2cqi,16px);
  }
  .classic .speed-buttons button[aria-pressed=true] { color:#f0f0f0; }
  .classic .speed-buttons button[aria-pressed=true]::before { content:""; position:absolute; top:.5cqi; left:32%; width:36%; height:.3cqi; min-height:1px; border-radius:2px; background:#f2f2f2; box-shadow:0 0 .45cqi #e9e9e9; }
  .classic .classic-volume { position:absolute; left:90%; top:42%; width:6.5%; height:45%; display:flex; flex-direction:column; align-items:center; gap:1.4cqi; }
  .classic-volume > span { color:var(--muted); font-size:clamp(7px,1.05cqi,15px); letter-spacing:.1em; text-transform:uppercase; }
  .classic-volume .vertical { position:relative; width:100%; min-height:0; }
  .classic-volume .vertical > svg,.classic-volume output { display:none; }
  .classic-volume .vertical::after { content:""; position:absolute; right:7%; top:8%; width:1cqi; height:84%; background:repeating-linear-gradient(to bottom,var(--muted) 0 1px,transparent 1px 2.4cqi); pointer-events:none; }
  .classic-volume input[type=range] { width:100%; min-width:0; max-width:100%; padding:0; }
  .classic-volume input[type=range]::-webkit-slider-runnable-track { width:.7cqi; min-width:3px; border-radius:5px; background:#0a0a0a; box-shadow:1px 0 1px #a1a1a177,inset 1px 0 1px #000000; }
  .classic-volume input[type=range]::-webkit-slider-thumb { width:max(10px,2.3cqi); height:max(14px,3.3cqi); margin-left:calc((.7cqi - max(10px,2.3cqi))/2); border:1px solid #dcdcdc; border-radius:.2cqi; background:repeating-linear-gradient(0deg,#ffffff11 0 1px,#00000011 1px 2px),linear-gradient(110deg,#d3d3d3,#7f7f7f); box-shadow:0 .3cqi .35cqi #000000aa; }
  .classic-volume input[type=range]::-moz-range-track { width:.7cqi; background:#0a0a0a; }
  .classic-volume input[type=range]::-moz-range-thumb { width:max(10px,2.3cqi); height:max(14px,3.3cqi); border:1px solid #dcdcdc; border-radius:.2cqi; background:linear-gradient(110deg,#d3d3d3,#7f7f7f); }
  .classic .classic-footer { display:grid; grid-template-columns:24% minmax(0,1fr) 23%; grid-template-rows:auto auto; column-gap:2.2cqi; align-items:center; min-height:16.4cqi; padding:3cqi 3.8cqi; border-top:1px solid #12121277; box-shadow:inset 0 1px 0 #efefef11; background:linear-gradient(120deg,#ffffff03,#00000013); }
  .classic .meta { grid-column:1; grid-row:1; margin:0; }
  .classic .title { font-size:clamp(15px,2.45cqi,34px); font-weight:450; letter-spacing:0; line-height:1.3; }
  .classic .artist { font-size:clamp(11px,1.8cqi,25px); margin:.45cqi 0 0; }
  .classic .player { grid-column:1; grid-row:2; font-size:clamp(9px,1.4cqi,19px); margin:.9cqi 0 0; }
  .classic-footer > .horizontal { grid-column:2; grid-row:1 / 3; position:relative; margin:0; padding:0 5.4cqi; }
  .classic-footer .times { position:absolute; inset:0; align-items:center; font-size:clamp(9px,1.3cqi,18px); margin:0; pointer-events:none; }
  .classic-footer input[type=range] { height:3cqi; min-height:26px; padding:0; }
  .classic-footer input[type=range]::-webkit-slider-runnable-track { height:.45cqi; min-height:2px; background:linear-gradient(to right,var(--muted) var(--range-fill,0%),var(--line) var(--range-fill,0%)); }
  .classic-footer input[type=range]::-webkit-slider-thumb { width:max(8px,1.25cqi); height:max(8px,1.25cqi); margin-top:min(-3px,-.4cqi); background:var(--muted); }
  .classic-footer input[type=range]::-moz-range-track { height:.45cqi; background:linear-gradient(to right,var(--muted) var(--range-fill,0%),var(--line) var(--range-fill,0%)); }
  .classic .transport { grid-column:3; grid-row:1 / 3; margin:0; display:flex; justify-content:space-between; gap:1.2cqi; }
  .classic .transport button { width:max(28px,5cqi); height:max(28px,5cqi); padding:1.2cqi; }
  .classic .transport button svg { width:max(17px,3cqi); height:max(17px,3cqi); fill:currentColor; }
  .classic .transport .primary { width:max(38px,7.6cqi); height:max(38px,7.6cqi); border:1px solid var(--line); border-radius:50%; color:var(--ink); background:transparent; }
  .classic .transport .primary svg { fill:none; stroke-width:3; width:max(22px,3.8cqi); height:max(22px,3.8cqi); }
  .classic .error { margin:0 3.8cqi 3cqi; }
  @container(max-width:600px) {
    .classic .deck { aspect-ratio:auto; height:calc(58.6cqi + 32px); }
    .classic .classic-footer { grid-template-columns:minmax(0,1fr) auto; grid-template-rows:auto auto auto; gap:0 8px; padding:14px 4%; }
    .classic .transport { grid-column:2; grid-row:1 / 3; }
    .classic-footer > .horizontal { grid-column:1 / 3; grid-row:3; margin-top:8px; padding:0 34px; }
    .classic .classic-volume { width:8%; left:89%; gap:4px; }
  }
  @media(prefers-reduced-motion:reduce) { .classic .arm-moving,.classic.playing .arm-moving { transition:none; } }
`;
function Ae() {
  return f`<svg class="platter-rim" viewBox="0 0 100 100" aria-hidden="true">
    <defs><linearGradient id="vm-rim" x2=".8" y2="1"><stop stop-color="#b3b3b3"/><stop offset=".3" stop-color="#4a4a4a"/><stop offset=".58" stop-color="#a7a7a7"/><stop offset="1" stop-color="#404040"/></linearGradient></defs>
    <circle cx="50" cy="50" r="49.7" fill="#181818" stroke="#090909" stroke-width=".6"/>
    <circle cx="50" cy="50" r="49.2" fill="none" stroke="url(#vm-rim)" stroke-width=".4"/>
    ${[48.5, 47.6, 46.7].map((s, t) => f`<circle cx="50" cy="50" r=${s} fill="none" stroke="url(#vm-rim)" stroke-width=${0.42 - t * 0.05} stroke-dasharray=${`.01 ${1.75 - t * 0.035}`} stroke-linecap="round"/>`)}
    <circle cx="50" cy="50" r="45.7" fill="#111111" stroke="url(#vm-rim)" stroke-width=".35"/>
  </svg>`;
}
function qe() {
  return f`<svg class="tonearm classic-arm" viewBox="0 0 1000 586" aria-hidden="true">
    <defs>
      <linearGradient id="vm-classic-metal"><stop stop-color="#323232"/><stop offset=".22" stop-color="#9a9a9a"/><stop offset=".42" stop-color="#f1f1f1"/><stop offset=".56" stop-color="#c1c1c1"/><stop offset=".85" stop-color="#676767"/><stop offset="1" stop-color="#333333"/></linearGradient>
      <radialGradient id="vm-classic-base"><stop stop-color="#434343"/><stop offset=".7" stop-color="#2a2a2a"/><stop offset="1" stop-color="#181818"/></radialGradient>
      <linearGradient id="vm-classic-head" x2=".4" y2="1"><stop stop-color="#414141"/><stop offset="1" stop-color="#191919"/></linearGradient>
    </defs>
    <g class="arm-base">
      <circle cx="815" cy="129" r="75" fill="url(#vm-classic-base)" stroke="#111111" stroke-width="3"/>
      <circle cx="815" cy="126" r="73" fill="none" stroke="#7b7b7b77" stroke-width="1.2"/>
      <circle cx="815" cy="121" r="42" fill="url(#vm-classic-base)" stroke="#101010" stroke-width="3"/>
      <path d="M787 91a42 42 0 0 1 64 3" fill="none" stroke="#a1a1a166" stroke-width="1"/>
      <path d="M814 162v35m5-14v39h18" fill="none" stroke="#111111" stroke-width="10" stroke-linecap="round"/>
      <path d="M813 164v29m4-9v36h19" fill="none" stroke="#565656" stroke-width="3" stroke-linecap="round"/>
      <circle cx="867" cy="145" r="14" fill="#161616" stroke="#414141" stroke-width="2"/>
      <circle cx="867" cy="145" r="11" fill="#313131"/>
    </g>
    <g class="arm-moving">
      <path d="M860 46 814 120C774 178 779 237 743 298S663 365 625 386" fill="none" stroke="#00000088" stroke-width="18" transform="translate(3 5)"/>
      <path d="M860 46 814 120C774 178 779 237 743 298S663 365 625 386" fill="none" stroke="#404040" stroke-width="14"/>
      <path d="M859 45 813 119C773 177 778 236 742 297S662 364 624 385" fill="none" stroke="#989898" stroke-width="10"/>
      <path d="M857 44 811 118C771 176 776 235 740 296S660 363 622 384" fill="none" stroke="#d7d7d7" stroke-width="5"/>
      <path d="M856 43 810 117C770 175 775 234 739 295S659 362 621 383" fill="none" stroke="#ffffff88" stroke-width="1.7"/>
      <g transform="translate(860 44) rotate(33)">
        <rect x="-18" y="-25" width="36" height="48" rx="8" fill="url(#vm-classic-metal)" stroke="#777777" stroke-width="1"/>
        <ellipse cy="23" rx="18" ry="5" fill="#171717" stroke="#676767"/>
        <path d="M-12 28h24m-24 4h24m-24 4h24" stroke="#0f0f0f" stroke-width="3"/>
      </g>
      <g transform="translate(814 110) rotate(33)"><rect x="-20" y="-17" width="40" height="33" rx="5" fill="url(#vm-classic-metal)" stroke="#6b6b6b"/><ellipse cy="16" rx="19" ry="5" fill="#252525"/><circle cy="16" r="6" fill="#b1b1b1"/></g>
      <g transform="translate(625 386) rotate(58)">
        <rect x="-12" y="-15" width="24" height="24" rx="2" fill="url(#vm-classic-metal)" stroke="#686868"/>
        <path d="M-13-12h26m-26 4h26m-26 4h26" stroke="#d6d6d688"/>
        <path d="M-16 59v17h32V59" fill="#b8b8b8" stroke="#414141"/>
        <rect x="-20" y="5" width="40" height="66" rx="4" fill="url(#vm-classic-head)" stroke="#747474" stroke-width="1"/>
        ${[14, 28].map((s) => [-9, 9].map((t) => f`<circle cx=${t} cy=${s} r="4.6" fill="#101010" stroke="#545454" stroke-width=".8"/>`))}
        <path d="M-10 47v8m20-8v8" stroke="#b8b8b8" stroke-width="3" stroke-linecap="round"/>
        <path d="M19 47h31v8H21" fill="#1e1e1e" stroke="#595959"/>
        <path class="stylus" d="M0 76v8" stroke="#b6b6b6" stroke-width="1.5"/>
      </g>
    </g>
  </svg>`;
}
function Ee() {
  return f`<svg class="cassette-mechanism" viewBox="0 0 1000 510" aria-hidden="true">
    <defs><linearGradient id="vm-cassette-gold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e3d8b3"/><stop offset=".55" stop-color="#cfc194"/><stop offset="1" stop-color="#baaa7d"/></linearGradient></defs>
    <rect class="shell-glass" x="12" y="12" width="976" height="486" rx="24"/>
    <g class="shell-lines" fill="none" stroke-width="2">
      <path d="M24 76h60l28-28h776l28 28h60M24 438h44l26 42h812l26-42h44M90 48v-24m820 24v-24M500 24v330M110 98v185H74v76m816-261v185h36v76M400 348h200v38H400z"/>
      <path d="M144 54v-30m712 30v-30M55 120v90h22v76H54v84m891-250v90h-22v76h23v84M270 478v-24h36v24m388 0v-24h36v24"/>
      <circle cx="500" cy="73" r="16"/><circle cx="445" cy="73" r="12"/><circle cx="555" cy="73" r="12"/>
    </g>
    ${[300, 700].map((s, t) => f`<g transform=${`translate(${s} 215)`}>
      <circle class="tape-pack" r="168"/>
      <circle class="reel-rim" r="163"/>
      <g class="reel-spin" style=${`animation-delay:${t ? "-1.8s" : "0s"}`}>
        <circle class="reel-face" r="157"/>
        ${[0, 120, 240].map((e) => f`<path class="reel-window" transform=${`rotate(${e})`} d="M-37-66-70-119A138 138 0 0 1 70-119L37-66A76 76 0 0 0-37-66Z"/>`)}
        <text class="reel-brand" x="0" y="113">iSSU</text>
        <circle class="reel-hub-ring" r="55"/><circle class="reel-hub" r="46"/>
        ${[0, 60, 120, 180, 240, 300].map((e) => f`<rect class="reel-tooth" x="-5" y="-46" width="10" height="9" rx="1" transform=${`rotate(${e})`}/> `)}
      </g>
      <circle class="reel-axle" r="9"/>
    </g>`)}
    <g class="shell-lines" fill="none" stroke-width="3">
      <circle cx="74" cy="354" r="12"/><circle cx="926" cy="354" r="12"/>
      <path d="M357 478v-62m286 62v-62"/>
    </g>
    <g class="cassette-heads">
      <path class="head-carriage" d="M350 446h300v32H350z"/>
      <path class="head-metal" d="M423 432h23v12h-7v40h-9v-40h-7zM554 432h23v12h-7v40h-9v-40h-7z"/>
      <rect class="read-head head-metal" x="465" y="432" width="70" height="51" rx="3"/>
      <path class="head-slot" d="M487 473h26" stroke-width="5"/>
      ${[365, 635].map((s) => f`<g><circle class="pinch-roller" cx=${s} cy="450" r="27"/><circle class="roller-axle" cx=${s} cy="450" r="10"/></g>`)}
    </g>
    <path class="cassette-tape" d="M153 282 87 395Q75 432 110 432H890Q925 432 913 395L847 282" fill="none" stroke-width="5"/>
    ${[110, 890].map((s) => f`<g><circle class="guide-roller" cx=${s} cy="405" r="27"/><circle class="roller-axle" cx=${s} cy="405" r="15"/><circle class="guide-center" cx=${s} cy="405" r="5"/></g>`)}
    ${[[38, 38], [962, 38], [38, 472], [962, 472]].map(([s, t]) => f`<g transform=${`translate(${s} ${t})`}><circle class="shell-screw" r="13"/><path class="screw-slot" d="M-6 0h12M0-6v12" stroke-width="4"/></g>`)}
  </svg>`;
}
const Se = C`
  .card.cassette {
    --surface:#eeeae2; --ink:#181d20; --muted:#434b50; --line:#414d5766;
    --shell-glass:#98a6af14; --shell-line:#53657080; --hub:#20262a;
    --head-face:#abb4b6; --head-edge:#4d5c64; --tape:#433024;
    padding:0; border:1px solid #65727a99; border-radius:3cqi;
    background:linear-gradient(125deg,#faf7f0f5,#deded8ef);
  }
  .card.cassette.dark {
    --surface:#1e252b; --ink:#faf8f2; --muted:#d0d4d4; --line:#d1d9dc70;
    --shell-glass:#a7b4bf08; --shell-line:#b1c0ca65;
    --head-face:#e1e4df; --head-edge:#8d9ca3; --tape:#b18a66;
    background:linear-gradient(125deg,#252d34f2,#12191fef);
  }
  .cassette .stage { display:block; }
  .cassette .deck { width:100%; height:51cqi; aspect-ratio:auto; }
  .cassette-mechanism { display:block; width:100%; height:100%; }
  .shell-glass { fill:var(--shell-glass); stroke:var(--shell-line); stroke-width:2; }
  .shell-lines { stroke:var(--shell-line); }
  .tape-pack { fill:#252727; stroke:#52585a; stroke-width:2; }
  .reel-rim { fill:#303539; stroke:#71797c; stroke-width:2; }
  .reel-face { fill:url(#vm-cassette-gold); }
  .reel-brand { fill:#32251b; font-family:var(--primary-font-family,system-ui,sans-serif); font-size:25px; font-weight:750; letter-spacing:1px; text-anchor:middle; }
  .reel-window,.reel-hub { fill:var(--hub); }
  .reel-hub-ring { fill:#a2a9ac; stroke:#737d82; stroke-width:2; }
  .reel-tooth { fill:#9da5a8; }
  .reel-axle { fill:#aeb4b4; stroke:#d0d4d1; stroke-width:2; }
  .reel-spin { transform-box:fill-box; transform-origin:center; animation:spin 6s linear infinite; animation-play-state:paused; }
  .cassette.playing .reel-spin { animation-play-state:running; }
  .cassette-heads { transform:translateY(22px); transition:transform 550ms cubic-bezier(.4,0,.2,1); }
  .cassette.playing .cassette-heads { transform:translateY(0); }
  .head-carriage { fill:#73838e66; }
  .head-metal { fill:var(--head-face); stroke:var(--head-edge); stroke-width:2; }
  .head-slot { stroke:#606a6f; }
  .pinch-roller,.guide-roller { fill:#333a3e; stroke:#232a2e; stroke-width:3; }
  .roller-axle { fill:#acb3b5; }
  .guide-center { fill:#495257; }
  .cassette-tape { stroke:var(--tape); }
  .shell-screw { fill:#828d94; stroke:#333c42; stroke-width:3; }
  .screw-slot { stroke:#323a3f; }
  .cassette-footer { display:grid; grid-template-columns:10% minmax(0,1fr) minmax(0,1.65fr); gap:0 2.5cqi; align-items:center; padding:0 3.5cqi 2.5cqi; }
  .cassette .transport { grid-row:1; grid-column:1 / -1; display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:1cqi; margin:0 -3.5cqi 2cqi; padding:1.1cqi 8.5cqi 1.6cqi; border-bottom:1px solid var(--line); }
  .cassette .transport button { width:100%; height:max(32px,6cqi); padding:1cqi; border-radius:.65cqi; border:3px solid #232b30; background:#e0e3df; color:#172126; box-shadow:inset 0 1px 0 #ffffff70,0 1px 0 #0005; }
  .cassette .transport .primary { background:#e0e3df; color:#172126; }
  .cassette.playing .transport .primary { background:#b6c0c3; box-shadow:inset 0 2px 2px #0003; }
  .cassette .transport button:hover:enabled { background:#e1e5e3; filter:none; }
  .cassette .transport button svg { width:clamp(18px,3cqi,32px); height:clamp(18px,3cqi,32px); }
  .cassette .transport button:first-child svg,.cassette .transport button:nth-child(3) svg { fill:currentColor; }
  .cassette .album { grid-column:1; grid-row:2; aspect-ratio:1; overflow:hidden; border:1px solid var(--line); border-radius:.6cqi; background:#64716d; }
  .cassette .album img { display:block; width:100%; height:100%; object-fit:cover; }
  .cassette .album .fallback { font-size:5cqi; }
  .cassette .meta { grid-column:2; grid-row:2; margin:0; }
  .cassette .title { font-size:clamp(12px,2.45cqi,25px); line-height:1.3; }
  .cassette .artist { font-size:clamp(10px,1.7cqi,18px); margin:.5cqi 0 0; }
  .cassette .player { position:absolute; width:1px; height:1px; overflow:hidden; clip-path:inset(50%); }
  .cassette-footer > .horizontal { grid-column:3; grid-row:2; margin:0; }
  .cassette .times { font-size:clamp(9px,1.3cqi,13px); }
  .cassette input[type=range]::-webkit-slider-runnable-track { background:linear-gradient(to right,var(--ink) var(--range-fill,0%),var(--line) var(--range-fill,0%)); }
  .cassette input[type=range]::-moz-range-track { background:linear-gradient(to right,var(--ink) var(--range-fill,0%),var(--line) var(--range-fill,0%)); }
  .cassette .volume-popover,.cassette .error { margin:0 3.5cqi 2.5cqi; }
  .cassette .volume-popover .horizontal { margin:0; }
  @container(max-width:400px) {
    .cassette-footer { grid-template-columns:12% minmax(0,1fr); }
    .cassette .album { grid-row:2 / 4; align-self:start; }
    .cassette-footer > .horizontal { grid-column:2; grid-row:3; }
    .cassette .title { font-size:12px; }
    .cassette .artist { font-size:10px; }
  }
  @media(prefers-reduced-motion:reduce) {
    .cassette .reel-spin { animation:none; }
    .cassette .cassette-heads { transition:none; }
  }
`, Q = class Q extends E {
  constructor() {
    super(...arguments), this.config = { type: "custom:vinylmatrix-card", entities: [], theme: "minimal" }, this.queries = {};
  }
  connectedCallback() {
    super.connectedCallback(), customElements.get("ha-selector") || customElements.whenDefined("ha-selector").then(() => {
      this.isConnected && this.requestUpdate();
    });
  }
  setConfig(t) {
    this.config = { ...t, theme: Dt(t.theme), entities: [...t.entities ?? (t.entity ? [t.entity] : [])] };
  }
  updateConfig(t) {
    this.config = { ...this.config, ...t };
    const e = { ...this.config, entities: this.config.entities?.filter(Boolean) };
    delete e.entity, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: e }, bubbles: !0, composed: !0 }));
  }
  selectPlayer(t, e) {
    if (typeof e != "string" || e && !/^media_player\.[a-z0-9_]+$/.test(e)) return;
    const i = [...this.config.entities ?? []];
    e && i.some((a, r) => r !== t && a === e) || (i[t] = e, this.updateConfig({ entities: i }));
  }
  picker(t, e) {
    const i = S(this.config, this.hass), a = (this.config.entities ?? []).filter((c, l) => l !== e && c);
    if (customElements.get("ha-selector")) return o`<ha-selector
      .hass=${this.hass} .selector=${{ entity: { filter: { domain: "media_player" }, exclude_entities: a } }}
      .value=${t || void 0} .label=${`${i.players} ${e + 1}`} .required=${!1}
      @value-changed=${(c) => {
      c.stopPropagation(), this.selectPlayer(e, c.detail.value ?? "");
    }}></ha-selector>`;
    const r = (this.queries[e] ?? "").trim().toLocaleLowerCase(), n = Object.keys(this.hass?.states ?? {}).filter((c) => c.startsWith("media_player.") && !a.includes(c)).filter((c) => `${this.hass?.states[c].attributes.friendly_name ?? ""} ${c}`.toLocaleLowerCase().includes(r));
    return o`<div class="picker"><input type="search" aria-label=${`${i.searchPlayers} ${e + 1}`} placeholder=${i.searchPlayers} .value=${this.queries[e] ?? ""}
      @input=${(c) => {
      this.queries = { ...this.queries, [e]: c.target.value };
    }}/>
      <select aria-label=${`${i.players} ${e + 1}`} .value=${n.includes(t) ? t : ""} @change=${(c) => this.selectPlayer(e, c.target.value)}>
        <option value="" disabled>${n.length ? i.choosePlayer : i.noPlayers}</option>
        ${n.map((c) => o`<option value=${c}>${this.hass?.states[c].attributes.friendly_name ?? c} · ${c}</option>`)}
      </select></div>`;
  }
  render() {
    const t = S(this.config, this.hass), e = this.config.entities ?? [];
    return o`
      <label>${t.players}</label>
      ${e.map((i, a) => o`<div class="row">${this.picker(i, a)}<button aria-label=${`${t.remove} ${a + 1}`} @click=${() => {
      this.queries = {}, this.updateConfig({ entities: e.filter((r, n) => n !== a) });
    }}>×</button></div>`)}
      <button @click=${() => {
      this.config = { ...this.config, entities: [...e, ""] };
    }}>+ ${t.add}</button><p>${t.hint}</p>
      <label for="name">${t.name}</label><input id="name" .value=${this.config.name ?? ""} @change=${(i) => this.updateConfig({ name: i.target.value })}/>
      <label for="theme">${t.theme}</label><select id="theme" .value=${this.config.theme ?? "minimal"} @change=${(i) => this.updateConfig({ theme: i.target.value })}>${["minimal", "minimal_small", "classic", "cassette"].map((i) => o`<option value=${i}>${t[i]}</option>`)}</select>
      <label for="color">${t.color}</label><select id="color" .value=${this.config.color_mode ?? "auto"} @change=${(i) => this.updateConfig({ color_mode: i.target.value })}>${["auto", "light", "dark"].map((i) => o`<option value=${i}>${t[i]}</option>`)}</select>
      <label for="show-playlists">${t.showPlaylists}</label><select id="show-playlists" .value=${String(this.config.show_playlists !== !1)} @change=${(i) => this.updateConfig({ show_playlists: i.target.value === "true" })}><option value="true">${t.enabled}</option><option value="false">${t.disabled}</option></select>
      ${this.config.show_playlists !== !1 ? o`<label>${t.playlistTarget}</label><p>${t.playlistAuto}</p>${customElements.get("ha-selector") ? o`<ha-selector .hass=${this.hass} .selector=${{ entity: { filter: { domain: "media_player", integration: "music_assistant" } } }} .value=${this.config.playlist_entity} .label=${t.playlistTarget} .required=${!1} @value-changed=${(i) => {
      i.stopPropagation();
      const a = i.detail.value;
      (!a || typeof a == "string" && /^media_player\.[a-z0-9_]+$/.test(a)) && this.updateConfig({ playlist_entity: a || void 0 });
    }}></ha-selector>` : o`<select aria-label=${t.playlistTarget} .value=${this.config.playlist_entity ?? ""} @change=${(i) => this.updateConfig({ playlist_entity: i.target.value || void 0 })}><option value="">${t.playlistAuto}</option>${Object.keys(this.hass?.states ?? {}).filter((i) => i.startsWith("media_player.")).map((i) => o`<option value=${i}>${this.hass?.states[i].attributes.friendly_name ?? i} · ${i}</option>`)}</select>`}` : d}
      <label for="language">${t.language}</label><select id="language" .value=${this.config.language ?? "auto"} @change=${(i) => this.updateConfig({ language: i.target.value })}><option value="auto">${t.auto}</option><option value="en">English</option><option value="it">Italiano</option></select>
    `;
  }
};
Q.properties = { hass: { attribute: !1 }, config: { state: !0 }, queries: { state: !0 } }, Q.styles = C`
    :host { display:block; color:var(--primary-text-color); font-family:var(--primary-font-family,system-ui); }
    * { box-sizing:border-box; } label { display:block; font-size:14px; margin:16px 0 6px; }
    input,select { font:inherit; padding:10px; width:100%; min-width:0; color:var(--primary-text-color); background:var(--card-background-color,#fff); border:1px solid var(--divider-color,#888); border-radius:6px; }
    .row { display:flex; align-items:start; gap:8px; margin-bottom:12px; } .picker,ha-selector { display:block; flex:1; min-width:0; }
    .picker input { margin-bottom:6px; } .row button { flex-shrink:0; }
    button { cursor:pointer; padding:8px 12px; border-radius:6px; border:1px solid var(--divider-color,#888); background:var(--card-background-color,#fff); color:var(--primary-text-color); }
    p { font-size:13px; color:var(--secondary-text-color,#888); line-height:1.5; }
  `;
let ct = Q;
customElements.get("vinylmatrix-card-editor") || customElements.define("vinylmatrix-card-editor", ct);
const yt = 25;
function Me(s) {
  return !!s?.services?.music_assistant;
}
function Ce(s, t, e) {
  if (!Array.isArray(s)) throw Error("Invalid entity registry response");
  return [.../* @__PURE__ */ new Set([...t, ...e ? [e] : []])].flatMap((i) => {
    const a = s.find((r) => r?.entity_id === i && r.platform === "music_assistant" && !r.disabled_by);
    return a && typeof a.config_entry_id == "string" && a.config_entry_id ? [{ entity: i, entry: a.config_entry_id }] : [];
  });
}
function ze(s, t, e, i) {
  return i ? s.some((a) => a.entity === i) ? i : "" : s.find((a) => a.entity === e && $(t.states[a.entity]))?.entity ?? s.find((a) => $(t.states[a.entity]))?.entity ?? s[0]?.entity ?? "";
}
function Pe(s) {
  const t = s?.response;
  if (!Array.isArray(t?.items)) throw Error("Invalid Music Assistant library response");
  const e = [];
  for (const i of t.items)
    !i || i.media_type !== "playlist" || !w(i.uri) || !w(i.name) || e.some((a) => a.uri === i.uri) || e.push({ uri: i.uri, name: i.name, image: w(i.image) || void 0 });
  return { items: e, more: t.items.length >= yt };
}
async function vt(s, t = 15e3) {
  let e;
  try {
    return await Promise.race([s, new Promise((i, a) => {
      e = setTimeout(() => a(Error("Music Assistant timed out")), t);
    })]);
  } finally {
    e && clearTimeout(e);
  }
}
async function Te(s, t, e, i = 0) {
  if (!s.callWS) throw Error("Home Assistant connection unavailable");
  const a = await vt(s.callWS({
    type: "call_service",
    domain: "music_assistant",
    service: "get_library",
    return_response: !0,
    service_data: { config_entry_id: t.entry, media_type: "playlist", limit: yt, offset: i, order_by: "name", ...e.trim() ? { search: e.trim() } : {} }
  }));
  return Pe(a);
}
async function Ue(s, t, e) {
  if (!$(s.states[t.entity])) throw Error("Music Assistant player unavailable");
  return vt(s.callService("music_assistant", "play_media", {
    entity_id: t.entity,
    media_id: e.uri,
    media_type: "playlist",
    enqueue: "replace"
  }));
}
const Oe = C`
  :host { display:block; min-width:0; color:var(--ink); font:inherit; }
  * { box-sizing:border-box; }
  .tools { display:flex; justify-content:flex-end; }
  button,input,select { font:inherit; color:var(--ink); min-width:0; }
  button { cursor:pointer; border:1px solid var(--line); border-radius:8px; padding:8px 12px; background:transparent; min-height:36px; }
  button:hover:enabled { background:color-mix(in srgb,var(--ink),transparent 92%); }
  button:disabled { opacity:.45; cursor:default; }
  button:focus-visible,input:focus-visible,select:focus-visible { outline:2px solid var(--ink); outline-offset:2px; }
  svg { width:18px; height:18px; flex:none; fill:none; stroke:currentColor; stroke-width:1.7; }
  .toggle { display:flex; align-items:center; gap:7px; font-size:12px; border-radius:20px; }
  :host([theme=classic]) .toggle,:host([theme=cassette]) .toggle { border-radius:4px; background:linear-gradient(#ffffff18,#00000015); box-shadow:inset 0 1px #ffffff22,0 2px 2px #0003; letter-spacing:.04em; }
  :host([theme=cassette]) .toggle { text-transform:uppercase; font-size:10px; }
  .panel { margin-top:10px; padding:12px; border:1px solid var(--line); border-radius:10px; background:var(--surface); }
  h3 { margin:0 0 12px; font-size:14px; font-weight:600; }
  label { display:block; font-size:12px; color:var(--muted); margin-bottom:5px; }
  select,input { width:100%; border:1px solid var(--line); background:var(--surface); border-radius:6px; padding:8px; min-height:36px; font-size:13px; }
  form { display:flex; gap:6px; margin-top:10px; }
  form input { flex:1; }
  form button { display:grid; place-items:center; padding:8px; min-width:36px; }
  .hint,.status { font-size:12px; line-height:1.45; color:var(--muted); margin:9px 0; overflow-wrap:anywhere; }
  .error { color:var(--ink); }
  ul { list-style:none; padding:0; margin:10px 0 0; max-height:260px; overflow:auto; overscroll-behavior:contain; scrollbar-width:thin; scrollbar-color:var(--muted) var(--surface); }
  li+li { margin-top:5px; }
  .playlist { display:flex; align-items:center; gap:10px; width:100%; text-align:left; border-radius:6px; padding:7px; }
  .art { display:grid; place-items:center; flex:none; width:34px; height:34px; border-radius:4px; overflow:hidden; background:color-mix(in srgb,var(--ink),transparent 92%); }
  .art img { width:100%; height:100%; object-fit:cover; }
  .name { flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:13px; }
  .play { width:14px; height:14px; }
  .more,.retry { margin-top:10px; font-size:12px; }
`, Pt = () => o`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h12M3 11h12M3 16h7M18 8v10"/><path d="M18 8l4 1"/><ellipse cx="15.5" cy="18" rx="2.5" ry="2"/></svg>`, J = class J extends E {
  constructor() {
    super(...arguments), this.theme = "minimal", this.open = !1, this.loading = !1, this.starting = !1, this.targets = [], this.selected = "", this.items = [], this.draft = "", this.search = "", this.more = !1, this.offset = 0, this.error = "", this.notice = "", this.generation = 0, this.failedImages = /* @__PURE__ */ new Set();
  }
  get target() {
    return this.targets.find((t) => t.entity === this.selected);
  }
  reset() {
    this.generation++, this.open = !1, this.loading = !1, this.starting = !1, this.items = [], this.error = "", this.notice = "";
  }
  willUpdate(t) {
    const e = t.get("hass");
    (t.has("config") || e && e.connection !== this.hass?.connection) && this.reset();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.reset();
  }
  async toggle() {
    if (this.open) {
      this.reset();
      return;
    }
    this.open = !0, this.draft = "", this.search = "", this.failedImages = /* @__PURE__ */ new Set(), await this.discover(), this.open && (await this.updateComplete, this.renderRoot.querySelector("input[type=search]")?.focus());
  }
  async discover() {
    const t = this.hass, e = this.config, i = ++this.generation;
    this.loading = !0, this.error = "", this.items = [], this.targets = [], this.selected = "", this.more = !1;
    try {
      if (!t?.callWS || !t.services?.music_assistant?.get_library || !t.services?.music_assistant?.play_media) throw Error("Music Assistant actions unavailable");
      const a = await vt(t.callWS({ type: "config/entity_registry/list" }));
      if (i !== this.generation || !this.open) return;
      if (this.targets = Ce(a, e?.entities ?? (e?.entity ? [e.entity] : []), e?.playlist_entity), this.selected = ze(this.targets, t, this.activeEntity, e?.playlist_entity), !this.selected) {
        this.error = "playlistNoTarget";
        return;
      }
      await this.load();
    } catch {
      i === this.generation && (this.error = "playlistConnectError");
    } finally {
      i === this.generation && (this.loading = !1);
    }
  }
  async load(t = !1) {
    const e = this.target, i = this.hass;
    if (!e || !i || this.starting) return;
    const a = ++this.generation, r = t ? this.offset + yt : 0;
    this.loading = !0, this.error = "", this.notice = "", t || (this.items = [], this.more = !1, this.offset = 0, this.search = this.draft.trim());
    try {
      const n = await Te(i, e, this.search, r);
      if (a !== this.generation || !this.open) return;
      this.items = t ? [...this.items, ...n.items.filter((c) => !this.items.some((l) => l.uri === c.uri))] : n.items, this.offset = r, this.more = n.more;
    } catch {
      a === this.generation && (this.error = "playlistLoadError");
    } finally {
      a === this.generation && (this.loading = !1);
    }
  }
  async start(t) {
    const e = this.target, i = this.hass;
    if (!e || !i || this.loading || this.starting || !$(i.states[e.entity]) || !this.items.some((r) => r.uri === t.uri)) return;
    const a = ++this.generation;
    this.starting = !0, this.error = "", this.notice = "";
    try {
      await Ue(i, e, t), a === this.generation && this.open && (this.notice = S(this.config, i).playlistStarted);
    } catch {
      a === this.generation && (this.error = "playlistPlayError");
    } finally {
      a === this.generation && (this.starting = !1);
    }
  }
  render() {
    const t = S(this.config, this.hass), e = !$(this.hass?.states[this.selected]);
    return o`<div class="tools"><button class="toggle" aria-expanded=${this.open} aria-controls="playlist-panel" @click=${this.toggle}>${Pt()}${t.playlists}</button></div>
      ${this.open ? o`<section class="panel" id="playlist-panel" role="region" aria-label=${t.playlists} @keydown=${(i) => {
      i.key === "Escape" && (i.stopPropagation(), this.reset(), this.renderRoot.querySelector(".toggle")?.focus());
    }}>
        <h3>Music Assistant</h3>
        ${this.targets.length ? o`<label for="playlist-player">${t.playlistPlayer}</label><select id="playlist-player" .value=${ot(this.selected)} ?disabled=${this.starting}
          @change=${(i) => {
      this.selected = i.target.value, this.draft = "", this.load();
    }}>
          ${this.selected ? d : o`<option value="">${t.choosePlayer}</option>`}
          ${this.targets.map((i) => o`<option value=${i.entity}>${w(this.hass?.states[i.entity]?.attributes.friendly_name) || i.entity} · ${i.entity}</option>`)}
        </select>` : d}
        ${this.selected ? o`<form @submit=${(i) => {
      i.preventDefault(), this.load();
    }}><input type="search" aria-label=${t.playlistSearch} placeholder=${t.playlistSearch} .value=${ot(this.draft)} ?disabled=${this.starting} @input=${(i) => {
      this.draft = i.target.value;
    }}/><button aria-label=${t.playlistSearch} ?disabled=${this.starting}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></svg></button></form>
          <p class="hint">${t.playlistReplace}</p>${e ? o`<p class="status">${t.unavailable}</p>` : d}` : d}
        ${this.error ? o`<p class="status error" role="alert">${t[this.error]}</p><button class="retry" ?disabled=${this.loading || this.starting} @click=${() => this.error === "playlistConnectError" || this.error === "playlistNoTarget" ? this.discover() : this.load()}>${t.retry}</button>` : d}
        <div role="status" aria-live="polite">${this.loading ? o`<p class="status">${t.playlistLoading}</p>` : this.starting ? o`<p class="status">${t.playlistStarting}</p>` : this.notice ? o`<p class="status">${this.notice}</p>` : d}</div>
        ${!this.loading && !this.error && this.selected && !this.items.length ? o`<p class="status">${t.playlistEmpty}</p>` : d}
        <ul aria-label=${t.playlists} aria-busy=${this.loading}>${this.items.map((i) => {
      const a = lt(i.image, (r) => this.hass?.hassUrl?.(r) ?? r);
      return o`<li><button class="playlist" title=${i.name} aria-label=${`${t.play}: ${i.name}`} ?disabled=${this.loading || this.starting || e} @click=${() => this.start(i)}>
            <span class="art">${a && !this.failedImages.has(a) ? o`<img src=${a} alt="" loading="lazy" referrerpolicy="no-referrer" @error=${() => {
        this.failedImages = /* @__PURE__ */ new Set([...this.failedImages, a]);
      }}/>` : Pt()}</span><span class="name">${i.name}</span><svg class="play" viewBox="0 0 16 16" aria-hidden="true"><path d="m5 2 8 6-8 6Z"/></svg>
          </button></li>`;
    })}</ul>
        ${this.more ? o`<button class="more" ?disabled=${this.loading || this.starting} @click=${() => this.load(!0)}>${t.loadMore}</button>` : d}
      </section>` : d}`;
  }
};
J.styles = Oe, J.properties = {
  hass: { attribute: !1 },
  config: { attribute: !1 },
  activeEntity: { attribute: !1 },
  theme: { reflect: !0 },
  open: { state: !0 },
  loading: { state: !0 },
  starting: { state: !0 },
  targets: { state: !0 },
  selected: { state: !0 },
  items: { state: !0 },
  draft: { state: !0 },
  more: { state: !0 },
  error: { state: !0 },
  notice: { state: !0 },
  failedImages: { state: !0 }
};
let dt = J;
customElements.get("vinylmatrix-playlists") || customElements.define("vinylmatrix-playlists", dt);
const X = class X extends E {
  constructor() {
    super(...arguments), this.clock = Date.now(), this.failedArt = "", this.error = "", this.busy = !1, this.rpm = 33, this.volumeOpen = !1, this.commandGeneration = 0, this.visibilityChanged = () => {
      this.clock = Date.now(), this.syncTimer();
    };
  }
  static async getConfigElement() {
    if (!customElements.get("ha-selector")) {
      const t = window.loadCardHelpers;
      if (t)
        try {
          await (await t()).createCardElement({ type: "tile", entity: "media_player.placeholder" }).constructor.getConfigElement?.();
        } catch {
        }
    }
    return document.createElement("vinylmatrix-card-editor");
  }
  static getStubConfig(t) {
    return { entities: Object.keys(t.states).filter((i) => i.startsWith("media_player.")).slice(0, 1), theme: "minimal", color_mode: "auto" };
  }
  setConfig(t) {
    this.config = me(t), this.gesture && (this.gesture = { ...this.gesture, canceled: !0 }), this.error = "";
  }
  getCardSize() {
    return this.config?.theme === "minimal_small" ? 3 : this.config?.theme === "minimal" ? 8 : 7;
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
    this.isConnected && !document.hidden && this.player?.state === "playing" && U(this.player) !== void 0 ? this.timer || (this.timer = setInterval(() => {
      this.clock = Date.now();
    }, 1e3)) : this.stopTimer();
  }
  get player() {
    return this.active ? this.hass?.states[this.active] : void 0;
  }
  willUpdate(t) {
    if (this.config && this.hass) {
      const e = ge(this.config.entities, this.hass.states, this.active);
      e !== this.active && (this.active = e, this.gesture && (this.gesture = { ...this.gesture, canceled: !0 }), this.volumeOpen = !1, this.error = "", this.busy = !1, this.commandGeneration++), this.gesture && (this.gesture.entity !== this.active || this.gesture.kind === "seek" && this.gesture.key !== rt(this.player)) && (this.gesture = { ...this.gesture, canceled: !0 });
    }
    t.has("hass") && (this.clock = Date.now());
  }
  updated() {
    this.syncTimer();
  }
  art() {
    const t = (e) => this.hass?.hassUrl?.(e) ?? e;
    return lt(this.player?.attributes.entity_picture_local, t) ?? lt(this.player?.attributes.entity_picture, t);
  }
  capture(t, e) {
    this.active && (this.gesture = { kind: t, entity: this.active, key: rt(this.player), value: e });
  }
  async commitSlider(t, e) {
    const i = Number(e.target.value), a = this.gesture;
    if (this.gesture = void 0, !(!a || a.canceled || a.entity !== this.active || a.kind !== t)) {
      if (t === "seek") {
        if (!zt(this.player) || a.key !== rt(this.player)) return;
        await this.command("media_seek", m.SEEK, { seek_position: Math.min(O(this.player), Math.max(0, i)) }, a.entity);
      } else
        await this.command("volume_set", m.VOLUME_SET, { volume_level: Math.max(0, Math.min(1, i)) }, a.entity);
      this.requestUpdate();
    }
  }
  async command(t, e, i = {}, a = this.active) {
    if (!a || a !== this.active || !this.hass || this.busy || !v(this.hass.states[a], e)) return;
    const r = ++this.commandGeneration;
    this.busy = !0, this.error = "";
    try {
      await this.hass.callService("media_player", t, { ...i, entity_id: a });
    } catch {
      r === this.commandGeneration && (this.error = S(this.config, this.hass).error);
    } finally {
      r === this.commandGeneration && (this.busy = !1);
    }
  }
  slider(t, e = !1) {
    const i = S(this.config, this.hass), a = this.player, r = t === "seek", n = r ? O(a) ?? 1 : 1, c = r ? U(a, this.clock) ?? 0 : Math.max(0, Math.min(1, B(a?.attributes.volume_level) ?? 0)), l = this.gesture?.kind === t && !this.gesture.canceled ? this.gesture.value : c, u = r ? zt(a) : v(a, m.VOLUME_SET) && B(a?.attributes.volume_level) !== void 0, h = r ? i.progress : i.volume;
    return o`<div class=${e ? "vertical" : "horizontal"}>
      ${e ? P(r ? "progress" : "volume") : d}
      <input data-kind=${t} type="range" min="0" max=${n} step=${r ? "1" : "0.01"}
        .value=${ot(String(l))} ?disabled=${!u || this.busy} aria-label=${h}
        style=${`--range-fill:${Math.min(100, Math.max(0, l / n * 100))}%`}
        aria-orientation=${e ? "vertical" : "horizontal"}
        aria-valuetext=${r ? Z(l) : `${Math.round(l * 100)}%`}
        @pointerdown=${() => this.capture(t, l)} @pointercancel=${() => {
      this.gesture = void 0;
    }}
        @keydown=${() => {
      this.gesture || this.capture(t, l);
    }}
        @input=${(p) => {
      const g = Number(p.target.value);
      this.gesture ? this.gesture = { ...this.gesture, value: g } : this.capture(t, g);
    }}
        @change=${(p) => this.commitSlider(t, p)} @blur=${() => {
      this.gesture = void 0;
    }}/>
      ${e ? o`<output>${r ? Z(U(a, this.clock)) : B(a?.attributes.volume_level) === void 0 ? "—" : `${Math.round(l * 100)}%`}</output>` : r ? o`<div class="times"><span>${Z(U(a, this.clock))}</span><span>${Z(O(a))}</span></div>` : d}
    </div>`;
  }
  render() {
    const t = S(this.config, this.hass);
    if (!this.config || !this.hass) return o`<div class="empty">${t.loading}</div>`;
    const e = this.player, i = e?.state === "playing", a = this.config.theme, r = a === "minimal_small", n = a === "minimal" || r, c = a !== "classic", l = this.config.color_mode === "dark" || this.config.color_mode === "auto" && (this.hass.themes?.darkMode ?? !1), u = this.art(), h = u && u !== this.failedArt ? u : void 0, p = $(e) ? e.state in t ? t[e.state] : e.state : t.unavailable, g = $(e) ? w(e.attributes.media_title) || t.idle : t.unavailable, b = w(e?.attributes.media_artist) || w(e?.attributes.media_album_artist) || t.artist, k = this.config.name || w(e?.attributes.friendly_name) || this.active, y = be(e), W = y ? t[y.icon] : t.play, L = this.active, it = h ? o`<img src=${h} alt="" referrerpolicy="no-referrer" @error=${() => {
      this.failedArt = h;
    }}/>` : d, K = o`      <div class="meta"><h2 class="title" title=${g}>${g}</h2><p class="artist" title=${b}>${b}</p></div>
      <p class="player" title=${`${k} · ${p}`}><span class="dot"></span>${k} · ${p}</p>
      ${this.slider("seek")}
      <div class="transport">
        <button aria-label=${t.previous} title=${t.previous} ?disabled=${!v(e, m.PREVIOUS_TRACK) || this.busy} @click=${() => this.command("media_previous_track", m.PREVIOUS_TRACK, {}, L)}>${P("previous")}</button>
        <button class="primary" aria-label=${W} title=${W} ?disabled=${!y || this.busy} @click=${() => y && this.command(y.service, y.feature, {}, L)}>${P(y?.icon ?? "play")}</button>
        <button aria-label=${t.next} title=${t.next} ?disabled=${!v(e, m.NEXT_TRACK) || this.busy} @click=${() => this.command("media_next_track", m.NEXT_TRACK, {}, L)}>${P("next")}</button>
        ${c ? o`<button aria-label=${t.volume} title=${t.volume} aria-expanded=${this.volumeOpen} ?disabled=${!v(e, m.VOLUME_SET) && !v(e, m.VOLUME_MUTE)} @click=${() => {
      this.volumeOpen = !this.volumeOpen;
    }}>${P(e?.attributes.is_volume_muted ? "mute" : "volume")}</button>` : d}
      </div>
`;
    return o`<ha-card class="card ${a} ${l ? "dark" : "light"} ${i ? "playing" : ""}" style=${`--arm-progress:${fe(e, this.clock) ?? 0.35};--record-period:${a === "classic" && this.rpm === 45 ? 396 / 45 : 12}s`} data-player=${this.active ?? ""} aria-label=${`VinylMatrix · ${k}`}>
      ${n && h ? o`<img class="backdrop" src=${h} alt="" referrerpolicy="no-referrer"/>` : d}
      ${r ? o`<div class="small-art" role="img" aria-label=${`${g} · ${p}`}>
        <div class="record"><div class="rotor"><div class="small-label"></div></div><span class="spindle"></span></div>
        <div class="sleeve">${at(h ?? "fallback", h ? it : o`<div class="fallback" aria-hidden="true">♫</div>`)}</div>
      </div>` : o`<div class="stage">
        <div class="deck" role=${a === "classic" ? "group" : "img"} aria-label=${`${g} · ${p}`}>
          ${a === "cassette" ? Ee() : o`
          ${a === "classic" ? Ae() : d}
          <div class="record"><div class="rotor"><div class="cover">${at(h ?? "fallback", h ? it : o`<div class="fallback" aria-hidden="true">♫</div>`)}</div></div><span class="spindle"></span></div>
          ${a === "classic" ? qe() : xe()}
          `}
          ${a === "classic" ? o`
            <div class="deck-buttons">
              <button class="start-stop" aria-label=${`Start / Stop · ${W}`} title=${W} ?disabled=${!y || this.busy} @click=${() => y && this.command(y.service, y.feature, {}, L)}><span>START<br/>STOP</span></button>
              <div class="speed-buttons" role="group" aria-label=${t.recordSpeed}>${[33, 45].map((N) => o`<button aria-pressed=${this.rpm === N} title=${`${t.recordSpeed}: ${N}`} aria-label=${`${t.recordSpeed}: ${N}`} @click=${() => {
      this.rpm = N;
    }}>${N}</button>`)}</div>
            </div>
            <div class="classic-volume"><span>${t.volume}</span>${this.slider("volume", !0)}</div>
          ` : d}
        </div>
      </div>`}
      ${r ? o`<div class="small-footer">${K}</div>` : a === "classic" ? o`<div class="classic-footer">${K}</div>` : a === "cassette" ? o`<div class="cassette-footer"><div class="album">${at(h ?? "fallback", h ? it : o`<div class="fallback" aria-hidden="true">♫</div>`)}</div>${K}</div>` : K}
      ${c && this.volumeOpen ? o`<div class="volume-popover"><button aria-label=${e?.attributes.is_volume_muted ? t.unmute : t.mute} ?disabled=${!v(e, m.VOLUME_MUTE) || this.busy} @click=${() => this.command("volume_mute", m.VOLUME_MUTE, { is_volume_muted: !e?.attributes.is_volume_muted }, L)}>${P(e?.attributes.is_volume_muted ? "mute" : "volume")}</button><div style="flex:1">${this.slider("volume")}</div></div>` : d}
      ${this.config.show_playlists !== !1 && Me(this.hass) ? o`<vinylmatrix-playlists .hass=${this.hass} .config=${this.config} .activeEntity=${this.active} .theme=${a}></vinylmatrix-playlists>` : d}
      ${this.error ? o`<p class="error" role="alert">${this.error}</p>` : d}
    </ha-card>`;
  }
};
X.properties = {
  hass: { attribute: !1 },
  config: { state: !0 },
  active: { state: !0 },
  clock: { state: !0 },
  failedArt: { state: !0 },
  error: { state: !0 },
  rpm: { state: !0 },
  busy: { state: !0 },
  volumeOpen: { state: !0 },
  gesture: { state: !0 }
}, X.styles = [$e, we, _e, Se, ke];
let pt = X;
customElements.get("vinylmatrix-card") || customElements.define("vinylmatrix-card", pt);
const ht = window;
ht.customCards ??= [];
ht.customCards.some((s) => s.type === "vinylmatrix-card") || ht.customCards.push({ type: "vinylmatrix-card", name: "VinylMatrix Card", description: "Animated turntable and cassette styles for your music players", preview: !0 });
console.info("VinylMatrix Card 1.1.0");
export {
  pt as VinylMatrixCard
};
