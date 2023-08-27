import axios, { type AxiosRequestConfig } from "axios";
import { getBaseUrl } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

export const api = axios.create({
  maxBodyLength: Infinity,
  baseURL: `${getBaseUrl()}/api`,
});

export interface DefaultErrorResponse {
  message: string;
}

export const handleFetchError = (error: any) => {
  if (axios.isAxiosError<DefaultErrorResponse>(error)) {
    toast({
      title: "There was an error",
      description: error.response?.data.message || "Something went wrong",
    });
  } else {
    console.log(error);
    toast({
      title: "There was an error",
      description: "Something went wrong",
    });
  }
};