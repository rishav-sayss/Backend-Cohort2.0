import axios from "axios"

export  const Axiosinstance = axios.create({
    
    baseURL: "/api",
    withCredentials: true

})


 Axiosinstance.interceptors.response.use(
    (response) =>  response ,

   async (error) =>{
    console.log(error.config)
    let originalRequest  = error.config;
    console.log(originalRequest)
    if(error.response?.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;

        try {
            await Axiosinstance.get("/auth/get-accessToken")
            return Axiosinstance(originalRequest)
        } catch (error) {
             window.location.href("/")
             return Promise.reject(error)
        }

    }
    }
)