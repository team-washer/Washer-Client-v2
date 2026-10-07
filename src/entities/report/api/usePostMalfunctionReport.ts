import { useMutation } from "@tanstack/react-query";
import { createMalfunctionReport } from "./createMalfunctionReport";

export const usePostMalfunctionReport = () => {
  return useMutation({
    mutationFn: createMalfunctionReport,
  });
};
