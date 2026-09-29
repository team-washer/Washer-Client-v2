import { Suspense } from "react";
import UsersPage from "@/widgets/users-page/UserPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <UsersPage />
    </Suspense>
  );
}
