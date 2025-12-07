import { apiFetch } from "../utils/api";

export async function imageDetailsLoader({ params }){
    const response = await apiFetch(`gallery/${params.image_id}`, {})
    const responseData = await response.json()
    const data = await responseData.data
    return data
}