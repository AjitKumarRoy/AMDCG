import type { PageProps } from 'next';
import { FacilityForm } from "../../components/FacilityForm";
import { Facility } from "@/lib/models";
import dbConnect from "@/lib/dbConnect";

// This function fetches a single facility by its ID
async function getFacility(id: string) {
  await dbConnect();
  const facility = await Facility.findById(id);
  return JSON.parse(JSON.stringify(facility));
}

export default async function EditFacilityPage({ params }: PageProps<{ id: string }>) {
  const { id } = await params;        
  const facility = await getFacility(id);

  return <FacilityForm facility={facility} />;
}