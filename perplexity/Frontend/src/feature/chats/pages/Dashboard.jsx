import React, { useEffect } from 'react'
import { usechat } from '../hooks/chats'
function Dashboard() {
    let chat = usechat()
    useEffect(() => {
        chat.initializeSocketConnection()
    }, [])
    return (
        <div>
            <h1>it is Dashboard</h1>
        </div>
    )
}

export default Dashboard
