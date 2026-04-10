import Image from "next/image";
import type { ReactNode } from "react";
import type { MachineItem, MachineType } from "@/entities/machine/model/types";
import MachineStatusBadge from "@/entities/machine/ui/MachineStatusBadge";
import StatusPanelShell from "@/shared/ui/admin/StatusPanelShell";
import StatusRowActions from "@/shared/ui/admin/StatusRowActions";

interface MachineStatusPanelProps {
  title: string;
  icon: ReactNode;
  machines: MachineItem[];
}

function MachineIcon({ type }: { type: MachineType }) {
  const src =
    type === "WASHER" ? "/icons/washer-drop.svg" : "/icons/dryer-wave.svg";

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center translate-y-0.5">
      <Image src={src} alt={type} width={28} height={28} />
    </div>
  );
}

function MachineRow({ item }: { item: MachineItem }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#E9E9EE] py-4 last:border-b-0">
      <div className="flex min-w-0 items-start gap-4">
        <MachineIcon type={item.type} />

        <div className="min-w-0">
          <p className="truncate text-[15px] text-[#4A4A4F]">{item.machine}</p>

          {item.status === "확인필요" && (
            <p className="mt-1 text-sm text-[#EA3B42]">
              기기에 이상이 감지되었습니다.
            </p>
          )}

          {item.status === "고장" && (
            <p className="mt-1 text-sm text-[#EA3B42]">
              기기 고장으로 인하여 당분간 사용이 정지됩니다.
            </p>
          )}

          {item.status === "예약" && item.reserveAt && (
            <p className="mt-1 text-sm text-[#969696]">
              예약 시간: {item.reserveAt}
            </p>
          )}

          {(item.status === "사용중" || item.status === "사용 정지") && (
            <>
              {item.deviceStatus && (
                <p className="mt-1 text-sm text-[#969696]">
                  기기 상태: {item.deviceStatus}
                </p>
              )}
              {item.remain && (
                <p className="mt-1 text-sm text-[#969696]">
                  남은 시간: {item.remain}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <StatusRowActions badge={<MachineStatusBadge status={item.status} />} />
    </div>
  );
}

export default function MachineStatusPanel({
  title,
  icon,
  machines,
}: MachineStatusPanelProps) {
  return (
    <StatusPanelShell title={title} icon={icon}>
      {machines.map((item) => (
        <MachineRow key={item.id} item={item} />
      ))}
    </StatusPanelShell>
  );
}