"use client";

import { Droplet, Waves } from "lucide-react";
import { useGetMachines } from "@/entities/machine/api";
import { mapMachines } from "@/entities/machine";
import MachineStatusPanel from "./ui/MachineStatusPanel";

export default function MachinesPage() {
  const { data: machinesResponse } = useGetMachines();

  const machines = mapMachines(machinesResponse?.data.machines ?? []);
  const dryerMachines = machines.filter((item) => item.type === "DRYER");
  const washerMachines = machines.filter((item) => item.type === "WASHER");

  return (
    <div className="admin-page-grid">
      <div className="admin-page-item">
        <MachineStatusPanel
          title="건조기 상태"
          icon={<Waves size={18} className="translate-y-px text-[#A4A4AA]" />}
          machines={dryerMachines}
        />
      </div>

      <div className="admin-page-item">
        <MachineStatusPanel
          title="세탁기 상태"
          icon={<Droplet size={18} className="translate-y-px text-[#A4A4AA]" />}
          machines={washerMachines}
          side="left"
        />
      </div>
    </div>
  );
}