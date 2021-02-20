import MainLayout from "../../../layouts/mainLayout";
import { useRouter } from "next/router"
import { Box, Button } from "@material-ui/core";
import styles from "../../../styles/Layer.module.css"
import { prisma } from "../../../prisma/prisma";

const ClearCart = () => {
    const router = useRouter()

    const handleButtonClick = () => {
        router.push("/store")
    }

    return (
        <MainLayout>
            <div className={styles.layer}>
                <span>Cart was cleared</span>
                <Box textAlign="center" className={styles.layer__box}>
                    <Button variant="outlined" onClick={handleButtonClick} className={styles.layer__button}>Ok</Button>
                </Box>
            </div>
        </MainLayout>
    )
}

export const getServerSideProps = async ({ query }) => {
    await prisma.cart.deleteMany({})
    return { props: {}}
}

export default ClearCart;