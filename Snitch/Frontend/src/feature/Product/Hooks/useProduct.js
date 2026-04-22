import { CreatProduct, getAllproduct } from "../services/product.api"
import { setsellerproduct, setproducts } from "../state/product.state"
import { useDispatch } from "react-redux"

export let UseProduct = () => {

    const dispatch = useDispatch()

    let HandelCreatProduct = async (formdata) => {
        
        let data = await CreatProduct(formdata)
        return data.product
    }

    let handleGetSellerProduct = async () => {

        let data = await getAllproduct()
        dispatch(setsellerproduct(data.products))
        return data.product

    }

    return { HandelCreatProduct, handleGetSellerProduct }

}
