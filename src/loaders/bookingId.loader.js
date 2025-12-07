import { apiFetch } from "../utils/api";

export async function bookingIdLoader(){
    const headers = {}
    const response = await apiFetch("booking/booking-id/list", { headers })
    const responseData = await response.json()
    const data = await responseData.data
    return data
}