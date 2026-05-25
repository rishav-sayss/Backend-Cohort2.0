import axios from "axios";

let authapiInstance = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export let register = async ({
  email,
  contact,
  password,
  fullname,
  isSeller,
}) => {
  let response = await authapiInstance.post("/register", {
    email,
    contact,
    password,
    fullname,
    isSeller,
  });
  return response.data;
};

export let login = async ({ email, password }) => {
  let responce = await authapiInstance.post("/login", { email, password });
  console.log(responce);
  return responce.data;
};

export let getme = async () => {
  let responce = await authapiInstance.get("/me");
  return responce.data;
};
