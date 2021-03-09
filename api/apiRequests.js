import axios from './axiosConfig';

export async function getProducts() {
  const products = await axios.get('/products').then(res => res.data);
  return products;
}

export async function getCart() {
  const cart = await axios.get('/cart').then(res => res.data); 
  return cart;
}

export const clearCart = () => {
  axios.delete('/cart')
  .then((res) => {
      console.log(res);
      alert('Cart cleared');
  })
  .catch((err) => {
      console.log(err);
      alert(err.message);
  });
};

export const addProductToCart = (id) => {
  axios.put(`/cart/${id}`)
  .then((res) => {
      console.log(res);
      alert('Product added to the cart!');
  })
  .catch((err) => {
      console.log(err);
      alert(err.message);
  });
};

