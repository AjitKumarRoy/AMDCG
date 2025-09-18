import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { 
  Project, TeamMember, BlogPost, JournalArticle, ConferencePaper, 
  BookChapter, Patent, NewsArticle, Announcement, Recruitment, Event 
} from '@/lib/models';

export async function GET() {
  try {
    await dbConnect();

    // Fetch data from all collections in parallel
    const [
      projects, team, blogPosts, journalArticles, conferencePapers,
      bookChapters, patents, newsArticles, announcements, recruitments, events
    ] = await Promise.all([
      Project.find({}).select('title description slug'),
      TeamMember.find({}).select('name role slug'),
      BlogPost.find({ isPublished: true }).select('title excerpt slug'),
      JournalArticle.find({}).select('title abstract slug'),
      ConferencePaper.find({}).select('title abstract slug'),
      BookChapter.find({}).select('title abstract slug'),
      Patent.find({}).select('title abstract slug'),
      NewsArticle.find({}).select('title excerpt slug'),
      Announcement.find({}).select('title description slug'),
      Recruitment.find({}).select('title description slug'),
      Event.find({}).select('title description slug'),
    ]);

    // Format all data into a consistent structure
    const projectResults = projects.map(item => ({ title: item.title, description: item.description, url: `/projects/${item.slug}` }));
    const teamResults = team.map(item => ({ title: item.name, description: item.role, url: `/team/${item.slug}` }));
    const blogResults = blogPosts.map(item => ({ title: item.title, description: item.excerpt, url: `/blog/${item.slug}` }));
    const journalResults = journalArticles.map(item => ({ title: item.title, description: item.abstract, url: `/publications/journal-article/${item.slug}` }));
    const paperResults = conferencePapers.map(item => ({ title: item.title, description: item.abstract, url: `/publications/conference-presentation/${item.slug}` }));
    const chapterResults = bookChapters.map(item => ({ title: item.title, description: item.abstract, url: `/publications/book-chapter/${item.slug}` }));
    const patentResults = patents.map(item => ({ title: item.title, description: item.abstract, url: `/publications/patent/${item.slug}` }));
    const newsResults = newsArticles.map(item => ({ title: item.title, description: item.excerpt, url: `/news-events/news/${item.slug}` }));
    const announcementResults = announcements.map(item => ({ title: item.title, description: item.description, url: `/news-events/announcement/${item.slug}` }));
    const recruitmentResults = recruitments.map(item => ({ title: item.title, description: item.description, url: `/news-events/recruitment/${item.slug}` }));
    const eventResults = events.map(item => ({ title: item.title, description: item.description, url: `/news-events/event/${item.slug}` }));

    // Combine all results into a single index
    const searchIndex = [
      ...projectResults, ...teamResults, ...blogResults, ...journalResults, 
      ...paperResults, ...chapterResults, ...patentResults, ...newsResults,
      ...announcementResults, ...recruitmentResults, ...eventResults
    ];

    return NextResponse.json({ success: true, data: searchIndex });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}