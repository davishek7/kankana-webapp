import { apiFetch } from "../utils/api";

export async function imageDetailsLoader({ params }){
    const response = await apiFetch(`gallery/${params.imageId}`)
    const responseData = await response.json()
    const data = responseData.data
    return data
}