import axios from "axios";
import { axiosConfig } from "../utils/header";

export async function postSubmit(endpoint: string, data: any) {
  try {
    const response = await axios.post(endpoint + "/submit", data, axiosConfig);
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
