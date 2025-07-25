// src/components/ProductDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: number;
  images: string;
  name: string;
  price: string;
  gallerys: string[];
  type: string;
  parent: number;
}

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  // Mảng sản phẩm
  const products: Product[] = [
    {
      id: 1,
      images: 'http://res.cloudinary.com/dkpfaleot/image/upload/v1744807381/react/ex5tv67s6cblskasewbx.jpg',
      name: 'Giày nữ ABC',
      price: '20000',
      gallerys: [
        'http://res.cloudinary.com/dkpfaleot/image/upload/v1744808159/react/reuy7lsnr8uvkldm7lae.jpg',
        'http://res.cloudinary.com/dkpfaleot/image/upload/v1744808159/react/m8tn5abaqhwzcilqf1ow.jpg',
        'http://res.cloudinary.com/dkpfaleot/image/upload/v1744808201/react/jh4oy5oddorfotjzb6y0.jpg',
      ],
      type: 'simple',
      parent: 0,
    },
    {
      id: 2,
      images: 'http://res.cloudinary.com/dkpfaleot/image/upload/v1744807381/react/ex5tv67s6cblskasewbx.jpg',
      name: 'Giày nam XYZ',
      price: '25000',
      gallerys: [
        'http://res.cloudinary.com/dkpfaleot/image/upload/v1744808159/react/reuy7lsnr8uvkldm7lae.jpg',
        'http://res.cloudinary.com/dkpfaleot/image/upload/v1744808159/react/m8tn5abaqhwzcilqf1ow.jpg',
      ],
      type: 'simple',
      parent: 0,
    },
    // Thêm sản phẩm khác nếu cần
  ];

  useEffect(() => {
    const selectedProduct = products.find((p) => p.id === (id ? parseInt(id) : 1));
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [id]);

  if (!product) {
    return <div>Đang tải sản phẩm...</div>;
  }

  const [mainImage, setMainImage] = useState<string>(product.images);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="w-full h-96 overflow-hidden rounded-lg">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex space-x-4">
            {[product.images, ...product.gallerys].map((gallery, index) => (
              <img
                key={index}
                src={gallery}
                alt={`${product.name} gallery ${index + 1}`}
                className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-75"
                onClick={() => setMainImage(gallery)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-xl text-red-600 font-semibold">₫{Number(product.price).toLocaleString()}</p>
          <p className="text-gray-600">Loại: {product.type}</p>
          <p className="text-gray-600">Mã sản phẩm: #{product.id}</p>
          <button className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;