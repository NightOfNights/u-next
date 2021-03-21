import React from 'react';
import { Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const Card = ({
  id,
  name,
  price,
  description,
  imageSrc,
  rating,
  onBuyButtonClick,
  onCardClick,
}) => {
  const handleBuyButtonClick = (e) => {
    e.stopPropagation();
    onBuyButtonClick(id);
  };

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(id, name, price, description, imageSrc, rating);
    }
  };

  return (
    <div className="card" style={onCardClick ? {cursor: 'pointer'} : null} onClick={handleCardClick}>
      <img src={imageSrc} alt="img" className="card__image" />
      <div className="card__name-price-info">
        <span>{name}</span>
        <span>{`${price} $`}</span>
      </div>
      <span className="card__description">{description}</span>
      <Rating
        name="product-value"
        value={rating}
        precision={0.5}
        readOnly
        size="small"
        className="card__rating"
      />
      <Button
        variant="contained"
        onClick={handleBuyButtonClick}
        className="card__button"
      >
        Buy
      </Button>
    </div>
  );
};

export default Card;
