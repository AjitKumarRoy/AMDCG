import { ConferencePaperForm } from "../../components/ConferencePaperForm";
import dbConnect from "@/lib/dbConnect";
import { ConferencePaper } from "@/lib/models";

type PageProps = {
  params: Promise<{ id: string }>;
};


async function getPaper(id: string) {
  await dbConnect();
  const paper = await ConferencePaper.findById(id);
  return JSON.parse(JSON.stringify(paper));
}

export default async function EditConferencePaperPage({ params }: PageProps ) {
  const { id } = await params;
  const paper = await getPaper(id);

  return <ConferencePaperForm paper={paper} />;
}