const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// 1. Read and parse .env.local to get Supabase credentials
const envPath = path.join(__dirname, "../.env.local");
let supabaseUrl = "";
let supabaseKey = "";

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  const lines = envContent.split(/\r?\n/);
  for (const line of lines) {
    const parts = line.split("=");
    if (parts[0] === "NEXT_PUBLIC_SUPABASE_URL") {
      supabaseUrl = parts[1].trim();
    }
    if (parts[0] === "NEXT_PUBLIC_SUPABASE_ANON_KEY") {
      supabaseKey = parts[1].trim();
    }
  }
}

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: Supabase credentials not found in .env.local!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// 2. Parse command line arguments
const args = process.argv.slice(2);
const params = {};

for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith("--")) {
    const key = args[i].slice(2);
    const value = args[i + 1];
    params[key] = value;
    i++;
  }
}

const requiredFields = ["name", "phone", "address", "category"];
const missingFields = requiredFields.filter((field) => !params[field]);

if (missingFields.length > 0) {
  console.log(`
Usage:
  node scripts/generate-demo.js --name "Business Name" --phone "+91 XXXXX XXXXX" --address "Location, City" --category "cafe|gym|salon|services|general" [options]

Options:
  --tagline "Your Custom Tagline"
  --description "Description about the business"
  --theme "gold|red|rose|emerald|blue"

Missing required fields: ${missingFields.join(", ")}
  `);
  process.exit(1);
}

// 3. Auto-generate slug & theme defaults based on category
const slug = params.name
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, "")
  .replace(/[\s_]+/g, "-");

const themeDefaults = {
  cafe: "gold",
  gym: "red",
  salon: "rose",
  services: "emerald",
  general: "blue",
};

const leadData = {
  slug,
  name: params.name,
  phone: params.phone,
  address: params.address,
  category: params.category,
  tagline: params.tagline || "",
  description: params.description || "",
  color_theme: params.theme || themeDefaults[params.category] || "blue",
  status: "new",
};

// 4. Insert lead into Supabase
async function run() {
  console.log(`Connecting to Supabase and inserting lead: ${params.name}...`);
  
  const { data, error } = await supabase
    .from("leads")
    .upsert(leadData, { onConflict: "slug" })
    .select();

  if (error) {
    console.error("Error inserting lead:", error.message);
    process.exit(1);
  }

  console.log("\nSuccess! Lead has been created successfully:");
  console.log(`- Slug: ${slug}`);
  console.log(`- Live Demo URL: http://localhost:3000/demos/${slug} (or asenra.in/demos/${slug} in production)`);
  console.log(`- Admin leads panel: http://localhost:3000/admin/leads`);
}

run();
