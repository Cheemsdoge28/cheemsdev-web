import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/images/risebit_logo.svg"
      alt="Risebit Logo"
      width={48}
      height={48}
    />
  );
}
