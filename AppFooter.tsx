"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import BusinessFooter from "@/components/BusinessFooter";

const NO_FOOTER_PATHS = [
  "/account-verification",
  "/business/account-verification",
];

export default function AppFooter() {
  const pathname = usePathname();

  if (NO_FOOTER_PATHS.includes(pathname)) {
    return null;
  }

  const isBusinessPage = pathname.startsWith("/business");

  return isBusinessPage ? <BusinessFooter /> : <Footer />;
}
