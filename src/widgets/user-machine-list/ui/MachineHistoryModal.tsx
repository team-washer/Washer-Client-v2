"use client";

import { AlertCircle, History, LoaderCircle } from "lucide-react";
import type { UserMachine } from "@/entities/machine";
import { useGetMachineHistory } from "@/entities/machine";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { getRecentMachineHistoryRange } from "../lib/machineHistory";
import { groupMachineHistoryByDay } from "../lib/machineHistoryPresentation";
import MachineHistoryCard from "./MachineHistoryCard";

interface MachineHistoryModalProps {
  machine: UserMachine | null;
  onClose: () => void;
}

const HISTORY_PAGE_SIZE = 20;

export default function MachineHistoryModal({
  machine,
  onClose,
}: MachineHistoryModalProps) {
  const range = getRecentMachineHistoryRange();
  const historyQuery = useGetMachineHistory(machine?.id ?? null, {
    ...range,
    size: HISTORY_PAGE_SIZE,
  });
  const items = historyQuery.data?.pages.flatMap((page) => page.content) ?? [];
  const groups = groupMachineHistoryByDay(items, range);
  const lastPage = historyQuery.data?.pages.at(-1);
  const showLoadMore =
    lastPage !== undefined &&
    !lastPage.last &&
    !historyQuery.isFetchingNextPage;

  return (
    <Dialog
      open={machine !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[calc(100dvh-2rem)] grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <DialogHeader className="border-b px-4 py-5 pr-12 text-left sm:px-6">
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-[#6487DB]" />
            {machine?.name ?? "기기"} 히스토리
          </DialogTitle>
          <DialogDescription>
            어제부터 오늘까지의 최근 이용 내역입니다.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 overflow-y-auto px-4 py-5 sm:px-6">
          {historyQuery.isLoading && (
            <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
              <LoaderCircle className="h-6 w-6 animate-spin" />
              히스토리를 불러오는 중입니다.
            </div>
          )}

          {historyQuery.isError && (
            <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-center text-sm text-destructive">
              <AlertCircle className="h-7 w-7" />
              히스토리를 불러오지 못했습니다.
            </div>
          )}

          {!historyQuery.isLoading &&
            !historyQuery.isError &&
            items.length === 0 && (
              <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-center text-sm text-muted-foreground">
                <History className="h-8 w-8" />
                최근 2일간 이용 내역이 없습니다.
              </div>
            )}

          {!historyQuery.isLoading &&
            !historyQuery.isError &&
            groups.length > 0 && (
              <div className="space-y-6">
                {groups.map((group) => (
                  <section
                    key={group.label}
                    aria-labelledby={`history-${group.label}`}
                  >
                    <h3
                      id={`history-${group.label}`}
                      className="mb-3 text-sm font-semibold text-foreground"
                    >
                      {group.label}
                    </h3>
                    <div className="space-y-3">
                      {group.items.map((item) => (
                        <MachineHistoryCard
                          key={item.id}
                          machineName={machine?.name ?? "기기"}
                          item={item}
                        />
                      ))}
                    </div>
                  </section>
                ))}

                {showLoadMore && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => void historyQuery.fetchNextPage()}
                  >
                    더 보기
                  </Button>
                )}
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
