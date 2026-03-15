import { createContext, useState } from "react";

export let SongContext = createContext()

export let SongContextProvider = ({ children }) => {

    let [song, setSong] = useState({
        "url": "https://ik.imagekit.io/fmtqrr4ql/cohort-2/moodify/songs/Tum_Jo_Mile_Ho__From__Vicky_Vidya_Ka_Woh_Wala_Video____DownloadMing.Com__aZ1Ty8QTy.mp3",
        "posterUrl": "https://ik.imagekit.io/fmtqrr4ql/cohort-2/moodify/posters/Tum_Jo_Mile_Ho__From__Vicky_Vidya_Ka_Woh_Wala_Video____DownloadMing.Com__7wZTOL33p.jpeg",
        "title": "Tum Jo Mile Ho (From \"Vicky Vidya Ka Woh Wala Video\") [DownloadMing.Com]",
        "mood": "happy",
    })

    let [loading, setloading] = useState(false)

    return (
        <SongContext.Provider value={{ song, setSong, loading, setloading }} >
            {children}
        </SongContext.Provider>
    )

}

