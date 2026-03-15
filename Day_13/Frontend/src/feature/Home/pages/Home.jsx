import React from 'react'
import FaceExpression from '../../Expression/component/FaceExpression'
import { usesong } from '../Hooks/useSong'
import Player from '../component/Player'

function Home() {

    let { handelgetsong } = usesong()
    return (
        <div className="home-container">
            <section className="home-expression">
                <FaceExpression onClick={(expresion) => { handelgetsong({ mood: expresion }) }} />
            </section>
            <section className="home-player">
                <Player />
            </section>
        </div>
    )
}

export default Home
