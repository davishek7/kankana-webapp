import { useEffect, useState } from "react";

export default function useCachedFetch(apiUrl, cacheKey, cacheDuration = 24 * 60 * 60 * 1000) {
  const [data, setData] = useState(null);
  const expiryKey = `${cacheKey}_expiry`;

  useEffect(() => {
    const now = Date.now();
    const cached = localStorage.getItem(cacheKey);
    const expiry = localStorage.getItem(expiryKey);

    if (cached && expiry && now < Number(expiry)) {
      setData(JSON.parse(cached));
      fetchData(); // still refresh in background
    } else {
      fetchData();
    }

    async function fetchData() {
      try {
        const res = await fetch(apiUrl);
        const resData = await res.json();
        const value = resData.data.length === 1 ? resData.data[0] : resData.data;

        setData(value);
        localStorage.setItem(cacheKey, JSON.stringify(value));
        localStorage.setItem(expiryKey, (now + cacheDuration).toString());
      } catch (err) {
        console.error("Error fetching:", apiUrl, err);
      }
    }
  }, [apiUrl, cacheKey, cacheDuration, expiryKey]);

  return data;
}
