import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginemploye,   } from "../State/Auth/AuthAction";
import { useNavigate } from "react-router";

export const useAuth = () => {

    let dispatch  =  useDispatch()
   let  navigate =  useNavigate()
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

  // const registersubmit = async (data) => {

  //   dispatch(registeremploye(data))

  // };

  const loginsubmit = async (data) => {
    await dispatch(loginemploye(data)).unwrap()
    console.log(data)
    navigate("/home")
  };

  return {

    register,
    handleSubmit,
    loginsubmit,
    errors,
    watch,
    isSubmitting,
    isSubmitSuccessful 
  }
};
