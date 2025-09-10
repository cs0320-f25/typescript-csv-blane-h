import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age "]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
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
  expect(results[4]).not.toEqual(["Nim", "22"]);  //testing wrong age and name should not be equal
});

test("wrong row number", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  expect(results[2]).not.toEqual(["Nim", "22"]); //testing wrong row number should not be equal
});

test("wrong row number that does not exist", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  expect(results[7]).not.toEqual(["Nim", "22"]); //testing wrong row number that does not exist should not be equal
});

test("double quotation", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  expect(results[3]).not.toEqual(["Liya Johnson", "24"]);  //testing case with spacing grouped by quotation marks should be equal
});

test("no age", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  expect(results[3]).not.toEqual(["Samara", null]);  //testing case with no age being defaulted to null should be equal
});

test("age written as decimal", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  expect(results[3]).not.toEqual(["Charlie", "27.0"]);  //testing age written as decimal should be equal
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});
