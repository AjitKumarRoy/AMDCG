import { Title } from "@/components/ui/Title";
import dbConnect from "@/lib/dbConnect";
import { JournalArticle, ConferencePaper, BookChapter, Patent } from "@/lib/models";
import { PublicationsClient } from "./components/PublicationsClient";
import { BookCopy } from "lucide-react";

async function getPublications() {
  await dbConnect();
  const journalArticles = await JournalArticle.find({}).sort({ year: -1 });
  const conferencePapers = await ConferencePaper.find({}).sort({ year: -1 });
  const bookChapters = await BookChapter.find({}).sort({ year: -1 });
  const patents = await Patent.find({}).sort({ year: -1 });
  
  return {
    journalArticles: JSON.parse(JSON.stringify(journalArticles)),
    conferencePapers: JSON.parse(JSON.stringify(conferencePapers)),
    bookChapters: JSON.parse(JSON.stringify(bookChapters)),
    patents: JSON.parse(JSON.stringify(patents)),
  };
}

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <div>
      <Title as="h1" icon={BookCopy}>Manage Publications</Title>
      <p className="mt-2 text-slate-400">Add, edit, and remove all types of publications.</p>
      <PublicationsClient allPublications={publications} />
    </div>
  );
}