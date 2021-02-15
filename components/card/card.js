import React from 'react';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';

const Card = ({ id, name, price, description, imageSrc, rating, onBuyButtonClick }) => {

    const handleBuyButtonClick = () => {
        onBuyButtonClick(id)
    }

    return (
        <div className="card">
            <img src={imageSrc} alt="img" className="card__image"/>
            <div className="card__name-price-info">
                <span>{name}</span>
                <span>{`${price} $`}</span>
            </div>
            <span className="card__description">{description}</span>
            <Rating name="product-value" value={rating} precision={0.5} readOnly size="small" />
            <Button variant="outlined" onClick={handleBuyButtonClick}>Buy</Button>
        </div>
    )
}

export default Card;