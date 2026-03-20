import { apiFetch } from "../utils/api";

export async function contactDetailsLoader({ params }){

    const headers = {
        "Content-Type": "application/json",
    };

    const response = await apiFetch(`contact/${params.contactId}`)
    const responseData = await response.json()
    const data = responseData.data

    if (!data.read_status){
        await apiFetch(`contact/${params.contactId}`, {
            method: "PATCH",
            headers
        })
    }

    return data
}