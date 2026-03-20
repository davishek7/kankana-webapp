import { apiFetch } from "../utils/api";

export async function invoicesLoader(){
    const response = await apiFetch("invoice/?view=invoice")
    const responseData = await response.json()
    const data = responseData.data
    const initialRows = data.bookings
    const total = data.total
    const limit = data.limit
    return {initialRows, total, limit}
}