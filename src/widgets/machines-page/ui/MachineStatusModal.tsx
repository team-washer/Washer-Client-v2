"use client";

import { AlertCircle, CheckCircle, X, Trash2, AlertTriangle } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useUpdateMachineStatus, useDeleteMachine } from "@/entities/machine/api";
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const isOpen = Boolean(machine);
  const panelRef = useRef<HTMLDivElement>(null);
  
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateMachineStatus();
  const { mutate: deleteMachine, isPending: isDeleting } = useDeleteMachine();

  const isPending = isUpdating || isDeleting;

  useOutsideClick(panelRef, () => {
    if (!isPending) {
      setShowDeleteConfirm(false);
      onClose();
    }
  }, isOpen);

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

  const confirmDelete = () => {
    deleteMachine(machine.id, {
      onSuccess: () => {
        toast.success(`${machine.name}이(가) 삭제되었습니다.`);
        setShowDeleteConfirm(false);
        onClose();
      },
      onError: (error) => {
        console.error("Machine deletion failed:", error);
        toast.error("기기 삭제에 실패했습니다.");
        setShowDeleteConfirm(false);
      },
    });
  };

  const overlayPositionClass =
    side === "right"
      ? "absolute left-[calc(100%+16px)] top-0 h-full w-full"
      : "absolute right-[calc(100%+16px)] top-0 h-full w-full";

  return (
    <div className={`${overlayPositionClass} z-30`}>
      <div
        ref={panelRef}
        className="relative flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-[#FDFDFD] px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200"
      >
        {/* 삭제 확인 오버레이 레이어 */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center rounded-2xl bg-white/95 px-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF1F1] text-[#EF4B4F]">
              <AlertTriangle size={32} />
            </div>
            <h3 className="mb-2 text-lg font-bold text-[#1F2937]">기기를 삭제하시겠습니까?</h3>
            <p className="mb-8 text-sm text-[#71717A]">
              <span className="font-semibold text-[#EF4B4F]">{machine.name}</span>을(를) 시스템에서 영구적으로 제거합니다. 이 작업은 되돌릴 수 없습니다.
            </p>
            
            <div className="flex w-full flex-col gap-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDelete}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-[#EF4B4F] font-semibold text-white transition hover:bg-[#D93D41] disabled:opacity-50"
              >
                {isDeleting ? "삭제 중..." : "네, 삭제하겠습니다"}
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setShowDeleteConfirm(false)}
                className="flex h-12 w-full items-center justify-center rounded-xl border border-[#E5E7EB] font-semibold text-[#71717A] transition hover:bg-[#F9FAFB] disabled:opacity-50"
              >
                취소
              </button>
            </div>
          </div>
        )}

        <div className="mb-6 flex shrink-0 items-center justify-between">
          <div className="flex items-center gap-2 text-[#4A4A4F]">
            <h2 className="text-[18px] font-medium">
              {machine.name} 설정
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

        <div className="flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
          <p className="mb-1 text-sm text-[#71717A]">
            상태 변경
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

          <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
            <p className="mb-3 text-sm text-[#71717A]">
              관리 도구
            </p>

            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isPending}
              className="flex w-full items-center gap-3 rounded-xl border-2 border-[#E5E7EB] p-4 transition-all hover:border-[#EF4B4F] hover:bg-[#FFF1F1] text-[#EF4B4F]"
            >
              <Trash2 size={24} />
              <div className="text-left">
                <p className="font-semibold">기기 삭제</p>
                <p className="text-xs text-[#9CA3AF]">시스템에서 기기를 영구적으로 제거합니다.</p>
              </div>
            </button>
          </div>
        </div>

        {isPending && !showDeleteConfirm && (
          <div className="mt-4 text-center text-sm text-[#9A9AA0]">
            처리 중...
          </div>
        )}
      </div>
    </div>
  );
}
