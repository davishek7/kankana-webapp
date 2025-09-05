import { API_URL } from "../constants/api.constants"

export async function worksLoader(){
    const response = await fetch(`${API_URL}/gallery/?category=gallery`)
    const responseData = await response.json()
    const data = await responseData.data
    return data
}