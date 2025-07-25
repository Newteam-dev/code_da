// src/components/Home.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { IProduct } from '../../interface/product';
import { api } from '../../config/axios';
import ProductItem from './products/item';
import { useData } from '../../hooks/usedata';
import Slideshow from './Slideshow';

const Home: React.FC = () => {
  const { data, isLoading } = useData<IProduct>('products');

  if (isLoading) {
    return <>Đang tải dữ liệu</>;
  }

  return (
    <div className="px-4 py-6">
      <Slideshow />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {data &&
          data.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Home;