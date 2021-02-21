import MainLayout from "../../layouts/mainLayout";
import { prisma } from "../../prisma/prisma";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router"
import styles from "../../styles/Cart.module.css"

const Cart = ({ cartProducts }) => {
    const router = useRouter()

    const handleButtonClick = () => {
        router.push(`${router.pathname}/del`)
    }

    const cartProductList = cartProducts.map((product, index) =>
        <li key={product.name + product.imageSrc} className={styles.cart__item}>
            <img src={product.imageSrc} alt="img" className={styles.cart__image} />
            {product.name} x { product.amount }
        </li>
    )

    const sumAmount = cartProducts.reduce((sum, current) => sum + current.price * current.amount, 0)
    const totalCost = sumAmount === 0
        ? <span className={styles.cart__empty}>Cart is empty</span>
        : <span className={styles.cart__totalCost}>Total cost: {sumAmount.toFixed(2)} $</span>

    return (
        <MainLayout>
            <div className={styles.cart}>
                <span className={styles.cart__header}>Your cart</span>
                {cartProductList}
                {totalCost}
                <Button variant="outlined" onClick={handleButtonClick}>Clear cart</Button>
                <Button variant="outlined" onClick={() => {router.push("/store")}}>OK</Button>
            </div>
        </MainLayout>
    )
}

export const getServerSideProps = async ({ req }) => {
    const cartProducts = await prisma.$queryRaw(`SELECT p.name, p.price, p."imageSrc", c.amount FROM products p JOIN cart c on p.id = c."productId"`)
    console.log(cartProducts)

    return { props: { cartProducts } }
}

export default Cart;
