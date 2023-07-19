import axios from "axios"

export const getWeather = (baseUrl) => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export const getCountries = () => {
    const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    return request.then(response => response.data)
}

