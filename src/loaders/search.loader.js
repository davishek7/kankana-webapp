import { apiFetch } from "../utils/api";

export async function searchLoader({ request }){
    const url = new URL(request.url);
    const search_term = url.searchParams.get("q");
    const headers = {}
    const response = await apiFetch(`search/?q=${encodeURIComponent(search_term)}`, { headers })
    const responseData = await response.json()
    const data = await responseData.data
    data.search_term = search_term
    return data
}