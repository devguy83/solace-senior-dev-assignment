import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.toLowerCase() || "";
  let  data;

  // Uncomment this line to use a database
  // data = await db.select().from(advocates);

  // Fallback for local seed data
  data = advocateData;

  // Filter logic
  const filtered = query
    ? data.filter((advocate) => {
        return (
          advocate.firstName.toLowerCase().includes(query) ||
          advocate.lastName.toLowerCase().includes(query) ||
          advocate.city.toLowerCase().includes(query) ||
          advocate.degree.toLowerCase().includes(query) ||
          advocate.specialties.some((s) => s.toLowerCase().includes(query)) ||
          advocate.yearsOfExperience.toString().includes(query)
        );
      }).slice(0, 25) // Limit to 25 results
    : data.slice(0, 25); // Default limited return

  return Response.json({ data: filtered });
}
