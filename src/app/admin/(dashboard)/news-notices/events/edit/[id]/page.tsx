import { EventsForm } from "../../components/EventsForm";
import dbConnect from "@/lib/dbConnect";
import { Event } from "@/lib/models";

async function getEvent(id: string) {
  await dbConnect();
  const event = await Event.findById(id);
  return JSON.parse(JSON.stringify(event));
}

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id);
  return <EventsForm event={event} />;
}