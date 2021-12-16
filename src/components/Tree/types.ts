export type LinkTreeProps = {
  tree: {
    id: string;
    title: string;
    linkList: {
      no: number;
      link: string;
      favicon: string;
    }[];
  }[];
};
