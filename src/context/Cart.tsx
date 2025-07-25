// src/context/Cart.tsx
import React, { createContext, ReactNode, useReducer } from 'react';
import { reducer } from '../reducers/count'; // Không dùng trong trường hợp này, có thể xóa
import { cartReducer } from '../reducers/cartreducer';
import { ICart } from '../interface/cart';
import ProductsInCart from '../components/client/carts/productsincart';

type Props = {
  children: ReactNode;
};

// Định nghĩa kiểu cho context
interface CartContextType {
  cartstate: ICart;
  dispatch: React.Dispatch<any>; // Thay 'any' bằng kiểu action nếu có
}

export const cartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<Props> = ({ children }) => {
  const cartInit: ICart = {
    carts: [],
    order: [],
    isOpenCart: false,
  };

  const [cartstate, dispatch] = useReducer(cartReducer, cartInit);

  return (
    <cartContext.Provider value={{ cartstate, dispatch }}>
      {children}
      {cartstate.isOpenCart && <ProductsInCart />}
    </cartContext.Provider>
  );
};

export default CartProvider;

// Custom hook để sử dụng context
export const useCart = () => {
  const context = React.useContext(cartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};