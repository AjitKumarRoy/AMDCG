import { NewsArticleForm } from "../../components/NewsArticleForm";
import dbConnect from "@/lib/dbConnect";
import { NewsArticle } from "@/lib/models";

type PageProps = {
  params: Promise<{ id: string }>;
};


async function getArticle(id: string) {
  await dbConnect();
  const article = await NewsArticle.findById(id);
  return JSON.parse(JSON.stringify(article));
}

export default async function EditNewsArticlePage({ params }: PageProps ) {
  const { id } = await params;        
  const article = await getArticle(id);

  return <NewsArticleForm article={article} />;
}