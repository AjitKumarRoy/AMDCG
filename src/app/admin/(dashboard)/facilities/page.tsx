import { Title } from "@/components/ui/Title";
import dbConnect from "@/lib/dbConnect";
import { Facility } from "@/lib/models";
import { FacilityList } from "./components/FacilityList";
import { Wrench } from "lucide-react";

async function getFacilities() {
  await dbConnect();
  const facilities = await Facility.find({});
  return JSON.parse(JSON.stringify(facilities));
}

export default async function FacilitiesPage() {
  const facilities = await getFacilities();

  return (
    <div>
      <Title as="h1" icon={Wrench}>Manage Facilities</Title>
      <p className="mt-2 text-slate-400">Add, edit, and remove research equipment and facilities.</p>
      <FacilityList facilities={facilities} />
    </div>
  );
}