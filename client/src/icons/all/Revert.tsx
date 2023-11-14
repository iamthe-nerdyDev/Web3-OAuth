import { IIcon } from "@/interface";

const Revert = ({ width, height, fill, className, ...props }: IIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      viewBox="0 0 21 21"
      {...props}
      className={className}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke={fill || "currentColor"}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M5.5 3.5l-3-3h6a8.003 8.003 0 017.427 5.02c.37.921.573 1.927.573 2.98a8 8 0 11-16 0c0-1.49.37-3.472 1.538-5.091"
          transform="translate(2 2)"
        ></path>
        <path d="M8.5 3.5v5h3" transform="translate(2 2)"></path>
      </g>
    </svg>
  );
};

export default Revert;
