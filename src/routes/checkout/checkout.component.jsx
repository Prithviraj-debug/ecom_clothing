import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import './checkout.styles.scss';
import Button from "../../components/button/button.component";

const Checkout = () => {
    const { cartItems, addItemToCart, removeItemFromCart, deleteItemFromCart } = useContext(CartContext);
    return (
        <div className="checkout-container">
            <div className="checkout-items">
                
            {
                cartItems.length > 0 ? (
                cartItems.map((cartItem) => {
                    const { id, name, price, imageUrl, quantity } = cartItem;
                    return (
                    <div className="checkout-item" key={id}>
                        <span className="name">{name}</span>
                        <span className="quantity">
                            <span onClick={() => removeItemFromCart(cartItem)} className="arrow">&#10094;</span>
                            {quantity}
                            <span onClick={() => addItemToCart(cartItem)} className="arrow">&#10095;</span>
                        </span>
                        <span className="price">{price}</span>
                        <div className="image-container">
                            <img src={imageUrl} alt={name} />
                        </div>
                        <span onClick={() => deleteItemFromCart(cartItem)} className="remove-button">&#10005;</span>
                    
                    </div>
                    
                )})
                ) : (
                    <span className="empty-message">Your cart is empty</span>
                )
            }
                <div className="total">
                    <span>TOTAL: ${cartItems.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0)}</span>
                    </div>
                <div className="checkout">
                    <Button>Proceed to Checkout</Button>
                </div>
            </div>

        </div>
    )
}

export default Checkout;