import { apiFetch } from "../utils/api";

export async function imageUploadAction({ request }) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  const response = await apiFetch("gallery/", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return {
    ...data,
    intent
  };
}
