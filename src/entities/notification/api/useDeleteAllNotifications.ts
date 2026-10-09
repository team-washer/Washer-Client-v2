import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationQueryKeys } from "@/shared/api";
import { deleteAllNotifications } from "./deleteAllNotifications";

export function useDeleteAllNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllNotifications,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.all,
      });
    },
  });
}
