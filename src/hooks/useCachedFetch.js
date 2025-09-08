import { useEffect, useState } from "react";

export default function useCachedFetch(apiUrl, cacheKey, cacheDuration = 24 * 60 * 60 * 1000) {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null)
  const [limit, setLimit] = useState(null)
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
        const imageData = await resData.data
        const value = imageData.images.length === 1 ? imageData.images[0] : imageData.images;
        const valueTotal = imageData.total
        const valueLimit = imageData.limit

        setData(value);
        setTotal(valueTotal);
        setLimit(valueLimit);
        localStorage.setItem(cacheKey, JSON.stringify(value));
        localStorage.setItem(expiryKey, (now + cacheDuration).toString());
      } catch (err) {
        console.error("Error fetching:", apiUrl, err);
      }
    }
  }, [apiUrl, cacheKey, cacheDuration]);

  return {data, total, limit};
}
