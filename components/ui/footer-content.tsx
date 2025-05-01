import { fetchServicesPages, fetchFooterContentBySlug, fetchDefaultFooterContent, checkPageHasCustomFooter } from "@/app/(main)/actions";
import Blocks from "../blocks";




export default async function FooterContent({ slug = "index" }: { slug?: string }) {
  // Use the slug with a default fallback
  const pageSlug = slug ?? "index";
  const CustomFooterData = await checkPageHasCustomFooter({ slug: pageSlug });
  const hasCustomFooter = CustomFooterData?.hasCustomFooter ?? false;
  const footerContent = hasCustomFooter ? await fetchFooterContentBySlug({ slug: pageSlug }) : await fetchDefaultFooterContent();

  return (
    <div>
        <Blocks blocks={footerContent?.blocks} />
    </div>
  );
}
