import * as fs from "fs";
import * as readline from "readline";
import { ZodType } from "zod";          // CHANGE: imported Zod


/**
 * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
 * function for others to use. Most modern editors will show the comment when 
 * mousing over this function name. Try it in run-parser.ts!
 * 
 * File I/O in TypeScript is "asynchronous", meaning that we can't just
 * read the file and return its contents. You'll learn more about this 
 * in class. For now, just leave the "async" and "await" where they are. 
 * You shouldn't need to alter them.
 * 
 * @param path The path to the file being loaded.
 * @returns a "promise" to produce a 2-d array of cell values
 */
export async function parseCSV<T> (path: string, schema?: ZodType<T>): Promise<string[][] | Array<{ data: T } | { error: string; row: string[] }>>
{ //T represents the type of object, added ZopType<T>
  // This initial block of code reads from a file in Node.js. The "rl"
  // value can be iterated over in a "for" loop. 
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // handle different line endings
  });
  // Create an empty array to hold the results
  let result: string[][] = [] //specify the type because the parser should fall back to its previous behavior
  
  // We add the "await" here because file I/O is asynchronous. 
  // We need to force TypeScript to _wait_ for a row before moving on. 
  // More on this in class soon!
  for await (const line of rl) {
    const values = line.split(",").map((v) => v.trim());
    result.push(values)
  }
    //create a block to validate and transform each CSV row via the given schema


  //create a block to validate and transform each CSV row via the given schema
  if (schema) { 
    return result.map(row => {
      const parsed = schema.safeParse(row); 
      if (parsed.success) {
        // if row is valid then return the parsed data
        return { data: parsed.data };
      } else {
        // if row is invalid then return an error object
        return {
          data: row,
          error: `Invalid row ${JSON.stringify(parsed.error.issues)}`,
          row, //continue rows
        };
      }
    });
  }
 
  return result
}