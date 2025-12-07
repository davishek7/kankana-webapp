import { apiFetch } from "../utils/api";

export async function imagesLoader(){
    const headers = {}
    const response = await apiFetch("gallery/?limit=15", { headers })
    const responseData = await response.json()
    const data = await responseData.data
    const initialRows = data.images
    const total = data.total
    const limit = data.limit
    return {initialRows, total, limit}
}