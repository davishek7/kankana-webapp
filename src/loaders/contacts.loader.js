import { apiFetch } from "../utils/api";

export async function contactsLoader(){
    const response = await apiFetch("contact/")
    const responseData = await response.json()
    const data = await responseData.data
    const initialRows = data.contacts
    const total = data.total
    const limit = data.limit
    return {initialRows, total, limit}
}