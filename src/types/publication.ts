export interface JournalArticle {
  slug: string;
  title: string;
  authors: string[];
  journalOrConference: string;
  year: number;
  abstract: string;
  link: string;
  image: string;
}


export interface ConferencePaper {
  slug: string;
  title: string;
  authors: string[];
  journalOrConference: string;
  year: number;
  abstract: string;
  link: string;
  image: string;
}


export interface BookChapter {
  slug: string;
  title: string;
  authors: string[];
  journalOrConference: string;
  year: number;
  abstract: string;
  link: string;
  image: string;
}


export interface Patent {
  slug: string;
  title: string;
  authors: string[];
  patentNumber: string;
  year: number;
  abstract: string;
  image: string;
  type: string;
}