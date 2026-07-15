import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginemploye } from "../State/Auth/AuthAction";

export const useAuth = () => {

    let dispatch  =  useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      agree: false,
    },
  });

  const registersubmit = async (data) => {

  };

  const loginsubmit = async (data) => {
    dispatch(loginemploye(data))
  };

  return {

    register,
    handleSubmit,
    registersubmit,
    loginsubmit,
    errors,
    watch,
    isSubmitting,
    isSubmitSuccessful 
  }
};
