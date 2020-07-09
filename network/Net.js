import axios from "axios";

const Net = axios.create({
  baseURL: "https://www.ukonnect.co",
});

export default Net;
