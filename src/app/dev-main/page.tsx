import UserMainPage from "@/widgets/user-main-page/UserMainPage";
import MachineReservationSection from "@/widgets/user-machine-list/ui/MachineReservationSection";

export default function DevMain() {
  return <UserMainPage machineSection={<MachineReservationSection />} />;
}
