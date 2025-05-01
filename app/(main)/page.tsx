import Blocks from "@/components/blocks";
import { fetchSanityPageBySlug } from "./actions";
import { generatePageMetadata } from "@/lib/metadata";
import MissingSanityPage from "@/components/ui/missing-sanity-page";
import FooterContent from "@/components/ui/footer-content";

export async function generateMetadata() {
  const page = await fetchSanityPageBySlug({ slug: "index" });

  return generatePageMetadata({ page, slug: "index" });
}

export default async function IndexPage() {
  const page = await fetchSanityPageBySlug({ slug: "index" });

  if (!page) {
    return MissingSanityPage({ document: "page", slug: "index" });
  }

  return (<>
    <Blocks blocks={page?.blocks} />
    <FooterContent slug={"index"} />
    </>);
}
