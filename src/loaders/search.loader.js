import { apiFetch } from "../utils/api";

export async function searchLoader({ request }){
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const response = await apiFetch(`search/?q=${encodeURIComponent(q)}`)
    const responseData = await response.json()
    const data = responseData.data
    data.searchTerm = q
    return data
}