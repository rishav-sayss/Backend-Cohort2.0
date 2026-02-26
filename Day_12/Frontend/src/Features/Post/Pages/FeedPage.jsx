import React, { useEffect } from 'react'
import "../style/feed.scss"
import Post from '../component/Post'
import { usepost } from '../Hook/userPost'
import Navbar from '../../Shared/component/Navbar'
function FeedPage() {
    let { feed, handelfeed, loading, handellikepost, handelunlikepost } = usepost()

    useEffect(() => {
        handelfeed()
    }, [])

    if (!feed || loading) {
        return (
            <main>
                <h1> Feed is Loading...</h1>
            </main>
        )
    }
    return (
        <div>
            <main className='feed-page'>

                <div className="feed">
                    <Navbar />
                    <div className="posts">

                        {
                            feed.map((post, idx) => {
                                return <Post key={idx} user={post.user} post={post} handellikepost={handellikepost}
                                    handelunlikepost={handelunlikepost} />
                            })
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

export default FeedPage
