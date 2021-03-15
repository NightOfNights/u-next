import React, { useState } from 'react';
import { Button } from '@material-ui/core';

const ProductModal = ({
  id,
  name,
  price,
  description,
  rating,
  imageSrc,
  add,
  onOk,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: add ? '' : name,
    price: add ? 0 : Number(price),
    description: add ? '' : description,
    imageSrc: add ? '' : imageSrc,
    rating: add ? 0 : Number(rating),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    if (add) {
      onOk(formData);
    } else {
      onOk(id, formData);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="product-modal">
      <div className="product-modal__container">
        <div className="product-modal__header">
          {add ? 'Add product' : 'Edit product'}
        </div>
        <form className="product-modal__form" onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            type="text"
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
            defaultValue={add ? '' : name}
            required={add}
            className="product-modal__form-item"
          />
          <input
            placeholder="Price"
            type="number"
            min="0"
            step="0.01"
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  price: Number(Number(e.target.value).toFixed(2)),
                };
              })
            }
            required={add}
            defaultValue={add ? '' : Number(price)}
            className="product-modal__form-item"
          />
          <input
            placeholder="Description"
            type="text"
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, description: e.target.value };
              })
            }
            required={add}
            defaultValue={add ? '' : description}
            className="product-modal__form-item"
          />
          <input
            placeholder="Image source"
            type="text"
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, imageSrc: e.target.value };
              })
            }
            required={add}
            defaultValue={add ? '' : imageSrc}
            className="product-modal__form-item"
          />
          <input
            placeholder="Rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  rating: Number(Number(e.target.value).toFixed(2)),
                };
              })
            }
            required={add}
            defaultValue={add ? '' : Number(rating)}
            className="product-modal__form-item"
          />
          <div className="product-modal__footer">
            <Button
              variant="contained"
              size="small"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              type="submit"
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
