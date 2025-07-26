// src/components/client/products/ProductItem.tsx
import React, { useContext } from 'react';
import { IProduct } from '../../../interface/product';
import StarRating from './starrating';
import { cartContext } from '../../../context/Cart';
import { api } from '../../../config/axios';
import { CartActionType } from '../../../interface/cart';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

type Props = {
  product: IProduct;
};

const ProductItem: React.FC<Props> = ({ product }) => {
  const { dispatch } = useContext(cartContext);
  const navigate = useNavigate();

  const AddToCart = async (id: number) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: 'Bearer ' + token },
    };
    const cartdata = {
      productId: id,
      quantity: 1,
    };
    try {
      const { data } = await api.post('carts', cartdata, config);
      dispatch({ type: CartActionType.UpdateCart, payload: data.data.Items });
      message.success(data.message);
      dispatch({ type: CartActionType.ChangeStatusCart, payload: true });
    } catch (error) {
      // Handle error if needed
    }
  };

  const handleViewDetail = () => {
    navigate(`/detail/${product.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group relative">
      {/* Product Image with Overlay */}
      <div className="w-full h-64 overflow-hidden relative">
        <img
          src={product.images}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleViewDetail}
            className="bg-blue-600 text-white px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Xem chi tiết
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
        <p className="text-red-600 font-bold mt-2">₫{Number(product.price).toLocaleString()}</p>
        <div className="flex items-center mt-1">
          <StarRating score={product.score} />
        </div>
        <button
          onClick={() => AddToCart(product.id)}
          className="mt-3 w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductItem;