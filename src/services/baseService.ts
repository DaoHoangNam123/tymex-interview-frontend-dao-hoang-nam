import axios from "axios";
import appConfig from "@/config/app.config";

const baseService = axios.create({
  baseURL: appConfig.apiPrefix,
});

export default baseService;
