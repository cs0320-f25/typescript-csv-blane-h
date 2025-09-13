# Sprint 1: TypeScript CSV

### Task B: Proposing Enhancement

- #### Step 1: Brainstorm on your own.
Some functionaliity enhancements that I brainstormed are specifying the type of the input, specifically if the age should be written as a word or number, also clarifying the overal guidelines of the formatting like the spacing between commas for the csv input. Some extensibility enhancements that I brainstormed are if the inputted row is invalid due to formatting to let the user know the correct formatting, by throwing an error. Also some extensibility enhancements that I brainstormed are if the inputted row is invalid due to a missing field (name/age) let the user know the field is missing, by throwing an error.

- #### Step 2: Use an LLM to help expand your perspective.
After asking the LLM there was some overlap with my thoughts, like rows with missing columns, the type of the inputted number being specified, what happens if the inputted row does not match the expected schema or rows with missing columns. Some possible concerns the LLM pointed out was skipping headers when parsing, whether empty rows should be skipped whie parsing, and trimming spacing around csv inputs. The LLM might have missed the point on whether the age could be written as a decimal, although this is not too signficnat since age is typically written as an integer I found it interesting I thought of this while the LLM did not.

The responses of the different LLMS were similar in the overall solution they provided, and mostly had the same suggestions and quantity of them. There were differences in the grouping of the reponses, also the listings were different, two of the LLM reponses were bullet pointed and one was numbered. Also, one of the reponses provided codee for an example CSV unlike the others.

- #### Step 3: 
Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

User Story: 
“As a user of the application, I am able to filter search results by multiple criteria like time, location, or price so that I can quickly find the items that match my needs.” 
Acceptance Criteria: 
The user can select one or more filter options from a list.
The search results update dynamically based on the selected filters.
If no results match the filters, the user sees a clear “no results found” message. 


1. Type of number: string or integer being specified, suggested by me and the LLM (functionality)
    User Story:
    “As a user of the CSV parser, I am able to know whether to write my age as a string or integer so that I can ensure that it is valid.”

    Acceptance Criteria:
    - The parser notifies the user the number must be written as a integer
    - The user inputs the age
    - If the number is invalid due to type the parser will communicate that to the user

2. Throw/return error if inputted row does not match proper formatting, suggested by me and the LLM (extensibility)
    User Story:
    “As a user of the CSV parser, I am notified whenever a row does not match the required schema so that I can identify and fix the invalid data.”

    Acceptance Criteria:
    - The user inputs the row data, and the valid rows are still added
    - The parser communicates to the user which rows are invalid and why
    - The user can fix the invalid row data to match the schema


3. Skipping headers and empty rows when parsing, suggested by the LLM (extensibility)
    User Story:
    ““As a user of the CSV parser, I do not have to worry about the header row and any empty rows making my inputted data invalid."

    Acceptance Criteria:
    - The parser skips the header row and empty rows
    - The rest of the rows are checked for validity
    - The user is notified of invalidity of only the rest of the rows

4. Trimming spacing to avoid false mismatches, suggested by the LLM (extensibility)
    User Story:
    “As a user of the CSV parser, I am able to have leading and trailing whitespace and do not have to wrry about them effecting the validity of my data”

    Acceptance Criteria:
    - All exterior spacing of the inputted rows is trimmed.
    - The trimmed version of the rows are checked for validity
    - The user is notified of invalidity of these rows

Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

I brainstormed some functionality enhancements like specifying input type (age as word or number) and clarifying formatting rules like spacing between commas. For extensibility, I thought of throwing errors if a row is invalid due to formatting or missing fields. The LLM overlapped with me on things like missing columns, input type, and schema mismatches. It also pointed out concerns like skipping headers and empty rows these suggestions resonated with me because it would make parsing more efficient, also trimming spaces which would prevent mismatches. One thing that the LLM suggested that did not reasonate with me was using different delimiters because that would not effect the efficiency of the parser or the functionality. Overall, responses of the different LLMS were similar in suggestions and quantity, but differed in grouping, listing style, and one response included a sample CSV code example.

### Design Choices

Explain the decisions you made about the high level design of your program
Explain the relationships between classes/interfaces.
Discuss any specific data structures you used, why you created it, and other high level explanations.


### 1340 Supplement

- #### 1. Correctness
Some general properties that my tests should be checking about my CSV parser is that each specific row being tested coordinates with the correct row in the CSV file, making sure no rows are skipped or misplaced. The inputted rows should only be counted as valid when the correct types are used, so that the data lines up with the schema. Finally, the parser should correctly return an error when the inputted data is invalid, while also preserving the original row so the issue can be traced back

- #### 2. Random, On-Demand Generation
If I was able to generate random CSV data, I could use it to test more cases instead of just the examples I wrote myself. That way I can see if my parser still works when the rows look different each time. It would help catch problems I did not think of initially, like extra spaces, empty rows, or numbers where strings are expected, and I could then use these to improver my parser making it more efficient.

- #### 3. Overall experience, Bugs encountered and resolved
This sprint differed from prior programming assingments I have done because I was coding using TypeScript, and also I have never dealt with utilizing a Zod Schema. Some bugs that I did encounter while working on this sprint were when returning in my parseCSV function the type did not match so the function could not compile, I fixed it by updating the paramters to also include errors. Another bug that I encountered was some of my tests were not working correctly because they would return undefined I fixed this by changing the function using an if else block to make it return a string[][]. 

#### Errors/Bugs: 
N/A

#### Tests: 
The tests I wrote cover different cases to make sure the parser is doing what it should for borth the Person and Student Schemas. I tested when only the age is correct, when only the partial name is searched for, when only the name is correct, and when both are wrong, just to check that the parser is not mismatching the rows and can recognize they are not equal. I also tested row numbers, like when the wrong row gets picked or when the row number goes past the number of rows in the CSV, to make sure the rows were not being mismatched. I also tried testing more special cases too, like values in double quotations, no age being inputted, or the age written as a string, to make sure these rows were still being marked as invalid. The double quotation was marked as invalid but in the future I would get to improve the parser to recognize it is still valid. I also tested to see if the header itself was invalid. For now it should be because the age is a string but I also want to enhance the parser to skip the header.

#### How To…
Run the tests you wrote/were provided

To run tests I was provided and wrote I initially simply did a npm test to see which ones the parser counted as valid versus invalid. For the tests I wrote later on the schemas I created myself I used the updated parser function tested that. To build and run my program simply use the npm commands, specfically npm test to test the functions of my program.

#### Team members and contributions (include cs logins):
N/A

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
vchu6
zplunket

#### Total estimated time it took to complete project:
6 hours

#### Link to GitHub Repo:  
https://github.com/cs0320-f25/typescript-csv-blane-h.git

