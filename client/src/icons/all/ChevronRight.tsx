import { IIcon } from "@/interface";

const ChevronRight = ({ width, height, fill, className, ...props }: IIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
      className={className}
    >
      <g>
        <path fill="none" d="M0 0H24V24H0z"></path>
        <path
          stroke={fill || "currentColor"}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.5 7l5 5-5 5"
        ></path>
      </g>
    </svg>
  );
};

export default ChevronRight;
