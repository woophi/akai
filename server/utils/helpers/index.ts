import { Request } from 'express';
export * from './validateEmail';
export * from './locales';

export const getUserIp = (req: Request) => {
	const ip = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		null;
	return ip;
};

export const checkConfiguration = (config: { [key: string]: any}) => {
  const missingConfigs = [];
  Object.keys(config).forEach(key => {
    if (config[key] === undefined) {
      missingConfigs.push(key);
    }
  });
  if (missingConfigs.length) {
    console.error('Missing configs for', missingConfigs.join(', '));
    process.exit(1);
  }
}

export const youtubePattern = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
