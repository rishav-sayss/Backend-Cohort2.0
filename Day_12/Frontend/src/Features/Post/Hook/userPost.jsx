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

    let handellikepost = async (postId) => {
        await likepost(postId)
        console.log(feed)
        setfeed(prevFeed =>
            prevFeed.map(post =>
                post._id === postId
                    ? { ...post, isliked: true, likes: post.likes + 1 }
                    : post
            )
        )
    }

    let handelunlikepost = async (postId) => {
        await unlikepost(postId)
        console.log(feed)
        setfeed(prevFeed =>
            prevFeed.map(post =>
                post._id === postId
                    ? { ...post, isliked: false, likes: post.likes - 1 }
                    : post
            )
        )
    }

    useEffect(() => {
        handelfeed()
    }, [])

    return { feed, post, handelfeed, loading, handelcreatepost, handellikepost, handelunlikepost }
}