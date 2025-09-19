import type { PageProps } from 'next';
import { EventsForm } from "../../components/EventsForm";
import dbConnect from "@/lib/dbConnect";
import { Event } from "@/lib/models";

async function getEvent(id: string) {
  await dbConnect();
  const event = await Event.findById(id);
  return JSON.parse(JSON.stringify(event));
}

export default async function EditEventPage({ params }: PageProps<{ id: string }>) {
  const { id } = await params;        
  const event = await getEvent(id);

  return <EventsForm event={event} />;
}