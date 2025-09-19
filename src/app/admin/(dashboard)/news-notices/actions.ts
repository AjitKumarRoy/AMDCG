"use server";

import dbConnect from "@/lib/dbConnect";
import { NewsArticle, Announcement, Recruitment, Event, NewsTicker } from "@/lib/models";
import { revalidatePath } from "next/cache";

// --- NewsArticle Actions ---
export async function createNewsArticle(formData: FormData) {
  try {
    await dbConnect();
    const newArticle = {
      slug: formData.get("slug"),
      title: formData.get("title"),
      date: formData.get("date"),
      image: formData.get("image"),
      excerpt: formData.get("excerpt"),
      link: formData.get("link"),
      content: formData.get("content"),
    };
    await NewsArticle.create(newArticle);
    revalidatePath("/admin/news-notices");
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      throw new Error("A news article with this slug already exists.");
    }
    throw new Error("Failed to create news article.");
  }
}
export async function updateNewsArticle(id: string, formData: FormData) {
  try {
    await dbConnect();
    const updatedArticle = {
      slug: formData.get("slug"),
      title: formData.get("title"),
      date: formData.get("date"),
      image: formData.get("image"),
      excerpt: formData.get("excerpt"),
      link: formData.get("link"),
      content: formData.get("content"),
    };
    await NewsArticle.findByIdAndUpdate(id, updatedArticle);
    revalidatePath("/admin/news-notices");
    revalidatePath("/news-events");        // Revalidate the public research page
  if (updatedArticle.slug) {
    revalidatePath(`/news-events/news/${updatedArticle.slug}`); // Revalidate the specific project's slug page
  }
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      throw new Error("A news article with this slug already exists.");
    }
    throw new Error("Failed to update news article.");
  }
}
export async function deleteNewsArticle(id: string) {
  await dbConnect();
  await NewsArticle.findByIdAndDelete(id);
  revalidatePath("/admin/news-notices");
}

// --- Announcement Actions ---
export async function createAnnouncement(formData: FormData) {
  try {
    await dbConnect();
    const newAnnouncement = {
      slug: formData.get("slug"),
      title: formData.get("title"),
      date: formData.get("date"),
      description: formData.get("description"),
      externalLink: formData.get("externalLink"),
      fileUrl: formData.get("fileUrl"),
      image: formData.get("image"),
    };
    await Announcement.create(newAnnouncement);
    revalidatePath("/admin/news-notices");
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      throw new Error("An announcement with this slug already exists.");
    }
    throw new Error("Failed to create announcement.");
  }
}
export async function updateAnnouncement(id: string, formData: FormData) { 
    try {
    await dbConnect();
    const updatedAnnouncement = {
      slug: formData.get("slug"),
      title: formData.get("title"),
      date: formData.get("date"),
      description: formData.get("description"),
      externalLink: formData.get("externalLink"),
      fileUrl: formData.get("fileUrl"),
      image: formData.get("image"),
    };
    await Announcement.findByIdAndUpdate(id, updatedAnnouncement);
    revalidatePath("/admin/news-notices");
    revalidatePath("/news-events");        // Revalidate the public research page
      if (updatedAnnouncement.slug) {
        revalidatePath(`/news-events/announcement/${updatedAnnouncement.slug}`); // Revalidate the specific project's slug page
      }
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      throw new Error("An announcement with this slug already exists.");
    }
    throw new Error("Failed to update announcement.");
  }
 }
export async function deleteAnnouncement(id: string) {
  await dbConnect();
  await Announcement.findByIdAndDelete(id);
  revalidatePath("/admin/news-notices");
}

// --- Recruitment Actions ---
export async function createRecruitment(formData: FormData) {
  try {
    await dbConnect();
    const newRecruitment = {
      slug: formData.get("slug"),
      title: formData.get("title"),
      date: formData.get("date"),
      description: formData.get("description"),
      externalLink: formData.get("externalLink"),
      fileUrl: formData.get("fileUrl"),
      image: formData.get("image"),
    };
    await Recruitment.create(newRecruitment);
    revalidatePath("/admin/news-notices");
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      throw new Error("A recruitment posting with this slug already exists.");
    }
    throw new Error("Failed to create recruitment posting.");
  }
}
export async function updateRecruitment(id: string, formData: FormData) { 
    try {
    await dbConnect();
    const updatedRecruitment = {
      slug: formData.get("slug"),
      title: formData.get("title"),
      date: formData.get("date"),
      description: formData.get("description"),
      externalLink: formData.get("externalLink"),
      fileUrl: formData.get("fileUrl"),
      image: formData.get("image"),
    };
    await Recruitment.findByIdAndUpdate(id, updatedRecruitment);
    revalidatePath("/admin/news-notices");
    revalidatePath("/news-events");        // Revalidate the public research page
  if (updatedRecruitment.slug) {
    revalidatePath(`/news-events/recruitment/${updatedRecruitment.slug}`); // Revalidate the specific project's slug page
  }
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      throw new Error("A recruitment posting with this slug already exists.");
    }
    throw new Error("Failed to update recruitment posting.");
  }
 }
export async function deleteRecruitment(id: string) {
  await dbConnect();
  await Recruitment.findByIdAndDelete(id);
  revalidatePath("/admin/news-notices");
}

// --- Event Actions ---
export async function createEvent(formData: FormData) {
  try {
    await dbConnect();
    const newEvent = {
      slug: formData.get("slug"),
      title: formData.get("title"),
      date: formData.get("date"),
      location: formData.get("location"),
      description: formData.get("description"),
      externalLink: formData.get("externalLink"),
      fileUrl: formData.get("fileUrl"),
      image: formData.get("image"),
    };
    await Event.create(newEvent);
    revalidatePath("/admin/news-notices");
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      throw new Error("An event with this slug already exists.");
    }
    throw new Error("Failed to create event.");
  }
}
export async function updateEvent(id: string, formData: FormData) { 
    try {
    await dbConnect();
    const updatedEvent = {
      slug: formData.get("slug"),
      title: formData.get("title"),
      date: formData.get("date"),
      location: formData.get("location"),
      description: formData.get("description"),
      externalLink: formData.get("externalLink"),
      fileUrl: formData.get("fileUrl"),
      image: formData.get("image"),
    };
    await Event.findByIdAndUpdate(id, updatedEvent);
    revalidatePath("/admin/news-notices");
    revalidatePath("/news-events");        // Revalidate the public research page
      if (updatedEvent.slug) {
        revalidatePath(`/news-events/event/${updatedEvent.slug}`); // Revalidate the specific project's slug page
      }
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      throw new Error("An event with this slug already exists.");
    }
    throw new Error("Failed to update event.");
  }
 }
export async function deleteEvent(id: string) {
  await dbConnect();
  await Event.findByIdAndDelete(id);
  revalidatePath("/admin/news-notices");
}

// --- NewsTicker Actions ---
export async function createNewsTicker(formData: FormData) {
  try {
    await dbConnect();
    const newItem = {
      text: formData.get("text"),
      link: formData.get("link"),
    };
    await NewsTicker.create(newItem);
    revalidatePath("/admin/news-notices");
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    console.error("Failed to create ticker item.", error); // Log the original error
    throw new Error("Failed to create ticker item.");
  }
}
export async function updateNewsTicker(id: string, formData: FormData) { 
    try {
    await dbConnect();
    const updatedItem = {
      text: formData.get("text"),
      link: formData.get("link"),
    };
    await NewsTicker.findByIdAndUpdate(id, updatedItem);
    revalidatePath("/admin/news-notices");
    revalidatePath("/");        // Revalidate the public research page
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    console.error("Failed to update ticker item.", error); // Log the original error
    throw new Error("Failed to update ticker item.");
  }
 }
export async function deleteNewsTicker(id: string) {
  await dbConnect();
  await NewsTicker.findByIdAndDelete(id);
  revalidatePath("/admin/news-notices");
}