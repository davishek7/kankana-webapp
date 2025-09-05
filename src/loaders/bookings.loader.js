import { apiFetch } from "../utils/api";

export async function bookingsLoader(){
    const headers = {
        "Content-Type": "applicatioin/json",
    }

    const response = await apiFetch("booking/", { headers })
    const responseData = await response.json()
    const data = await responseData.data
    return data
}