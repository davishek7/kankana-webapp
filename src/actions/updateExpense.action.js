import { apiFetch } from "../utils/api"

export async function updateExpenseAction({ request }){
    const headers = {
        "Content-Type": "application/json",
    };
    const formData = await request.formData()
    const postData = Object.fromEntries(formData)

    const response = await apiFetch("expense/", {
        body: JSON.stringify(postData),
        method: "PUT",
        headers
    })

    const responseData = await response.json()
    return responseData
}