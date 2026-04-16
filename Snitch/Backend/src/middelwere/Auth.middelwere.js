import jwt from "jsonwebtoken"
import { config } from "../config/config.js"
export let authmiddelewere = (req, res, next) => {

    try {
        let token = req.cookies.token || req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(403).json({ message: "Unauthorized: Token missing" })

        }


        let decode = jwt.verify(token, config.JWT_SECRET)
        
        req.user = decode
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" })
    }


}