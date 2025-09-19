import { Title } from "@/components/ui/Title";
import { 
  Project, 
  TeamMember, 
  JournalArticle, 
  ConferencePaper, 
  BookChapter, 
  Patent,
  NewsArticle,
  Announcement,
  Recruitment,
  Event,
  NewsTicker,
  Facility,
  GalleryImage,
  InternshipApplication,  
  PositionApplication,
  PhdApplication,
  ContactMessage,
  BlogPost 
} from "@/lib/models";
import dbConnect from "@/lib/dbConnect";
import { StatCard } from "../components/StatCard";
import Link from "next/link";

async function getStats() {
  await dbConnect();
  
  const [
    projectCount, 
    teamMemberCount, 
    journalCount, 
    paperCount, 
    chapterCount, 
    patentCount,
    newsArticleCount,
    announcementCount,
    recruitmentCount,
    eventCount,
    newsTickerCount,
    facilityCount,
    galleryImageCount,
    pendingInternshipCount,
    pendingPositionCount,
    pendingPhdCount,
    newMessagesCount,
    blogPostCount 
  ] = await Promise.all([
    Project.countDocuments(),
    TeamMember.countDocuments(),
    JournalArticle.countDocuments(),
    ConferencePaper.countDocuments(),
    BookChapter.countDocuments(),
    Patent.countDocuments(),
    NewsArticle.countDocuments(),
    Announcement.countDocuments(),
    Recruitment.countDocuments(),
    Event.countDocuments(),
    NewsTicker.countDocuments(),
    Facility.countDocuments(),
    GalleryImage.countDocuments(),
    InternshipApplication.countDocuments({ status: 'Pending' }),
    PositionApplication.countDocuments({ status: 'Pending' }),
    PhdApplication.countDocuments({ status: 'Pending' }),
    ContactMessage.countDocuments({ status: 'New' }),
    BlogPost.countDocuments()
  ]);

  const publicationCount = journalCount + paperCount + chapterCount + patentCount;
  const pendingApplicationCount = pendingInternshipCount + pendingPositionCount + pendingPhdCount;

  // --- Return the individual counts ---
  return { 
    projectCount, 
    teamMemberCount, 
    publicationCount, // Keep this for a potential summary card
    journalCount,
    paperCount,
    chapterCount,
    patentCount,
    newsArticleCount,
    announcementCount,
    recruitmentCount,
    eventCount,
    newsTickerCount,
    facilityCount,
    galleryImageCount,
    pendingApplicationCount,
    newMessagesCount,
    blogPostCount 
  };
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div>
      <Title as="h1">Dashboard</Title>
      <p className="mt-2 text-slate-400">A quick overview of your website&apos;s content.</p>
      
      {/* --- Display a card for each count --- */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/applications">
          <StatCard title="Pending Applications" value={stats.pendingApplicationCount} iconName="Inbox" />
        </Link>
        <Link href="/admin/messages">
          <StatCard title="New Messages" value={stats.newMessagesCount} iconName="Mail" />
        </Link>
        <Link href="/admin/blog">
          <StatCard title="Blog Posts" value={stats.blogPostCount} iconName="BookText" />
        </Link>
        <Link href="/admin/projects">
          <StatCard title="Projects" value={stats.projectCount} iconName="FolderKanban" />
        </Link>
        <Link href="/admin/team">
          <StatCard title="Team Members" value={stats.teamMemberCount} iconName="Users" />
        </Link>
        <Link href="/admin/facilities">
          <StatCard title="Facilities" value={stats.facilityCount} iconName="Wrench" />
        </Link>
        <Link href="/admin/gallery">
          <StatCard title="Gallery" value={stats.galleryImageCount} iconName="Images" />
        </Link>
        <Link href="/admin/publications?tab=journal-articles">
          <StatCard title="Journal Articles" value={stats.journalCount} iconName="Newspaper" />
        </Link>
        <Link href="/admin/publications?tab=conference-papers">
          <StatCard title="Conference Papers" value={stats.paperCount} iconName="Presentation" />
        </Link>
        <Link href="/admin/publications?tab=book-chapters">
          <StatCard title="Book Chapters" value={stats.chapterCount} iconName="BookOpen" />
        </Link>
        <Link href="/admin/publications?tab=patents">
          <StatCard title="Patents" value={stats.patentCount} iconName="FileBadge" />
        </Link>
        <Link href="/admin/news-notices?tab=news-articles">
          <StatCard title="News Articles" value={stats.newsArticleCount} iconName="Newspaper" />
        </Link>
        <Link href="/admin/news-notices?tab=announcements">
          <StatCard title="Announcements" value={stats.announcementCount} iconName="Megaphone" />
        </Link>
        <Link href="/admin/news-notices?tab=recruitments">
          <StatCard title="Recruitments" value={stats.recruitmentCount} iconName="UserPlus" />
        </Link>
        <Link href="/admin/news-notices?tab=events">
          <StatCard title="Events" value={stats.eventCount} iconName="CalendarDays" />
        </Link>
        <Link href="/admin/news-notices?tab=news-ticker">
          <StatCard title="Ticker Items" value={stats.newsTickerCount} iconName="Rss" />
        </Link>
      </div>
    </div>
  );
}