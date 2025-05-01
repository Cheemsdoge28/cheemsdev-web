import { useSchema } from "sanity";
import { Box, Spinner, Text } from "@sanity/ui";
import { fetchSanityProductByRef } from "@/app/(main)/blog/actions";
import { useState, useEffect } from "react";

export function ProductPreview({ value, renderPreview }: any) {
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productSchemaType = useSchema().get("product");

  useEffect(() => {
    async function fetchProduct() {
      if (!value?.product?._ref) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const fetchedProduct = await fetchSanityProductByRef({
          productId: value.product._ref,
        });
        setProduct(fetchedProduct);
        setError(null);
      } catch (err) {
        setError("Failed to fetch product");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [value?.product?._ref]);

  if (isLoading) {
    return (
      <Box
        padding={2}
        style={{ minWidth: 200, display: "flex", justifyContent: "center" }}
      >
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding={2} style={{ minWidth: 200, color: "red" }}>
        {error}
      </Box>
    );
  }

  if (!value?.product?._ref) {
    return (
      <Box padding={2} style={{ minWidth: 200 }}>
        No reference selected
      </Box>
    );
  }

  return (
    <Box padding={2} style={{ minWidth: 200 }}>
      {product ? (
        <div className="flex gap-1 items-center justify-center">
          <img
            src={product.store.previewImageUrl}
            alt={product.store.title}
            style={{ maxWidth: "40px", height: "auto" }}
          />
          <Text>{product.store.title}</Text>
        </div>
      ) : (
        renderPreview({
          value,
          schemaType: productSchemaType,
          layout: "default",
        })
      )}
    </Box>
  );
}
