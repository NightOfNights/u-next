import React from 'react';
import Rating from '@material-ui/lab/Rating';

const Card = ({ id, name, price, description, imageSrc, rating, onBuyButtonClick }) => {

    const handleBuyButtonClick = () => {
        onBuyButtonClick()
    }

    return (
        <div className="card">
            <img src={imageSrc} alt="img" className="card__image"/>
            <div className="card__name-price-info">
                <span>{name}</span>
                <span>{`${price} $`}</span>
            </div>
            <span>{description}</span>
            <Rating name="product-value" value={rating} precision={0.5} readOnly size="small" />
            <button onClick={handleBuyButtonClick}>Buy</button>
        </div>
    )
}

export default Card;