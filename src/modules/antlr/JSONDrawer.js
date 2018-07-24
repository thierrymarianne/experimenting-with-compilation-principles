import JSONListener from './JSONListener';
import JSONParser from './JSONParser';

const JSONDrawer = class extends JSONListener {
  constructor(component) {
    super();
    this.component = component;
  }

  enterJson() {
    this.component.$data.html = `${this.component.$data.html}<span class="json"></span>`;
  }

  exitJson() {
    this.component.$data.html = `${this.component.$data.html}<span class="json"></span>`;
  }

  enterObj() {
    this.component.$data.html = `${this.component.$data.html}<span class="parentheses">{</span>`;
  }

  exitObj() {
    this.component.$data.html = `${this.component.$data.html}<span class="parentheses">}</span>`;
  }

  enterValue(ctx) {
    if (ctx.parentCtx instanceof JSONParser.PairContext) {
      this.component.$data.html = `${this.component.$data.html}<span class="value-start">${ctx.children[0].symbol.text}</span>`;
    }
  }

  enterPair(ctx) {
    this.component.$data.html = `${this.component.$data.html}<span class="key">${ctx.children[0].symbol.text}</span>`;
    this.component.$data.html = `${this.component.$data.html}<span class="column">${ctx.children[1].symbol.text} </span>`;
  }

  exitPair() {
    this.component.$data.html = `${this.component.$data.html}<span class="pair">,</span>`;
  }
};

export default JSONDrawer;
