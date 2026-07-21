import { createClient } from "@supabase/supabase-js";
import { formations } from "../data/formations";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log("Starting seeding of formations to Supabase...");

  const dbFormations = formations.map((f) => ({
    slug: f.slug,
    title: f.title,
    category: f.category,
    tag: f.tag || null,
    excerpt: f.excerpt,
    subtitle: f.subtitle,
    intro: f.intro,
    duration: f.duration,
    duration_days: f.durationDays,
    price: f.price ?? null,
    level: f.level,
    format: f.format,
    location: f.location,
    place: f.place || null,
    rhythm: f.rhythm,
    access_delay: f.accessDelay,
    accessibility: f.accessibility,
    featured: f.featured ?? false,
    objectives: f.objectives,
    content: f.content,
    methods: f.methods,
    evaluation: f.evaluation,
    image: f.image || null,
    // Alt par défaut raisonnable ; modifiable ensuite depuis l'admin.
    image_alt: f.image ? `${f.title} — formation audiovisuelle Hors Champ à Paris` : null,
    program_pdf_url: null,
    program_pdf_name: null,
  }));

  for (const formation of dbFormations) {
    console.log(`Inserting/Upserting formation: ${formation.slug}...`);
    const { error } = await supabase.from("formations").upsert(formation, { onConflict: "slug" });

    if (error) {
      console.error(`Error inserting formation ${formation.slug}:`, error.message);
    } else {
      console.log(`Successfully upserted formation: ${formation.slug}`);
    }
  }

  console.log("Seeding process completed.");
}

seed().catch((err) => {
  console.error("Unexpected error during seeding:", err);
  process.exit(1);
});
