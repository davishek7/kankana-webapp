import { apiFetch } from "../utils/api";

export async function searchLoader({ request }){
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const headers = {}
    const response = await apiFetch(`search/?q=${encodeURIComponent(q)}`, { headers })
    const responseData = await response.json()
    const data = await responseData.data
    data.searchTerm = q
    return data
}