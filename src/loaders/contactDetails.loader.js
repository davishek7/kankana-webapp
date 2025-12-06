import { apiFetch } from "../utils/api";

export async function contactDetailsLoader({ params }){

    const headers = {
        "Content-Type": "application/json",
    };

    const response = await apiFetch(`contact/${params.contact_id}`)
    const responseData = await response.json()
    const data = await responseData.data

    if (!data.read_status){
        await apiFetch(`contact/${params.contact_id}`, {
            method: "PATCH",
            headers
        })
    }

    return data
}