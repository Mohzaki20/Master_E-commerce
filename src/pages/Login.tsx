import Heading from "@components/common/Heading/Heading";
import Input from "@components/Form/input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import actAuthLogin from "@store/auth/act/actAuthLogin";
import { resetUI } from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { signinSchema } from "@validations/signinSchema/signinSchema";
import { useEffect } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

function Login() {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  type signinType = z.infer<typeof signinSchema>;
  if (searchParams.get("message")) {
    setSearchParams("");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signinType>({
    resolver: zodResolver(signinSchema),
    mode: "onBlur",
  });
  const submitForm: SubmitHandler<signinType> = (data: signinType) => {
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);
  return (
    <>
      <Heading title="Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get("message") === "account_created" && (
            <Alert variant="success">
              {" "}
              Your account successfully created, please login
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="Email Address"
              name="email"
              register={register}
              error={errors.email?.message}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              register={register}
              error={errors.password?.message}
            />
            <Button variant="info" type="submit" style={{ color: "white" }}>
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Login;
