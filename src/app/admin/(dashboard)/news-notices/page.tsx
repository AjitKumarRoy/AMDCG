import { Title } from "@/components/ui/Title";
import dbConnect from "@/lib/dbConnect";
import { NewsArticle, Announcement, Recruitment, Event, NewsTicker } from "@/lib/models";
import { NewsNoticesClient } from "./components/NewsNoticesClient";
import { Newspaper } from "lucide-react";

async function getNewsData() {
  await dbConnect();
  const newsArticles = await NewsArticle.find({}).sort({ date: -1 });
  const announcements = await Announcement.find({}).sort({ date: -1 });
  const recruitments = await Recruitment.find({}).sort({ date: -1 });
  const events = await Event.find({}).sort({ date: -1 });
  const newsTicker = await NewsTicker.find({});
  
  return {
    newsArticles: JSON.parse(JSON.stringify(newsArticles)),
    announcements: JSON.parse(JSON.stringify(announcements)),
    recruitments: JSON.parse(JSON.stringify(recruitments)),
    events: JSON.parse(JSON.stringify(events)),
    newsTicker: JSON.parse(JSON.stringify(newsTicker)),
  };
}

export default async function NewsPage() {
  const allNewsData = await getNewsData();

  return (
    <div>
      <Title as="h1" icon={Newspaper}>Manage News & Notices</Title>
      <p className="mt-2 text-slate-400">Manage all your site&apos;s updates from one place.</p>
      <NewsNoticesClient allNewsData={allNewsData} />
    </div>
  );
}