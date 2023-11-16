import React from "react";

interface IIcon {
  width?: number;
  height?: number;
  fill?: string;
}

export const Logo = ({ fill }: { fill?: string }) => {
  return (
    <svg
      width={35}
      height={35}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 48 48"
    >
      <g>
        <path fill="#fff" fillOpacity="0.01" d="M0 0H48V48H0z"></path>
        <path
          stroke={fill || "currentColor"}
          strokeLinecap="round"
          strokeWidth="2"
          d="M14 8L34 8"
        ></path>
        <path
          stroke={fill || "currentColor"}
          strokeLinecap="round"
          strokeWidth="2"
          d="M14 8L34 8"
        ></path>
        <path
          stroke={fill || "currentColor"}
          strokeLinecap="round"
          strokeWidth="2"
          d="M14 40L34 40"
        ></path>
        <rect
          width="8"
          height="8"
          x="36"
          y="4"
          fill="#fff"
          stroke={fill || "currentColor"}
          strokeLinejoin="round"
          strokeWidth="2"
          rx="2"
        ></rect>
        <rect
          width="8"
          height="8"
          x="4"
          y="4"
          fill="#fff"
          stroke={fill || "currentColor"}
          strokeLinejoin="round"
          strokeWidth="2"
          rx="2"
        ></rect>
        <rect
          width="8"
          height="8"
          x="36"
          y="36"
          fill="#fff"
          stroke={fill || "currentColor"}
          strokeLinejoin="round"
          strokeWidth="2"
          rx="2"
        ></rect>
        <rect
          width="8"
          height="8"
          x="4"
          y="36"
          fill="#fff"
          stroke={fill || "currentColor"}
          strokeLinejoin="round"
          strokeWidth="2"
          rx="2"
        ></rect>
        <path
          stroke={fill || "currentColor"}
          strokeLinecap="round"
          strokeWidth="2"
          d="M40 14L40 34"
        ></path>
        <path
          stroke={fill || "currentColor"}
          strokeLinecap="round"
          strokeWidth="2"
          d="M8 14L8 34"
        ></path>
      </g>
    </svg>
  );
};

export const Loader = ({ width, height, fill, ...props }: IIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      viewBox="0 0 38 38"
      {...props}
    >
      <defs>
        <linearGradient id="a" x1="8.042%" x2="65.682%" y1="0%" y2="23.865%">
          <stop
            offset="0%"
            stopColor={fill || "currentColor"}
            stopOpacity="0"
          ></stop>
          <stop
            offset="63.146%"
            stopColor={fill || "currentColor"}
            stopOpacity="0.631"
          ></stop>
          <stop offset="100%" stopColor={fill || "currentColor"}></stop>
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(1 1)">
        <path stroke="url(#a)" strokeWidth="2" d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            dur="0.9s"
            from="0 18 18"
            repeatCount="indefinite"
            to="360 18 18"
            type="rotate"
          ></animateTransform>
        </path>
        <circle cx="36" cy="18" r="1" fill={fill || "currentColor"}>
          <animateTransform
            attributeName="transform"
            dur="0.9s"
            from="0 18 18"
            repeatCount="indefinite"
            to="360 18 18"
            type="rotate"
          ></animateTransform>
        </circle>
      </g>
    </svg>
  );
};

export const Close = ({ width, height, fill, ...props }: IIcon) => {
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
        fill={fill || "currentColor"}
        fillRule="evenodd"
        d="M19.207 6.207a1 1 0 00-1.414-1.414L12 10.586 6.207 4.793a1 1 0 00-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 101.414 1.414L12 13.414l5.793 5.793a1 1 0 001.414-1.414L13.414 12l5.793-5.793z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const Clipboard = ({ width, height, fill, ...props }: IIcon) => {
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
        fill={fill || "currentColor"}
        fillRule="evenodd"
        d="M15 1.25h-4.056c-1.838 0-3.294 0-4.433.153-1.172.158-2.121.49-2.87 1.238-.748.749-1.08 1.698-1.238 2.87-.153 1.14-.153 2.595-.153 4.433V16a3.751 3.751 0 003.166 3.705c.137.764.402 1.416.932 1.947.602.602 1.36.86 2.26.982.867.116 1.97.116 3.337.116h3.11c1.367 0 2.47 0 3.337-.116.9-.122 1.658-.38 2.26-.982.602-.602.86-1.36.982-2.26.116-.867.116-1.97.116-3.337v-5.11c0-1.367 0-2.47-.116-3.337-.122-.9-.38-1.658-.982-2.26-.531-.53-1.183-.795-1.947-.932A3.751 3.751 0 0015 1.25zm2.13 3.021A2.25 2.25 0 0015 2.75h-4c-1.907 0-3.261.002-4.29.14-1.005.135-1.585.389-2.008.812-.423.423-.677 1.003-.812 2.009-.138 1.028-.14 2.382-.14 4.289v6a2.25 2.25 0 001.521 2.13c-.021-.61-.021-1.3-.021-2.075v-5.11c0-1.367 0-2.47.117-3.337.12-.9.38-1.658.981-2.26.602-.602 1.36-.86 2.26-.981.867-.117 1.97-.117 3.337-.117h3.11c.775 0 1.464 0 2.074.021zM7.408 6.41c.277-.277.665-.457 1.4-.556.754-.101 1.756-.103 3.191-.103h3c1.435 0 2.436.002 3.192.103.734.099 1.122.28 1.399.556.277.277.457.665.556 1.4.101.754.103 1.756.103 3.191v5c0 1.435-.002 2.436-.103 3.192-.099.734-.28 1.122-.556 1.399-.277.277-.665.457-1.4.556-.755.101-1.756.103-3.191.103h-3c-1.435 0-2.437-.002-3.192-.103-.734-.099-1.122-.28-1.399-.556-.277-.277-.457-.665-.556-1.4-.101-.755-.103-1.756-.103-3.191v-5c0-1.435.002-2.437.103-3.192.099-.734.28-1.122.556-1.399z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const ChevronRight = ({ width, height, fill, ...props }: IIcon) => {
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

export const ChevronDown = ({ width, height, fill, ...props }: IIcon) => {
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
