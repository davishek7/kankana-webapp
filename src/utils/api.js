import { API_URL } from "../constants/api.constants";

export async function apiFetch(url, options = {}) {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken")

  let res = await fetch(`${API_URL}/${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });

  // If unauthorized, refresh tokens
  if (res.status === 401 || res.status === 403  && refreshToken) {
    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
         "Content-Type": "application/json",
      }
    })
    const refreshResData = await refreshRes.json()

    if (refreshResData.status === 200){
      const data = await refreshResData.data
      localStorage.setItem("accessToken", data.access_token)
      localStorage.setItem("refreshToken", data.refresh_token)

      // retry original request with new access token
      options.headers.Authorization = `Bearer ${data.access_token}`;
      res = await fetch(`${API_URL}/${url}`, options);
    }  else {
      // refresh failed → force logout
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("authUser")
      window.location.href = "/auth/login";
      throw new Error("Session expired. Please log in again.");
    }
  }

  return res;
}