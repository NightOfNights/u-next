import Navbar from "../components/navbar/navbar";
import React from "react";
import Head from "next/head";

const MainLayout = ({ children }) => {
    return (
        <React.Fragment>
          <Head>
            <title>CatStore</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <Navbar />
          <main>
            {children}
          </main>
        </React.Fragment>
    )
}

export default MainLayout;