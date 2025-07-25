import React from 'react'
import { useRoutes } from 'react-router-dom'
import ClientLayout from './layout/client'
import AdminLayout from './layout/admin'
import Home from './components/client/home'
import Detail from './components/client/detail'
import ProductList from './components/admin/productlist'
import ProductAdd from './components/admin/productadd'
import ProductEdit from './components/admin/productedit'
import Login from './components/client/user/login'
import SearchProduct from './components/client/products/search'
import ListCart from './components/client/carts/listcart'
import CheckOut from './components/client/carts/checkout'

type Props = {}

const App = (props: Props) => {
  const routes = useRoutes([
      {path:"/",element:<ClientLayout/>,children:[
        {path:"",element:<Home/>},
        {path:"search",element:<SearchProduct/>},
        {path:"cart",element:<ListCart/>},
        {path:"checkout",element:<CheckOut/>},
        {path:"detail/:id",element:<Detail/>},
        {path:"login",element:<Login/>}
      ]},
      {path:"/dashboard",element:<AdminLayout/>,children:[
          {path:"product-list",element:<ProductList/>},
          {path:"product-add",element:<ProductAdd/>},
          {path:"product-edit/:id",element:<ProductEdit/>}
      ]},
  ])
  return routes
}

export default App