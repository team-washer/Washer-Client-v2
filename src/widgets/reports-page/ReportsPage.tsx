import { reportsMock } from "@/entities/report/model/mock";
import ReportFilterPanel from "./ui/ReportFilterPanel";
import ReportsPanel from "./ui/ReportsPanel";

export default function ReportsPage() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:h-full xl:min-h-0 xl:grid-cols-[1.65fr_0.9fr]">
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