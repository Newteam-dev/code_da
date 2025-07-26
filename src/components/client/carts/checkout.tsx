// src/components/client/carts/CheckOut.tsx
import React, { useContext, useState, useEffect } from 'react';
import { cartContext } from '../../../context/Cart';
import { CartActionType, IProductCart } from '../../../interface/cart';
import { CloseOutlined } from '@ant-design/icons';
import { api } from '../../../config/axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const CheckOut: React.FC = () => {
  const { cartstate, dispatch } = useContext(cartContext);
  const navigate = useNavigate();

  // State cho form thanh toán
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    city: '',
    note: '',
    paymentMethod: 'COD', // Mặc định COD (Cash on Delivery)
  });

  useEffect(() => {
    console.log(cartstate);
  }, [cartstate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const removeItem = async (pid: number) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: 'Bearer ' + token },
      };
      await api.delete(`/carts/${pid}`, config);

      const updatedOrder = cartstate.order.filter((item: any) => item.productId !== pid);
      dispatch({ type: CartActionType.CheckOut, payload: updatedOrder });

      message.success('Sản phẩm đã được xóa khỏi đơn hàng!');
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
      message.error('Không thể xóa sản phẩm. Vui lòng thử lại!');
    }
  };

  const total = cartstate.order.reduce(
    (total: number, item: IProductCart) => total + item.quantity * Number(item.productId.price),
    0
  );

  const handleCheckout = () => {
    // Logic xử lý thanh toán (gửi formData và cartstate.order lên server)
    console.log('Checkout data:', { ...formData, order: cartstate.order, total });
    message.success('Đơn hàng đã được đặt thành công!');
    navigate('/'); // Chuyển về trang chủ sau khi thanh toán
  };

  return (
    <div id="list-product" className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Hoàn tất đơn hàng</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Thanh toán và giao hàng (Bên trái) */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">Thông tin giao hàng</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Nhập địa chỉ giao hàng"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Nhập số điện thoại"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Chọn tỉnh/thành phố</option>
                <option value="Hanoi">Hà Nội</option>
                <option value="HCM">TP. Hồ Chí Minh</option>
                <option value="Danang">Đà Nẵng</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                placeholder="Nhập ghi chú (nếu có)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phương thức thanh toán</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                <option value="Bank">Chuyển khoản ngân hàng</option>
              </select>
            </div>
          </div>
        </div>

        {/* Danh sách sản phẩm (Bên phải) */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">Chi tiết đơn hàng</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">Ảnh</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">Tên sản phẩm</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">Đơn giá</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">Số lượng</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">Thành tiền</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {cartstate.order &&
                  cartstate.order.map((item: IProductCart, index: number) => (
                    <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <img
                          src={item.productId.images}
                          alt={item.productId.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <h3 className="text-md font-semibold text-gray-800 line-clamp-2">{item.productId.name}</h3>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-red-600 font-bold">₫{Number(item.productId.price).toLocaleString()}</span>
                      </td>
                      <td className="py-4 px-4">{item.quantity}</td>
                      <td className="py-4 px-4">
                        ₫{(item.quantity * Number(item.productId.price)).toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => removeItem(item.productId.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <CloseOutlined />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-right">
            <div className="text-xl font-semibold text-gray-800 mb-4">
              Tổng tiền: ₫{total.toLocaleString()}
            </div>
            <button
              onClick={handleCheckout}
              className="py-3 px-8 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;