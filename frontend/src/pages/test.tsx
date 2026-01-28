import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Monitor, Smartphone } from "lucide-react";

// Import both dashboard images
// import lightDashboardImage from "figma:asset/65248310cbdeecb61166f8df03f89d1696198531.png";
// import darkDashboardImage from "figma:asset/e70159570708c768d7c2116df250273114875302.png";

export default function Test() {
  return (
    <Card className="w-[590px] h-[300px] p-0 overflow-hidden bg-linear-to-br from-emerald-100 via-emerald-50 to-green-50">
      <div className="relative h-full flex">
        {/* Left Content Section */}
        <div className="flex-1 p-4 z-10 bg-white/90 backdrop-blur-sm">
          {/* Logo */}
          <div className="mb-2">
            <Logo size="default" showText={true} />
          </div>

          {/* Title - Both lines same style and color */}
          <div className="mb-2">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Money Management App Dashboard NextJS Template
            </h3>
            <p className="text-sm text-emerald-800 text font-medium">
              "Empowering Financial Decisions"
            </p>
          </div>

          {/* Feature Badges */}
          <div className="flex justify-center flex-wrap gap-1.5 mb-2">
            <Badge
              variant="secondary"
              className="bg-stone-200 text-stone-950 hover:bg-stone-100"
            >
              <svg
                className="w- h- mr-1"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 10.087 13.6902 12.3681 11.6975 13.7163L4.90687 4.20942C4.78053 4.03255 4.5544 3.95756 4.34741 4.02389C4.14042 4.09022 4 4.28268 4 4.50004V12H5V6.06027L10.8299 14.2221C9.82661 14.7201 8.696 15 7.5 15C3.35786 15 0 11.6421 0 7.5ZM10 10V4H11V10H10Z"
                    fill="#000000"
                  ></path>{" "}
                </g>
              </svg>
              NextJS
            </Badge>
            <Badge
              variant="secondary"
              className="bg-sky-100 text-sky-500 hover:bg-sky-50"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="#00bcff"
                width="120px"
                height="120px"
                viewBox="0 0 24.00 24.00"
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                stroke="#45a4ed"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 6.036c-2.667 0-4.333 1.325-5 3.976 1-1.325 2.167-1.822 3.5-1.491.761.189 1.305.738 1.906 1.345C13.387 10.855 14.522 12 17 12c2.667 0 4.333-1.325 5-3.976-1 1.325-2.166 1.822-3.5 1.491-.761-.189-1.305-.738-1.907-1.345-.98-.99-2.114-2.134-4.593-2.134zM7 12c-2.667 0-4.333 1.325-5 3.976 1-1.326 2.167-1.822 3.5-1.491.761.189 1.305.738 1.907 1.345.98.989 2.115 2.134 4.594 2.134 2.667 0 4.333-1.325 5-3.976-1 1.325-2.167 1.822-3.5 1.491-.761-.189-1.305-.738-1.906-1.345C10.613 13.145 9.478 12 7 12z"
                  ></path>
                </g>
              </svg>{" "}
              Tailwind
            </Badge>
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-600 hover:bg-blue-50"
            >
              <svg
                className="w-4 h-4 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="4" fill="#3178C6" />
                <path
                  d="M16.5 14.5v1.75c0 .14.11.25.25.25h.5c.14 0 .25-.11.25-.25v-1.75c0-.14-.11-.25-.25-.25h-.5c-.14 0-.25.11-.25.25zm-1.5-3.5v-1h4.5v1h-1.5v5h-1.5v-5h-1.5zm-7.5 3.5v1.75c0 .14.11.25.25.25h.5c.14 0 .25-.11.25-.25v-1.75c0-.14-.11-.25-.25-.25h-.5c-.14 0-.25.11-.25.25zm5.94-3.62c-.07-.07-.18-.05-.23.04l-1.71 2.82-1.71-2.82c-.05-.09-.16-.11-.23-.04-.07.07-.05.18.04.23l1.84 3.03v2.86c0 .14.11.25.25.25h.5c.14 0 .25-.11.25-.25v-2.86l1.84-3.03c.09-.05.11-.16.04-.23zm-5.94-.88v-1h-3v1h.94v5h1.12v-5h.94z"
                  fill="white"
                />
              </svg>
              TypeScript
            </Badge>
            <Badge
              variant="secondary"
              className="bg-stone-200 text-stone-950 hover:bg-stone-50"
            >
              <Monitor className="w-4 h-4 mr-1" />
              Light & Dark
            </Badge>
            <Badge
              variant="secondary"
              className="bg-sky-100 text-sky-500 hover:bg-sky-50"
            >
              <Smartphone className="w-4 h-4 mr-1" />
              Responsive
            </Badge>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-600 leading-relaxed">
            Complete financial dashboard with beautiful charts, comprehensive
            analytics and modern UI components. Built with Next.js, Typescript
            and Tailwind CSS.
          </p>
        </div>

        {/* Right Dashboard Preview - Stylish Clear Layout */}
        <div className="relative w-[280px] h-full">
          {/* Light theme - top half */}
          <div className="absolute top-4 right-4 w-[240px] h-[128px] border-2 border-white shadow-lg">
            <img
            //   src={lightDashboardImage}
              alt="Light Dashboard"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <Badge
                variant="secondary"
                className="bg-white/90 text-gray-700 text-xs h-4 px-2 shadow-sm"
              >
                Light
              </Badge>
            </div>
          </div>

          {/* Dark theme - bottom half */}
          <div className="absolute bottom-4 right-4 w-[240px] h-[128px] border-2 border-white shadow-lg">
            <img
            //   src={darkDashboardImage}
              alt="Dark Dashboard"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <Badge
                variant="secondary"
                className="bg-slate-800/90 text-slate-200 text-xs h-4 px-2 shadow-sm"
              >
                Dark
              </Badge>
            </div>
          </div>

          {/* Stylish connecting line */}
          <div className="absolute top-[136px] right-[124px] w-px h-8 bg-emerald-300"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 opacity-60"></div>
        <div className="absolute bottom-6 right-8 w-1 h-1 bg-emerald-300 opacity-40"></div>
        <div className="absolute top-1/2 right-12 w-1.5 h-1.5 bg-emerald-500 opacity-30"></div>
      </div>
    </Card>
  );
}
