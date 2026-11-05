import UserRouteGuard from "@/widgets/layout/user-layout/ui/UserRouteGuard";
import MachineReservationSection from "@/widgets/user-machine-list/ui/MachineReservationSection";
import UserMainPage from "@/widgets/user-main-page/UserMainPage";

export default function UserPage() {
  return (
    <UserRouteGuard>
      <UserMainPage machineSection={<MachineReservationSection />} />
    </UserRouteGuard>
  );
}
