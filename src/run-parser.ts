import { parseCSV } from "./basic-parser";
import { z } from "zod"; 

/*
  Example of how to run the parser outside of a test suite.
*/

const PersonSchema = z                         //CHANGE
  .tuple([z.string(), z.coerce.number()])
  .transform(([name, age]) => ({ name, age }));

type Person = z.infer<typeof PersonSchema>;

const DATA_FILE = "./data/people.csv"; // CHANGE

async function main() {
  // Because the parseCSV function needs to "await" data, we need to do the same here.
  const results = await parseCSV(DATA_FILE)

  // Notice the difference between "of" and "in". One iterates over the entries, 
  // another iterates over the indexes only.
  for(const record of results)
    console.log(record)
  for(const record in results)
    console.log(record)
}

main();