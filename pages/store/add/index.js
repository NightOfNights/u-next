import MainLayout from "../../../layouts/mainLayout";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const AddToCart = ({ product }) => {
    return (
        <MainLayout>
            {product.name}
        </MainLayout>
    )
}

export const getServerSideProps = async ({ query }) => {
    const productId = query.id
    const product = await prisma.products.findUnique({where:{id:Number(productId)}})

    return { props: { product } }
}

export default AddToCart;