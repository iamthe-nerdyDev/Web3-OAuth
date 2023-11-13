import { IIcon } from "../../interface";

const ChevronDown = ({ width, height, fill, ...props }: IIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g>
        <g>
          <g>
            <path
              fill="none"
              stroke={fill || "currentColor"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8.5L12 15.5 19 8.5"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default ChevronDown;
