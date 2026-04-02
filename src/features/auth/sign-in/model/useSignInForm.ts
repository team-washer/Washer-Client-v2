"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { requestSignIn } from "../api/requestSignIn";
export const useSignInForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailId = email.trim();
    const passwordValue = password.trim();

    if (!emailId || !passwordValue) {
      toast.error("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    const fullEmail = `${emailId}@gsm.hs.kr`;

    try {
      setIsLoading(true);

      await requestSignIn({
        email: fullEmail,
        password: passwordValue,
      });

      toast.success("로그인이 완료되었습니다.");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("인증 방식이 아직 연결되지 않았거나 로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    showPassword,
    isLoading,
    setEmail,
    setPassword,
    togglePasswordVisibility,
    handleSubmit,
  };
};
