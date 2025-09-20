import { PatentForm } from "../../components/PatentForm";
import dbConnect from "@/lib/dbConnect";
import { Patent } from "@/lib/models";

type PageProps = {
  params: Promise<{ id: string }>;
};


async function getPatent(id: string) {
  await dbConnect();
  const patent = await Patent.findById(id);
  return JSON.parse(JSON.stringify(patent));
}

export default async function EditPatentPage({ params }: PageProps ) {
    const { id } = await params;
  const patent = await getPatent(id);

  return <PatentForm patent={patent} />;
}