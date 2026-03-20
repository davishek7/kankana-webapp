import { apiFetch } from "../utils/api";

export async function statsLoader(){
    const [statsRes, incomeRes] = await Promise.all([
        apiFetch("stats/"),
        apiFetch("stats/income/")
    ])
    const statsResData = await statsRes.json()
    const incomeResData = await incomeRes.json()

    const statsData = statsResData.data
    const incomeData = incomeResData.data

    return {statsData, incomeData}
}