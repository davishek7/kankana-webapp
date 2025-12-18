import { apiFetch } from "../utils/api";

export async function invoicesLoader(){
    const headers = {}
    const response = await apiFetch("invoice/?view=invoice", { headers })
    const responseData = await response.json()
    const data = await responseData.data
    const initialRows = data.bookings
    const total = data.total
    const limit = data.limit
    return {initialRows, total, limit}
}