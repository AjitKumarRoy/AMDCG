import type { PageProps } from 'next';
import { TeamForm } from "../../components/TeamForm";
import dbConnect from "@/lib/dbConnect";
import { TeamMember } from "@/lib/models";

async function getMember(id: string) {
  await dbConnect();
  const member = await TeamMember.findById(id);
  return JSON.parse(JSON.stringify(member));
}

export default async function EditTeamMemberPage({ params }: PageProps<{ id: string }>) {
  const { id } = params;
  const member = await getMember(id);

  return <TeamForm member={member} />;
}