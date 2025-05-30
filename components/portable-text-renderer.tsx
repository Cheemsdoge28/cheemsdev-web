import { PortableText, PortableTextProps } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { YouTubeEmbed } from "@next/third-parties/google";
import { fetchSanityProductByRef } from "@/app/(main)/blog/actions";
import ProductCard from "./ui/product-card";

const portableTextComponents: PortableTextProps["components"] = {
  types: {
    productBlock: async ({ value }) => {
      const product = await fetchSanityProductByRef({
        productId: value.product._ref,
      });
      return (
        <ProductCard
          title={product.title}
          slug={product?.store?.slug?.current ?? product.slugProxy}
          price={product?.store?.priceRange?.minVariantPrice.toString()}
          excerpt={product.excerpt}
          image={product.store.previewImageUrl}
          variants={product.store.options[0].values}
        />
      );
    },
    image: ({ value }) => {
      const { url, metadata } = value.asset;
      const { lqip, dimensions } = metadata;
      return (
        <Image
          src={url}
          alt={value.alt || "Image"}
          width={dimensions.width}
          height={dimensions.height}
          placeholder="blur"
          blurDataURL={lqip}
          style={{
            borderRadius: "1rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          quality={100}
        />
      );
    },
    youtube: ({ value }) => {
      const { videoId } = value;
      return (
        <div className="max-w-3xl w-full mx-auto">
          <div className="aspect-video">
            <YouTubeEmbed videoid={videoId} params="rel=0" />
          </div>
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    h5: ({ children }) => <h5>{children}</h5>,
  },
  marks: {
    link: ({ value, children }) => {
      const isExternal =
        (value?.href || "").startsWith("http") ||
        (value?.href || "").startsWith("https") ||
        (value?.href || "").startsWith("mailto");
      const target = isExternal ? "_blank" : undefined;
      return (
        <Link
          href={value?.href}
          target={target}
          rel={target ? "noopener" : undefined}
          style={{ textDecoration: "underline" }}
        >
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul
        style={{
          paddingLeft: "1.5rem",
          marginBottom: "1rem",
          listStyleType: "disc",
          listStylePosition: "inside",
        }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        style={{
          paddingLeft: "1.5rem",
          marginBottom: "1rem",
          listStyleType: "decimal",
          listStylePosition: "inside",
        }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li style={{ marginBottom: "0.5rem" }}>{children}</li>
    ),
    number: ({ children }) => (
      <li style={{ marginBottom: "0.5rem" }}>{children}</li>
    ),
  },
};

const PortableTextRenderer = ({
  value,
  announcement,
}: {
  value: PortableTextProps["value"];
  announcement?: boolean;
}) => {
  const ifAnnouncement: PortableTextProps["components"] = {
    ...portableTextComponents,
    block: {
      normal: ({ children }) => (
        <p style={{ marginBottom: "1rem" }}>{children}</p>
      ),
      h1: ({ children }) => (
        <h1 style={{ marginBottom: "1rem", marginTop: "1rem" }}>{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 style={{ marginBottom: "1rem", marginTop: "1rem" }}>{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 style={{ marginBottom: "1rem", marginTop: "1rem" }}>{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 style={{ marginBottom: "1rem", marginTop: "1rem" }}>{children}</h4>
      ),
      h5: ({ children }) => <h5>{children}</h5>,
    },
  };
  return (
    <PortableText
      value={value}
      components={announcement ? portableTextComponents : ifAnnouncement}
    />
  );
};

export default PortableTextRenderer;
