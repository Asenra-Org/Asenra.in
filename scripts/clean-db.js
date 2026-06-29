const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function cleanText(name) {
  if (!name) return "";
  
  // First, split by typical separators
  const parts = name.split(/[|:-]/);
  for (let part of parts) {
    part = part.trim();
    // \u0900-\u097F is Devanagari (Hindi, Marathi, Sanskrit)
    // \u0A80-\u0AFF is Gujarati
    // If the part DOES NOT contain these, and is reasonably long, use it!
    if (!/[\u0900-\u097F\u0A80-\u0AFF]/.test(part) && part.length > 2) {
      return part;
    }
  }
  
  // Fallback: strip Devanagari/Gujarati and trailing separators
  let cleaned = name.replace(/[\u0900-\u097F\u0A80-\u0AFF]/g, "");
  cleaned = cleaned.replace(/^[|:.,\-\&]+|[|:.,\-\&]+$/g, "").trim();
  cleaned = cleaned.replace(/\s+/g, ' ');
  
  // If it's just punctuation left, return empty string
  if (/^[^a-zA-Z0-9]*$/.test(cleaned)) {
      return "";
  }
  
  return cleaned;
}

async function cleanExistingLeads() {
  console.log("Fetching all leads...");
  const { data: leads, error } = await supabase.from('leads').select('*');
  
  if (error) {
    console.error("Error fetching leads:", error);
    return;
  }
  
  console.log(`Found ${leads.length} leads. Cleaning...`);
  
  let updatedCount = 0;
  
  for (const lead of leads) {
    const originalName = lead.name || "";
    const originalTagline = lead.tagline || "";
    const originalDesc = lead.description || "";
    
    // Sometimes tagline is exactly the same as name.
    // If it has Hindi, cleanText will fix it.
    let cleanName = cleanText(originalName);
    let cleanTagline = cleanText(originalTagline);
    let cleanDesc = cleanText(originalDesc);
    
    if (cleanName === "") cleanName = "Local Business";
    if (cleanTagline === "") cleanTagline = null; // Let frontend fallback
    if (cleanDesc === "") cleanDesc = null; // Let frontend fallback
    
    if (cleanName !== originalName || cleanTagline !== originalTagline || cleanDesc !== originalDesc) {
      console.log(`\nUpdating Lead ID: ${lead.id} / ${lead.slug}`);
      if (cleanName !== originalName) console.log(`Name: "${originalName}" -> "${cleanName}"`);
      if (cleanTagline !== originalTagline) console.log(`Tagline: "${originalTagline}" -> "${cleanTagline}"`);
      if (cleanDesc !== originalDesc) console.log(`Desc changed as well`);
      
      const { error: updateError } = await supabase
        .from('leads')
        .update({
          name: cleanName,
          tagline: cleanTagline,
          description: cleanDesc
        })
        .eq('id', lead.id);
        
      if (updateError) {
        console.error(`Failed to update lead ${lead.id}:`, updateError);
      } else {
        updatedCount++;
      }
    }
  }
  
  console.log(`\nDone! Successfully updated ${updatedCount} leads.`);
}

cleanExistingLeads();
