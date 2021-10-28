import { FC, ScriptHTMLAttributes } from 'react';

export const Script: FC<ScriptHTMLAttributes<HTMLScriptElement>> = ({ children, ...rest }) =>
  process.env.NODE_ENV !== 'production' ? null : (
    <script
      {...rest}
      dangerouslySetInnerHTML={{ __html: children ? `(() => { ${children.toString()} })();` : undefined }}
    ></script>
  );
