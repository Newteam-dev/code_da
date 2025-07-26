// src/components/client/carts/ProductsInCart.tsx
import React, { useContext } from 'react';
import { cartContext } from '../../../context/Cart';
import { CartActionType, IProductCart } from '../../../interface/cart';
import { CloseOutlined } from '@ant-design/icons';

const ProductsInCart: React.FC = () => {
  const { cartstate, dispatch } = useContext(cartContext);

  return (
    <div
      id="cart-sidebar"
      className="fixed top-0 right-0 w-[400px] h-screen bg-white border-l border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out z-50"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800">Giỏ hàng</h2>
        <button
          onClick={() => dispatch({ type: CartActionType.ChangeStatusCart, payload: false })}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          <CloseOutlined style={{ fontSize: '20px' }} />
        </button>
      </div>

      {/* Product List */}
      <div className="p-4 overflow-y-auto h-[calc(100%-120px)]">
        <ul>
          {cartstate.carts &&
            cartstate.carts.map((item: IProductCart, index: number) => (
              <li
                key={index}
                className="flex items-center py-4 border-b border-gray-200 last:border-b-0"
              >
                <img
                  src={item.productId.images}
                  alt={item.productId.name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-md font-semibold text-gray-800 line-clamp-2">
                    {item.productId.name}
                  </h3>
                  <span className="text-red-600 font-bold">
                    ₫{Number(item.productId.price).toLocaleString()}
                  </span>
                  <p className="text-gray-600 text-sm">SL: {item.quantity}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* Footer - Total and Actions */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-lg font-semibold text-gray-800 mb-4">
          Tổng tiền: ₫
          {cartstate.carts.reduce(
            (total: number, item: IProductCart) => total + Number(item.productId.price) * item.quantity,
            0
          ).toLocaleString()}
        </div>
        <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Xem giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductsInCart;