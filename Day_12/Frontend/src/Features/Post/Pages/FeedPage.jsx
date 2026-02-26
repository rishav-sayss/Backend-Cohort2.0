import React, { useEffect } from 'react'
import "../style/feed.scss"
import Post from '../component/Post'
import { usepost } from '../Hook/userPost'
function FeedPage() {
    let { feed, handelfeed, loading } = usepost()

    useEffect(() => {
        handelfeed()
    }, [])

    if (!feed || loading) {
        return (
            <main>
                <h1> feed is loading Loading...</h1>
            </main>
        )
    }
    return (
        <div>
            <main className='feed-page'>
                <div className="feed">
                    <div className="posts">
                        {
                            feed.map((post,idx) => {
                                return <Post key={idx} user={post.user} post={post}   />
                            })
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

export default FeedPage
