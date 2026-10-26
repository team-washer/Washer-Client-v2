"use client";

import { OAuthLoginButton } from "@themoment-team/datagsm-oauth-react";
import { WasherLogo } from "@/lib";

const SignInForm = () => {
  return (
    <div className="w-full max-w-110 rounded-[20px] bg-white px-5 py-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:px-7 sm:py-10">
      <div className="mb-10 flex justify-center ">
        <div className="flex items-center gap-[0.41rem] w-auto">
          <WasherLogo />
          <span className="text-blue-500 font-ria text-[2.03125rem] font-extrabold leading-normal">
            Washer
          </span>
        </div>
      </div>

      <OAuthLoginButton className="flex w-full items-center justify-center gap-2.5 self-stretch rounded-lg bg-blue-500 px-4 py-3 text-white font-semibold sm:px-[2.09375rem]" />
    </div>
  );
};

export default SignInForm;
