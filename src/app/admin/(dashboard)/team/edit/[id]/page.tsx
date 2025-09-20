import { TeamForm } from "../../components/TeamForm";
import dbConnect from "@/lib/dbConnect";
import { TeamMember } from "@/lib/models";

type PageProps = {
  params: Promise<{ id: string }>;
};


async function getMember(id: string) {
  await dbConnect();
  const member = await TeamMember.findById(id);
  return JSON.parse(JSON.stringify(member));
}

export default async function EditTeamMemberPage({ params }: PageProps ) {
  const { id } = await params;
  const member = await getMember(id);

  return <TeamForm member={member} />;
}