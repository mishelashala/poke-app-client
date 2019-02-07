import { IErrorPayload } from "./index";

// handleError :: IErrorPayload -> IAppError
export const handleError = (err: IErrorPayload) => {
  if (err.reason === "NOT_FOUND") {
    return {
      message: "Pokemon List Not Found"
    };
  }

  if (err.reason === "INTERNAL_SERVER_ERROR") {
    return {
      message: "Pokemon List Not Available"
    };
  }

  return {
    message: "Unknown Error"
  };
};
