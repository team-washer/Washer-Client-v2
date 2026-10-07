"use client";

import { Shirt, Wind } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import MachineList from "./MachineList";

const tabTriggerClassName =
  "flex h-8 items-center gap-2 rounded-md px-4 py-2 text-sm transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0";

// v1 홈의 "기기 예약" 카드 (세탁기 / 건조기 탭)
export default function MachineReservationSection() {
  const [activeTab, setActiveTab] = useState("washing");

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">기기 예약</CardTitle>
        <CardDescription>
          사용하고 싶은 세탁기나 건조기를 선택하세요
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 grid h-auto w-full grid-cols-2 rounded-lg bg-muted p-2">
            <TabsTrigger value="washing" className={tabTriggerClassName}>
              <Shirt className="h-4 w-4" />
              세탁기
            </TabsTrigger>
            <TabsTrigger value="dryer" className={tabTriggerClassName}>
              <Wind className="h-4 w-4" />
              건조기
            </TabsTrigger>
          </TabsList>

          <TabsContent value="washing" className="mt-0">
            <MachineList type="WASHER" />
          </TabsContent>

          <TabsContent value="dryer" className="mt-0">
            <MachineList type="DRYER" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
