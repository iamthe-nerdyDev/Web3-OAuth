import { IIcon } from "../../interface";

const ChevronRight = ({ width, height, fill, ...props }: IIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke={fill || "currentColor"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 6l6 6-6 6"
      ></path>
    </svg>
  );
};

export default ChevronRight;
