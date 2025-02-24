import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const req = await fetch(
          `https://json-api.uz/api/project/f-quiz/quizzes`
        );
        console.log("Fetch request:", req); // So‘rovni tekshirish
        if (!req.ok) {
          throw new Error(req.statusText);
        }
        const data = await req.json();
        console.log("Fetched data:", data); // Ma'lumotlarni tekshirish
        setData(data);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err.message); // Xatolikni chiqarish
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isPending, error };
}
