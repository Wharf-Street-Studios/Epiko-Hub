export default function Ellipse3() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[-150%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 800 800">
          <g filter="url(#filter0_f_1_4037)" id="Ellipse 3">
            <circle cx="400" cy="400" fill="var(--fill-0, #7F00FF)" r="100" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="800" id="filter0_f_1_4037" width="800" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_1_4037" stdDeviation="150" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}
