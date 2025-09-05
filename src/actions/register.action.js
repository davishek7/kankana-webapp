import { API_URL } from "../constants/api.constants";
import { toast } from "react-toastify";

export async function registerAction({ request }) {
  const formData = await request.formData();
  if (formData.get("password") !== formData.get("confirmPassword")){
    toast.error("Passwords do not match")
    return
  }
  const postData = Object.fromEntries(formData);

  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  const responseData = await response.json();
  return responseData;
}
