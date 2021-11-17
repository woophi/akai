export const parseProductHref = (v: string) => {
  if (!v) throw new Error('Provide english value');
  return v.replace(/[^a-zA-Z]/g, '').replace(/ /g, '-');
};
