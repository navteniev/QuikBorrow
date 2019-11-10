import React from "react";
import { Link } from 'react-router-dom';
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const ProductCard = props => {
  const { id, name, user, description, availability } = props;

  const header = (
    <Link to={`/products/${id}`}>
      <img alt="product_image" src="image/path/goes/here" />
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
      <Card
        title={name}
        subTitle={user}
        className="ui-card-shadow"
        style={{ width: "360px" }}
        header={header}
        footer={footer}
      >
        <div>{description}</div>
        <div>{availability ? "available" : "not available"}</div>
      </Card>
  );
};

export default ProductCard;
