import { CreatProduct, getproduct } from "../services/product.api"
import { setsellerproduct, setproducts } from "../state/product.state"
import { useDispatch } from "react-redux"

export let UseProduct = () => {

    const dispatch = useDispatch()

    let HandelCreatProduct = async (formdata)=>{

        console.log(formdata)

        let data = await CreatProduct(formdata)
        return data.product
    }

    let handleGetSellerProduct = async () =>{

        let data  = await getproduct()
        dispatch(setsellerproduct(data.product))
        return data.product

    }

    return {HandelCreatProduct,handleGetSellerProduct}

}
