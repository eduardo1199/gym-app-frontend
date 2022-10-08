import { AxiosError } from "axios";
import { useEffect, useState } from "react";

import { api } from "../services/api";
import { Methods } from "../types/methods";

export function useRequest<T = unknown>(url: string, method: Methods, body: T) {
  const [data, setData] = useState<T | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getResponse() {
      try {
        const response = await api.get<T>(url);

        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        if(err instanceof AxiosError) {
          setErrorMessage(err.response.data.message);
        }
      }
    }

    if(method === Methods.GET) {
      getResponse();
    }
  }, [method, url]);

  return { data, errorMessage, isLoading };
}
