import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";

function Product(props) {
  const { products } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === products._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  return (
    <Card>
      <Link to={`/product/${products.slug}`}>
        <img
          src={products.image}
          className="card-img-top"
          alt={products.name}
        ></img>
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
        {products.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(products)} varaint="primary">
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;
