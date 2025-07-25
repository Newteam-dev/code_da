import React, { useContext } from 'react'
import { cartContext } from '../../../context/Cart'
import { CartActionType, IProductCart } from '../../../interface/cart'
import { CloseOutlined } from '@ant-design/icons'

const ProductsInCart = () => {
    const {cartstate,dispatch} = useContext(cartContext)
  return (
    <div id='cart-sidebar' className='carts bg-white border fixed top-0 right-0 w-[400px] h-screen'>
        <button onClick={()=>dispatch({type:CartActionType.ChangeStatusCart,payload:false})}><CloseOutlined /></button>
        <ul>
            {(cartstate.carts)&&
            cartstate.carts.map((item:IProductCart,index:number)=>(
                <li key={index} className='flex'>
                  <img src={item.productId.images} width={90}/>
                  <div>
                  <h3>{item.productId.name}</h3> 
                  <span>{item.productId.price}</span>
                  <p>SL: {item.quantity}</p>
                  </div>
                </li>
            ))
            }
        </ul>
        <div className=''>Tổng tiền: {cartstate.carts.reduce((total:any,item:IProductCart)=>total+Number(item.productId.price)*item.quantity,0)}</div>
    </div>
  )
}

export default ProductsInCart