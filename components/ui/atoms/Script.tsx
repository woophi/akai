import NextScript, { ScriptProps } from 'next/script';
import { FC } from 'react';

export const Script: FC<ScriptProps> = ({ children, ...rest }) =>
  process.env.NODE_ENV !== 'production' ? null : (
    <NextScript
      {...rest}
      dangerouslySetInnerHTML={{ __html: children ? `(() => { ${children.toString()} })();` : '' }}
    ></NextScript>
  );
