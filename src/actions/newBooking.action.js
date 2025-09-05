import { redirect } from "react-router-dom";
import { apiFetch } from "../utils/api";
import { toast } from "react-toastify";

export async function newBookingAction({ request }) {
  const form = await request.formData();

  const items = JSON.parse(form.get("items") || "[]");
  const payload = {
    items: items.map(({ id, ...rest }) => rest), // strip temporary id
    customer: {
      name: form.get("customer_name")?.trim(),
      address: form.get("customer_address")?.trim(),
      phone_number: form.get("customer_phone")?.trim(),
    },
    advance: Number(form.get("advance") || 0),
    discount: Number(form.get("discount") || 0),
    created_at: new Date().toISOString(),
  };

  if (!payload.customer.name || !/^\d{10}$/.test(payload.customer.phone_number || "")) {
    return { error: "Please provide a valid name and 10-digit phone number." };
  }
  if (payload.items.length === 0) {
    toast.error("Add at least one service item")
    return
  }
    const res = await apiFetch("booking/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const resData = await res.json()

    if (resData.status !== 201){
        toast.error(resData.message)
        return
    }
    toast.success(resData.message)
    return redirect("/admin/bookings")
}