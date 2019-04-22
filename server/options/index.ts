exports._options = {};

export const get = (key: string) => {
  return this._options[key];
}
export const set = (key: string, value: string) => {
  this._options[key] = value;
}
