import { useState } from "react";
import toast from "react-hot-toast";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const request = async ({ url, method, body, action }) => {
    setIsLoading(true);

    try {
      const res = await fetch(url, {
        method: method,
        body: method === "GET" ? null : JSON.stringify(body),
        headers:
          method === "POST" || "PUT"
            ? {
                "Content-Type": "application/json",
              }
            : {},
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      setData(data);
      action();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    request,
    data,
  };
};

export default useFetch;
