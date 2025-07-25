// src/components/ClientHeader.tsx
import React, { useContext, useEffect } from 'react';
import { cartContext } from '../../context/Cart';
import { api } from '../../config/axios';
import { CartActionType, IProductCart } from '../../interface/cart';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaBell, FaShoppingCart, FaHeart } from 'react-icons/fa';

const ClientHeader: React.FC = () => {
  const { cartstate, dispatch } = useContext(cartContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const { data } = await api.get('carts', config);
        dispatch({ type: CartActionType.UpdateCart, payload: data.data.Items });
      } catch (error) {
        // Handle error if needed
      }
    })();
  }, []);

  const onSubmit = (data: { keyword: string }) => {
    navigate(`/search?keyword=${data.keyword}`);
  };

  const cartQuantity = cartstate.carts.reduce((total: number, item: IProductCart) => total + item.quantity, 0);

  return (
    <header className="bg-white text-gray-800 border-b">
      {/* Hotline on top */}
      <div className="max-w-7xl mx-auto px-4 py-1 text-sm text-gray-500">
        <a href="tel:19008079" className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          Hỗ trợ khách hàng: 1900 8079
        </a>
      </div>

      {/* Main header content */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="mr-6">
          <img src="https://owen.cdn.vccloud.vn/static/version1753375707/frontend/Owen/owen2021/vi_VN/images/logo.svg" alt="Owenlaf Logo" className="h-8" />
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6 mx-6">
          <a href="/" className="hover:text-green-600 text-base font-medium uppercase">Trang chủ</a>
          <a href="/ao" className="hover:text-green-600 text-base font-medium uppercase">Áo</a>
          <a href="/quan" className="hover:text-green-600 text-base font-medium uppercase">Quần</a>
          <a href="/phu-kien" className="hover:text-green-600 text-base font-medium uppercase">Phụ kiện</a>
          <a href="/giatot" className="hover:text-green-600 text-base font-medium uppercase">Giá tốt</a>
          <a href="/hang-moi" className="hover:text-green-600 text-base font-medium uppercase text-red-500">HÀNG MỚI</a>
          <a href="/cua-hang" className="hover:text-green-600 text-base font-medium uppercase">Cửa hàng</a>
        </nav>

        {/* Search and Icons */}
        <div className="flex items-center space-x-4">
          <form className="relative" onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('keyword')}
              className="outline-0 text-gray-700 px-3 py-1 w-[150px] md:w-[200px] rounded-full border border-gray-300 placeholder-gray-400 text-sm"
              type="text"
              placeholder="Bạn tìm gì..."
            />
            <button
              type="submit"
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaSearch className="w-4 h-4" />
            </button>
          </form>
          <button className="hover:text-green-600 relative">
            <FaHeart className="w-5 h-5" />
          </button>
          <button className="hover:text-green-600 relative" onClick={() => dispatch({ type: CartActionType.ChangeStatusCart, payload: true })}>
            <FaShoppingCart className="w-5 h-5" />
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartQuantity}
              </span>
            )}
          </button>
          <button className="hover:text-green-600">
            <FaUser className="w-5 h-5" />
          </button>
          <button className="hover:text-green-600">
            <FaBell className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;