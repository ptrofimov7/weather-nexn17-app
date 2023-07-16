import Axios from "axios";

import { API_URL_FORECAST, API_URL_ARCHIVE } from "@/config/constants";
import { addConfigAxiosInstance, getApiClient } from "./get-api-utils";

export const apiForecastClient = getApiClient(Axios, API_URL_FORECAST);
addConfigAxiosInstance(apiForecastClient);

export const apiArchiveMeteoClient = getApiClient(Axios, API_URL_ARCHIVE);
addConfigAxiosInstance(apiArchiveMeteoClient);
