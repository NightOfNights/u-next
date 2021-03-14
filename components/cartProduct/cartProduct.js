import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

const CartProduct = ({ product, onProductAmountChange, onDeleteClick }) => {
  const [amount, setAmount] = useState(null);

  const handleProductAmountChange = () => {
    onProductAmountChange(product.id, amount);
  };

  const handleIncreaseAmountButtonClick = () => {
    setAmount((prev) => (prev ? prev + 1 : 2));
  };

  const handleDecreaseAmountButtonClick = () => {
    setAmount((prev) => Math.max(1, --prev));
  };

  useEffect(() => {
    if (amount) {
      handleProductAmountChange();
    }
  }, [amount]);

  const handleDeleteCartProductButtonClick = () => {
    if (confirm(`Удалить товар ${product.name} из корзины?`)) {
      onDeleteClick(product.id);
    }
  };

  return (
    <div className="cart-product">
      <img src={product.imageSrc} alt="img" className="cart-product__image" />
      <div className="cart-product__right-block">
        <div className="cart-product__name-amount">
          {product.name} x {amount ? amount : product.amount}
        </div>
        <div className="cart-product__amount-buttons">
          <Button size="small" onClick={handleIncreaseAmountButtonClick}>
            +
          </Button>
          <Button size="small" onClick={handleDecreaseAmountButtonClick}>
            -
          </Button>
        </div>
        <Button
          variant="contained"
          size="small"
          onClick={handleDeleteCartProductButtonClick}
          className="cart-product__delete-button"
        >
          delete
        </Button>
      </div>
    </div>
  );
};

export default CartProduct;
