"use client";

import { AlertCircle, CheckCircle, Trash2, X } from "lucide-react";
import { MachineConditionStatusDTO, MachineItem } from "@/entities/machine";
import { MACHINE_STATUS_OPTIONS } from "@/entities/machine";
interface MachineStatusModalProps {
  machine: MachineItem | null;
  selectedStatus: MachineConditionStatusDTO;
  onChangeStatus: (status: MachineConditionStatusDTO) => void;
  onUpdateStatus: () => void;
  onDelete: () => void;
  onClose: () => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

function StatusIcon({ value }: { value: MachineConditionStatusDTO }) {
  if (value === "NORMAL") {
    return <CheckCircle size={18} className="text-[#4486FF]" />;
  }

  return <AlertCircle size={18} className="text-[#EA3B42]" />;
}

export default function MachineStatusModal({
  machine,
  selectedStatus,
  onChangeStatus,
  onUpdateStatus,
  onDelete,
  onClose,
  isUpdating = false,
  isDeleting = false,
}: MachineStatusModalProps) {
  if (!machine) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-[480px] rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#E9E9EE] px-5 py-4">
          <div>
            <p className="text-[16px] font-semibold text-[#27272A]">
              {machine.machine}
            </p>
            <p className="mt-1 text-sm text-[#71717A]">
              기기 상태를 변경하거나 삭제할 수 있습니다.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#71717A] hover:bg-[#F4F4F5]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3 px-5 py-5">
          {MACHINE_STATUS_OPTIONS.map((option) => {
            const isSelected = selectedStatus === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChangeStatus(option.value)}
                className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-4 text-left transition ${
                  isSelected
                    ? option.value === "NORMAL"
                      ? "border-[#4486FF] bg-[#F0F5FF]"
                      : "border-[#EA3B42] bg-[#FFF1F1]"
                    : "border-[#E5E7EB] hover:bg-[#FAFAFA]"
                }`}
              >
                <StatusIcon value={option.value} />

                <div>
                  <p className="text-[15px] font-medium text-[#27272A]">
                    {option.title}
                  </p>
                  <p className="mt-1 text-sm text-[#71717A]">
                    {option.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-[#E9E9EE] px-5 py-4">
          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-xl border border-[#F1B5B8] px-4 py-2 text-sm font-medium text-[#D11A2A] hover:bg-[#FFF5F5] disabled:opacity-60"
          >
            <Trash2 size={16} />
            기기 삭제
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#E4E4E7] px-4 py-2 text-sm font-medium text-[#3F3F46] hover:bg-[#FAFAFA]"
            >
              취소
            </button>

            <button
              type="button"
              onClick={onUpdateStatus}
              disabled={isUpdating}
              className="rounded-xl bg-[#18181B] px-4 py-2 text-sm font-medium text-white hover:bg-[#27272A] disabled:opacity-60"
            >
              상태 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}