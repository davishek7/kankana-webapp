import { API_URL } from "../constants/api.constants";
import { toast } from "react-toastify";

export async function registerAction({ request }) {
  const formData = await request.formData();
  if (formData.get("password") !== formData.get("confirmPassword")){
    return {
      status: 400,
      message: "Passwords do not match",
    };
  }
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return data;
}
