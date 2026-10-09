"use client";

import { BellRing, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { registerFcmToken } from "@/entities/notification";
import { requestPushPermission } from "@/shared/lib/firebaseMessaging";
import { Button } from "@/shared/ui/button";

export default function EnablePushNotificationsButton() {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestPermission = async () => {
    setIsRequesting(true);
    try {
      const token = await requestPushPermission();
      if (token) {
        await registerFcmToken(token);
        toast.success("웹 알림을 켰습니다.");
      } else {
        toast.error("웹 알림을 켜지 못했습니다.", {
          description: "브라우저 권한과 Firebase 환경 설정을 확인해주세요.",
        });
      }
    } catch (error) {
      toast.error("웹 알림 등록에 실패했습니다.", {
        description:
          error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.",
      });
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleRequestPermission}
      disabled={isRequesting}
    >
      {isRequesting ? <LoaderCircle className="animate-spin" /> : <BellRing />}
      웹 알림 켜기
    </Button>
  );
}
