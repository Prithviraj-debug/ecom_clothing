import './cart-dropdown.styles.scss'
import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext);

    const goToCheckout = () => {
        navigate('/checkout');
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems ?
                    cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    )) : (
                    <span className='empty-message'>Your cart is empty
                    </span>
                    )
                }
            </div>
                <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;