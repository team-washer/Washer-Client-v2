import { Suspense } from "react";
import ReportsPage from "@/widgets/reports-page/ReportsPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ReportsPage />
    </Suspense>
  );
}
