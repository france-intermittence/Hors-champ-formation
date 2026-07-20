import { createClient } from "@supabase/supabase-js";
import { posts } from "../data/posts";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log("Starting seeding of blog posts to Supabase...");

  // Map camelCase fields to snake_case table columns
  const dbPosts = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    reading_time: post.readingTime,
    author: post.author,
    image: post.image || null,
    featured: post.featured || false,
    related_formation_slug: post.relatedFormationSlug || null,
    intro: post.intro,
    sections: post.sections,
    callout: post.callout || null,
    sources: post.sources || null,
  }));

  for (const post of dbPosts) {
    console.log(`Inserting/Upserting post: ${post.slug}...`);
    const { error } = await supabase
      .from("posts")
      .upsert(post, { onConflict: "slug" });

    if (error) {
      console.error(`Error inserting post ${post.slug}:`, error.message);
      if (error.code === "P0001" || error.message.includes("relation \"posts\" does not exist")) {
        console.error("\n[IMPORTANT] The 'posts' table might not exist yet. Please run the SQL DDL commands in your Supabase SQL Editor first:\n");
        console.error(`
create table posts (
  slug text primary key,
  title text not null,
  excerpt text not null,
  category text not null,
  date date not null,
  reading_time text not null,
  author text not null,
  image text,
  featured boolean default false,
  related_formation_slug text,
  intro text not null,
  sections jsonb not null,
  callout jsonb,
  sources jsonb,
  created_at timestamptz default now()
);

alter table posts enable row level security;

create policy "Allow public read access" on posts for select to public using (true);
create policy "Allow service role write access" on posts for all to service_role using (true) with check (true);
        `);
      }
    } else {
      console.log(`Successfully upserted post: ${post.slug}`);
    }
  }

  console.log("Seeding process completed.");
}

seed().catch((err) => {
  console.error("Unexpected error during seeding:", err);
  process.exit(1);
});
