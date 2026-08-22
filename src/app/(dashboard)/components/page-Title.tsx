// components/PageBanner.tsx
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";

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
      <p className="text-xl text-black flex flex-wrap font-almarai">
        {TitleDetails.breadcrumbs.map((item, index) => {
          const isLast = index === TitleDetails.breadcrumbs.length - 1;
          return (
            <span key={index} className="flex items-center">
              {item.href && !isLast ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span className={isLast ? "text-[#0E5FD9]" : ""}>
                  {item.label}
                </span>
              )}
              {!isLast && <FaAngleRight />}
            </span>
          );
        })}
      </p>
      <h1 className=" uppercase text-2xl text-black font-semibold">
        {TitleDetails.title}
      </h1>
      {TitleDetails.subtitle && (
        <p className="text-black">{TitleDetails.subtitle}</p>
      )}
    </div>
  );
}
