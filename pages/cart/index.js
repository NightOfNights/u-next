import { useState } from 'react';
import MainLayout from '../../layouts/mainLayout';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { CartProduct } from '../../components';
import styles from '../../styles/Cart.module.css';
import { getCart, clearCart, deleteCartProduct } from '../../api/apiRequests';

const Cart = ({ cartProducts }) => {
  const [products, setProducts] = useState(cartProducts);
  const router = useRouter();

  const handleClearCartButtonClick = () => {
    if (cartProducts.length) {
      clearCart();
      router.push(router.pathname);
    } else {
      alert('Cart is already empty!');
    }
  };

  const handleDeleteCartProductButtonClick = (id) => {
    deleteCartProduct(id);
    router.push(router.pathname);
  };

  const handleProductAmountChange = (id, amount) => {
    if (products) {
      const newProducts = products;
      newProducts[
        newProducts.findIndex((product) => product.id === id)
      ].amount = amount;
      setProducts([...newProducts]);
    }
  };

  const sumAmount = products
    ? products.reduce((sum, current) => sum + current.price * current.amount, 0)
    : CartProduct.reduce(
        (sum, current) => sum + current.price * current.amount,
        0
      );

  const totalCost =
    sumAmount === 0 ? (
      <span className={styles.cart__empty}>Cart is empty</span>
    ) : (
      <span className={styles.cart__totalCost}>
        Total cost: {sumAmount.toFixed(2)} $
      </span>
    );

  const cartProductList = cartProducts.map((product) => (
    <CartProduct
      key={product.id}
      product={product}
      onProductAmountChange={handleProductAmountChange}
      onDeleteClick={handleDeleteCartProductButtonClick}
    />
  ));

  return (
    <MainLayout>
      <div className={styles.cart}>
        <span className={styles.cart__header}>Your cart</span>
        {cartProductList}
        {totalCost}
        <Button variant="outlined" onClick={handleClearCartButtonClick}>
          Clear cart
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            router.push('/store');
          }}
        >
          OK
        </Button>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = async () => {
  const cartProducts = await getCart();
  console.log(cartProducts);

  return { props: { cartProducts } };
};

export default Cart;
