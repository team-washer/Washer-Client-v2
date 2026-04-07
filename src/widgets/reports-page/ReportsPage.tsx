import { reportsMock } from "@/entities/report/model/mock";
import ReportFilterPanel from "./ui/ReportFilterPanel";
import ReportsPanel from "./ui/ReportsPanel";

export default function ReportsPage() {
  return (
    <div className="admin-page-grid xl:grid-cols-[1.9fr_0.62fr]">
      <div className="admin-page-item">
        <ReportsPanel
          title="고장 신고 관리"
          reports={reportsMock}
          variant="detail"
        />
      </div>

      <div className="admin-page-item">
        <ReportFilterPanel />
      </div>
    </div>
  );
}