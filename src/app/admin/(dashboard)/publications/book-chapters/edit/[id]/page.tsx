import type { PageProps } from 'next';
import { BookChapterForm } from "../../components/BookChapterForm";
import dbConnect from "@/lib/dbConnect";
import { BookChapter } from "@/lib/models";

async function getChapter(id: string) {
  await dbConnect();
  const chapter = await BookChapter.findById(id);
  return JSON.parse(JSON.stringify(chapter));
}

export default async function EditBookChapterPage({ params }: PageProps<{ id: string }>) {
  const { id } = params;
  const chapter = await getChapter(id);

  return <BookChapterForm chapter={chapter} />;
}