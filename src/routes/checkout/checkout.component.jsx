import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import './checkout.styles.scss';
import Button from "../../components/button/button.component";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
    const { cartItems, addItemToCart, removeItemFromCart, deleteItemFromCart, cartTotalPrice } = useContext(CartContext);
    return (
        <div className="checkout-container">
            <div className="checkout-items">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>

            {
                cartItems.length > 0 ? (
                cartItems.map((cartItem) => {
                    return (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} addItemToCart={addItemToCart} removeItemFromCart={removeItemFromCart} deleteItemFromCart={deleteItemFromCart} />
                )})
                ) : (
                    <span className="empty-message">Your cart is empty</span>
                )
            }
                <div className="total">
                    <span>TOTAL: ${cartTotalPrice}</span>
                    </div>
                <div className="checkout">
                    <Button>Proceed to Checkout</Button>
                </div>
            </div>
        </div>
    )
}

export default Checkout;