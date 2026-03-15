
import { getsong } from "../services/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";


export let usesong = () => {

    let context = useContext(SongContext)

    let { loading, setloading, song, setSong } = context

    let handelgetsong = async ({ mood }) => {
         
        setloading(true)
        const data = await getsong({ mood })

        setSong(data.song)
        setloading(false)

    }

    return ({ loading, song, handelgetsong })
}