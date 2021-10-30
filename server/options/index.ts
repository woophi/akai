const mem_options: Record<string, any> = {};

export const get = (key: string) => {
  return mem_options[key];
};
export const set = (key: any, value: any) => {
  mem_options[key] = value;
};
