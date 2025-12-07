import { apiFetch } from "../utils/api";

export async function expensesLoader(){
    const headers = {}
    const response = await apiFetch("expense/", { headers })
    const responseData = await response.json()
    const data = await responseData.data
    return data.expenses
}