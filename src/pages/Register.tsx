import Heading from "@components/common/Heading/Heading";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "./../../node_modules/@hookform/resolvers/zod/src/zod";
import { z } from "zod";
import { signupSchema } from "@validations/signupSchema/signupSchema";
import Input from "@components/Form/input/Input";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister, resetUI } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type signupType = z.infer<typeof signupSchema>;

function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getFieldState,
    trigger,
  } = useForm<signupType>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const {
    emailAvailabiltyStatus,
    enterdEmail,
    checkEmailAvailabilty,
    resetEmailAvailabilty,
  } = useCheckEmailAvailability();
  const submitForm: SubmitHandler<signupType> = async (data: signupType) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login?message=account_created");
      });
  };
  const emailOnBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enterdEmail !== value) {
      checkEmailAvailabilty(value);
    }
    if (isDirty && invalid && enterdEmail) {
      resetEmailAvailabilty();
    }
  };
  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);
  return (
    <>
      <Heading title="User Registration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="First Name"
              name="firstName"
              register={register}
              error={errors.firstName?.message}
            />

            <Input
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName?.message}
            />

            <Input
              label="Email address"
              name="email"
              register={register}
              error={
                errors.email?.message
                  ? errors.email?.message
                  : emailAvailabiltyStatus === "notavailable"
                  ? "This email is not available"
                  : emailAvailabiltyStatus === "failed"
                  ? "Error from Server"
                  : ""
              }
              onBlur={emailOnBlurHandler}
              formText={
                emailAvailabiltyStatus === "checking"
                  ? "We're currently checking the availability of this email address. Please wait a moment."
                  : ""
              }
              success={
                emailAvailabiltyStatus === "available"
                  ? "This email is available for use."
                  : ""
              }
              disabled={emailAvailabiltyStatus === "checking" ? true : false}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password?.message}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register}
              error={errors.confirmPassword?.message}
            />
            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={
                emailAvailabiltyStatus === "checking" || loading === "pending"
              }
            >
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

export default Register;
