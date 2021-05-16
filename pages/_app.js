import { createContext } from 'react';
import { Provider } from 'next-auth/client';
import '../styles/globals.css';
import '../styles/components/navbar.scss';
import '../styles/components/card.scss';
import '../styles/components/cartProduct.scss';
import '../styles/components/productModal.scss';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ozexzlrofqqrpfeqgmzy.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMTE2MDc2NSwiZXhwIjoxOTM2NzM2NzY1fQ.LJkPmUw1dPTiLvlHd6DVznHOAzuNxhLu3oqmas3eekk';
const supabase = createClient(supabaseUrl, supabaseKey);
console.log(supabase);

export const SupabaseContext = createContext(null);

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <SupabaseContext.Provider value={{ supabase }}>
        <Component {...pageProps} />
      </SupabaseContext.Provider>
    </Provider>
  );
}

export default MyApp;
