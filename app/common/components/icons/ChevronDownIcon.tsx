import type { SVGProps } from "react";

const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='13'
      height='13'
      viewBox='0 0 13 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M10.79 4.84793L7.25832 8.3796C6.84124 8.79668 6.15874 8.79668 5.74166 8.3796L2.20999 4.84793'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ChevronDownIcon;
