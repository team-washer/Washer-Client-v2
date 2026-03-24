"use client";

import Link from "next/link";
import { useState } from "react";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full max-w-[370px] rounded-[20px] bg-white px-7 py-10 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
      <div className="mb-10 flex justify-center">
        <div className="text-[32px] font-extrabold text-[#3d7cff]">
          W Washer
        </div>
      </div>

      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#555]">이메일</label>

          <div className="flex h-[44px] items-center rounded-[10px] border border-[#d9d9d9] bg-white px-3">
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="이메일을 입력해주세요"
              className="flex-1 border-none bg-transparent text-sm text-[#222] outline-none placeholder:text-[#b9b9b9]"
            />
            <span className="text-sm text-[#a3a3a3]">@gsm.hs.kr</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#555]">비밀번호</label>

          <div className="flex h-[44px] items-center rounded-[10px] border border-[#d9d9d9] bg-white px-3">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력해주세요"
              className="flex-1 border-none bg-transparent text-sm text-[#222] outline-none placeholder:text-[#b9b9b9]"
            />
            <button
              type="button"
              className="text-sm text-[#9a9a9a]"
              aria-label="비밀번호 표시"
            >
              👁
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs font-medium text-[#7d7d7d]"
            >
              비밀번호 찾기
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 h-[44px] rounded-[10px] bg-[#a9c5ff] text-sm font-semibold text-white"
        >
          로그인
        </button>
      </form>

      <div className="mt-4 flex items-center justify-center gap-1 text-sm text-[#777]">
        <span>아직 Washer와 함께하지 못했다면?</span>
        <Link href="/sign-up" className="font-semibold text-[#4a77ff]">
          회원가입하기
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
