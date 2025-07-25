import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const ClientFooter: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Cột 1: Logo và thông tin công ty */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-3xl font-bold mb-2">NEWSTYLES
            </h3>
            <p className="text-sm">
              {/* CÔNG TY CỔ PHẦN THƯƠNG MẠI KOWIL VIỆT NAM */}
              <br />
              Hotline: 1900 8079
              <br />
              8:30 - 19:00 tất cả các ngày trong tuần.
              <br />
              VP Chính: Tầng 17 tòa nhà Vivaseen, 48 Phố Tố Hữu, Trung Văn, Nam Từ Liêm, Hà Nội.
              <br />
              VP Phía Nam: 186A Nam Kỳ Khởi Nghĩa, Phường 6 Thị, Sâu, Quận 3, TP.HCM
            </p>
          </div>

          {/* Cột 2: Giới thiệu Owen */}
          <div>
            <h4 className="text-lg font-semibold mb-2">GIỚI THIỆU OWEN</h4>
            <ul className="text-sm space-y-1">
              <li>Giới thiệu</li>
              <li>Blog</li>
              <li>Hệ thống cửa hàng</li>
              <li>Liên hệ với Owen</li>
              <li>Chính sách bảo mật</li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div>
            <h4 className="text-lg font-semibold mb-2">HỖ TRỢ KHÁCH HÀNG</h4>
            <ul className="text-sm space-y-1">
              <li>Hỏi đáp</li>
              <li>Chính sách vận chuyển</li>
              <li>Hướng dẫn chọn kích cỡ</li>
              <li>Hướng dẫn thanh toán</li>
              <li>Quy định đổi hàng</li>
              <li>Hướng dẫn mua hàng</li>
            </ul>
          </div>

          {/* Cột 4: Kết nối và thanh toán */}
          <div>
            <h4 className="text-lg font-semibold mb-2">KẾT NỐI</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" aria-label="Facebook">
                <FaFacebook className="text-gray-800 hover:text-blue-600" size={24} />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="text-gray-800 hover:text-pink-600" size={24} />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube className="text-gray-800 hover:text-red-600" size={24} />
              </a>
            </div>
            <div className="flex space-x-2">
              <img src="https://owen.cdn.vccloud.vn/static/version1753375707/frontend/Owen/owen2021/vi_VN/images/pay.png" alt="Visa" className="h-6" />
              {/* <img src="https://owen.cdn.vccloud.vn/static/version1753375707/frontend/Owen/owen2021/vi_VN/images/pay.png" alt="MasterCard" className="h-6" />
              <img src="https://owen.cdn.vccloud.vn/static/version1753375707/frontend/Owen/owen2021/vi_VN/images/pay.png" alt="Internet Banking" className="h-6" />
              <img src="https://owen.cdn.vccloud.vn/static/version1753375707/frontend/Owen/owen2021/vi_VN/images/pay.png" alt="COD" className="h-6" /> */}
            </div>
            <p className="text-sm mt-2">PHƯƠNG THỨC THANH TOÁN</p>
          </div>
        </div>

        {/* Dòng bản quyền */}
        <div className="mt-8 text-center text-sm border-t border-gray-300 pt-4">
          <p>© 2020 by Newteam_media Fashion </p>
        </div>
      </div>
    </footer>
  );
};

export default ClientFooter;