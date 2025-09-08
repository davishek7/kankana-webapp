import { API_URL } from "../constants/api.constants"

export async function worksLoader(){
    const response = await fetch(`${API_URL}/gallery/?category=gallery&limit=25`)
    const responseData = await response.json()
    const data = await responseData.data
    const initialRows = data.images
    const total = data.total
    const nextOffset = data.limit   // as offset is 0 in the beginning, so the nextOffset is set to data.limit + offset
    return {initialRows, total, nextOffset}
}