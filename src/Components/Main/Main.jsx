import { Routes, Route } from 'react-router-dom'
import Header from './Header/Header'
import Category from './Category/Category'
import Restuarant from './Restuarant/Restuarant'
import Product from './Product/Product'
import Basket from '../Basket/Basket'

function Main() {
    return(<>
        <Header></Header>
        <Routes>
            <Route path='/' element={<Category/>}/>
            <Route path='/restuarant/:id' element={<Restuarant/>}/>
            <Route path='/products/:id' element={<Product/>}/>
            <Route path='/basket' element={<Basket/>}/>
        </Routes>
    </>)
}

export default Main