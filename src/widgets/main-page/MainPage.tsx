import AdminLayout from "@/widgets/layout/admin-layout/ui/AdminLayout";
import SummaryCards from "./ui/SummaryCards";
import RecentReportsPanel from "./ui/RecentReportsPanel";
import ActiveReservationsPanel from "./ui/ActiveReservationsPanel";
import UserManagementPanel from "./ui/UserManagementPanel";

export default function MainPage() {
  return (
    <div className="flex flex-col gap-4">
      <SummaryCards />
      <div className="grid grid-cols-[1fr_1.02fr] gap-4">
        <div className="flex flex-col gap-4">
          <RecentReportsPanel />
          <UserManagementPanel />
        </div>

        <ActiveReservationsPanel />
      </div>
    </div>
  );
}
