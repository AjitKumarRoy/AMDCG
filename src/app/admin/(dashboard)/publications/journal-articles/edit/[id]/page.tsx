import { JournalArticleForm } from "../../components/JournalArticleForm";
import dbConnect from "@/lib/dbConnect";
import { JournalArticle } from "@/lib/models";

async function getArticle(id: string) {
  await dbConnect();
  const article = await JournalArticle.findById(id);
  return JSON.parse(JSON.stringify(article));
}

export default async function EditJournalArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);
  return <JournalArticleForm article={article} />;
}