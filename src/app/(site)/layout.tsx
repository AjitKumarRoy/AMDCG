import AppContentWrapper from "@/components/layout/AppContentWrapper";

// This layout specifically wraps your public-facing pages
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppContentWrapper>{children}</AppContentWrapper>;
}