import { Form } from "react-bootstrap";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<TFieldValue extends FieldValues> = {
  type?: string;
  name: Path<TFieldValue>;
  register: UseFormRegister<TFieldValue>;
  error?: string;
  label: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
  disabled?: boolean;
};

function Input<TFieldValue extends FieldValues>({
  type = "text",
  name,
  register,
  error,
  label,
  onBlur,
  formText,
  success,
  disabled,
}: InputProps<TFieldValue>) {
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        {...register(name)}
        isInvalid={error ? true : false}
        isValid={success ? true : false}
        onBlur={onBlurHandler}
        disabled={disabled}
      />
      {error ? (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      ) : (
        <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
      )}
      {formText && <Form.Text muted>{formText}</Form.Text>}
    </Form.Group>
  );
}

export default Input;
