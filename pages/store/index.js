import MainLayout from '../../layouts/mainLayout';
import { Card } from '../../components';
import styles from '../../styles/Store.module.css';
import { useRouter } from 'next/router';
import { prisma } from '../../prisma/prisma';

const Store = ({ products }) => {
    const router = useRouter();
    console.log(products);

    const handleBuyButtonClick = (id) => {
        console.log(id);
        router.push({
            pathname: `${router.pathname}/add`,
            query: { id },
        });
    };

    const productsList = products.map(product =>
      <Card key={product.id}
            {...product}
            onBuyButtonClick={handleBuyButtonClick}
      />);

    return (
        <MainLayout>
            <div className={styles.container}>
                {productsList}
            </div>
        </MainLayout>
    );
};

export const getServerSideProps = async () => {
    //  skip: 3,
    //  take: 4 (pagination)
    const products = await prisma.products.findMany();

    return { props: { products } };
};

export default Store;
