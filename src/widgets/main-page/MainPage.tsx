import AdminLayout from "@/widgets/layout/admin-layout/ui/AdminLayout";
import SummaryCards from "../layout/admin-layout/ui/SummaryCards";
import RecentReportsPanel from "./ui/RecentReportsPanel";
import ActiveReservationsPanel from "./ui/ActiveReservationsPanel";
import UserManagementPanel from "./ui/UserManagementPanel";

export default function MainPage() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div className="flex flex-col gap-4">
        <RecentReportsPanel />
        <UserManagementPanel />
      </div>
      <ActiveReservationsPanel />
    </div>
  );
}
