import { CreatePost, getfeed, likepost, unlikepost } from "../Services/post.api";
import { useContext, useEffect } from "react";
import { postcontext } from "../post.context";

export let usepost = () => {
    let context = useContext(postcontext)
    let { post, setpost, feed, setfeed, loading, setloading } = context

    let handelfeed = async () => {
        setloading(true)
        let data = await getfeed()
        setfeed(data.getallpost.reverse())
        setloading(false)
    }

    let handelcreatepost = async (imagefile, caption) => {
        setloading(true)
        let data = await CreatePost(imagefile, caption)
        setfeed([data.post, ...feed])
        setloading(false)
    }

    let handellikepost = async (post) => {
        const data = await likepost(post)
        await handelfeed()
    }

    let handelunlikepost = async (post) => {
        const data = await unlikepost(post)
        await handelfeed()
    }

    useEffect(() => {
        handelfeed()
    }, [])

    return { feed, post, handelfeed, loading, handelcreatepost, handellikepost, handelunlikepost }
}