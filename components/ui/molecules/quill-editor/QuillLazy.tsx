import dynamic from 'next/dynamic';

export const QuillText = dynamic(() => import('./QuillEditor'), {
  ssr: false,
});
