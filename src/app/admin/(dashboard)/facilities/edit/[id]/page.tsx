import { FacilityForm } from "../../components/FacilityForm";
import { Facility } from "@/lib/models";
import dbConnect from "@/lib/dbConnect";

// This function fetches a single facility by its ID
async function getFacility(id: string) {
  await dbConnect();
  const facility = await Facility.findById(id);
  return JSON.parse(JSON.stringify(facility));
}

export default async function EditFacilityPage({ params }: { params: { id: string } }) {
  const facility = await getFacility(params.id);
  return <FacilityForm facility={facility} />;
}