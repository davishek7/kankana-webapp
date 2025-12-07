import { apiFetch } from "../utils/api";

export async function imageDetailsLoader({ params }){
    const headers = {}
    const response = await apiFetch(`gallery/${params.image_id}`, { headers })
    const responseData = await response.json()
    const data = await responseData.data
    return data
}