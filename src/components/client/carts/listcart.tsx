import { CloseOutlined } from '@ant-design/icons'
import React, { useContext } from 'react'
import { cartContext } from '../../../context/Cart'
import { CartActionType, IProductCart } from '../../../interface/cart'
import { Link } from 'react-router-dom'

const ListCart = () => {
    const {cartstate,dispatch} = useContext(cartContext)
    const updateOrder = (pid:number,quantity:number,e:any)=>{
        const order = cartstate.order
        console.log(order);        
        if (e.checked){
            const check = order.filter((item:any)=>item.productId==pid)
            if (check.length>0)
            {
            const orderupdate = order.map((item:any)=>(item.productId==pid)?{...item,quantity:quantity}:item)
            dispatch({type:CartActionType.CheckOut,payload:orderupdate})
            }
            else {
                dispatch({type:CartActionType.CheckOut,payload:[...order,{productId:pid,quantity:quantity}]}) 
            }
        }
        else {
            const orderupdate = order.filter((item:any)=>item.productId!=pid)
            dispatch({type:CartActionType.CheckOut,payload:orderupdate})
        }
    }
    return (
      <div id='list-product'> 
      <h1>Danh sách sản phẩm trong giỏ hàng</h1>         
          <table className='w-full'>
            <thead>
                <tr>
                    <th>Chọn</th>
                    <th>Ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th>Xóa</th>
                </tr>
            </thead>
            <tbody>
              {(cartstate.carts)&&
              cartstate.carts.map((item:IProductCart,index:number)=>(
                  <tr key={index}>
                    <td><input type='checkbox' onChange={(e)=>updateOrder(item.productId.id,item.quantity,e.target)}/></td>
                    <td><img src={item.productId.images} width={90}/></td>
                    <td><h3>{item.productId.name}</h3> </td> 
                    <td><input type='number' defaultValue= {item.quantity}/></td>                   
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

export default ListCart