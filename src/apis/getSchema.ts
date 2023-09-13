import axios from "axios";
import { axiosConfig } from "../utils/header";

export async function getSchema(endpoint: string) {
  try {
    const response = await axios.get(endpoint, axiosConfig);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: error.response.status,
      data: null,
    };
  }
}
