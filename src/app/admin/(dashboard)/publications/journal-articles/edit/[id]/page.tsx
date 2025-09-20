import { JournalArticleForm } from "../../components/JournalArticleForm";
import dbConnect from "@/lib/dbConnect";
import { JournalArticle } from "@/lib/models";

type PageProps = {
  params: Promise<{ id: string }>;
};


async function getArticle(id: string) {
  await dbConnect();
  const article = await JournalArticle.findById(id);
  return JSON.parse(JSON.stringify(article));
}

export default async function EditJournalArticlePage({ params }: PageProps ) {
  const { id } = await params;
  const article = await getArticle(id);

  return <JournalArticleForm article={article} />;
}