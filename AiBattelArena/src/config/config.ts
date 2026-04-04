import { config as dotenvconfig } from "dotenv"
dotenvconfig()

type CONFIG = {

    readonly GOOGLE_API_KEY: string,
    readonly MISTRAL_API_KEY: string,
    readonly COHERE_APIKEY: string

}

const config: CONFIG = {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
    COHERE_APIKEY: process.env.COHORE_APIKEY || ""
}

 

export default config