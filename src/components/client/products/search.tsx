import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../../../config/axios'
import ProductItem from './item'
import { IProduct } from '../../../interface/product'

const SearchProduct = () => {
    const [serachparams] = useSearchParams()
    const [products,setProducts] = useState<IProduct[]>([])
    const keyword = serachparams.get("keyword")
    useEffect(()=>{      
        const getProductbykeyword = async (k:string)=>{
            try {
                const {data} = await api.get(`/products?name_like=${keyword}`)
                setProducts(data)
            } catch (error) {
                
            }
        }
        getProductbykeyword(keyword as string)
    },[keyword])
  return (
    <div>
        <h1 className='text-[1.2rem] text-center my-4'>Kết quả tìm kiếm từ khóa: {keyword}</h1>
      <div className='grid grid-cols-4 gap-4'>
      {
        (products)&&products.map((product)=>(
          <ProductItem key={product.id} product ={product}/>
        ))
      }
      </div>
    </div>
  )
}

export default SearchProduct