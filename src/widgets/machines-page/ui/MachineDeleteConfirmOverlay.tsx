import { AlertTriangle } from "lucide-react";

interface MachineDeleteConfirmOverlayProps {
  machineName: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function MachineDeleteConfirmOverlay({
  machineName,
  isDeleting,
  onConfirm,
  onCancel,
}: MachineDeleteConfirmOverlayProps) {
  return (
    <div className="animate-in fade-in zoom-in-95 absolute inset-0 z-40 flex flex-col items-center justify-center rounded-2xl bg-white/95 px-6 text-center duration-200">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF1F1] text-[#EF4B4F]">
        <AlertTriangle size={32} />
      </div>

      <h3 className="mb-2 text-lg font-bold text-[#1F2937]">
        기기를 삭제하시겠습니까?
      </h3>

      <p className="mb-8 text-sm text-[#71717A]">
        <span className="font-semibold text-[#EF4B4F]">{machineName}</span>
        을(를) 시스템에서 영구적으로 제거합니다. 이 작업은 되돌릴 수
        없습니다.
      </p>

      <div className="flex w-full flex-col gap-2">
        <button
          type="button"
          disabled={isDeleting}
          onClick={onConfirm}
          className="flex h-12 w-full items-center justify-center rounded-xl bg-[#EF4B4F] font-semibold text-white transition hover:bg-[#D93D41] disabled:opacity-50"
        >
          {isDeleting ? "삭제 중..." : "네, 삭제하겠습니다"}
        </button>

        <button
          type="button"
          disabled={isDeleting}
          onClick={onCancel}
          className="flex h-12 w-full items-center justify-center rounded-xl border border-[#E5E7EB] font-semibold text-[#71717A] transition hover:bg-[#F9FAFB] disabled:opacity-50"
        >
          취소
        </button>
      </div>
    </div>
  );
}