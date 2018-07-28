import JSONListener from './JSONListener';
import JSONParser from './JSONParser';

const Scope = class {
  constructor(type) {
    this.type = type;
    this.content = '';
  }

  appendContent(content) {
    this.content += content;
  }

  replaceContent(content) {
    this.content = content;
  }
};

const JSONDrawer = class extends JSONListener {
  constructor(component) {
    super();

    this.component = component;
    this.editor = this.component.$refs.jsonEditor;

    this.scopes = {
      json: [],
      object: [],
      value: [],
      pair: [],
      array: [],
    };
  }

  enterJson() {
    this.scopes.json.push(new Scope(null, 'json'));
    this.component.$data.json = `${this.component.$data.json}`;
  }

  exitJson() {
    const valueContent = this.scopes.value[this.scopes.value.length - 1].content;
    const template = `<span class="json">${valueContent}</span>`;

    if (typeof this.editor.setJsonTemplate !== 'function') {
      this.component.$refs.jsonEditor.template = template;
      return;
    }

    this.editor.setJsonTemplate(template);
    this.scopes.json.pop();
  }

  enterObj() {
    this.scopes.object.push(new Scope('object'));
  }

  exitObj(ctx) {
    const hasChildren = ctx.children.length > 2;
    let hasChildrenAttr = '';
    if (hasChildren) {
      hasChildrenAttr = ' hasChildren';
    }

    const totalNonTerminalChildren = ctx.children.filter(
      child => child instanceof JSONParser.PairContext,
    );

    let contentCollection = [];
    contentCollection = [...Array(totalNonTerminalChildren.length).keys()].reduce((contents) => {
      if (this.scopes.pair.length === 0) {
        return contents;
      }

      contents.push(this.scopes.pair[this.scopes.pair.length - 1].content);
      this.scopes.pair.pop();
      return contents;
    }, contentCollection);

    const objectPairs = contentCollection.reverse().join('<span class="json__comma">,</span>');
    const template = `<json-object${hasChildrenAttr}>${objectPairs}</json-object>`;
    this.scopes.object[this.scopes.object.length - 1].appendContent(template);
  }

  enterArray() {
    this.scopes.array.push(new Scope('array'));
  }

  exitArray(ctx) {
    const hasChildren = ctx.children.length > 2;
    let hasChildrenAttr = '';
    if (hasChildren) {
      hasChildrenAttr = ' hasChildren';
    }

    const totalChildren = ctx.children.filter(
      child => child instanceof JSONParser.ValueContext,
    );

    let contentCollection = [];
    contentCollection = [...Array(totalChildren.length).keys()].reduce((contents) => {
      if (this.scopes.value.length === 0) {
        return contents;
      }

      contents.push(this.scopes.value[this.scopes.value.length - 1].content);
      this.scopes.value.pop();
      return contents;
    }, contentCollection);

    const arrayValues = contentCollection.reverse().join('<span class="json__comma">,</span>');
    const template = `<json-array${hasChildrenAttr}>${arrayValues}</json-array>`;
    this.scopes.array[this.scopes.array.length - 1].appendContent(template);
  }

  enterValue() {
    this.scopes.value.push(new Scope('value'));
  }

  exitValue(ctx) {
    let content;
    if (ctx.parentCtx instanceof JSONParser.JsonContext) {
      if (ctx.children[0] instanceof JSONParser.ObjContext) {
        content = this.scopes.object[this.scopes.object.length - 1].content;
        this.scopes.value[this.scopes.value.length - 1].appendContent(content);
        this.scopes.object.pop();
      }

      if (ctx.children[0] instanceof JSONParser.ArrayContext) {
        content = this.scopes.array[this.scopes.array.length - 1].content;
        this.scopes.value[this.scopes.value.length - 1].appendContent(content);
        this.scopes.array.pop();
      }

      if (!(typeof ctx.children[0].symbol === 'undefined')) {
        content = ctx.children[0].symbol.text;
        this.scopes.value[this.scopes.value.length - 1].appendContent(content);
        this.scopes.array.pop();
      }

      return;
    }

    if (typeof ctx.children[0] === 'undefined'
    || typeof ctx.children[0].symbol === 'undefined') {
      let value;

      if (ctx.children[0] instanceof JSONParser.ObjContext) {
        value = this.scopes.object[this.scopes.object.length - 1].content;
        content = `<json-value>${value}</json-value>`;
        this.scopes.value[this.scopes.value.length - 1].appendContent(content);
        this.scopes.object.pop();
      }

      if (ctx.children[0] instanceof JSONParser.ArrayContext) {
        value = this.scopes.array[this.scopes.array.length - 1].content;
        content = `<json-value is-array-item>${value}</json-value>`;
        this.scopes.value[this.scopes.value.length - 1].appendContent(content);
        this.scopes.array.pop();
      }

      return;
    }

    const text = ctx.children[0].symbol.text;

    if (ctx.parentCtx instanceof JSONParser.PairContext) {
      this.scopes.value[this.scopes.value.length - 1].appendContent(`<json-value>${text}</json-value>`);
      return;
    }

    this.scopes.value[this.scopes.value.length - 1].appendContent(`<json-value is-array-item>${text}</json-value>`);
  }

  enterPair() {
    this.scopes.pair.push(new Scope('pair'));
  }

  exitPair(ctx) {
    const key = ctx.children[0];
    const colon = ctx.children[1];
    const valueFirstChild = ctx.children[2].children[0];
    let jsonPairTemplate;
    let content;

    if (
      !(valueFirstChild instanceof JSONParser.ObjContext)
      && !(valueFirstChild instanceof JSONParser.ArrayContext)
    ) {
      content = this.scopes.value[this.scopes.value.length - 1].content;
      this.scopes.value.pop();
      jsonPairTemplate = `
        <json-pair>
          <template slot='key'>
            ${key.symbol.text}
          </template>
          <template slot='colon'>
            ${colon.symbol.text}
          </template>
          <template slot='value'>
            ${content}
          </template>
        </json-pair>
      `;

      this.scopes.pair[this.scopes.pair.length - 1].appendContent(jsonPairTemplate);
      return;
    }

    const isChildObject = valueFirstChild instanceof JSONParser.ObjContext;
    const isChildArray = valueFirstChild instanceof JSONParser.ArrayContext;

    let isFirstChildArray = '';
    if (isChildArray) {
      isFirstChildArray = 'is-first-child-array';
    }

    let isFirstChildObject = '';
    if (isChildObject) {
      isFirstChildObject = 'is-first-child-object';
    }

    content = this.scopes.value[this.scopes.value.length - 1].content;
    this.scopes.value.pop();

    let isArrayOrObject = '';
    if (isChildObject || isChildArray) {
      isArrayOrObject = 'is-array-or-object';
    }

    jsonPairTemplate = `
      <json-pair ${isFirstChildArray} ${isFirstChildObject} ${isArrayOrObject}>
        <template slot='key'>
          ${key.symbol.text}
        </template>
        <template slot='colon'>
          ${colon.symbol.text}
        </template>
        <template slot='value'>
          ${content}
        </template>
      </json-pair>
    `;

    this.scopes.pair[this.scopes.pair.length - 1].appendContent(jsonPairTemplate);
  }
};

export default JSONDrawer;
