import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Container } from "react-bootstrap";

const Error = () => {
  const error = useRouteError();
  let errorMessage: string;
  let errorStatus: number;
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
    errorStatus = error.status;
  } else {
    errorMessage = "Not Found";
    errorStatus = 400;
  }
  return (
    <Container className="notFound">
      <h1>{errorStatus}</h1>
      <p>{errorMessage}</p>
      <Link to="/" replace={true}>
        How about going back to safety?
      </Link>
    </Container>
  );
};

export default Error;
