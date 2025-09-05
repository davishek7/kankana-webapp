import { apiFetch } from "../utils/api"

export async function imageUploadAction({ request }){
  const formData = await request.formData();

const response = await apiFetch("gallery/", {
      method: "POST",
      body: formData
    });
    const responseData = await response.json();
    return responseData
}