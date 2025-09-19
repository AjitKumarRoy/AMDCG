import type { PageProps } from 'next';
import { NewsTickerForm } from "../../components/NewsTickerForm";
import dbConnect from "@/lib/dbConnect";
import { NewsTicker } from "@/lib/models";

async function getItem(id: string) {
  await dbConnect();
  const item = await NewsTicker.findById(id);
  return JSON.parse(JSON.stringify(item));
}

export default async function EditNewsTickerPage({ params }: PageProps<{ id: string }>) {
  const { id } = await params;        
  const item = await getItem(id);

  return <NewsTickerForm item={item} />;
}