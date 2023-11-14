import { IIcon } from "@/interface";

const List = ({ width, height, fill, className, ...props }: IIcon) => {
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
      <path
        stroke={fill || "currentColor"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.56"
        d="M10 6h11m-11 6h11m-11 6h11M3 5l2-1v6m0 0H3m2 0h2m0 10H3l3.413-2.986A1.72 1.72 0 005.28 14H5a2 2 0 00-1.937 1.5"
      ></path>
    </svg>
  );
};

export default List;
