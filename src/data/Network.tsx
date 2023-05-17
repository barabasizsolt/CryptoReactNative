import axios from "axios"

const BASE_URL: string = "https://api.coingecko.com/api/v3"

const axiosInstance = axios.create({ baseURL: BASE_URL })

export default axiosInstance