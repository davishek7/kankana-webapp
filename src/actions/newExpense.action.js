import { apiFetch } from "../utils/api";

export async function newExpenseAction({ request }){
    const formData = await request.formData()
    const postData = Object.fromEntries(formData);

    const response = await apiFetch("expense/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData)
    });
    const responseData = await response.json();
    return responseData
}