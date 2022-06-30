import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { Link } from "react-router-dom";

import { Helmet } from "react-helmet-async";

export default function SigninScreen() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  return (
    <Container className="Small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1>Sign In</h1>
      <Form></Form>
      <Form.Group className="mb-3" controllId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" required></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controllId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" required></Form.Control>
      </Form.Group>
      <div className="mb-3">
        <Button type="submit">Sign In</Button>
      </div>
      <div className="mb-3">
        New Customer?{""}
        <Link to={`/signup?redirect=${redirect}`}>Create Your Account</Link>
      </div>
    </Container>
  );
}
