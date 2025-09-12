import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";  // CHANGE: import zod 


const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(8); //changed form 5 to 7 to align with updated csv file
  expect(results[0]).toEqual(["name", "age "]); //result expected is "age"
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test(" wrong name but correct age", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  expect(results[1]).not.toEqual(["Ashley", "23"]); //testing wrong name but correct age should not be equal
});

test("wrong age but correct name", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  expect(results[3]).not.toEqual(["Charlie", "27"]);  //testing wrong age but correct name should not be equal
});

test("wrong age and wrong name", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  expect(results[4]).not.toEqual(["Sarah", "24"]);  //testing wrong age and name should not be equal
});

test("wrong row number", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  expect(results[2]).not.toEqual(["Nim", "22"]); //testing wrong row number should not be equal
});

test("wrong row number that does not exist", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  expect(results[7]).not.toEqual(["Nim", "22"]); //testing wrong row number that does not exist should not be equal
});

test("double quotation", async () => { //test checks if quotations from csv are excluded
  const results = await parseCSV(PEOPLE_CSV_PATH) //FAILS BUT SHOULD PASS
  expect(results[5]).toEqual(["Liya Johnson", "24"]);  //testing case with spacing grouped by quotation marks should be equal
});

test("no age", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH) // test passes meaning the csv file counts this row as valid even the age is missing
  expect(results[6]).toEqual(["Samara", ]);  //testing case with no age being empty should be equal
});

test("searching with partial name", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH) 
  expect(results[7]).not.toEqual(["Kim", "26"]);  //testing searching for partial name and should not be equal
});

test("expected being lowercase", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH) 
  expect(results[3]).toEqual(["charlie", "25"]);  //testing if the csv parser is case sensitive
});

//TESTING ZOD SCHEME
const PersonSchema = z //Zod scheme built using the imported Zod library
  .tuple([z.string(), z.coerce.number()]) //checking in first input is a string and second is a number
  .transform(([name, age]) => ({ name, age }));  //tranforms rows into correct format

test("testing header is invalid", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, PersonSchema);
  expect((results[0] as any).error).toMatch(/Row validation failed/i);  //test should expect Nan because "thirty" is not a number and therefore invalid
});

test("correct age and number 2", async () => { //test method normally see if it retrieves correct age and number
  const results = await parseCSV(PEOPLE_CSV_PATH, PersonSchema);
  expect((results[4] as any).data).toEqual({ name: "Nim", age: 22 });
});


test("age as an invalid string 2", async () => { //test for thirty 
  const results = await parseCSV(PEOPLE_CSV_PATH, PersonSchema);
  expect((results[2] as any).error).toMatch(/Row validation failed/i); 
});

test("double quotation 2", async () => { 
  const results = await parseCSV(PEOPLE_CSV_PATH, PersonSchema);
  expect((results[4] as any).data).toEqual({ name: "Liya Johnson", age: 24 });
  });

test("no age 2", async () => {
    const results = await parseCSV(PEOPLE_CSV_PATH, PersonSchema);
  expect((results[6] as any).error).toMatch(/Row validation failed/i); 
});

test("expected being lowercase 2", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, PersonSchema); 
  expect(results[3]).toEqual({ name: "charlie", age: 25 });
});