import { IIcon } from "@/interface";

const Sun = ({ width, height, fill, className, ...props }: IIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={width || 24}
      height={height || 24}
      stroke={fill || "currentColor"}
      strokeWidth="0"
      viewBox="0 0 24 24"
      className={className}
      {...props}
    >
      <path
        fill={fill || "currentColor"}
        fillRule="evenodd"
        d="M12 1.25a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0V2a.75.75 0 01.75-.75zM4.399 4.399a.75.75 0 011.06 0l.393.392a.75.75 0 01-1.06 1.061l-.393-.393a.75.75 0 010-1.06zm15.202 0a.75.75 0 010 1.06l-.393.393a.75.75 0 01-1.06-1.06l.393-.393a.75.75 0 011.06 0zM12 6.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5zM5.25 12a6.75 6.75 0 1113.5 0 6.75 6.75 0 01-13.5 0zm-4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5H2a.75.75 0 01-.75-.75zm19 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm-2.102 6.148a.75.75 0 011.06 0l.393.393a.75.75 0 11-1.06 1.06l-.393-.393a.75.75 0 010-1.06zm-12.296 0a.75.75 0 010 1.06l-.393.393a.75.75 0 11-1.06-1.06l.392-.393a.75.75 0 011.061 0zM12 20.25a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Sun;
