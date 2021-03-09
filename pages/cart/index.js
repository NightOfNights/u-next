import MainLayout from '../../layouts/mainLayout';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { CartProduct } from '../../components';
import axios from '../../api/axiosConfig';
import styles from '../../styles/Cart.module.css';
import { getCart, clearCart } from '../../api/apiRequests';

const Cart = ({ cartProducts }) => {
    const router = useRouter();

    const handleClearCartButtonClick = () => {
        if (cartProducts.length) {
            clearCart();
            router.push(router.pathname);
        }
        else {
            alert('Cart is already empty!');
        }
    };

    const cartProductList = cartProducts.map(product =>
        <CartProduct key={product.id} product={product} />
    );

    const sumAmount = cartProducts.reduce((sum, current) => sum + current.price * current.amount, 0);
    const totalCost = sumAmount === 0
        ? <span className={styles.cart__empty}>Cart is empty</span>
        : <span className={styles.cart__totalCost}>Total cost: {sumAmount.toFixed(2)} $</span>;

    return (
        <MainLayout>
            <div className={styles.cart}>
                <span className={styles.cart__header}>Your cart</span>
                {cartProductList}
                {totalCost}
                <Button variant="outlined" onClick={handleClearCartButtonClick}>Clear cart</Button>
                <Button variant="outlined" onClick={() => {router.push('/store');}}>OK</Button>
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
