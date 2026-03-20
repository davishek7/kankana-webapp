import { apiFetch } from "../utils/api";

export async function bookingDetailsAction({ request, params }) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  try {
    if (intent === "add-item") {
      const payload = {
        item_type: formData.get("item_type"),
        item_category: formData.get("item_category"),
        date: formData.get("date"),
        rate: formData.get("rate"),
      };
      const response = await apiFetch(`booking/${params.bookingId}/item`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return {
        ...data, // { status, message, data }
        intent,
      };
    }

    if (intent === "add-payment") {
      const payload ={
        amount: formData.get("amount"),
        method: formData.get("method"),
        payment_type: formData.get("payment_type"),
        date: formData.get("date"),
      }
      const response = await apiFetch(`booking/${params.bookingId}/payment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return {
        ...data, // { status, message, data }
        intent,
      };
    }

    if (intent === "edit-customer") {
      const payload = {
        name: formData.get("name"),
        address: formData.get("address"),
        phone_number: formData.get("phone_number"),
      }
      const response = await apiFetch(`booking/${params.bookingId}/customer`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return {
        ...data, // { status, message, data }
        intent,
      };
    }

    if (intent === "add-expense") {
      const payload = {
        date: formData.get("date"),
        amount: formData.get("amount"),
        expense_type: formData.get("expense_type"),
        remarks: formData.get("remarks"),
      }
      const response = await apiFetch(`expense/${params.bookingId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return {
        ...data, // { status, message, data }
        intent,
      };
    }

    if (intent === "edit-expense") {
      const expense_id = formData.get("expense_id");
      const payload = {
        date: formData.get("date"),
        amount: formData.get("amount"),
        expense_type: formData.get("expense_type"),
        remarks: formData.get("remarks"),
      }
      const response = await apiFetch(`expense/${expense_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return {
        ...data, // { status, message, data }
        intent,
      };
    }
  } catch (err) {
    return {
      status: 500,
      message:
        err?.response?.data?.message || err?.message || "Something went wrong",
      data: null,
      intent,
    };
  }
}
