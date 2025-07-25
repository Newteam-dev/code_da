import { CloseOutlined } from '@ant-design/icons'
import React, { useContext, useEffect } from 'react'
import { cartContext } from '../../../context/Cart'
import { CartActionType, IProductCart } from '../../../interface/cart'
import { Link } from 'react-router-dom'

const CheckOut = () => {
    const {cartstate,dispatch} = useContext(cartContext)
    useEffect(()=>{
        console.log(cartstate);        
    },[cartstate])
    return (
      <div id='list-product'> 
      <h1>Danh sách sản phẩm trong giỏ hàng</h1>         
          <table className='w-full'>
            <thead>
                <tr>
                    <th>Ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th>Xóa</th>
                </tr>
            </thead>
            <tbody>
              {(cartstate.order)&&
              cartstate.order.map((item:IProductCart,index:number)=>(
                  <tr key={index}>                    
                    <td><img src={item.productId.images} width={90}/></td>
                    <td><h3>{item.productId.name}</h3> </td> 
                    <td>{item.quantity}</td>                   
                    <td>{item.productId.price}</td>
                    <td>{item.quantity*Number(item.productId.price)}</td>
                    <td><button>Xóa</button></td>
                  </tr>
              ))
              }
              </tbody>
          </table>
          <div className=''>Tổng tiền: {cartstate.carts.reduce((total:any,item:IProductCart)=>total+Number(item.productId.price)*item.quantity,0)}</div>
        <Link to={'/checkout'}>Checkout</Link>
      </div>
    )
}

export default CheckOut