import { Droplet, Waves } from "lucide-react";
import { machinesMock } from "@/entities/machine/model/mock";
import MachineStatusPanel from "./ui/MachineStatusPanel";

export default function MachinesPage() {
  const dryerMachines = machinesMock.filter((item) => item.type === "DRYER");
  const washerMachines = machinesMock.filter((item) => item.type === "WASHER");

  return (
    <div className="admin-page-grid">
      <div className="admin-page-item">
        <MachineStatusPanel
          title="활성화 된 예약"
          icon={<Waves size={18} className="translate-y-px text-[#A4A4AA]" />}
          machines={dryerMachines}
        />
      </div>

      <div className="admin-page-item">
        <MachineStatusPanel
          title="활성화 된 예약"
          icon={<Droplet size={18} className="translate-y-px text-[#A4A4AA]" />}
          machines={washerMachines}
        />
      </div>
    </div>
  );
}