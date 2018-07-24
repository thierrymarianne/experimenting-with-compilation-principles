import JSONListener from './JSONListener';
import JSONParser from './JSONParser';

const JSONDrawer = class extends JSONListener {
  constructor(component) {
    super();
    this.component = component;
    this.jsonComponent = this.component.$refs.json;
  }

  enterJson() {
    this.component.$data.json = `${this.component.$data.json}<span class="json">`;
  }

  exitJson() {
    if (typeof this.component === 'undefined') {
      return;
    }
    this.component.$data.json = `${this.component.$data.json}</span>`;

    if (typeof this.jsonComponent === 'undefined') {
      return;
    }
    this.jsonComponent.$data.json = this.component.$data.json;
  }

  enterObj(ctx) {
    this.component.$data.json = `${this.component.$data.json}<span class="json__parentheses">{</span>`;
    if (ctx.children.length > 2) {
      this.component.$data.json = `${this.component.$data.json}<span class="json__object">`;
    }
  }

  exitObj(ctx) {
    if (ctx.children.length > 2) {
      this.component.$data.json = `${this.component.$data.json}</span>`;
    }
    this.component.$data.json = `${this.component.$data.json}<span class="json__parentheses">}</span>`;
  }

  enterArray(ctx) {
    this.component.$data.json = `${this.component.$data.json}<span class="json__square-bracket">[</span>`;
    if (ctx.children.length > 2) {
      this.component.$data.json = `${this.component.$data.json}<span class="json__array">`;
    }
  }

  exitArray(ctx) {
    if (ctx.children.length > 2) {
      this.component.$data.json = `${this.component.$data.json}</span>`;
    }
    this.component.$data.json = `${this.component.$data.json}<span class="json__square-bracket">]</span>`;
  }

  static getValueClasses(node) {
    let booleanClass = '';
    if (node.symbol.text === 'false'
    || node.symbol.text === 'true') {
      booleanClass = ' json__value--boolean';
    }

    let nullClass = '';
    if (node.symbol.text === 'null') {
      nullClass = ' json__value--null';
    }

    return `json__value${booleanClass}${nullClass}`;
  }

  enterValue(ctx) {
    if (ctx.parentCtx instanceof JSONParser.PairContext) {
      if (typeof ctx.children[0].symbol !== 'undefined') {
        const valueClasses = JSONDrawer.getValueClasses(ctx.children[0]);
        this.component.$data.json = `${this.component.$data.json}<span class="${valueClasses}">${ctx.children[0].symbol.text}</span>`;
        return;
      }
    }

    if (ctx.parentCtx instanceof JSONParser.ArrayContext) {
      if (typeof ctx.children[0] !== 'undefined'
      && typeof ctx.children[0].symbol !== 'undefined') {
        const valueClasses = JSONDrawer.getValueClasses(ctx.children[0]);
        this.component.$data.json = `${this.component.$data.json}<span class="json__value--array-item">`;
        this.component.$data.json = `${this.component.$data.json}<span class="${valueClasses}">${ctx.children[0].symbol.text}</span>`;
        this.component.$data.json = `${this.component.$data.json}<span class="json__comma">,</span>`;
        this.component.$data.json = `${this.component.$data.json}</span>`;
      }
    }
  }

  enterPair(ctx) {
    const hasObjectAsValue = ctx.children[2].children[0] instanceof JSONParser.ObjContext;
    const hasArrayAsValue = ctx.children[2].children[0] instanceof JSONParser.ArrayContext;

    let objectClass = '';
    if (hasObjectAsValue) {
      objectClass = ' json__pair--object';
    }
    let arrayClass = '';
    if (hasArrayAsValue) {
      arrayClass = ' json__pair--array';
    }

    const pairClasses = `json__pair${objectClass}${arrayClass}`;
    this.component.$data.json = `${this.component.$data.json}<span class="${pairClasses}">`;
    this.component.$data.json = `${this.component.$data.json}<span class="json__key-value">`;
    this.component.$data.json = `${this.component.$data.json}<span class="json__key">${ctx.children[0].symbol.text}</span>`;
    this.component.$data.json = `${this.component.$data.json}<span class="json__colon">${ctx.children[1].symbol.text} </span>`;
  }

  exitPair(ctx) {
    const hasObjectAsValue = ctx.children[2].children[0] instanceof JSONParser.ObjContext;
    const hasArrayAsValue = ctx.children[2].children[0] instanceof JSONParser.ArrayContext;

    if (hasObjectAsValue || hasArrayAsValue) {
      this.component.$data.json = `${this.component.$data.json}<span class="json__comma">,</span>`;
    }
    this.component.$data.json = `${this.component.$data.json}</span>`; // key-value

    if (!hasObjectAsValue && !hasArrayAsValue) {
      this.component.$data.json = `${this.component.$data.json}<span class="json__comma">,</span>`;
    }

    this.component.$data.json = `${this.component.$data.json}</span>`; // pair
  }
};

export default JSONDrawer;
