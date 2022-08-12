import { useQuery, gql, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import './Basket.css'

const PRODUCTS = gql`
    query {
        products {
            id
            name
            img
            price
            count
        }
    }
`

const DEL_PRODUCT_BASKET = gql`
    mutation basketProductDel($id: ID!) {
        basketProductDel(id: $id)
    }
`

const ADD_ORDER = gql`
    mutation addOrder($product: String! $username: String! $address: String! $phone: String!) {
        addOrder(product: $product, username: $username, address: $address, phone: $phone) {
            id
            product
            username
            address
            phone
            created_at
        }
    }
`

function Basket() {
    const { data: basket } = useQuery(PRODUCTS)
    const [ state, setState ] = useState()

    const [delProduct] = useMutation(DEL_PRODUCT_BASKET, {
        update: (cache, data) => {
            console.log(data);
        }
    })

    const [addOrder] = useMutation(ADD_ORDER, {
        update: (cache, data) => {
            console.log(data);
        }
    })

    function handleSubmit(e) {
        e.preventDefault()

        const name = e.target.name.value
        const address = e.target.address.value
        const phone = e.target.number.value

        addOrder({
            variables: {
                product: state,
                username: name,
                address,
                phone
            }
        })
        window.location.href = '/'
    }
    let arr = []
    useEffect(()=>{
        for (let i = 0; i < basket?.products.length; i++) {
            const element = basket.products[i];
            if(basket.products.length > arr.length) {
                arr.push(element.name + ' ' + element.count)
            }
        }
        setState(arr.join(", "));
    }, [basket])

    return (
        <div className="container basket_wrapper">
            {
                basket && basket.products.map((e, i) => {
                    return <div className="cardBasket" key={i}>
                        <a style={{ textDecoration: "none" }} href='' className='delete_product' onClick={() => {
                            delProduct({
                                variables: {
                                    id: e.id
                                }
                            })
                        }}>X</a>
                        <img src={e.img} className='basket_img' alt='product' width={150} />
                        <div className="header_wrapper">
                            <h2 className='basket_header'>{e.name}</h2>
                            <h3 className='basket_price'>{e.price} so'm</h3>
                        </div>
                        <button className='basket_count'>{e.count} ta</button>
                    </div>
                })
            }

            {basket?.products.length ? <form className='form-basket' onSubmit={handleSubmit}>
                <input type="text" placeholder='You Name' required name='name' />
                <input type="text" placeholder='Address' required name='address' />
                <input type="number" placeholder='+998999999999' required name='number' />
                <button type="submit">Send</button>
            </form> : null}

        </div>

    )
}

export default Basket