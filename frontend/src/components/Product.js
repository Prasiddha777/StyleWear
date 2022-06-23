import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";
import { Link } from "react-router-dom";
function Product(props) {
  const { products } = props;
  return (
    <Card>
      <Link to={`/product/${products.slug}`}>
        <img
          src={products.image}
          className="card-img-top"
          alt={products.name}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${products.slug}`}>
          <Card.Title>{products.name}</Card.Title>
        </Link>
        <Rating
          rating={products.rating}
          numReviews={products.numReviews}
        ></Rating>
        <Card.Text>Rs.{products.price}</Card.Text>
        <Button varaint="primary">Add to cart</Button>
      </Card.Body>
    </Card>
  );
}
export default Product;
