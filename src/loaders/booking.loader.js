import { apiFetch } from "../utils/api";

export async function bookingLoader({ params }){
    const response = await apiFetch(`booking/${params.booking_id}`, {})
    const responseData = await response.json()
    const data = await responseData.data
    const booking = data.booking
    const expenses = data.expenses

    return {booking, expenses}
}