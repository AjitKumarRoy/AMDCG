import mongoose, { Schema, Document } from 'mongoose';
import { 
  TeamMember as ITeamMember, 
  JournalArticle  as IJournalArticle, 
  ConferencePaper as IConferencePaper, 
  BookChapter as IBookChapter, 
  Patent as IPatent, 
  Project as IProject,
  Announcement as IAnnouncement,
  Event as IEvent,
  Recruitment as IRecruitment,
  NewsTicker as INewsTicker,
  NewsArticle as INewsArticle,
  Facility as IFacility,
  User as IUser,
  GalleryImage as IGalleryImage,
  InternshipApplication as IInternshipApplication,
  PositionApplication as IPositionApplication,
  PhdApplication as IPhdApplication,
  BlogPost as IBlogPost
} from '@/types'; 

// Mongoose Schema for Team Members
const TeamMemberSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true }, // Best for unique URLs
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Best for uniquely identifying a person
  phone: { type: String },
  role: { type: String, required: true },
  affiliation: { type: String, required: true },
  image: { type: String },
  bio: { type: String },
  type: { type: String, enum: ['Core', 'PostDoc', 'Phd', 'M.Tech', 'B.Tech', 'Project Assistant', 'Project Associate', 'Intern' ], required: true },
  socialLinks: {
    website: String,
    researchGate: String,
    googleScholar: String,
    linkedin: String,
    twitter: String,
    github: String,
  },
  contributions: [{
    project: String,
    role: String,
    years: String,
    description: String,
  }],
  workingStatus: { type: String },
  yearsWorked: { type: String },
});



// Mongoose Schema for Journal Articles
const JournalArticleSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true }, // Best for unique URLs
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  journalOrConference: { type: String, required: true },
  year: { type: Number, required: true },
  abstract: { type: String, required: true },
  link: { type: String, required: true, unique: true },
  image: { type: String },
});


// Mongoose Schema for Conference Papers
const ConferencePaperSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true }, // Best for unique URLs
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  journalOrConference: { type: String, required: true },
  year: { type: Number, required: true },
  abstract: { type: String, required: true },
  link: { type: String, required: true, unique: true }, // Link should be unique
  image: { type: String },
});


// Mongoose Schema for Book Chapters
const BookChapterSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true }, // Best for unique URLs
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  journalOrConference: { type: String, required: true }, // Will be used for the Book Title
  year: { type: Number, required: true },
  abstract: { type: String, required: true },
  link: { type: String, required: true, unique: true },
  image: { type: String },
});


// Mongoose Schema for Patents
const PatentSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true }, // Best for unique URLs
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  patentNumber: { type: String, required: true, unique: true }, // Patent number is the unique key
  year: { type: Number, required: true },
  abstract: { type: String, required: true },
  image: { type: String },
  type: { type: String, enum: ['Design Patent', 'Utility Patent' ], required: true },
});



// Define a sub-schema for team members within a project
const projectTeamMemberSchema: Schema = new Schema({
  name: { type: String },
  profileLink: { type: String },
}, { _id: false });

// Mongoose Schema for Projects
const ProjectSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true }, // For clean URLs
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // Renamed from imageUrl for consistency
  link: { type: String },
  status: { type: String, enum: ['Ongoing', 'Completed', 'Active', 'On Hold'] },
  startDate: { type: Date },
  endDate: { type: Date },
  teamMembers: [projectTeamMemberSchema],
  fields: { type: [String] },
  fundingAgency: { type: String },  
  fundValue: { type: String },         
});




// Mongoose Schema for Announcements
const AnnouncementSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  externalLink: { type: String },
  fileUrl: { type: String },
  image: { type: String },
});




// Mongoose Schema for Events
const EventSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String },
  description: { type: String },
  externalLink: { type: String },
  fileUrl: { type: String },
  image: { type: String },
});




// Mongoose Schema for Recruitment
const RecruitmentSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  externalLink: { type: String },
  fileUrl: { type: String },
  image: { type: String },
});



// Mongoose Schema for News Ticker
const NewsTickerSchema: Schema = new Schema({
  text: { type: String, required: true },
  link: { type: String },
});




// Mongoose Schema for News Article
const NewsArticleSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String },
  excerpt: { type: String, required: true },
  link: { type: String },
  content: { type: String }, // For the full article text
});



// Mongoose Schema for Facilities
const FacilitySchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['Characterization', 'Processing', 'Testing', 'Synthesis', 'Computational'] },
  model: { type: String },
  image: { type: String, required: true }, // Main featured image
  images: { type: [String] }, // For the image carousel in the modal
  description: { type: String },
  specifications: { type: [String] }, // A list of key specs
  location: { type: String },
  status: { type: String, enum: ['Operational', 'Under Maintenance', 'Coming Soon'], default: 'Operational' },
});




// Mongoose Schema for Gallery
const GalleryImageSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  width: { type: Number, required: true },  
  height: { type: Number, required: true },  
  date: { type: Date, default: Date.now },
});






// --- APPLICATION SCHEMAS ---
const InternshipApplicationSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  university: { type: String, required: true },
  fieldOfInterest: { type: String, required: true },
  cvUrl: { type: String, required: true },
  coverLetter: { type: String },
  appliedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Reviewed'], default: 'Pending' },
});

const PositionApplicationSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  highestQualification: { type: String, required: true },
  currentPosition: { type: String },
  cvUrl: { type: String, required: true },
  coverLetter: { type: String },
  appliedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Reviewed'], default: 'Pending' },
});

const PhdApplicationSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  bachelorsDegree: { type: String, required: true },
  mastersDegree: { type: String },
  qualifyingExam: { type: String },
  statementOfPurposeUrl: { type: String, required: true },
  cvUrl: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Reviewed'], default: 'Pending' },
});




// Mongoose Schema for Contact Form Messages
const ContactMessageSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['New', 'Read'], default: 'New' },
});




// Mongoose Schema for Blog
const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: true }, // Featured image
  excerpt: { type: String, required: true }, // A short summary
  content: { type: String, required: true }, // Will store the rich text (HTML)
  author: { type: String, required: true },
  tags: { type: [String] },
  isPublished: { type: Boolean, default: false }, // To allow for drafts
  publishedAt: { type: Date },
});





// Mongoose Schema for User
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


// Mongoose Schema for Visitor Count
const VisitorCountSchema: Schema = new Schema({
  identifier: { type: String, default: 'total_visits', unique: true },
  count: { type: Number, default: 0 },
});



// Export the model. This line prevents Mongoose from redefining it on every call.
export const TeamMember = mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema, 'team_members');
export const JournalArticle = mongoose.models.JournalArticle || mongoose.model<IJournalArticle>('JournalArticle', JournalArticleSchema, 'publications_journal_articles');
export const ConferencePaper = mongoose.models.ConferencePaper || mongoose.model<IConferencePaper>('ConferencePaper', ConferencePaperSchema, 'publications_conference_papers');
export const BookChapter =   mongoose.models.BookChapter ||   mongoose.model<IBookChapter>('BookChapter', BookChapterSchema,'publications_book_chapters');
export const Patent = mongoose.models.Patent || mongoose.model<IPatent>('Patent', PatentSchema, 'publications_patents');
export const Project = mongoose.models.Project || mongoose.model<IProject & Document>('Project', ProjectSchema, 'projects');
export const Announcement = mongoose.models.Announcement || mongoose.model<IAnnouncement & Document>('Announcement', AnnouncementSchema, 'notices_announcements');
export const Event = mongoose.models.Event || mongoose.model<IEvent & Document>('Event', EventSchema, 'notices_events');
export const Recruitment = mongoose.models.Recruitment || mongoose.model<IRecruitment & Document>('Recruitment', RecruitmentSchema, 'notices_recruitments');
export const NewsTicker = mongoose.models.NewsTicker || mongoose.model<INewsTicker & Document>('NewsTicker', NewsTickerSchema, 'notices_news_ticker');
export const NewsArticle = mongoose.models.NewsArticle || mongoose.model<INewsArticle & Document>('NewsArticle', NewsArticleSchema, 'notices_news_articles');
export const Facility = mongoose.models.Facility || mongoose.model<IFacility & Document>('Facility', FacilitySchema, 'facilities');
export const GalleryImage = mongoose.models.GalleryImage || mongoose.model<IGalleryImage & Document>('GalleryImage', GalleryImageSchema, 'gallery_images');
export const InternshipApplication = mongoose.models.InternshipApplication || mongoose.model<IInternshipApplication & Document>('InternshipApplication', InternshipApplicationSchema, 'applications_internship');
export const PositionApplication = mongoose.models.PositionApplication || mongoose.model<IPositionApplication & Document>('PositionApplication', PositionApplicationSchema, 'applications_position');
export const PhdApplication = mongoose.models.PhdApplication || mongoose.model<IPhdApplication & Document>('PhdApplication', PhdApplicationSchema, 'applications_phd');
export const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', ContactMessageSchema, 'contact_messages');
export const BlogPost = mongoose.models.BlogPost || mongoose.model<IBlogPost & Document>('BlogPost', BlogSchema, 'blog_posts');
export const User = mongoose.models.User || mongoose.model<IUser & Document>('User', UserSchema, 'users');
export const VisitorCount = mongoose.models.VisitorCount || mongoose.model('VisitorCount', VisitorCountSchema, 'visitor_counts');