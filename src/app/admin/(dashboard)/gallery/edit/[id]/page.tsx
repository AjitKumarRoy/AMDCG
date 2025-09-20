
import { GalleryForm } from "../../components/GalleryForm";
import { GalleryImage } from "@/lib/models";
import dbConnect from "@/lib/dbConnect";

type PageProps = {
  params: Promise<{ id: string }>;
};


// This function fetches a single image by its ID
async function getImage(id: string) {
  await dbConnect();
  const image = await GalleryImage.findById(id);
  return JSON.parse(JSON.stringify(image));
}

export default async function EditGalleryImagePage({ params }: PageProps) {
  const { id } = await params;        
  const image = await getImage(id);

  return <GalleryForm image={image} />;
}