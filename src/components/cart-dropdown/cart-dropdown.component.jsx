import './cart-dropdown.styles.scss'
import Button from '../button/button.component';

const CartDropdown = () => {
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items-container'>
                <span className='empty-message'>Your cart is empty
                </span>
            </div>
            <Button>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;