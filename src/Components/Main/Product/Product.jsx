import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import './Product.css'
import { NavLink } from 'react-router-dom' 

const PRODUCTS = gql`
    mutation products($id: ID!) {
        products(id: $id) {
            id
            name
            img
            price
        }
    }   
`
const ADD_PRODUCT_BASKET = gql`
    mutation basketProducts($id: ID!) {
        basketProducts(id: $id)
    } 
`

function Product() {
    const [ state, setState ] = useState()
    const id = window.location.href.split('/').reverse()[0]
    const [products] = useMutation(PRODUCTS, {
        update: (cache, data) => {
            setState(data.data);
        }
    })

    if(!state) {
        products({
             variables: {
                id
            }
        })
    }
    const [product] = useMutation(ADD_PRODUCT_BASKET, {
        update: (cache, data) => {
            console.log(data);
        }
    })

    return(
        <div className="container restuarants-wrapper" id='container'>
            {state && state.products.map((e, i) => {
                return <div className="product-card" key={i}>
                        <img className="product-img" src={e.img} width={400}/>
                        <h2 className='product-header'>{e.name}</h2>
                        <h3 className='product-price'>{e.price} so'm</h3>
                        <a href='' className='btn' onClick={() => {
                            product({
                                variables: {
                                   id: e.id
                               }
                           })
                        }}>Savatga qo'shish</a>
                    </div>
            })}
        </div>
    )
}

export default Product