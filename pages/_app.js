import { Provider } from 'next-auth/client';
import '../styles/globals.css';
import '../styles/components/navbar.scss';
import '../styles/components/card.scss';
import '../styles/components/cartProduct.scss';
import '../styles/components/productModal.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
       <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
