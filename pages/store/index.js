import MainLayout from '../../layouts/mainLayout';
import { Card } from '../../components';
import styles from '../../styles/Store.module.css';
import { getProducts, addProductToCart } from '../../api/apiRequests';

const Store = ({ products }) => {
  console.log(products);

  const handleBuyButtonClick = (id) => {
    addProductToCart(id);
  };

  const productsList = products.map((product) => (
    <Card
      key={product.id}
      {...product}
      onBuyButtonClick={handleBuyButtonClick}
    />
  ));

  return (
    <MainLayout>
      <div className={styles.container}>{productsList}</div>
    </MainLayout>
  );
};

export const getServerSideProps = async () => {
  const products = await getProducts();
  return { props: { products } };
};

export default Store;
