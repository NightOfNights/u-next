import MainLayout from "../../layouts/mainLayout";
import { Card } from "../../components";
import styles from '../../styles/Store.module.css'

const products = [
    {
        id: 1,
        name: "qwe",
        price: 20,
        description: "asd",
        rating: 4.2,
        imageSrc: "https://via.placeholder.com/320x200"
    },
    {
        id: 2,
        name: "qwe1",
        price: 202,
        description: "asd",
        rating: 2.3,
        imageSrc: "https://via.placeholder.com/320x200"
    },
    {
        id: 3,
        name: "qwe",
        price: 2064,
        description: "asd",
        rating: 1.5,
        imageSrc: "https://via.placeholder.com/320x200"
    },
    {
        id: 3,
        name: "qwe",
        price: 2064,
        description: "asd",
        rating: 1.5,
        imageSrc: "https://via.placeholder.com/320x200"
    },
    {
        id: 3,
        name: "qwe",
        price: 2064,
        description: "asd",
        rating: 1.5,
        imageSrc: "https://via.placeholder.com/320x200"
    },
    {
        id: 3,
        name: "qwe",
        price: 2064,
        description: "asd",
        rating: 1.5,
        imageSrc: "https://via.placeholder.com/320x200"
    },
    {
        id: 3,
        name: "qwe",
        price: 2064,
        description: "asd",
        rating: 1.5,
        imageSrc: "https://via.placeholder.com/320x200"
    },
    {
        id: 3,
        name: "qwe",
        price: 2064,
        description: "asd",
        rating: 1.5,
        imageSrc: "https://via.placeholder.com/320x200"
    },
    {
        id: 3,
        name: "qwe",
        price: 2064,
        description: "asd",
        rating: 1.5,
        imageSrc: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg"
    },
    {
        id: 3,
        name: "qwe",
        price: 2064,
        description: "asd",
        rating: 1.5,
        imageSrc: "https://icatcare.org/app/uploads/2018/06/Layer-1704-1920x840.jpg"
    },
]

const Store = () => {

    const handleBuyButtonClick = () => {
        console.log("added")
    }

    const productsList = products.map(product => <Card key={product.id} {...product} onBuyButtonClick={handleBuyButtonClick} />)

    return (
        <MainLayout>
            <div className={styles.container}>
                {productsList}
            </div>
        </MainLayout>
    )
}

export default Store
