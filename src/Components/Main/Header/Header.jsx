import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
    return(<>
        <section className='header-section'>
            <div className="container header-wrapper">
                <NavLink to='/' className="header">Restuarants</NavLink>
                <NavLink to='/basket'>
                    <img src="https://seekicon.com/free-icon-download/shopping-basket_2.svg" alt="basket" width={50} height={50}/>
                </NavLink>
            </div>
        </section>
    </>)
}

export default Header