import { Title } from "@/components/ui/Title";
import dbConnect from "@/lib/dbConnect";
import { TeamMember } from "@/lib/models";
import { TeamList } from "./components/TeamList";

async function getTeamMembers() {
  await dbConnect();
  const members = await TeamMember.find({});
  return JSON.parse(JSON.stringify(members));
}

export default async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <div>
      <Title as="h1">Manage Team Members</Title>
      <p className="mt-2 text-slate-400">Add, edit, and remove team members.</p>
      <TeamList members={members} />
    </div>
  );
}