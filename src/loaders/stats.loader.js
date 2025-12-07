import { apiFetch } from "../utils/api";

export async function statsLoader(){
    const response = await apiFetch("admin/stats/", {})
    const responseData = await response.json()
    const data = await responseData.data
    return data
}