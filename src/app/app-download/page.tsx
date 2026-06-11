import Link from "next/link";

import { WasherLogo } from "@/lib";
import AuthLayout from "@/widgets/layout/auth-layout/ui/AuthLayout";

export default function AppDownloadPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-[27.5rem] rounded-[20px] bg-white px-7 py-10 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
        <div className="mb-10 flex justify-center">
          <div className="flex items-center gap-[0.41rem] w-auto">
            <WasherLogo />
            <span className="text-blue-500 font-ria text-[2.03125rem] font-extrabold leading-normal">
              Washer
            </span>
          </div>
        </div>

        <div className="mb-10 text-center">
          <h1 className="text-[1.125rem] font-bold text-[#222222] mb-3">
            앱으로 다운로드하여 이용해주세요
          </h1>
          <p className="text-[#666666] text-[0.875rem] leading-relaxed">
            이제 편하게 모바일로 새로워진 washer를 이용해보세요!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <a
            href="https://apps.apple.com/app/6760886865"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-4  rounded-xl bg-[#1D1D1F] hover:bg-black text-white py-3.5 px-4 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 384 512" className="w-5 h-5 fill-current" role="img" aria-label="Apple Logo">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <div className="flex flex-col items-start text-left">
              <span className="text-[10px] leading-none mb-0.5 text-gray-300 font-medium">
                Download on the
              </span>
              <span className="text-[15px] font-semibold leading-none tracking-tight">
                App Store
              </span>
            </div>
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=com.washer.v2&pli=1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-4 rounded-xl bg-[#1D1D1F] hover:bg-black text-white py-3.5 px-4 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Google Play Logo"
            >
              <path fill="none" d="M0,0h40v40H0V0z" />
              <g>
                <path
                  d="M19.7,19.2L4.3,35.3c0,0,0,0,0,0c0.5,1.7,2.1,3,4,3c0.8,0,1.5-0.2,2.1-0.6l0,0l17.4-9.9L19.7,19.2z"
                  fill="#EA4335"
                />
                <path
                  d="M35.3,16.4L35.3,16.4l-7.5-4.3l-8.4,7.4l8.5,8.3l7.5-4.2c1.3-0.7,2.2-2.1,2.2-3.6C37.5,18.5,36.6,17.1,35.3,16.4z"
                  fill="#FBBC04"
                />
                <path
                  d="M4.3,4.7C4.2,5,4.2,5.4,4.2,5.8v28.5c0,0.4,0,0.7,0.1,1.1l16-15.7L4.3,4.7z"
                  fill="#4285F4"
                />
                <path
                  d="M19.8,20l8-7.9L10.5,2.3C9.9,1.9,9.1,1.7,8.3,1.7c-1.9,0-3.6,1.3-4,3c0,0,0,0,0,0L19.8,20z"
                  fill="#34A853"
                />
              </g>
            </svg>
            <div className="flex flex-col items-start text-left">
              <span className="text-[10px] leading-none mb-0.5 text-gray-300 font-medium">
                GET IT ON
              </span>
              <span className="text-[15px] font-semibold leading-none tracking-tight">
                Google Play
              </span>
            </div>
          </a>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/sign-in"
            className="text-[0.875rem] text-[#888888] hover:text-[#444444] transition-colors underline underline-offset-4"
          >
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
