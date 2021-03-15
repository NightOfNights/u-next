import { useState } from 'react';
import MainLayout from '../../layouts/mainLayout';
import { Card, ProductModal } from '../../components';
import styles from '../../styles/Store.module.css';
import {
  getProducts,
  addProductToCart,
  createProduct,
  updateProduct,
} from '../../api/apiRequests';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { useRouter } from 'next/router';

const Store = ({ products }) => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({
    id: -1,
    name: '',
    price: 0,
    imageSrc: '',
    rating: 0,
    description: '',
  });

  const router = useRouter();

  const handleBuyButtonClick = (id) => {
    addProductToCart(id);
  };

  const handleCardClick = (id, name, price, description, imageSrc, rating) => {
    setIsEditModalVisible(true);
    setEditForm({
      id,
      name,
      price,
      description,
      imageSrc,
      rating,
    });
  };

  const handleAddButtonClick = () => {
    console.log('add');
    setIsAddModalVisible(true);
  };

  const handleCancelAddModal = () => {
    setIsAddModalVisible(false);
  };

  const handleOkAddModal = (data) => {
    setIsAddModalVisible(false);
    createProduct(data);
    router.push(router.pathname);
  };

  const handleCancelEditModal = () => {
    setIsEditModalVisible(false);
  };

  const handleOkEditModal = (id, data) => {
    setIsEditModalVisible(false);
    updateProduct(id, data);
    router.push(router.pathname);
  };

  const productsList = products.map((product) => (
    <Card
      key={product.id}
      {...product}
      onBuyButtonClick={handleBuyButtonClick}
      onCardClick={handleCardClick}
    />
  ));

  return (
    <MainLayout>
      <div className={styles.container}>
        {productsList}
        <button className={styles.addButton} onClick={handleAddButtonClick}>
          <AddIcon></AddIcon>
        </button>
        {isAddModalVisible ? (
          <ProductModal
            add
            onCancel={handleCancelAddModal}
            onOk={handleOkAddModal}
          />
        ) : (
          <React.Fragment></React.Fragment>
        )}
        {isEditModalVisible ? (
          <ProductModal
            {...editForm}
            onCancel={handleCancelEditModal}
            onOk={handleOkEditModal}
          />
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = async () => {
  const products = await getProducts();
  return { props: { products } };
};

export default Store;
