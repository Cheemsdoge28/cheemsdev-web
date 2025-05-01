import Header from "@/components/header";
import Footer from "@/components/footer";
import { DisableDraftMode } from "@/components/disable-draft-mode";
import { VisualEditing } from "next-sanity";
import { draftMode, headers } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";
import AnnouncementBar from "@/components/ui/announcementBar";
import { fetchAnnouncement } from "./actions";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const announcement = await fetchAnnouncement();

  return (
    <>
      <AnnouncementBar {...announcement} />
      <Header />
      <main>{children}</main>
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
      <Footer />
    </>
  );
}
