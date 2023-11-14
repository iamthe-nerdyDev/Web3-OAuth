import { IIcon } from "@/interface";

const QuoteLeft = ({ width, height, fill, className, ...props }: IIcon) => {
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
      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-2.219 1.781-4 4-4zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-8c0-2.219 1.781-4 4-4zM6 16h6v6H6zm14 0h6v6h-6z"></path>
    </svg>
  );
};

export default QuoteLeft;
