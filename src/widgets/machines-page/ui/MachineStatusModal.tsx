"use client";

import { AlertCircle, CheckCircle, X } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { useUpdateMachineStatus } from "@/entities/machine/api";
import type {
  AdminMachineItem,
  MachineStatus,
} from "@/entities/machine/model/types";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";

interface MachineStatusModalProps {
  machine: AdminMachineItem | null;
  onClose: () => void;
  side?: "left" | "right";
}

export default function MachineStatusModal({
  machine,
  onClose,
  side = "right",
}: MachineStatusModalProps) {
  const isOpen = Boolean(machine);
  const panelRef = useRef<HTMLDivElement>(null);
  const { mutate: updateStatus, isPending } = useUpdateMachineStatus();

  useOutsideClick(panelRef, onClose, isOpen);

  if (!isOpen || !machine) return null;

  const handleStatusUpdate = (status: MachineStatus) => {
    updateStatus(
      { id: machine.id, status },
      {
        onSuccess: () => {
          toast.success(`${machine.name} 상태가 변경되었습니다.`);
          onClose();
        },
        onError: (error) => {
          console.error("Machine status update failed:", error);
          toast.error("상태 변경에 실패했습니다.");
        },
      },
    );
  };

  const overlayPositionClass =
    side === "right"
      ? "absolute left-[calc(100%+16px)] top-0 h-full w-full"
      : "absolute right-[calc(100%+16px)] top-0 h-full w-full";

  return (
    <div className={`${overlayPositionClass} z-30`}>
      <div
        ref={panelRef}
        className="flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-[#FDFDFD] px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
      >
        <div className="mb-6 flex shrink-0 items-center justify-between">
          <div className="flex items-center gap-2 text-[#4A4A4F]">
            <h2 className="text-[18px] font-medium">
              {machine.name} 상태 변경
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#A1A1AA] transition hover:bg-[#ECECEC]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <p className="mb-2 text-sm text-[#71717A]">
            변경할 상태를 선택해주세요.
          </p>

          <button
            type="button"
            onClick={() => handleStatusUpdate("NORMAL")}
            disabled={isPending}
            className={`flex items-center justify-between rounded-xl border-2 p-4 transition-all ${
              machine.status === "NORMAL"
                ? "border-[#4486FF] bg-[#F0F5FF]"
                : "border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
            }`}
          >
            <div className="flex items-center gap-3">
              <CheckCircle
                className={
                  machine.status === "NORMAL"
                    ? "text-[#4486FF]"
                    : "text-[#A1A1AA]"
                }
                size={24}
              />
              <div className="text-left">
                <p className="font-semibold text-[#1F2937]">정상 (NORMAL)</p>
                <p className="text-xs text-[#6B7280]">
                  기기가 정상적으로 작동합니다.
                </p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleStatusUpdate("MALFUNCTION")}
            disabled={isPending}
            className={`flex items-center justify-between rounded-xl border-2 p-4 transition-all ${
              machine.status === "MALFUNCTION"
                ? "border-[#EA3B42] bg-[#FFF1F1]"
                : "border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
            }`}
          >
            <div className="flex items-center gap-3">
              <AlertCircle
                className={
                  machine.status === "MALFUNCTION"
                    ? "text-[#EA3B42]"
                    : "text-[#A1A1AA]"
                }
                size={24}
              />
              <div className="text-left">
                <p className="font-semibold text-[#1F2937]">
                  고장 (MALFUNCTION)
                </p>
                <p className="text-xs text-[#6B7280]">
                  기기 점검이 필요한 상태입니다.
                </p>
              </div>
            </div>
          </button>
        </div>

        {isPending && (
          <div className="mt-4 text-center text-sm text-[#9A9AA0]">
            처리 중...
          </div>
        )}
      </div>
    </div>
  );
}
