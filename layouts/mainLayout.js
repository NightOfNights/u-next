import Navbar from "../components/navbar/navbar";
import React from "react";

const MainLayout = ({ children }) => {
    return (
        <React.Fragment>
            <Navbar />
            <main>
                {children}
            </main>
        </React.Fragment>
    )
}

export default MainLayout;