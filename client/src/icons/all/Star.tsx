import { IIcon } from "@/interface";

const Star = ({ width, height, fill, className, ...props }: IIcon) => {
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
        fill={fill || "currentColor"}
        d="M12.912 1.59a1 1 0 00-1.825 0L8.27 7.868l-6.84.74a1 1 0 00-.563 1.735l5.099 4.619-1.41 6.733a1 1 0 001.476 1.073L12 19.345l5.968 3.422a1 1 0 001.476-1.073l-1.41-6.733 5.099-4.619a1 1 0 00-.564-1.735l-6.84-.74-2.817-6.276z"
      ></path>
    </svg>
  );
};

export default Star;
