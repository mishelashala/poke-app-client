import { AxiosResponse } from "axios";
import { IErrorPayload } from "./index";

// handleRequestError :: AxiosResponse -> IErrorPayload
export const handleRequestError = (res: AxiosResponse): IErrorPayload => {
  if (res.status === 404) {
    return { error: true, reason: "NOT_FOUND" };
  }

  if (res.status === 500) {
    return { error: true, reason: "SERVICE_NOT_AVAILABLE" };
  }

  return { error: true, reason: "UNKNOWN_ERROR" };
};
