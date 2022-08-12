import { useSubscription, useMutation, gql, useQuery } from '@apollo/client'
import { NavLink } from 'react-router-dom'
import './Category.css'

const QUERY = gql`
    query {
        categories {
        id
        name
        img
        }
    }
`

function Category() {
    const { data } = useQuery(QUERY) 
    return(<div className='container category-wrapper'>
        {data && data.categories.map((e, i) => {
            return <NavLink key={i} className='navLink' to={'/restuarant/' + e.id}>
                <div className="card"  style={{backgroundImage: `url(${e.img})`}}>
                <h1 className='category_header'>{e.name}</h1>
                </div>
            </NavLink>
        })
            
        }
    </div>)
}
export default Category