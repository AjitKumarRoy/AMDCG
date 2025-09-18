import { NewsArticleForm } from "../../components/NewsArticleForm";
import dbConnect from "@/lib/dbConnect";
import { NewsArticle } from "@/lib/models";

async function getArticle(id: string) {
  await dbConnect();
  const article = await NewsArticle.findById(id);
  return JSON.parse(JSON.stringify(article));
}

export default async function EditNewsArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);
  return <NewsArticleForm article={article} />;
}