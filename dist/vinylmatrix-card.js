const G = globalThis, st = G.ShadowRoot && (G.ShadyCSS === void 0 || G.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, at = /* @__PURE__ */ Symbol(), dt = /* @__PURE__ */ new WeakMap();
let wt = class {
  constructor(t, e, r) {
    if (this._$cssResult$ = !0, r !== at) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (st && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = dt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && dt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Rt = (i) => new wt(typeof i == "string" ? i : i + "", void 0, at), F = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((r, s, a) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[a + 1], i[0]);
  return new wt(e, i, at);
}, Nt = (i, t) => {
  if (st) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const r = document.createElement("style"), s = G.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = e.cssText, i.appendChild(r);
  }
}, ht = st ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules) e += r.cssText;
  return Rt(e);
})(i) : i;
const { is: Lt, defineProperty: Ht, getOwnPropertyDescriptor: It, getOwnPropertyNames: Bt, getOwnPropertySymbols: Dt, getPrototypeOf: Vt } = Object, Y = globalThis, pt = Y.trustedTypes, jt = pt ? pt.emptyScript : "", Gt = Y.reactiveElementPolyfillSupport, R = (i, t) => i, tt = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? jt : null;
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
} }, _t = (i, t) => !Lt(i, t), ut = { attribute: !0, type: String, converter: tt, reflect: !1, useDefault: !1, hasChanged: _t };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Y.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let q = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ut) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, r, e);
      s !== void 0 && Ht(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    const { get: s, set: a } = It(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: s, set(o) {
      const l = s?.call(this);
      a?.call(this, o), this.requestUpdate(t, l, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ut;
  }
  static _$Ei() {
    if (this.hasOwnProperty(R("elementProperties"))) return;
    const t = Vt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(R("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(R("properties"))) {
      const e = this.properties, r = [...Bt(e), ...Dt(e)];
      for (const s of r) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [r, s] of e) this.elementProperties.set(r, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, r] of this.elementProperties) {
      const s = this._$Eu(e, r);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const s of r) e.unshift(ht(s));
    } else t !== void 0 && e.push(ht(t));
    return e;
  }
  static _$Eu(t, e) {
    const r = e.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const r of e.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Nt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, r) {
    this._$AK(t, r);
  }
  _$ET(t, e) {
    const r = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, r);
    if (s !== void 0 && r.reflect === !0) {
      const a = (r.converter?.toAttribute !== void 0 ? r.converter : tt).toAttribute(e, r.type);
      this._$Em = t, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const r = this.constructor, s = r._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = r.getPropertyOptions(s), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : tt;
      this._$Em = s;
      const l = o.fromAttribute(e, a.type);
      this[s] = l ?? this._$Ej?.get(s) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, r, s = !1, a) {
    if (t !== void 0) {
      const o = this.constructor;
      if (s === !1 && (a = this[t]), r ??= o.getPropertyOptions(t), !((r.hasChanged ?? _t)(a, e) || r.useDefault && r.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, r)))) return;
      this.C(t, e, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: r, reflect: s, wrapped: a }, o) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), a !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [s, a] of this._$Ep) this[s] = a;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [s, a] of r) {
        const { wrapped: o } = a, l = this[s];
        o !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, a, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
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
q.elementStyles = [], q.shadowRootOptions = { mode: "open" }, q[R("elementProperties")] = /* @__PURE__ */ new Map(), q[R("finalized")] = /* @__PURE__ */ new Map(), Gt?.({ ReactiveElement: q }), (Y.reactiveElementVersions ??= []).push("2.1.2");
const ot = globalThis, mt = (i) => i, W = ot.trustedTypes, ft = W ? W.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, At = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, qt = "?" + y, Wt = `<${qt}>`, w = document, H = () => w.createComment(""), I = (i) => i === null || typeof i != "object" && typeof i != "function", nt = Array.isArray, Kt = (i) => nt(i) || typeof i?.[Symbol.iterator] == "function", J = `[ 	
\f\r]`, U = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, gt = /-->/g, bt = />/g, $ = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), vt = /'/g, xt = /"/g, Et = /^(?:script|style|textarea|title)$/i, St = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), u = St(1), M = St(2), v = /* @__PURE__ */ Symbol.for("lit-noChange"), d = /* @__PURE__ */ Symbol.for("lit-nothing"), yt = /* @__PURE__ */ new WeakMap(), k = w.createTreeWalker(w, 129);
function Ct(i, t) {
  if (!nt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ft !== void 0 ? ft.createHTML(t) : t;
}
const Zt = (i, t) => {
  const e = i.length - 1, r = [];
  let s, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = U;
  for (let l = 0; l < e; l++) {
    const n = i[l];
    let h, p, c = -1, g = 0;
    for (; g < n.length && (o.lastIndex = g, p = o.exec(n), p !== null); ) g = o.lastIndex, o === U ? p[1] === "!--" ? o = gt : p[1] !== void 0 ? o = bt : p[2] !== void 0 ? (Et.test(p[2]) && (s = RegExp("</" + p[2], "g")), o = $) : p[3] !== void 0 && (o = $) : o === $ ? p[0] === ">" ? (o = s ?? U, c = -1) : p[1] === void 0 ? c = -2 : (c = o.lastIndex - p[2].length, h = p[1], o = p[3] === void 0 ? $ : p[3] === '"' ? xt : vt) : o === xt || o === vt ? o = $ : o === gt || o === bt ? o = U : (o = $, s = void 0);
    const m = o === $ && i[l + 1].startsWith("/>") ? " " : "";
    a += o === U ? n + Wt : c >= 0 ? (r.push(h), n.slice(0, c) + At + n.slice(c) + y + m) : n + y + (c === -2 ? l : m);
  }
  return [Ct(i, a + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class B {
  constructor({ strings: t, _$litType$: e }, r) {
    let s;
    this.parts = [];
    let a = 0, o = 0;
    const l = t.length - 1, n = this.parts, [h, p] = Zt(t, e);
    if (this.el = B.createElement(h, r), k.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = k.nextNode()) !== null && n.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(At)) {
          const g = p[o++], m = s.getAttribute(c).split(y), x = /([.?@])?(.*)/.exec(g);
          n.push({ type: 1, index: a, name: x[2], strings: m, ctor: x[1] === "." ? Yt : x[1] === "?" ? Qt : x[1] === "@" ? Jt : Q }), s.removeAttribute(c);
        } else c.startsWith(y) && (n.push({ type: 6, index: a }), s.removeAttribute(c));
        if (Et.test(s.tagName)) {
          const c = s.textContent.split(y), g = c.length - 1;
          if (g > 0) {
            s.textContent = W ? W.emptyScript : "";
            for (let m = 0; m < g; m++) s.append(c[m], H()), k.nextNode(), n.push({ type: 2, index: ++a });
            s.append(c[g], H());
          }
        }
      } else if (s.nodeType === 8) if (s.data === qt) n.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(y, c + 1)) !== -1; ) n.push({ type: 7, index: a }), c += y.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const r = w.createElement("template");
    return r.innerHTML = t, r;
  }
}
function P(i, t, e = i, r) {
  if (t === v) return t;
  let s = r !== void 0 ? e._$Co?.[r] : e._$Cl;
  const a = I(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== a && (s?._$AO?.(!1), a === void 0 ? s = void 0 : (s = new a(i), s._$AT(i, e, r)), r !== void 0 ? (e._$Co ??= [])[r] = s : e._$Cl = s), s !== void 0 && (t = P(i, s._$AS(i, t.values), s, r)), t;
}
class Ft {
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
    const { el: { content: e }, parts: r } = this._$AD, s = (t?.creationScope ?? w).importNode(e, !0);
    k.currentNode = s;
    let a = k.nextNode(), o = 0, l = 0, n = r[0];
    for (; n !== void 0; ) {
      if (o === n.index) {
        let h;
        n.type === 2 ? h = new V(a, a.nextSibling, this, t) : n.type === 1 ? h = new n.ctor(a, n.name, n.strings, this, t) : n.type === 6 && (h = new Xt(a, this, t)), this._$AV.push(h), n = r[++l];
      }
      o !== n?.index && (a = k.nextNode(), o++);
    }
    return k.currentNode = w, s;
  }
  p(t) {
    let e = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
}
class V {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, r, s) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = r, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = P(this, t, e), I(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== v && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Kt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && I(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: r } = t, s = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = B.createElement(Ct(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const a = new Ft(s, this), o = a.u(this.options);
      a.p(e), this.T(o), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = yt.get(t.strings);
    return e === void 0 && yt.set(t.strings, e = new B(t)), e;
  }
  k(t) {
    nt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, s = 0;
    for (const a of t) s === e.length ? e.push(r = new V(this.O(H()), this.O(H()), this, this.options)) : r = e[s], r._$AI(a), s++;
    s < e.length && (this._$AR(r && r._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const r = mt(t).nextSibling;
      mt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, r, s, a) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = a, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = d;
  }
  _$AI(t, e = this, r, s) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = P(this, t, e, 0), o = !I(t) || t !== this._$AH && t !== v, o && (this._$AH = t);
    else {
      const l = t;
      let n, h;
      for (t = a[0], n = 0; n < a.length - 1; n++) h = P(this, l[r + n], e, n), h === v && (h = this._$AH[n]), o ||= !I(h) || h !== this._$AH[n], h === d ? t = d : t !== d && (t += (h ?? "") + a[n + 1]), this._$AH[n] = h;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Yt extends Q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Qt extends Q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Jt extends Q {
  constructor(t, e, r, s, a) {
    super(t, e, r, s, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = P(this, t, e, 0) ?? d) === v) return;
    const r = this._$AH, s = t === d && r !== d || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, a = t !== d && (r === d || s);
    s && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Xt {
  constructor(t, e, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const te = ot.litHtmlPolyfillSupport;
te?.(B, V), (ot.litHtmlVersions ??= []).push("3.3.3");
const ee = (i, t, e) => {
  const r = e?.renderBefore ?? t;
  let s = r._$litPart$;
  if (s === void 0) {
    const a = e?.renderBefore ?? null;
    r._$litPart$ = s = new V(t.insertBefore(H(), a), a, void 0, e ?? {});
  }
  return s._$AI(i), s;
};
const lt = globalThis;
let S = class extends q {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ee(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return v;
  }
};
S._$litElement$ = !0, S.finalized = !0, lt.litElementHydrateSupport?.({ LitElement: S });
const ie = lt.litElementPolyfillSupport;
ie?.({ LitElement: S });
(lt.litElementVersions ??= []).push("4.2.2");
const _ = { ATTRIBUTE: 1, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, Mt = (i) => (...t) => ({ _$litDirective$: i, values: t });
let Pt = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, r) {
    this._$Ct = t, this._$AM = e, this._$Ci = r;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
};
const re = (i) => i.strings === void 0, se = {}, Tt = (i, t = se) => i._$AH = t;
const ae = Mt(class extends Pt {
  constructor(i) {
    if (super(i), i.type !== _.PROPERTY && i.type !== _.ATTRIBUTE && i.type !== _.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!re(i)) throw Error("`live` bindings can only contain a single expression");
  }
  render(i) {
    return i;
  }
  update(i, [t]) {
    if (t === v || t === d) return t;
    const e = i.element, r = i.name;
    if (i.type === _.PROPERTY) {
      if (t === e[r]) return v;
    } else if (i.type === _.BOOLEAN_ATTRIBUTE) {
      if (!!t === e.hasAttribute(r)) return v;
    } else if (i.type === _.ATTRIBUTE && e.getAttribute(r) === t + "") return v;
    return Tt(i), t;
  }
});
const oe = Mt(class extends Pt {
  constructor() {
    super(...arguments), this.key = d;
  }
  render(i, t) {
    return this.key = i, t;
  }
  update(i, [t, e]) {
    return t !== this.key && (Tt(i), this.key = t), e;
  }
}), f = {
  PAUSE: 1,
  SEEK: 2,
  VOLUME_SET: 4,
  VOLUME_MUTE: 8,
  PREVIOUS_TRACK: 16,
  NEXT_TRACK: 32,
  STOP: 4096,
  PLAY: 16384
};
function zt(i) {
  if (!i || i === "vinyl" || i === "ambient") return "minimal";
  if (i === "minimal" || i === "classic") return i;
  throw new Error("VinylMatrix: invalid theme.");
}
function ne(i) {
  const t = i.entities ?? (i.entity ? [i.entity] : []);
  if (!Array.isArray(t) || t.length === 0 || t.some((r) => typeof r != "string" || !/^media_player\.[a-z0-9_]+$/.test(r)))
    throw new Error("VinylMatrix: configure at least one media_player in entities.");
  const e = zt(i.theme);
  if (i.color_mode && !["auto", "light", "dark"].includes(i.color_mode)) throw new Error("VinylMatrix: invalid color_mode.");
  if (i.language && !["auto", "en", "it"].includes(i.language)) throw new Error("VinylMatrix: invalid language.");
  if (i.name !== void 0 && typeof i.name != "string") throw new Error("VinylMatrix: name must be text.");
  return { ...i, entities: [...new Set(t)], theme: e, color_mode: i.color_mode ?? "auto", language: i.language ?? "auto" };
}
function D(i) {
  return !!i && !["unavailable", "unknown"].includes(i.state);
}
function Ut(i) {
  return D(i) && !["off", "standby"].includes(i.state);
}
function le(i, t, e) {
  const r = i.filter((s) => t[s]?.state === "playing");
  return e && r.includes(e) ? e : r.length ? r[0] : e && i.includes(e) && D(t[e]) ? e : i.find((s) => D(t[s])) ?? i[0];
}
function b(i, t) {
  const e = i?.attributes.supported_features;
  return Ut(i) && typeof e == "number" && (e & t) === t;
}
function N(i) {
  return typeof i == "number" && Number.isFinite(i) ? i : void 0;
}
function O(i) {
  return typeof i == "string" ? i : "";
}
function C(i) {
  const t = N(i?.attributes.media_duration);
  return t !== void 0 && t > 0 ? t : void 0;
}
function E(i, t = Date.now()) {
  const e = N(i?.attributes.media_position);
  if (e === void 0) return;
  const r = Date.parse(O(i?.attributes.media_position_updated_at)), s = i?.state === "playing" && Number.isFinite(r) ? Math.max(0, (t - r) / 1e3) : 0;
  return Math.max(0, Math.min(e + s, C(i) ?? 1 / 0));
}
function ce(i, t = Date.now()) {
  const e = C(i), r = E(i, t);
  return e === void 0 || r === void 0 ? void 0 : Math.min(1, r / e);
}
function X(i) {
  return JSON.stringify([i?.attributes.media_content_id, i?.attributes.media_title, i?.attributes.media_artist, i?.attributes.media_duration]);
}
function $t(i) {
  return b(i, f.SEEK) && C(i) !== void 0 && E(i) !== void 0;
}
function j(i) {
  if (i === void 0 || !Number.isFinite(i)) return "—:—";
  const t = Math.max(0, Math.floor(i)), e = Math.floor(t / 3600);
  return `${e ? `${e}:` : ""}${String(Math.floor(t / 60) % 60).padStart(e ? 2 : 1, "0")}:${String(t % 60).padStart(2, "0")}`;
}
function de(i) {
  if (Ut(i)) {
    if (i.state === "playing") {
      if (b(i, f.PAUSE)) return { service: "media_pause", feature: f.PAUSE, icon: "pause" };
      if (b(i, f.STOP)) return { service: "media_stop", feature: f.STOP, icon: "stop" };
    } else if (b(i, f.PLAY)) return { service: "media_play", feature: f.PLAY, icon: "play" };
  }
}
function kt(i, t = (e) => e) {
  if (typeof i != "string" || !i.trim()) return;
  const e = i.trim();
  if (/^https?:\/\//i.test(e)) return e;
  if (e.startsWith("/") && !e.startsWith("//") && !e.includes("\\")) return t(e);
}
const he = {
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
  classic: "Classic",
  searchPlayers: "Search media players",
  choosePlayer: "Choose a media player",
  noPlayers: "No matching media players",
  hint: "The playing player is selected automatically. Order determines priority when the card first opens."
}, pe = {
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
  classic: "Classic",
  searchPlayers: "Cerca lettori multimediali",
  choosePlayer: "Scegli un lettore multimediale",
  noPlayers: "Nessun lettore corrispondente",
  hint: "Viene selezionato automaticamente il lettore in riproduzione. L’ordine determina la priorità all’apertura della card."
};
function L(i, t) {
  return (i?.language && i.language !== "auto" ? i.language : t?.locale?.language ?? t?.language ?? "en").toLowerCase().startsWith("it") ? pe : he;
}
function A(i) {
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
  return M`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d=${t[i] ?? t.play}/></svg>`;
}
function ue() {
  return M`<svg class="tonearm reference-arm" viewBox="0 0 1000 837" aria-hidden="true">
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
const me = F`
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
  .stage { display:grid; grid-template-columns:minmax(0,1fr); align-items:stretch; gap:2px; }
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
`, fe = F`
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
`, ge = F`
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
function be() {
  return M`<svg class="platter-rim" viewBox="0 0 100 100" aria-hidden="true">
    <defs><linearGradient id="vm-rim" x2=".8" y2="1"><stop stop-color="#b3b3b3"/><stop offset=".3" stop-color="#4a4a4a"/><stop offset=".58" stop-color="#a7a7a7"/><stop offset="1" stop-color="#404040"/></linearGradient></defs>
    <circle cx="50" cy="50" r="49.7" fill="#181818" stroke="#090909" stroke-width=".6"/>
    <circle cx="50" cy="50" r="49.2" fill="none" stroke="url(#vm-rim)" stroke-width=".4"/>
    ${[48.5, 47.6, 46.7].map((i, t) => M`<circle cx="50" cy="50" r=${i} fill="none" stroke="url(#vm-rim)" stroke-width=${0.42 - t * 0.05} stroke-dasharray=${`.01 ${1.75 - t * 0.035}`} stroke-linecap="round"/>`)}
    <circle cx="50" cy="50" r="45.7" fill="#111111" stroke="url(#vm-rim)" stroke-width=".35"/>
  </svg>`;
}
function ve() {
  return M`<svg class="tonearm classic-arm" viewBox="0 0 1000 586" aria-hidden="true">
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
        ${[14, 28].map((i) => [-9, 9].map((t) => M`<circle cx=${t} cy=${i} r="4.6" fill="#101010" stroke="#545454" stroke-width=".8"/>`))}
        <path d="M-10 47v8m20-8v8" stroke="#b8b8b8" stroke-width="3" stroke-linecap="round"/>
        <path d="M19 47h31v8H21" fill="#1e1e1e" stroke="#595959"/>
        <path class="stylus" d="M0 76v8" stroke="#b6b6b6" stroke-width="1.5"/>
      </g>
    </g>
  </svg>`;
}
const K = class K extends S {
  constructor() {
    super(...arguments), this.config = { type: "custom:vinylmatrix-card", entities: [], theme: "minimal" }, this.queries = {};
  }
  connectedCallback() {
    super.connectedCallback(), customElements.get("ha-selector") || customElements.whenDefined("ha-selector").then(() => {
      this.isConnected && this.requestUpdate();
    });
  }
  setConfig(t) {
    this.config = { ...t, theme: zt(t.theme), entities: [...t.entities ?? (t.entity ? [t.entity] : [])] };
  }
  updateConfig(t) {
    this.config = { ...this.config, ...t };
    const e = { ...this.config, entities: this.config.entities?.filter(Boolean) };
    delete e.entity, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: e }, bubbles: !0, composed: !0 }));
  }
  selectPlayer(t, e) {
    if (typeof e != "string" || e && !/^media_player\.[a-z0-9_]+$/.test(e)) return;
    const r = [...this.config.entities ?? []];
    e && r.some((s, a) => a !== t && s === e) || (r[t] = e, this.updateConfig({ entities: r }));
  }
  picker(t, e) {
    const r = L(this.config, this.hass), s = (this.config.entities ?? []).filter((l, n) => n !== e && l);
    if (customElements.get("ha-selector")) return u`<ha-selector
      .hass=${this.hass} .selector=${{ entity: { filter: { domain: "media_player" }, exclude_entities: s } }}
      .value=${t || void 0} .label=${`${r.players} ${e + 1}`} .required=${!1}
      @value-changed=${(l) => {
      l.stopPropagation(), this.selectPlayer(e, l.detail.value ?? "");
    }}></ha-selector>`;
    const a = (this.queries[e] ?? "").trim().toLocaleLowerCase(), o = Object.keys(this.hass?.states ?? {}).filter((l) => l.startsWith("media_player.") && !s.includes(l)).filter((l) => `${this.hass?.states[l].attributes.friendly_name ?? ""} ${l}`.toLocaleLowerCase().includes(a));
    return u`<div class="picker"><input type="search" aria-label=${`${r.searchPlayers} ${e + 1}`} placeholder=${r.searchPlayers} .value=${this.queries[e] ?? ""}
      @input=${(l) => {
      this.queries = { ...this.queries, [e]: l.target.value };
    }}/>
      <select aria-label=${`${r.players} ${e + 1}`} .value=${o.includes(t) ? t : ""} @change=${(l) => this.selectPlayer(e, l.target.value)}>
        <option value="" disabled>${o.length ? r.choosePlayer : r.noPlayers}</option>
        ${o.map((l) => u`<option value=${l}>${this.hass?.states[l].attributes.friendly_name ?? l} · ${l}</option>`)}
      </select></div>`;
  }
  render() {
    const t = L(this.config, this.hass), e = this.config.entities ?? [];
    return u`
      <label>${t.players}</label>
      ${e.map((r, s) => u`<div class="row">${this.picker(r, s)}<button aria-label=${`${t.remove} ${s + 1}`} @click=${() => {
      this.queries = {}, this.updateConfig({ entities: e.filter((a, o) => o !== s) });
    }}>×</button></div>`)}
      <button @click=${() => {
      this.config = { ...this.config, entities: [...e, ""] };
    }}>+ ${t.add}</button><p>${t.hint}</p>
      <label for="name">${t.name}</label><input id="name" .value=${this.config.name ?? ""} @change=${(r) => this.updateConfig({ name: r.target.value })}/>
      <label for="theme">${t.theme}</label><select id="theme" .value=${this.config.theme ?? "minimal"} @change=${(r) => this.updateConfig({ theme: r.target.value })}>${["minimal", "classic"].map((r) => u`<option value=${r}>${t[r]}</option>`)}</select>
      <label for="color">${t.color}</label><select id="color" .value=${this.config.color_mode ?? "auto"} @change=${(r) => this.updateConfig({ color_mode: r.target.value })}>${["auto", "light", "dark"].map((r) => u`<option value=${r}>${t[r]}</option>`)}</select>
      <label for="language">${t.language}</label><select id="language" .value=${this.config.language ?? "auto"} @change=${(r) => this.updateConfig({ language: r.target.value })}><option value="auto">${t.auto}</option><option value="en">English</option><option value="it">Italiano</option></select>
    `;
  }
};
K.properties = { hass: { attribute: !1 }, config: { state: !0 }, queries: { state: !0 } }, K.styles = F`
    :host { display:block; color:var(--primary-text-color); font-family:var(--primary-font-family,system-ui); }
    * { box-sizing:border-box; } label { display:block; font-size:14px; margin:16px 0 6px; }
    input,select { font:inherit; padding:10px; width:100%; min-width:0; color:var(--primary-text-color); background:var(--card-background-color,#fff); border:1px solid var(--divider-color,#888); border-radius:6px; }
    .row { display:flex; align-items:start; gap:8px; margin-bottom:12px; } .picker,ha-selector { display:block; flex:1; min-width:0; }
    .picker input { margin-bottom:6px; } .row button { flex-shrink:0; }
    button { cursor:pointer; padding:8px 12px; border-radius:6px; border:1px solid var(--divider-color,#888); background:var(--card-background-color,#fff); color:var(--primary-text-color); }
    p { font-size:13px; color:var(--secondary-text-color,#888); line-height:1.5; }
  `;
let et = K;
customElements.get("vinylmatrix-card-editor") || customElements.define("vinylmatrix-card-editor", et);
const Z = class Z extends S {
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
    return { entities: Object.keys(t.states).filter((r) => r.startsWith("media_player.")).slice(0, 1), theme: "minimal", color_mode: "auto" };
  }
  setConfig(t) {
    this.config = ne(t), this.gesture && (this.gesture = { ...this.gesture, canceled: !0 }), this.error = "";
  }
  getCardSize() {
    return this.config?.theme === "minimal" ? 8 : 7;
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
    this.isConnected && !document.hidden && this.player?.state === "playing" && E(this.player) !== void 0 ? this.timer || (this.timer = setInterval(() => {
      this.clock = Date.now();
    }, 1e3)) : this.stopTimer();
  }
  get player() {
    return this.active ? this.hass?.states[this.active] : void 0;
  }
  willUpdate(t) {
    if (this.config && this.hass) {
      const e = le(this.config.entities, this.hass.states, this.active);
      e !== this.active && (this.active = e, this.gesture && (this.gesture = { ...this.gesture, canceled: !0 }), this.volumeOpen = !1, this.error = "", this.busy = !1, this.commandGeneration++), this.gesture && (this.gesture.entity !== this.active || this.gesture.kind === "seek" && this.gesture.key !== X(this.player)) && (this.gesture = { ...this.gesture, canceled: !0 });
    }
    t.has("hass") && (this.clock = Date.now());
  }
  updated() {
    this.syncTimer();
  }
  art() {
    const t = (e) => this.hass?.hassUrl?.(e) ?? e;
    return kt(this.player?.attributes.entity_picture_local, t) ?? kt(this.player?.attributes.entity_picture, t);
  }
  capture(t, e) {
    this.active && (this.gesture = { kind: t, entity: this.active, key: X(this.player), value: e });
  }
  async commitSlider(t, e) {
    const r = Number(e.target.value), s = this.gesture;
    if (this.gesture = void 0, !(!s || s.canceled || s.entity !== this.active || s.kind !== t)) {
      if (t === "seek") {
        if (!$t(this.player) || s.key !== X(this.player)) return;
        await this.command("media_seek", f.SEEK, { seek_position: Math.min(C(this.player), Math.max(0, r)) }, s.entity);
      } else
        await this.command("volume_set", f.VOLUME_SET, { volume_level: Math.max(0, Math.min(1, r)) }, s.entity);
      this.requestUpdate();
    }
  }
  async command(t, e, r = {}, s = this.active) {
    if (!s || s !== this.active || !this.hass || this.busy || !b(this.hass.states[s], e)) return;
    const a = ++this.commandGeneration;
    this.busy = !0, this.error = "";
    try {
      await this.hass.callService("media_player", t, { ...r, entity_id: s });
    } catch {
      a === this.commandGeneration && (this.error = L(this.config, this.hass).error);
    } finally {
      a === this.commandGeneration && (this.busy = !1);
    }
  }
  slider(t, e = !1) {
    const r = L(this.config, this.hass), s = this.player, a = t === "seek", o = a ? C(s) ?? 1 : 1, l = a ? E(s, this.clock) ?? 0 : Math.max(0, Math.min(1, N(s?.attributes.volume_level) ?? 0)), n = this.gesture?.kind === t && !this.gesture.canceled ? this.gesture.value : l, h = a ? $t(s) : b(s, f.VOLUME_SET) && N(s?.attributes.volume_level) !== void 0, p = a ? r.progress : r.volume;
    return u`<div class=${e ? "vertical" : "horizontal"}>
      ${e ? A(a ? "progress" : "volume") : d}
      <input data-kind=${t} type="range" min="0" max=${o} step=${a ? "1" : "0.01"}
        .value=${ae(String(n))} ?disabled=${!h || this.busy} aria-label=${p}
        style=${`--range-fill:${Math.min(100, Math.max(0, n / o * 100))}%`}
        aria-orientation=${e ? "vertical" : "horizontal"}
        aria-valuetext=${a ? j(n) : `${Math.round(n * 100)}%`}
        @pointerdown=${() => this.capture(t, n)} @pointercancel=${() => {
      this.gesture = void 0;
    }}
        @keydown=${() => {
      this.gesture || this.capture(t, n);
    }}
        @input=${(c) => {
      const g = Number(c.target.value);
      this.gesture ? this.gesture = { ...this.gesture, value: g } : this.capture(t, g);
    }}
        @change=${(c) => this.commitSlider(t, c)} @blur=${() => {
      this.gesture = void 0;
    }}/>
      ${e ? u`<output>${a ? j(E(s, this.clock)) : N(s?.attributes.volume_level) === void 0 ? "—" : `${Math.round(n * 100)}%`}</output>` : a ? u`<div class="times"><span>${j(E(s, this.clock))}</span><span>${j(C(s))}</span></div>` : d}
    </div>`;
  }
  render() {
    const t = L(this.config, this.hass);
    if (!this.config || !this.hass) return u`<div class="empty">${t.loading}</div>`;
    const e = this.player, r = e?.state === "playing", s = this.config.theme, a = s === "minimal", o = this.config.color_mode === "dark" || this.config.color_mode === "auto" && (this.hass.themes?.darkMode ?? !1), l = this.art(), n = l && l !== this.failedArt ? l : void 0, h = D(e) ? e.state in t ? t[e.state] : e.state : t.unavailable, p = D(e) ? O(e.attributes.media_title) || t.idle : t.unavailable, c = O(e?.attributes.media_artist) || O(e?.attributes.media_album_artist) || t.artist, g = this.config.name || O(e?.attributes.friendly_name) || this.active, m = de(e), x = m ? t[m.icon] : t.play, T = this.active, Ot = n ? u`<img src=${n} alt="" referrerpolicy="no-referrer" @error=${() => {
      this.failedArt = n;
    }}/>` : d, ct = u`      <div class="meta"><h2 class="title" title=${p}>${p}</h2><p class="artist" title=${c}>${c}</p></div>
      <p class="player" title=${`${g} · ${h}`}><span class="dot"></span>${g} · ${h}</p>
      ${this.slider("seek")}
      <div class="transport">
        <button aria-label=${t.previous} title=${t.previous} ?disabled=${!b(e, f.PREVIOUS_TRACK) || this.busy} @click=${() => this.command("media_previous_track", f.PREVIOUS_TRACK, {}, T)}>${A("previous")}</button>
        <button class="primary" aria-label=${x} title=${x} ?disabled=${!m || this.busy} @click=${() => m && this.command(m.service, m.feature, {}, T)}>${A(m?.icon ?? "play")}</button>
        <button aria-label=${t.next} title=${t.next} ?disabled=${!b(e, f.NEXT_TRACK) || this.busy} @click=${() => this.command("media_next_track", f.NEXT_TRACK, {}, T)}>${A("next")}</button>
        ${a ? u`<button aria-label=${t.volume} title=${t.volume} aria-expanded=${this.volumeOpen} ?disabled=${!b(e, f.VOLUME_SET) && !b(e, f.VOLUME_MUTE)} @click=${() => {
      this.volumeOpen = !this.volumeOpen;
    }}>${A(e?.attributes.is_volume_muted ? "mute" : "volume")}</button>` : d}
      </div>
`;
    return u`<ha-card class="card ${s} ${o ? "dark" : "light"} ${r ? "playing" : ""}" style=${`--arm-progress:${ce(e, this.clock) ?? 0.35};--record-period:${this.rpm === 33 ? 60 / 33 : 60 / 45}s`} data-player=${this.active ?? ""} aria-label=${`VinylMatrix · ${g}`}>
      ${a && n ? u`<img class="backdrop" src=${n} alt="" referrerpolicy="no-referrer"/>` : d}
      <div class="stage">
        <div class="deck" role=${s === "classic" ? "group" : "img"} aria-label=${`${p} · ${h}`}>
          ${s === "classic" ? be() : d}
          <div class="record"><div class="rotor"><div class="cover">${oe(n ?? "fallback", n ? Ot : u`<div class="fallback" aria-hidden="true">♫</div>`)}</div></div><span class="spindle"></span></div>
          ${s === "classic" ? ve() : ue()}
          ${s === "classic" ? u`
            <div class="deck-buttons">
              <button class="start-stop" aria-label=${`Start / Stop · ${x}`} title=${x} ?disabled=${!m || this.busy} @click=${() => m && this.command(m.service, m.feature, {}, T)}><span>START<br/>STOP</span></button>
              <div class="speed-buttons" role="group" aria-label=${t.recordSpeed}>${[33, 45].map((z) => u`<button aria-pressed=${this.rpm === z} title=${`${t.recordSpeed}: ${z}`} aria-label=${`${t.recordSpeed}: ${z}`} @click=${() => {
      this.rpm = z;
    }}>${z}</button>`)}</div>
            </div>
            <div class="classic-volume"><span>${t.volume}</span>${this.slider("volume", !0)}</div>
          ` : d}
        </div>
      </div>
      ${s === "classic" ? u`<div class="classic-footer">${ct}</div>` : ct}
      ${a && this.volumeOpen ? u`<div class="volume-popover"><button aria-label=${e?.attributes.is_volume_muted ? t.unmute : t.mute} ?disabled=${!b(e, f.VOLUME_MUTE) || this.busy} @click=${() => this.command("volume_mute", f.VOLUME_MUTE, { is_volume_muted: !e?.attributes.is_volume_muted }, T)}>${A(e?.attributes.is_volume_muted ? "mute" : "volume")}</button><div style="flex:1">${this.slider("volume")}</div></div>` : d}
      ${this.error ? u`<p class="error" role="alert">${this.error}</p>` : d}
    </ha-card>`;
  }
};
Z.properties = {
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
}, Z.styles = [me, fe, ge];
let it = Z;
customElements.get("vinylmatrix-card") || customElements.define("vinylmatrix-card", it);
const rt = window;
rt.customCards ??= [];
rt.customCards.some((i) => i.type === "vinylmatrix-card") || rt.customCards.push({ type: "vinylmatrix-card", name: "VinylMatrix Card", description: "An animated turntable for your music players", preview: !0 });
console.info("VinylMatrix Card 0.3.0");
export {
  it as VinylMatrixCard
};
