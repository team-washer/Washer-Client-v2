"use client";

import { getUserHomeKind, useGetMyInfo } from "@/entities/user";
import MachineReservationSection from "@/widgets/user-machine-list/ui/MachineReservationSection";
import UserMainPage from "@/widgets/user-main-page/UserMainPage";
import MainPage from "@/widgets/main-page/MainPage";

export default function RoleBasedHome() {
  const { data, isPending, isError } = useGetMyInfo();

  if (isPending || isError || !data?.data) {
    return null;
  }

  if (getUserHomeKind(data.data.role) === "user") {
    return <UserMainPage machineSection={<MachineReservationSection />} />;
  }

  return <MainPage />;
}
