export const createElement = document.createElement.bind(document);

export const createTextNode = document.createTextNode.bind(document);

export const setAttribute = (ele: Element, name: string, value: any) => {
  name = fixReactAttrDiffName(name);
  if (isEventAttribute(name)) {
    let type = name.replace(/^on/, '').toLocaleLowerCase();
    let cb = value;
    ele.addEventListener(type, (event) => {
      console.log(type, event, cb);
      cb(event);
    }, false);
  } else {
    ele.setAttribute(name, value);
  }
};

const ReactDiffName = new Map([
  ['acceptCharset', 'accept-charset'],
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['httpEquiv', 'http-equiv']
]);

function fixReactAttrDiffName(name: string): string {
  return ReactDiffName.get(name) || name;
}

function isEventAttribute(name: string): boolean {
  return /^on/.test(name);
}