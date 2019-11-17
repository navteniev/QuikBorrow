import React from "react";
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ProductCard = props => {
  const { id, name, user, description, availability } = props;
  
  return (
    <div>
      <Card>
        <CardMedia>
          <Link to={`/products/${id}`}>
            <img alt="product_image" src="https://via.placeholder.com/150" />
          </Link>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {user} <br/>
            {description}<br/>
            {availability ? "available" : "not available"}<br/>
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/products/${id}`}>
            <Button variant="contained" color="primary">
            Borrow
            </Button>      
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};

export default ProductCard;
