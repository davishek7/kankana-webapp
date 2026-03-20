import { apiFetch } from "../utils/api";

export async function bookingLoader({ params }){
    const response = await apiFetch(`booking/${params.bookingId}`)
    const responseData = await response.json()
    const data = responseData.data

    return data
}