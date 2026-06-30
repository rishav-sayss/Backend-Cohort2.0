import { useForm } from "react-hook-form";
import { axiosInstance } from "../config/Axiosinstance";
import { useNavigate } from "react-router";
import {useDispatch}  from "react-redux"
import { adduser } from "../state/authreducer";

export let useAuth = () => {
  let navigate = useNavigate();
 let  dispatch  = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin = async (data) => {
    try {
      let res = await axiosInstance.post("/auth/api/login", data);
       dispatch(adduser(res.data.user))
    } catch (error) {
      console.log("error in login", error);
    }
  };

  const onRegister = async (data) => {
    try {
      let res = await axiosInstance.post("/auth/api/register", data);
      console.log("res from register", res);
    } catch (error) {
      console.log("error in register", error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    navigate,
    onLogin,
    onRegister,
  };
};
