import { Chip, Typography } from '@material-ui/core';
import * as React from 'react';
import ReactQuill from 'react-quill';

type Props = {
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  onFocus: (e: any) => void;
  value: any;
  ownId?: string;
  placeholder?: string;
  error?: any;
};

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote'],
  ['link'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];

export const quillPlaceholder = '<p><br></p>';

const QuillEditor = React.memo<Props>(({ onChange, value, onFocus, onBlur, ownId = 'quill-editor', placeholder, error }) => {
  const quillRef = React.useRef<ReactQuill | null>(null);

  React.useEffect(() => {
    document.querySelectorAll('.ql-picker').forEach(tool => {
      tool.addEventListener('mousedown', function (event) {
        event.preventDefault();
        event.stopPropagation();
      });
    });
  }, []);

  const handleChange = React.useCallback(
    (textHTML: string, delta: any, source: string, editor: any) => {
      if (!onChange || source !== 'user') {
        return;
      }
      const text = editor.getText();
      if (!text) {
        textHTML = '';
      }
      onChange(textHTML);
    },
    [onChange]
  );

  const toolbar = React.useMemo(
    () => ({
      container: toolbarOptions,
    }),
    []
  );
  if (ReactQuill === null) return null;

  return (
    <>
      <ReactQuill
        id={ownId}
        ref={el => (quillRef.current = el)}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        modules={{
          toolbar,
        }}
        scrollingContainer={document.documentElement}
        placeholder={placeholder}
      />
      {error && <Typography children={error} color="error" variant="caption" />}
    </>
  );
});

export default QuillEditor;
