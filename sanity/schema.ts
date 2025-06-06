import { type SchemaTypeDefinition } from "sanity";
// documents
import page from "./schemas/documents/page";
import footerContent from "./schemas/documents/footer-content";
import post from "./schemas/documents/post";
import author from "./schemas/documents/author";
import category from "./schemas/documents/category";
import faq from "./schemas/documents/faq";
import testimonial from "./schemas/documents/testimonial";
import { settingsType } from "./schemas/documents/settings";

// Schema UI shared objects
import blockContent from "./schemas/blocks/shared/block-content";
import link from "./schemas/blocks/shared/link";
import tag from "./schemas/blocks/shared/tag";
import { colorVariant } from "./schemas/blocks/shared/color-variant";
import { textAlign } from "./schemas/blocks/shared/text-align";
import { buttonVariant } from "./schemas/blocks/shared/button-variant";
import { sizeVariant } from "./schemas/blocks/shared/size-variant";
import { heightVariant } from "./schemas/blocks/shared/height-variant";
import sectionPadding from "./schemas/blocks/shared/section-padding";
import { bentoColSpan, bentoRowSpan } from "./schemas/blocks/shared/bento-variant";
// Schema UI objects
import hero1 from "./schemas/blocks/hero/hero-1";
import hero2 from "./schemas/blocks/hero/hero-2";
import hero3 from "./schemas/blocks/hero/hero-3";
import hero4 from "./schemas/blocks/hero/hero-4";
import hero5 from "./schemas/blocks/hero/hero-5"
import sectionHeader from "./schemas/blocks/section-header";
import splitRow from "./schemas/blocks/split/split-row";
import splitContent from "./schemas/blocks/split/split-content";
import splitCardsList from "./schemas/blocks/split/split-cards-list";
import splitCard from "./schemas/blocks/split/split-card";
import splitImage from "./schemas/blocks/split/split-image";
import splitInfoList from "./schemas/blocks/split/split-info-list";
import splitInfo from "./schemas/blocks/split/split-info";
import gridCard from "./schemas/blocks/grid/grid-card";
import gridCard2 from "./schemas/blocks/grid/grid-card-2";
import gridFeatureCard from "./schemas/blocks/grid/grid-feature-card";
import pricingCard from "./schemas/blocks/grid/pricing-card";
import gridPost from "./schemas/blocks/grid/grid-post";
import gridRow from "./schemas/blocks/grid/grid-row";
import carousel1 from "./schemas/blocks/carousel/carousel-1";
import carousel2 from "./schemas/blocks/carousel/carousel-2";
import carousel3 from "./schemas/blocks/carousel/carousel-3";
import timelineRow from "./schemas/blocks/timeline/timeline-row";
import timelinesOne from "./schemas/blocks/timeline/timelines-1";
import cta1 from "./schemas/blocks/cta/cta-1";
import logoCloud1 from "./schemas/blocks/logo-cloud/logo-cloud-1";
import faqs from "./schemas/blocks/faqs";
import newsletter from "./schemas/blocks/forms/newsletter";
import contact from "./schemas/blocks/forms/contact";
import allPosts from "./schemas/blocks/all-posts";
// Product-related imports removed for service-based site
import text from "./schemas/blocks/text";
// E-commerce related imports removed for service-based site
import { seoType } from "./schemas/objects/seoType";
import announcement from "./schemas/documents/announcement";
import tabSection from "./schemas/blocks/tab-section/tab-section";

// E-commerce related schema arrays removed for service-based site

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // E-commerce related schemas removed for service-based site
    // Only keeping SEO type which is still relevant for services
    seoType,
    // documents
    page,
    footerContent,
    post,
    author,
    category,
    faq,
    testimonial,    settingsType,
    announcement,
    // shared objects
    blockContent,
    link,
    tag,
    colorVariant,
    textAlign,
    buttonVariant,
    sizeVariant,
    heightVariant,
    sectionPadding,
    bentoColSpan,
    bentoRowSpan,
    // blocks
    hero1,
    hero2,
    hero3,
    hero4,
    hero5,
    sectionHeader,
    splitRow,
    splitContent,
    splitCardsList,
    splitCard,
    splitImage,
    splitInfoList,
    splitInfo,
    gridCard,
    gridCard2,
    gridFeatureCard,
    pricingCard,
    gridPost,
    gridRow,
    tabSection,
    carousel1,
    carousel2,
    carousel3,
    timelineRow,
    timelinesOne,
    cta1,
    logoCloud1,
    faqs,
    newsletter,
    contact,
    allPosts,
    // allProducts removed for service-based site
    text,
  ],
};
