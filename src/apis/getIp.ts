import axios from "axios";

export default async function getIp() {
  try {
    const response = await axios.get("https://api.ipify.org/?format=json");
    return response.data.ip;
  } catch (error: any) {
    return 0;
  }
}
