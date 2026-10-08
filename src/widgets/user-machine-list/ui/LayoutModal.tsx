"use client";

import { Map as MapIcon, Shirt, Wind } from "lucide-react";
import type { MachinePosition, UserMachine } from "@/entities/machine";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import {
  getMachineCardStatus,
  MACHINE_STATUS_LEGEND,
} from "../lib/machineCardStatus";

interface LayoutModalProps {
  floor: number;
  // 해당 층의 세탁기와 건조기
  machines: UserMachine[];
}

const MIN_SLOTS_PER_SIDE = 3;

export default function LayoutModal({ floor, machines }: LayoutModalProps) {
  const maxNumber = Math.max(
    MIN_SLOTS_PER_SIDE,
    ...machines.map((machine) => machine.placement?.number ?? 0),
  );
  // 입구에서 먼 번호부터 위에 둔다 (예: 3 → 2 → 1)
  const numbers = Array.from(
    { length: maxNumber },
    (_, index) => maxNumber - index,
  );

  const findMachine = (
    position: MachinePosition,
    number: number,
    type: UserMachine["type"],
  ) =>
    machines.find(
      (machine) =>
        machine.type === type &&
        machine.placement?.position === position &&
        machine.placement.number === number,
    );

  const renderColumn = (position: MachinePosition) => {
    const sideCode = position === "LEFT" ? "L" : "R";

    return (
      <div className="space-y-4">
        <h4 className="mb-2 text-center font-medium text-[#6487DB]">
          {position === "LEFT" ? "왼쪽" : "오른쪽"}
        </h4>
        {numbers.map((number) => (
          <div key={number} className="space-y-2">
            <MachineSlot
              machine={findMachine(position, number, "DRYER")}
              placeholder={`D${sideCode}${number}`}
              icon="DRYER"
            />
            <MachineSlot
              machine={findMachine(position, number, "WASHER")}
              placeholder={`W${sideCode}${number}`}
              icon="WASHER"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-[#86A9FF] text-[#6487DB] hover:bg-[#EDF2FF]"
        >
          <MapIcon className="mr-1 h-4 w-4" />
          배치도
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-[#6487DB]">
            {floor}층 세탁실 배치도
          </DialogTitle>
          <DialogDescription>
            세탁기는 아래, 건조기는 위에 배치되어 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-wrap justify-center gap-2">
            {MACHINE_STATUS_LEGEND.map(({ color, text }) => (
              <Badge key={text} className={`${color} text-white`}>
                {text}
              </Badge>
            ))}
          </div>

          <div
            className="relative rounded-xl p-6 pb-12"
            style={{
              background:
                "linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 50%, #dae8ff 100%)",
              boxShadow: "inset 0 2px 10px rgba(100, 135, 219, 0.1)",
            }}
          >
            <div className="mx-auto grid max-w-md grid-cols-2 gap-8">
              {renderColumn("LEFT")}
              {renderColumn("RIGHT")}
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
              <div className="rounded-full bg-[#86A9FF] px-3 py-1 text-xs font-medium text-white">
                입구
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface MachineSlotProps {
  machine?: UserMachine;
  placeholder: string;
  icon: UserMachine["type"];
}

function MachineSlot({ machine, placeholder, icon }: MachineSlotProps) {
  const Icon = icon === "DRYER" ? Wind : Shirt;
  const status = machine ? getMachineCardStatus(machine) : null;

  return (
    <div
      className={`relative flex h-16 transform items-center justify-center rounded-lg border-2 border-gray-300 text-xs font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg ${
        status ? `${status.color} text-white` : "text-gray-400"
      }`}
      style={{
        background: status
          ? undefined
          : "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
        boxShadow: status
          ? "0 4px 12px rgba(0,0,0,0.15)"
          : "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Icon className="mr-1 h-4 w-4 shrink-0" />
      <span className="truncate px-1">
        {machine ? machine.name : placeholder}
      </span>
      {machine && (
        <div className="absolute -top-1 -right-1">
          <div className="h-3 w-3 animate-pulse rounded-full bg-white/30" />
        </div>
      )}
    </div>
  );
}
