// components/PageBanner.tsx
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageTitle = {
  TitleDetails: {
    title: string;
    subtitle?: string;
    breadcrumbs: BreadcrumbItem[];
  };
};

export default function PageTitle({ TitleDetails }: PageTitle) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xl text-black flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4 font-almarai">
        {TitleDetails.breadcrumbs.map((item, index) => {
          const isLast = index === TitleDetails.breadcrumbs.length - 1;
          return (
            <span key={index} className="flex items-center gap-2 sm:gap-3">
              {item.href && !isLast ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span className={isLast ? "text-black" : ""}>{item.label}</span>
              )}
              {!isLast && <FaArrowRight />}
            </span>
          );
        })}
      </p>
      <h1 className=" uppercase text-3xl text-black font-semibold">
        {TitleDetails.title}
      </h1>
      {TitleDetails.subtitle && (
        <p className="text-black">{TitleDetails.subtitle}</p>
      )}
    </div>
  );
}
