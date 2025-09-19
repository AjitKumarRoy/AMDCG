import type { PageProps } from 'next';
import { PatentForm } from "../../components/PatentForm";
import dbConnect from "@/lib/dbConnect";
import { Patent } from "@/lib/models";

async function getPatent(id: string) {
  await dbConnect();
  const patent = await Patent.findById(id);
  return JSON.parse(JSON.stringify(patent));
}

export default async function EditPatentPage({ params }: PageProps<{ id: string }>) {
    const { id } = params;
  const patent = await getPatent(id);

  return <PatentForm patent={patent} />;
}