import { BookChapterForm } from "../../components/BookChapterForm";
import dbConnect from "@/lib/dbConnect";
import { BookChapter } from "@/lib/models";

async function getChapter(id: string) {
  await dbConnect();
  const chapter = await BookChapter.findById(id);
  return JSON.parse(JSON.stringify(chapter));
}

export default async function EditBookChapterPage({ params }: { params: { id: string } }) {
  const chapter = await getChapter(params.id);
  return <BookChapterForm chapter={chapter} />;
}