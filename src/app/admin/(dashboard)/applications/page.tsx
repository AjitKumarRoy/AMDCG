import { Title } from "@/components/ui/Title";
import dbConnect from "@/lib/dbConnect";
import { InternshipApplication, PositionApplication, PhdApplication } from "@/lib/models";
import { ApplicationsClient } from "./components/ApplicationsClient";
import { Inbox } from "lucide-react";

async function getApplications() {
  await dbConnect();
  const internshipApps = await InternshipApplication.find({}).sort({ appliedAt: -1 });
  const positionApps = await PositionApplication.find({}).sort({ appliedAt: -1 });
  const phdApps = await PhdApplication.find({}).sort({ appliedAt: -1 });
  
  return {
    internshipApps: JSON.parse(JSON.stringify(internshipApps)),
    positionApps: JSON.parse(JSON.stringify(positionApps)),
    phdApps: JSON.parse(JSON.stringify(phdApps)),
  };
}

export default async function ApplicationsPage() {
  const applications = await getApplications();

  return (
    <div>
      <Title as="h1" icon={Inbox}>Applications</Title>
      <p className="mt-2 text-slate-400">Review submitted applications for internships, positions, and PhD programs.</p>
      <ApplicationsClient allApplications={applications} />
    </div>
  );
}