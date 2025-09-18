import { ConferencePaperForm } from "../../components/ConferencePaperForm";
import dbConnect from "@/lib/dbConnect";
import { ConferencePaper } from "@/lib/models";

async function getPaper(id: string) {
  await dbConnect();
  const paper = await ConferencePaper.findById(id);
  return JSON.parse(JSON.stringify(paper));
}

export default async function EditConferencePaperPage({ params }: { params: { id: string } }) {
  const paper = await getPaper(params.id);
  return <ConferencePaperForm paper={paper} />;
}