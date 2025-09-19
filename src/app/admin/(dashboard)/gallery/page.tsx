import { Title } from "@/components/ui/Title";
import dbConnect from "@/lib/dbConnect";
import { GalleryImage } from "@/lib/models";
import { GalleryList } from "./components/GalleryList";
import { Image as ImageIcon } from "lucide-react";

async function getGalleryImages() {
  await dbConnect();
  const images = await GalleryImage.find({}).sort({ date: -1 });
  return JSON.parse(JSON.stringify(images));
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div>
      <Title as="h1" icon={ImageIcon}>Manage Gallery</Title>
      <p className="mt-2 text-slate-400">Add, edit, and remove images from your website&apos;s gallery.</p>
      <GalleryList images={images} />
    </div>
  );
}