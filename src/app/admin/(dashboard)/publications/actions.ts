"use server";

import dbConnect from "@/lib/dbConnect";
import { JournalArticle, ConferencePaper, BookChapter, Patent } from "@/lib/models";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";




// --- CREATE & UPDATE FOR JOURNAL ARTICLES ---
export async function createJournalArticle(formData: FormData) {
try {
      await dbConnect();
  const newArticle = {
    slug: formData.get("slug"),
    title: formData.get("title"),
    authors: JSON.parse(formData.get("authors") as string),
    journalOrConference: formData.get("journalOrConference"),
    year: formData.get("year"),
    abstract: formData.get("abstract"),
    link: formData.get("link"),
    image: formData.get("image"),
  };
  await JournalArticle.create(newArticle);
  revalidatePath("/admin/publications");
} catch (error: unknown) { // Use 'unknown' instead of 'any'
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      throw new Error("A journal article with this publication link or slug already exists.");
    }
    throw new Error("Failed to create the journal article.");
  }
}

export async function updateJournalArticle(id: string, formData: FormData) {
try {
      await dbConnect();
  const updatedArticle = {
    slug: formData.get("slug"),
    title: formData.get("title"),
    authors: JSON.parse(formData.get("authors") as string),
    journalOrConference: formData.get("journalOrConference"),
    year: formData.get("year"),
    abstract: formData.get("abstract"),
    link: formData.get("link"),
    image: formData.get("image"),
  };
  await JournalArticle.findByIdAndUpdate(id, updatedArticle);
  revalidatePath("/admin/publications");
   revalidatePath("/publications");        // Revalidate the public publications page
    if (updatedArticle.slug) {
      revalidatePath(`/publications/journal-article/${updatedArticle.slug}`); // Revalidate the specific publications's slug page
    }
} catch (error: unknown) { // Use 'unknown' instead of 'any'
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      throw new Error("A journal article with this publication link or slug already exists.");
    }
    throw new Error("Failed to update the journal article.");
  }
}



// --- CREATE & UPDATE FOR CONFERENCE PAPERS  ---
export async function createConferencePaper(formData: FormData) {
  try {
    await dbConnect();
    const newPaper = {
      slug: formData.get("slug"),
      title: formData.get("title"),
      authors: JSON.parse(formData.get("authors") as string),
      journalOrConference: formData.get("journalOrConference"),
      year: formData.get("year"),
      abstract: formData.get("abstract"),
      link: formData.get("link"),
      image: formData.get("image"),
    };
    await ConferencePaper.create(newPaper);
    revalidatePath("/admin/publications");
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      throw new Error("A conference paper with this link or slug already exists.");
    }
    throw new Error("Failed to create conference paper.");
  }
}

export async function updateConferencePaper(id: string, formData: FormData) {
  try {
    await dbConnect();
    const updatedPaper = {
      slug: formData.get("slug"),
      title: formData.get("title"),
      authors: JSON.parse(formData.get("authors") as string),
      journalOrConference: formData.get("journalOrConference"),
      year: formData.get("year"),
      abstract: formData.get("abstract"),
      link: formData.get("link"),
      image: formData.get("image"),
    };
    await ConferencePaper.findByIdAndUpdate(id, updatedPaper);
    revalidatePath("/admin/publications");
     revalidatePath("/publications");        // Revalidate the public publication page
      if (updatedPaper.slug) {
        revalidatePath(`/publications/conference-presentation/${updatedPaper.slug}`); // Revalidate the specific publication's slug page
      }
  }  catch (error: unknown) { // Use 'unknown' instead of 'any'
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      throw new Error("A conference paper with this link or slug already exists.");
    }
    throw new Error("Failed to update conference paper.");
  }
}



// --- CREATE & UPDATE FOR BOOK CHAPTERS ---
export async function createBookChapter(formData: FormData) {
  try {
    await dbConnect();
    const newChapter = {
      slug: formData.get("slug"),
      title: formData.get("title"),
      authors: JSON.parse(formData.get("authors") as string),
      journalOrConference: formData.get("journalOrConference"),
      year: formData.get("year"),
      abstract: formData.get("abstract"),
      link: formData.get("link"),
      image: formData.get("image"),
    };
    await BookChapter.create(newChapter);
    revalidatePath("/admin/publications");
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      throw new Error("A book chapter with this link or slug already exists.");
    }
    throw new Error("Failed to create book chapter.");
  }
}

export async function updateBookChapter(id: string, formData: FormData) {
  try {
    await dbConnect();
    const updatedChapter = {
      slug: formData.get("slug"),
      title: formData.get("title"),
      authors: JSON.parse(formData.get("authors") as string),
      journalOrConference: formData.get("journalOrConference"),
      year: formData.get("year"),
      abstract: formData.get("abstract"),
      link: formData.get("link"),
      image: formData.get("image"),
    };
    await BookChapter.findByIdAndUpdate(id, updatedChapter);
    revalidatePath("/admin/publications");
     revalidatePath("/research");        // Revalidate the public publication page
      if (updatedChapter.slug) {
        revalidatePath(`/publications/book-chapter/${updatedChapter.slug}`); // Revalidate the specific publication's slug page
      }
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      throw new Error("A book chapter with this link or slug already exists.");
    }
    throw new Error("Failed to update book chapter.");
  }
}



// --- CREATE & UPDATE FOR PATENTS ---
export async function createPatent(formData: FormData) {
  try {
    await dbConnect();
    const newPatent = {
      slug: formData.get("slug"),
      title: formData.get("title"),
      authors: JSON.parse(formData.get("authors") as string),
      patentNumber: formData.get("patentNumber"),
      year: formData.get("year"),
      abstract: formData.get("abstract"),
      image: formData.get("image"),
      type: formData.get("type"),
    };
    await Patent.create(newPatent);
    revalidatePath("/admin/publications");
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      throw new Error("A patent with this number or slug already exists.");
    }
    throw new Error("Failed to create patent.");
  }
}

export async function updatePatent(id: string, formData: FormData) {
  try {
    await dbConnect();
    const updatedPatent = {
      slug: formData.get("slug"),
      title: formData.get("title"),
      authors: JSON.parse(formData.get("authors") as string),
      patentNumber: formData.get("patentNumber"),
      year: formData.get("year"),
      abstract: formData.get("abstract"),
      image: formData.get("image"),
      type: formData.get("type"),
    };
    await Patent.findByIdAndUpdate(id, updatedPatent);
    revalidatePath("/admin/publications");
     revalidatePath("/publications");        // Revalidate the public publication page
  if (updatedPatent.slug) {
    revalidatePath(`/research/patent/${updatedPatent.slug}`); // Revalidate the specific publication's slug page
  }
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      throw new Error("A patent with this number or slug already exists.");
    }
    throw new Error("Failed to update patent.");
  }
}





// --- DELETE ACTIONS ---
export async function deleteJournalArticle(id: string) {
  await dbConnect();
  await JournalArticle.findByIdAndDelete(id);
  revalidatePath("/admin/publications");
}

export async function deleteConferencePaper(id: string) {
  await dbConnect();
  await ConferencePaper.findByIdAndDelete(id);
  revalidatePath("/admin/publications");
}

export async function deleteBookChapter(id: string) {
  await dbConnect();
  await BookChapter.findByIdAndDelete(id);
  revalidatePath("/admin/publications");
}

export async function deletePatent(id: string) {
  await dbConnect();
  await Patent.findByIdAndDelete(id);
  revalidatePath("/admin/publications");
}

