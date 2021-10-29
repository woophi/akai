export const testEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const safeTrim = (v: string) => {
  if (!!v && !!v.trim) {
    return v.trim();
  }
  return v;
};

export const delay = (n: number) => new Promise(res => setTimeout(res, n));

export const objKeys = <T extends object>(obj: T) => Object.keys(obj) as (keyof T)[];

export const updateProps = <T>(target: T, updater: Partial<T> | ((target: T) => void)): void => {
  if (typeof target === 'undefined') {
    return;
  }
  try {
    if (typeof updater === 'function') {
      updater(target);
    } else {
      objKeys(updater).forEach(key => {
        // TS says that we cant assign undefined value to T[keyof T], but we need it
        target[key] = updater[key] as T[keyof T];
      });
    }
  } catch (error) {
    console.error(error);
  }
};
