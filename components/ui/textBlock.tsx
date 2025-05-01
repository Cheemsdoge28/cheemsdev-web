import PortableTextRenderer from "../portable-text-renderer";
import SectionContainer from "./section-container";

const TextBlock = ({ body }: { body: any }) => {
  return (
    <SectionContainer padding={{ top: true, bottom: true }}>
      <PortableTextRenderer value={body} />
    </SectionContainer>
  );
};

export default TextBlock;
