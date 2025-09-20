import { BookChapterForm } from "../../components/BookChapterForm";
import dbConnect from "@/lib/dbConnect";
import { BookChapter } from "@/lib/models";

type PageProps = {
  params: Promise<{ id: string }>;
};


async function getChapter(id: string) {
  await dbConnect();
  const chapter = await BookChapter.findById(id);
  return JSON.parse(JSON.stringify(chapter));
}

export default async function EditBookChapterPage({ params }: PageProps) {
  const { id } = await params;
  const chapter = await getChapter(id);

  return <BookChapterForm chapter={chapter} />;
}