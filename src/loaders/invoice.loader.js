import { apiFetch } from "../utils/api";

export async function invoiceLoader({ params }) {
  const response = await apiFetch(`invoice/${params.bookingId}`);
  const responseData = await response.json();
  const data = responseData.data;

  return data;
}
