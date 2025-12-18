import { apiFetch } from "../utils/api";

export async function invoiceLoader({ params }){
    const headers = {}
    const response = await apiFetch(`invoice/${params.booking_id}`, { headers })
    const responseData = await response.json()
    const data = await responseData.data
    const booking = data.booking

    return booking
}