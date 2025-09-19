import type { PageProps } from 'next';
import { ConferencePaperForm } from "../../components/ConferencePaperForm";
import dbConnect from "@/lib/dbConnect";
import { ConferencePaper } from "@/lib/models";

async function getPaper(id: string) {
  await dbConnect();
  const paper = await ConferencePaper.findById(id);
  return JSON.parse(JSON.stringify(paper));
}

export default async function EditConferencePaperPage({ params }: PageProps<{ id: string }>) {
  const { id } = params;
  const paper = await getPaper(id);

  return <ConferencePaperForm paper={paper} />;
}