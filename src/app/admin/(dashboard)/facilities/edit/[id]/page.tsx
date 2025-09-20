
import { FacilityForm } from "../../components/FacilityForm";
import { Facility } from "@/lib/models";
import dbConnect from "@/lib/dbConnect";

type PageProps = {
  params: Promise<{ id: string }>;
};

// This function fetches a single facility by its ID
async function getFacility(id: string) {
  await dbConnect();
  const facility = await Facility.findById(id);
  return JSON.parse(JSON.stringify(facility));
}

export default async function EditFacilityPage({ params }: PageProps) {
  const { id } = await params;        
  const facility = await getFacility(id);

  return <FacilityForm facility={facility} />;
}