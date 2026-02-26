import { getfeed } from "../Services/post.api";
import { useContext } from "react";
import { postcontext } from "../post.context";


export let usepost = () => {
    let context = useContext(postcontext)
    console.log()
    let { post, setpost, feed, setfeed, loading, setloading } = context
    let handelfeed = async () => {
        setloading(true)
        let data = await getfeed()
        console.log(data.getallpost)
        setfeed(data.getallpost.reverse())
        setloading(false)
    }
     
    return { feed, post, handelfeed, loading }
}