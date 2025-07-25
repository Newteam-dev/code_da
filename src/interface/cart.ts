import { IProduct } from "./product";

export interface ICart {
    carts:IProductCart[],
    isOpenCart:boolean,
    order:IProductCart[],
}

export interface IProductCart {
  productId: IProduct;
  quantity: number;
}
export enum CartActionType{
    "UpdateCart",
    "ChangeStatusCart",
    "CheckOut"
}