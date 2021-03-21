import { useState } from 'react';
import MainLayout from '../../layouts/mainLayout';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { CartProduct } from '../../components';
import styles from '../../styles/Cart.module.css';
import { getCart, clearCart, deleteCartProduct } from '../../api/apiRequests';
import { useSession, getSession } from 'next-auth/client';

const Cart = ({ cartProducts }) => {
  const [products, setProducts] = useState(cartProducts);
  const router = useRouter();
  const [session] = useSession();

  const handleClearCartButtonClick = () => {
    if (products.length) {
      clearCart(session.user.id);
      setProducts([]);
    } else {
      alert('Cart is already empty!');
    }
  };

  const handleDeleteCartProductButtonClick = (productId) => {
    deleteCartProduct(session.user.id, productId);
    setProducts(products.filter(product => product.id !== productId));
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

  const cartProductList = products.map((product) => (
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

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session) {
    const cartProducts = await getCart(session.user.id);
    console.log(cartProducts);
  
    return { props: { cartProducts } };
  } else {
    return { redirect: { permanent: false, destination: '/api/auth/signin' } };
  }
};

export default Cart;
