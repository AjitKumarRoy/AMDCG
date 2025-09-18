import { AnnouncementsForm } from "../../components/AnnouncementsForm";
import dbConnect from "@/lib/dbConnect";
import { Announcement } from "@/lib/models";

async function getAnnouncement(id: string) {
  await dbConnect();
  const announcement = await Announcement.findById(id);
  return JSON.parse(JSON.stringify(announcement));
}

export default async function EditAnnouncementPage({ params }: { params: { id: string } }) {
  const announcement = await getAnnouncement(params.id);
  return <AnnouncementsForm announcement={announcement} />;
}