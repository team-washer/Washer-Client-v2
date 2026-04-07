"use client";

import { OAuthLoginButton } from "@themoment-team/datagsm-oauth-react";
import { WasherLogo } from "@/lib";

const SignInForm = () => {
  return (
    <div className="w-full max-w-[370px] rounded-[20px] bg-white px-7 py-10 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
      <div className="mb-10 flex justify-center ">
        <div className="flex items-center gap-[0.41rem] w-auto">
          <WasherLogo />
          <span className="text-blue-500 font-ria text-[2.03125rem] font-extrabold leading-normal">
            Washer
          </span>
        </div>
      </div>

      <OAuthLoginButton className="flex py-3 px-[2.09375rem] justify-center items-center gap-[0.625rem] self-stretch rounded-lg bg-blue-500 text-white font-semibold" />
    </div>
  );
};

export default SignInForm;
