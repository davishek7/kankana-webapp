import { apiFetch } from "../utils/api";

export async function bookingsLoader(){
    const headers = {}
    const response = await apiFetch("booking/", { headers })
    const responseData = await response.json()
    const data = await responseData.data
    const initialRows = data.bookings
    const total = data.total
    const limit = data.limit
    return {initialRows, total, limit}
}