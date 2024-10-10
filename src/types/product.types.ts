export type TProduct = {
  id: number;
  title: string;
  cat_prefix: string;
  img: string;
  quantity?:number;
  price:number;
  max:number;
  isLiked?:boolean;
};
