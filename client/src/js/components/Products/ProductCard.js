import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const ProductCard = props => {
  const { name, user, description, availability } = props;

  const header = <img alt="product_image" src="image/path/goes/here" />;

  const footer = (
    <span>
      <Button label="Borrow" icon="pi pi-check" />
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
