import { useContext, useEffect, useState } from 'react';
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
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/client';
import { SupabaseContext } from '../_app';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);

  const [session] = useSession();
  const router = useRouter();
  const { supabase } = useContext(SupabaseContext);

  useEffect(() => {
    const subscription = supabase
      .from('*')
      .on('*', (payload) => {
        setIsSnackBarVisible(true);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  const handleCloseSnackbar = () => {
    setIsSnackBarVisible(false);
  };

  const handleBuyButtonClick = (productId) => {
    addProductToCart(session?.user.id, productId);
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
      onCardClick={session?.user.role === 'admin' ? handleCardClick : undefined}
    />
  ));

  return (
    <MainLayout>
      {session ? (
        <div className={styles.container}>
          {productsList}
          {session.user.role === 'admin' ? (
            <button className={styles.addButton} onClick={handleAddButtonClick}>
              <AddIcon></AddIcon>
            </button>
          ) : undefined}
          {isAddModalVisible ? (
            <ProductModal
              add
              onCancel={handleCancelAddModal}
              onOk={handleOkAddModal}
            />
          ) : null}
          {isEditModalVisible ? (
            <ProductModal
              {...editForm}
              onCancel={handleCancelEditModal}
              onOk={handleOkEditModal}
            />
          ) : (
            <React.Fragment></React.Fragment>
          )}
          <Snackbar
            open={isSnackBarVisible}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <Alert onClose={handleCloseSnackbar} severity="success">
              OOOOOOOOOOOOOOO
            </Alert>
          </Snackbar>
        </div>
      ) : null}
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session) {
    const products = await getProducts();
    return { props: { products } };
  } else {
    return { redirect: { permanent: false, destination: '/api/auth/signin' } };
  }
};

export default Store;
