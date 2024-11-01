import axios, { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Routes } from "@/app/config/navigation";
import { OpenAPI } from "@/app/services/api";

export function useHttpClient() {
  const { push } = useRouter();

  useEffect(() => {
    OpenAPI.BASE = "http://localhost:9000";
    OpenAPI.TOKEN = async () => {
      return localStorage.getItem("token")!;
    };
  }, []);

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        switch (error.response.status) {
          case HttpStatusCode.Unauthorized:
            localStorage.removeItem("token");
            window.location.href = Routes.auth.login;
            break;

          case HttpStatusCode.InternalServerError:
            if (!navigator.onLine) {
              alert("No Internet Connection");
            } else {
              alert("Internal Server Error");
            }

            break;
        }

        return Promise.reject(error);
      },
    );
  }, [push]);
}
