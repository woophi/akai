type Logger = {
  info: (msg: any, ...args: any) => void;
  debug: (msg: any, ...args: any) => void;
  error: (msg: any, ...args: any) => void;
};

export const Logger: Logger = {
  info: (msg, ...rest) => {
    console.log('\x1b[36m%s\x1b[0m', msg, ...rest);
  },
  debug: (msg, ...rest) => {
    console.debug('\x1b[33m%s\x1b[0m', msg, ...rest);
  },
  error: (msg, ...rest) => {
    console.trace('\x1b[41m%s\x1b[0m', 'ERROR ', msg, ...rest);
  }
};
