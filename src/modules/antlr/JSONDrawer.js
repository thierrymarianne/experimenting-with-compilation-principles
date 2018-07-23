import JSONListener from './JSONListener';
import JSONParser from './JSONParser';

const JSONDrawer = class extends JSONListener {
  constructor(domElement) {
    super();
    this.element = domElement;
  }

  enterJson() {
    this.element.$data.html = `${this.element.$data.html}<span class="json"></span>`;
  }

  exitJson() {
    this.element.$data.html = `${this.element.$data.html}<span class="json"></span>`;
  }

  enterObj() {
    this.element.$data.html = `${this.element.$data.html}<span class="parentheses">{</span>`;
  }

  exitObj() {
    this.element.$data.html = `${this.element.$data.html}<span class="parentheses">}</span>`;
  }

  enterValue(ctx) {
    if (ctx.parentCtx instanceof JSONParser.PairContext) {
      this.element.$data.html = `${this.element.$data.html}<span class="value-start">${ctx.children[0].symbol.text}</span>`;
    }
  }

  enterPair(ctx) {
    this.element.$data.html = `${this.element.$data.html}<span class="key">${ctx.children[0].symbol.text}</span>`;
    this.element.$data.html = `${this.element.$data.html}<span class="column">${ctx.children[1].symbol.text} </span>`;
  }

  exitPair() {
    this.element.$data.html = `${this.element.$data.html}<span class="pair">,</span>`;
  }
};

export default JSONDrawer;
