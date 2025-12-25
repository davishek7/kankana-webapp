import { apiFetch } from "../utils/api";

export async function statsLoader(){
    const headers = {}
    const [statsRes, incomeRes] = await Promise.all([
        apiFetch("stats/", { headers }),
        apiFetch("stats/income/", { headers })
    ])
    const statsResData = await statsRes.json()
    const incomeResData = await incomeRes.json()

    const statsData = await statsResData.data
    const incomeData = await incomeResData.data
    
    return {statsData, incomeData}
}