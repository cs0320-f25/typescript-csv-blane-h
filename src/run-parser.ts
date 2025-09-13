import { parseCSV } from "./basic-parser";
import { z } from "zod"; 

/*
  Example of how to run the parser outside of a test suite.
*/
const PersonSchema = z
  .tuple([z.string(), z.coerce.number()])
  .transform(([name, age]) => ({ name, age }));

type Person = z.infer<typeof PersonSchema>;

const StudentSchema = z
  .tuple([z.string(), z.string(), z.coerce.number()])
  .transform(([name, major, age]) => ({ name, major, age }));

type Student = z.infer<typeof StudentSchema>;

const PERSON_DATA_FILE = "./data/people.csv";   // CSV file for PersonSchema
const STUDENT_DATA_FILE = "./data/students.csv"; // CSV file for StudentSchema

async function main() {
  // Parse CSV using PersonSchema
  const personResults = await parseCSV(PERSON_DATA_FILE, PersonSchema);

  console.log("Person Results:");
  for (const record of personResults)
    console.log(record);
  for (const record in personResults)
    console.log(record);

  // Parse CSV using StudentSchema
  const studentResults = await parseCSV(STUDENT_DATA_FILE, StudentSchema);

  console.log("\nStudent Results:");
  for (const record of studentResults)
    console.log(record);
  for (const record in studentResults)
    console.log(record);
}

main();


