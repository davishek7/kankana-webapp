import { apiFetch } from "../utils/api";

export async function statsLoader(){
    const headers = {}
    const response = await apiFetch("admin/stats/", { headers })
    const responseData = await response.json()
    const data = await responseData.data
    return data
}