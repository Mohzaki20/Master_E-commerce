import axios from "axios";
import { useState } from "react";

type TStatus = "idle" | "checking" | "available" | "notavailable" | "failed";
function useCheckEmailAvailability() {
  const [emailAvailabiltyStatus, setEmailAvailabiltyStatus] =
    useState<TStatus>("idle");

  const [enterdEmail, setEnterdEmail] = useState<null | string>("");
  const checkEmailAvailabilty = async (email: string) => {
    setEnterdEmail(email);
    setEmailAvailabiltyStatus("checking");
    try {
      const response = await axios.get(`/users?email=${email}`);
      if (!response.data.length) {
        setEmailAvailabiltyStatus("available");
      } else {
        setEmailAvailabiltyStatus("notavailable");
      }
    } catch (e) {
      setEmailAvailabiltyStatus("failed");
      console.log(e);
    }
  };
  const resetEmailAvailabilty = () => {
    setEmailAvailabiltyStatus("idle");
    setEnterdEmail(null);
  };
  return {
    emailAvailabiltyStatus,
    enterdEmail,
    checkEmailAvailabilty,
    resetEmailAvailabilty,
  };
}

export default useCheckEmailAvailability;
