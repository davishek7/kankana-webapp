import { apiFetch } from "../utils/api";

export async function newBookingAction({ request }) {
  const form = await request.formData();

  const items = JSON.parse(form.get("items") || "[]");

  const payload = {
    items: items.map(({ id, ...rest }) => rest),
    customer: {
      name: form.get("customer_name")?.trim(),
      address: form.get("customer_address")?.trim(),
      phone_number: form.get("customer_phone")?.trim(),
    },
    advance: Number(form.get("advance") || 0),
    discount: Number(form.get("discount") || 0),
    advance_date: form.get("advance_date") || null,
    created_at: new Date().toISOString(),
  };

  if (
    !payload.customer.name ||
    !/^\d{10}$/.test(payload.customer.phone_number || "")
  ) {
    return {
      status: 400,
      message: "Please provide a valid name and 10-digit phone number.",
    };
  }

  if (payload.items.length === 0) {
    return {
      status: 400,
      message: "Add at least one service item",
    };
  }

  try {
    const response = await apiFetch("booking/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return data; // already { status, message, data }

  } catch (err) {
    return {
      status: 500,
      message: "Something went wrong while creating booking",
    };
  }
}