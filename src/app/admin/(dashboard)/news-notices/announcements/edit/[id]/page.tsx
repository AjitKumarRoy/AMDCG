import type { PageProps } from 'next';
import { AnnouncementsForm } from "../../components/AnnouncementsForm";
import dbConnect from "@/lib/dbConnect";
import { Announcement } from "@/lib/models";

async function getAnnouncement(id: string) {
  await dbConnect();
  const announcement = await Announcement.findById(id);
  return JSON.parse(JSON.stringify(announcement));
}

export default async function EditAnnouncementPage({ params }: PageProps<{ id: string }>) {
  const { id } = await params;        
  const announcement = await getAnnouncement(id);

  return <AnnouncementsForm announcement={announcement} />;
}