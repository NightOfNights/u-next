import React, { useState } from 'react';
import { Button } from '@material-ui/core';

const CartProduct = ({ product }) => {
    const [amount, setAmount] = useState(null);

    const handleIncreaseAmountButtonClick = () => {
      setAmount(prev => prev ? prev + 1 : 2);
    };

    const handleDecreaseAmountButtonClick = () => {
      setAmount(prev => Math.max(1, --prev));
    };

    return (
        <div className="cart-product">
            <img src={product.imageSrc} alt="img" className="cart-product__image" />
            <div className="cart-product__right-block">
                {product.name} x {amount ? amount : product.amount}
                <div className="cart-product__amount-buttons">
                  <Button size="small" onClick={handleIncreaseAmountButtonClick}>+</Button>
                  <Button size="small" onClick={handleDecreaseAmountButtonClick}>-</Button>
                </div>
                <Button variant="contained" size="small" className="cart-product__delete-button">delete</Button>
            </div>
        </div>
    );
};

export default CartProduct;