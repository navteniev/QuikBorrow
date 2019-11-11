import React from "react";
import { Link } from 'react-router-dom';
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const ProductCard = props => {
  const { id, name, user, description, availability } = props;

  const header = (
    <Link to={`/products/${id}`}>
      <img alt="product_image" src="https://via.placeholder.com/150" />
    </Link>
  );

  const footer = (
    <span>
      <Link to={`/products/${id}`}>
        <Button label="Borrow" icon="pi pi-check" />
      </Link>
    </span>
  );

  return (
    <div className="p-col">
      <Card
        title={name}
        subTitle={user}
        className="ui-card-shadow box"
        style={{ width: "360px" }}
        header={header}
        footer={footer}
      >
        <div>{description}</div>
        <div>{availability ? "available" : "not available"}</div>
      </Card>
    </div>
  );
};

export default ProductCard;
