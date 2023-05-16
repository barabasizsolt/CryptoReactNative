import axios from "axios"

const BASE_URL: string = "https://api.themoviedb.org/3"
const API_KEY: string = "93697a6983d40e793bc6b81401c77e1c"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    params: { api_key: API_KEY },
})

export default axiosInstance

export const IMGAGE_URL: string = "https://image.tmdb.org/t/p/original";