import { apiFetch } from "../utils/api";

export async function bookingLoader({ params }){
    const headers = {
        "Content-Type": "applicatioin/json",
    }

    const response = await apiFetch(`booking/${params.booking_id}`, { headers })
    const responseData = await response.json()
    const data = await responseData.data
    return data
}