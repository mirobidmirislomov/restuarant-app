import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import './Restuarant.css'
import { NavLink } from 'react-router-dom' 

const RESTUARANTS = gql`
    mutation restuarants($id: ID!) {
        restuarants(id: $id) {
            id
            name
            img
        }
    }   
`

function Restuarant() {
    const [ state, setState ] = useState()
    const id = window.location.href.split('/').reverse()[0]
    const [restuarants] = useMutation(RESTUARANTS, {
        update: (cache, data) => {
            setState(data.data);
        }
    })

    if(!state) {
        restuarants({
             variables: {
                id
            }
        })
    }
    return(
        <div className="container restuarants-wrapper">
            {state && state.restuarants.map((e, i) => {
                return <NavLink key={i} className='navLink' to={'/products/' + e.id}>
                    <div className="card" style={{backgroundImage: `url(${e.img})`}}>
                    <h1 className='restuarant_header'>{e.name}</h1>
                </div>
            </NavLink>
            })}
        </div>
    )
}

export default Restuarant