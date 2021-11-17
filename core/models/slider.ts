export type SlideModel = {
  id: string;
  name: string;
  src: string;
  title?: string;
  subTitle?: string;
  button: {
    shopItemHref?: string;
    name?: string;
  };
};
