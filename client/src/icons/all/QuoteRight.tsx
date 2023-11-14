import { IIcon } from "@/interface";

const QuoteRight = ({ width, height, fill, className, ...props }: IIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      viewBox="0 0 32 32"
      {...props}
      fill={fill || "currentColor"}
      className={className}
    >
      <path d="M4 8v10h8c0 2.219-1.781 4-4 4v2c3.3 0 6-2.7 6-6V8zm14 0v10h8c0 2.219-1.781 4-4 4v2c3.3 0 6-2.7 6-6V8zM6 10h6v6H6zm14 0h6v6h-6z"></path>
    </svg>
  );
};

export default QuoteRight;
