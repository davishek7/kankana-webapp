import { apiFetch } from "../utils/api";

export async function statsLoader(){
    const headers = {
        "Content-Type": "applicatioin/json",
    }

    const response = await apiFetch("admin/stats/", { headers })
    const responseData = await response.json()
    const data = await responseData.data
    return data
}