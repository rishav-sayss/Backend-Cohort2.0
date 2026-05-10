import {addItem} from "../service/cart.service"

import {useDispatch} from "react-redux"

import {additem as additemtocart} from "../state/cart.slice"


export const  usecart  = () =>{

    const dispatch = useDispatch()

    async function handelAdditem ( { productId, variantId} ) {

        const data = await addItem( { productId, variantId})

        return data

    }

    return {handelAdditem}

}
