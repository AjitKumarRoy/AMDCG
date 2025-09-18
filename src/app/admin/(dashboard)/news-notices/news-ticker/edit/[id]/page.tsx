import { NewsTickerForm } from "../../components/NewsTickerForm";
import dbConnect from "@/lib/dbConnect";
import { NewsTicker } from "@/lib/models";

async function getItem(id: string) {
  await dbConnect();
  const item = await NewsTicker.findById(id);
  return JSON.parse(JSON.stringify(item));
}

export default async function EditNewsTickerPage({ params }: { params: { id: string } }) {
  const item = await getItem(params.id);
  return <NewsTickerForm item={item} />;
}