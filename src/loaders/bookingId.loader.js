import { apiFetch } from "../utils/api";

export async function bookingIdLoader(){
    const response = await apiFetch("booking/booking-id/list", {})
    const responseData = await response.json()
    const data = await responseData.data
    return data
}