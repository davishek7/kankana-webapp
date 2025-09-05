import { apiFetch } from "../utils/api";

export async function contactsLoader(){
    const headers = {
        "Content-Type": "applicatioin/json",
    }

    const response = await apiFetch("contact/", { headers })
    const responseData = await response.json()
    const data = await responseData.data
    return data
}