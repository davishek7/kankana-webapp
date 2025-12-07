import { apiFetch } from "../utils/api";

export async function expenseDetailsLoader({ params }){
    const headers = {}
    const [expenseRes, bookingIdRes] = await Promise.all([
        apiFetch(`expense/${params.id}`, { headers }),
        apiFetch("booking/booking-id/list", { headers }),
    ]);

    const expenseResData = await expenseRes.json()
    const expense = await expenseResData.data

    const bookingIdResData = await bookingIdRes.json()
    const bookings = await bookingIdResData.data

    return {expense, bookings}
}