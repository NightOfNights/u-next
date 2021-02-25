import MainLayout from '../../../layouts/mainLayout';
import { useRouter } from 'next/router';
import { Box, Button } from '@material-ui/core';
import styles from '../../../styles/Layer.module.css';
import { prisma } from '../../../prisma/prisma';

const AddToCart = ({ product }) => {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push('/store');
    };

    return (
        <MainLayout>
            <div className={styles.layer}>
                <span>{product.name} was added to the cart</span>
                <Box textAlign="center" className={styles.layer__box}>
                    <Button variant="outlined" onClick={handleButtonClick} className={styles.layer__button}>Ok</Button>
                </Box>
            </div>
        </MainLayout>
    );
};

export const getServerSideProps = async ({ query }) => {
    const productId = query.id;
    const product = await prisma.products.findFirst({where:{id:Number(productId)}});
    const productInCart = await prisma.cart.findFirst({where:{productId:Number(productId)}});
    productInCart === null
        ? await prisma.cart.create({data: {productId: Number(productId), amount: 1, userId: 1}})
        : await prisma.cart.update({
            where: {
                productId_userId: {
                    productId: Number(productId), userId: 1
                }},
            data: {
                amount: {
                    set: productInCart.amount + 1
                }}});

    return { props: { product } };
};

export default AddToCart;