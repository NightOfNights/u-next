import axios from './axiosConfig';

export async function getProducts() {
  const products = await axios.get('/products').then((res) => res.data);
  return products;
}

export async function getCart(userId) {
  const cart = await axios.get(`/cart/${userId}`).then((res) => res.data);
  return cart;
}

export async function getUserByEmail(email) {
  const user = axios
    .get(`users/email/${email}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });

  return user;
}

export const clearCart = (userId) => {
  axios
    .delete(`/cart/${userId}`)
    .then((res) => {
      console.log(res);
      alert('Cart cleared');
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
};

export const createProduct = (data) => {
  axios
    .post('/products/', data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.response.data);
      alert(err.message);
    });
};

export const updateProduct = (id, data) => {
  axios
    .put(`/products/${id}`, data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.response.data);
      alert(err.message);
    });
};

export const deleteCartProduct = (userId, productId) => {
  axios
    .delete(`/cart/${userId}/product/${productId}`)
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
};

export const addProductToCart = (userId, productId) => {
  axios
    .put(`/cart/${userId}/product/${productId}`)
    .then((res) => {
      console.log(res);
      alert('Product added to the cart!');
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
};
