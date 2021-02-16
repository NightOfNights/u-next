import MainLayout from "../../layouts/mainLayout";
import { prisma } from "../../prisma/prisma";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router"

const Cart = ({ cartProducts }) => {
    const router = useRouter()

    const handleButtonClick = () => {
        router.push(`${router.pathname}/del`)
    }

    const cartProductList = cartProducts.map(product =>
        <li key={product.name + product.imageSrc}>
            {product.name}
        </li>
    )

    const sumAmount = cartProducts.reduce((sum, current) => sum + current.price * current.amount, 0)

    return (
        <MainLayout>
            {cartProductList}
            {sumAmount.toFixed(2)} $
            <Button variant="outlined" onClick={handleButtonClick}>Clear cart</Button>
        </MainLayout>
    )
}

export const getServerSideProps = async ({ req }) => {
    const cartProducts = await prisma.$queryRaw(`SELECT p.name, p.price, p."imageSrc", c.amount FROM products p JOIN cart c on p.id = c."productId"`)
    console.log(cartProducts)

    return { props: { cartProducts } }
}

export default Cart;
