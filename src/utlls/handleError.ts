import toast from "react-hot-toast";

export const handleClientError = (
  err: unknown,
  fallbackMessage = "Something went wrong"
) => {
  console.error(err);

  if (err instanceof Error) {
    toast.error(err.message || fallbackMessage);
  } else if (typeof err === "string") {
    toast.error(err);
  } else {
    toast.error(fallbackMessage);
  }
};

export const handleApiError = (err: unknown, context: string) => {
  if (err instanceof Error) {
    console.error(`${context} error:`, err.message);
    return { error: err.message };
  }

  console.error(`${context} unknown error:`, err);
  return { error: "An unexpected error occurred" };
};
