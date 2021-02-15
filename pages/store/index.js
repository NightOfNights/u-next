import MainLayout from "../../layouts/mainLayout";
import { Card } from "../../components";
import { PrismaClient } from "@prisma/client"
import styles from "../../styles/Store.module.css"

const prisma = new PrismaClient()

const Store = ({ products }) => {
    console.log(products)

    const handleBuyButtonClick = () => {
        console.log("added")
    }

    const productsList = products.map(product => <Card key={product.id} {...product} imageSrc={product.imageSrc} onBuyButtonClick={handleBuyButtonClick} />)

    return (
        <MainLayout>
            <div className={styles.container}>
                {productsList}
            </div>
        </MainLayout>
    )
}

export const getServerSideProps = async ({ req }) => {
    //  skip: 3,
    //  take: 4 (pagination)
    const products = await prisma.products.findMany()

    return { props: { products } }
}

export default Store
