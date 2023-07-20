const CheckoutItem = (props) => {
    const { cartItem, addItemToCart, removeItemFromCart, deleteItemFromCart } = props;
    const { id, name, price, imageUrl, quantity } = props.cartItem;
    return (
        <div className="checkout-item" key={id}>
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <span onClick={() => removeItemFromCart(cartItem)} className="arrow">&#10094;</span>
                {quantity}
                <span onClick={() => addItemToCart(cartItem)} className="arrow">&#10095;</span>
            </span>
            <span className="price">{price}</span>
            <span onClick={() => deleteItemFromCart(cartItem)} className="remove-button">&#10005;</span>
        </div>
    )
}

export default CheckoutItem;