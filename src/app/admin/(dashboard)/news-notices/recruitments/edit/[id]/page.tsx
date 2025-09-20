import { RecruitmentForm } from "../../components/RecruitmentForm";
import dbConnect from "@/lib/dbConnect";
import { Recruitment } from "@/lib/models";

type PageProps = {
  params: Promise<{ id: string }>;
};


async function getRecruitment(id: string) {
  await dbConnect();
  const recruitment = await Recruitment.findById(id);
  return JSON.parse(JSON.stringify(recruitment));
}

export default async function EditRecruitmentPage({ params }: PageProps) {
  const { id } = await params;        
  const recruitment = await getRecruitment(id);

  return <RecruitmentForm recruitment={recruitment} />;
}