import { apiFetch } from "../utils/api";

export async function expensesLoader(){

    const response = await apiFetch("expense/")
    const responseData = await response.json()
    const data = await responseData.data
    return data.expenses
}