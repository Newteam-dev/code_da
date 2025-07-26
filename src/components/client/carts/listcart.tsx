// src/components/client/carts/ListCart.tsx
import React, { useContext, useState, useEffect } from 'react';
import { cartContext } from '../../../context/Cart';
import { CartActionType, IProductCart } from '../../../interface/cart';
import { CloseOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../config/axios'; // Giả định bạn có cấu hình axios
import { message } from 'antd'; // Để hiển thị thông báo thành công/lỗi

const ListCart: React.FC = () => {
  const { cartstate, dispatch } = useContext(cartContext);
  const navigate = useNavigate();

  // State để quản lý số lượng cục bộ
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    // Khởi tạo số lượng từ cartstate.carts
    const initialQuantities = cartstate.carts.reduce((acc, item) => {
      acc[item.productId.id] = item.quantity;
      return acc;
    }, {} as { [key: number]: number });
    setQuantities(initialQuantities);
  }, [cartstate.carts]);

  const updateOrder = (pid: number, quantity: number, checked: boolean) => {
    const order = cartstate.order || [];
    if (checked) {
      const existing = order.find((item: any) => item.productId === pid);
      if (existing) {
        const updatedOrder = order.map((item: any) =>
          item.productId === pid ? { ...item, quantity } : item
        );
        dispatch({ type: CartActionType.CheckOut, payload: updatedOrder });
      } else {
        dispatch({
          type: CartActionType.CheckOut,
          payload: [...order, { productId: pid, quantity }],
        });
      }
    } else {
      const updatedOrder = order.filter((item: any) => item.productId !== pid);
      dispatch({ type: CartActionType.CheckOut, payload: updatedOrder });
    }
  };

  const handleQuantityChange = (pid: number, value: number) => {
    const newQuantities = { ...quantities, [pid]: value };
    setQuantities(newQuantities);
    const item = cartstate.carts.find((cartItem) => cartItem.productId.id === pid);
    if (item) {
      updateOrder(pid, value, true); // Cập nhật order khi thay đổi số lượng
    }
  };

  const removeItem = async (pid: number) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: 'Bearer ' + token },
      };
      // Gọi API xóa sản phẩm khỏi giỏ hàng (giả định endpoint)
      await api.delete(`/carts/${pid}`, config);

      // Cập nhật state sau khi xóa thành công
      const updatedCarts = cartstate.carts.filter((item) => item.productId.id !== pid);
      dispatch({ type: CartActionType.UpdateCart, payload: updatedCarts });

      // Cập nhật order
      const updatedOrder = cartstate.order.filter((item: any) => item.productId !== pid);
      dispatch({ type: CartActionType.CheckOut, payload: updatedOrder });

      message.success('Sản phẩm đã được xóa khỏi giỏ hàng!');
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
      message.error('Không thể xóa sản phẩm. Vui lòng thử lại!');
    }
  };

  const total = cartstate.carts.reduce(
    (total: number, item: IProductCart) =>
      total + (Number(quantities[item.productId.id] || item.quantity) * Number(item.productId.price) || 0),
    0
  );

  return (
    <div id="list-product" className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Danh sách sản phẩm trong giỏ hàng</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Chọn</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Ảnh</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Tên sản phẩm</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Đơn giá</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Số lượng</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Thành tiền</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Xóa</th>
            </tr>
          </thead>
          <tbody>
            {cartstate.carts &&
              cartstate.carts.map((item: IProductCart, index: number) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      onChange={(e) => updateOrder(item.productId.id, quantities[item.productId.id] || item.quantity, e.target.checked)}
                      defaultChecked={!!cartstate.order.find((o: any) => o.productId === item.productId.id)}
                    />
                  </td>
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
                  <td className="py-4 px-4">
                    <input
                      type="number"
                      min="1"
                      value={quantities[item.productId.id] || item.quantity}
                      onChange={(e) => handleQuantityChange(item.productId.id, parseInt(e.target.value) || 1)}
                      className="w-16 p-1 border rounded"
                    />
                  </td>
                  <td className="py-4 px-4">
                    ₫
                    {(quantities[item.productId.id] || item.quantity) * Number(item.productId.price).toLocaleString()}
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
        <Link
          to="/checkout"
          className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default ListCart;