import{St as e,_ as t,_t as n,c as r,d as i,ht as a,mt as o,pt as s,s as c,vt as l,yt as u}from"./index-CiOkSCYJ.js";import{n as d,t as f}from"./lib-B7GDvYtB.js";var p=e(u(),1),m=Object.entries(Object.assign({"./chapters/01-relational-databases-and-derby.md":`# 1. Relational databases and Derby\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Notes index](../README.md) | [Notes index](../README.md) | [Next: Java compatibility, setup, and tools](02-compatibility-setup-and-tools.md) |\r
| --- | --- | --- |\r
\r
## What Apache Derby is\r
\r
Apache Derby is a relational database engine written in Java. An application sends SQL statements to Derby, and Derby stores, reads, and updates structured data. Java applications connect to Derby through JDBC, the standard Java API for working with relational databases.\r
\r
Derby can run in two common ways:\r
\r
- **Embedded mode:** the database engine runs inside the Java application process. The application and database share one process and access the database files locally.\r
- **Network Server mode:** a separate Derby server process owns the database connection. Java clients connect to it over the network with the Derby client JDBC driver.\r
\r
Choose embedded mode for a single application that owns its local database. Choose Network Server mode when separate processes need to connect to one running database. Do not let two embedded engines open the same database files at the same time.\r
\r
## How relational data is organized\r
\r
A database contains schemas. A schema groups objects such as tables, views, indexes, and routines. A table stores rows. Each row has values for the table's columns.\r
\r
For a small library database:\r
\r
| Database object | Example | Purpose |\r
| --- | --- | --- |\r
| Schema | \`APP\` | Groups application objects |\r
| Table | \`BOOKS\` | Stores one row per book |\r
| Column | \`TITLE\` | Names one value in every row |\r
| Row | \`1, 'Clean Code', 2008\` | Stores one book record |\r
| Primary key | \`BOOK_ID\` | Identifies a row uniquely |\r
\r
SQL describes the data operation. JDBC carries SQL from Java code to the database and returns results or errors.\r
\r
## First SQL example\r
\r
In the \`ij\` command tool, connect to a local database. The \`create=true\` attribute creates the database if it does not exist:\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby:librarydb;create=true';\r
\r
CREATE TABLE BOOKS (\r
    BOOK_ID INTEGER NOT NULL PRIMARY KEY,\r
    TITLE VARCHAR(120) NOT NULL,\r
    PUBLISHED_YEAR INTEGER\r
);\r
\r
INSERT INTO BOOKS (BOOK_ID, TITLE, PUBLISHED_YEAR)\r
VALUES (1, 'Clean Code', 2008);\r
\r
SELECT BOOK_ID, TITLE, PUBLISHED_YEAR\r
FROM BOOKS;\r
\`\`\`\r
\r
The query returns one row:\r
\r
| BOOK_ID | TITLE | PUBLISHED_YEAR |\r
| ---: | --- | ---: |\r
| 1 | Clean Code | 2008 |\r
\r
The database name in the URL is \`librarydb\`. Derby creates database files in the current working directory unless the connection URL or system settings specify another location.\r
\r
## The same connection idea in Java\r
\r
JDBC uses a connection URL to select the database and driver mode. This short example opens an embedded connection and runs a query:\r
\r
\`\`\`java\r
import java.sql.Connection;\r
import java.sql.DriverManager;\r
import java.sql.ResultSet;\r
import java.sql.Statement;\r
\r
public class ReadBooks {\r
    public static void main(String[] args) throws Exception {\r
        String url = "jdbc:derby:librarydb";\r
\r
        try (Connection connection = DriverManager.getConnection(url);\r
             Statement statement = connection.createStatement();\r
             ResultSet results = statement.executeQuery(\r
                     "SELECT BOOK_ID, TITLE FROM BOOKS")) {\r
\r
            while (results.next()) {\r
                int id = results.getInt("BOOK_ID");\r
                String title = results.getString("TITLE");\r
                System.out.println(id + ": " + title);\r
            }\r
        }\r
    }\r
}\r
\`\`\`\r
\r
The \`try\` with resources block closes the result set, statement, and connection when the block ends. Later chapters explain these JDBC objects and why closing them matters.\r
\r
## Common points of confusion\r
\r
- A Derby **database** is not the same as a SQL **schema**. The database is the stored database unit. A schema is a namespace inside that database.\r
- \`create=true\` belongs in the JDBC URL only when the application should create a missing database. Without it, a typo in the path can produce a connection error instead of creating a new database.\r
- The embedded driver and the network client driver are different. Their JDBC URLs also differ.\r
- The Java process that uses embedded mode needs the Derby engine libraries on its runtime classpath.\r
- Derby is retired. Learning its behavior is useful for existing systems, but check current project status and maintenance requirements before selecting it for a new production system.\r
\r
## Practice\r
\r
1. In your own words, describe the difference between a database, schema, table, column, and row.\r
2. Change the example so that it stores two books, then select both rows.\r
3. Decide whether an embedded connection or a Network Server connection fits an application with one process and one local database.\r
4. Remove \`create=true\` from the URL and connect to a database that does not exist. Record the error and explain why it appears.\r
\r
## Further reading\r
\r
- [Apache Derby overview and manuals](https://db.apache.org/derby/manuals/)\r
- [Derby connection URL attributes](https://db.apache.org/derby/docs/10.17/ref/rrefattrib24612.html)\r
- [Embedded Derby basics](https://db.apache.org/derby/docs/10.17/devguide/cdevdvlp39409.html)\r
\r
| [Previous: Notes index](../README.md) | [Notes index](../README.md) | [Next: Java compatibility, setup, and tools](02-compatibility-setup-and-tools.md) |\r
| --- | --- | --- |\r
`,"./chapters/02-compatibility-setup-and-tools.md":`# 2. Java compatibility, setup, and tools\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Relational databases and Derby](01-relational-databases-and-derby.md) | [Notes index](../README.md) | [Next: Using ij and creating a database](03-ij-and-first-database.md) |\r
| --- | --- | --- |\r
\r
## Pick a compatible Java and Derby version\r
\r
Derby releases have different Java requirements. The official download table lists Derby 10.17.1.0 for Java 21 and newer. These notes use that release family for commands and examples. Do not mix Derby libraries from different releases in one application.\r
\r
Derby was retired to read-only status on October 10, 2025. The project says that development and bug fixes have ended. The published distributions remain available, but no new release should be expected. Check the official downloads page for the current compatibility details and follow the security policy of the system where Derby will run.\r
\r
## Install a JDK\r
\r
The JDK provides the Java runtime and tools used to compile Java examples. Open PowerShell and verify the installed version:\r
\r
\`\`\`powershell\r
java --version\r
javac --version\r
\`\`\`\r
\r
For Derby 10.17.1.0, use a Java 21 or newer JDK. If \`java\` or \`javac\` is not found, install a JDK and configure the Windows \`PATH\` to include its \`bin\` directory. Open a new terminal after changing environment variables.\r
\r
## Download and unpack Derby\r
\r
Download the binary distribution from the official Derby downloads page. Verify the archive with the signature or checksum published beside it before using it. Unpack the archive to a stable path, for example:\r
\r
\`\`\`text\r
C:\\tools\\db-derby-10.17.1.0-bin\r
\`\`\`\r
\r
Set a PowerShell variable for the current terminal:\r
\r
\`\`\`powershell\r
$env:DERBY_HOME = 'C:\\tools\\db-derby-10.17.1.0-bin'\r
Get-ChildItem "$env:DERBY_HOME\\lib"\r
\`\`\`\r
\r
The \`lib\` directory contains the Derby libraries. Common files include \`derby.jar\` for the embedded engine, \`derbytools.jar\` for tools such as \`ij\`, \`derbyshared.jar\` for shared classes, \`derbynet.jar\` for the Network Server, and \`derbyclient.jar\` for network clients.\r
\r
## Put the tools on the classpath\r
\r
The classpath tells Java where to find classes. For the embedded engine and the \`ij\` tool, set it for the current PowerShell session:\r
\r
\`\`\`powershell\r
$env:CLASSPATH = @(\r
    "$env:DERBY_HOME\\lib\\derby.jar",\r
    "$env:DERBY_HOME\\lib\\derbytools.jar",\r
    "$env:DERBY_HOME\\lib\\derbyshared.jar"\r
) -join ';'\r
\`\`\`\r
\r
Start \`ij\` and inspect the Derby runtime:\r
\r
\`\`\`powershell\r
java org.apache.derby.tools.sysinfo\r
java org.apache.derby.tools.ij\r
\`\`\`\r
\r
\`ij\` is a command-line SQL client. It accepts Derby connection URLs and SQL statements. \`sysinfo\` prints details about the Java runtime and Derby libraries that Java can find.\r
\r
For a Network Server setup, the server process also needs \`derbynet.jar\`. A Java application using a remote client needs \`derbyclient.jar\`. Keep server and client libraries from the same Derby release family.\r
\r
## Check which libraries Java found\r
\r
If a class cannot be found, print the classpath from the same terminal that starts Java:\r
\r
\`\`\`powershell\r
$env:CLASSPATH -split ';'\r
Test-Path "$env:DERBY_HOME\\lib\\derby.jar"\r
Test-Path "$env:DERBY_HOME\\lib\\derbytools.jar"\r
java org.apache.derby.tools.sysinfo\r
\`\`\`\r
\r
The first command shows each classpath entry. The next commands check that key files exist and that Derby tools can start.\r
\r
## Common setup problems\r
\r
| Symptom | Likely cause | Check |\r
| --- | --- | --- |\r
| \`java\` is not recognized | JDK \`bin\` is missing from \`PATH\` | Run \`java --version\` in a new terminal |\r
| \`ClassNotFoundException\` for a Derby class | A required Derby jar is missing from the classpath | Print \`$env:CLASSPATH\` and inspect \`DERBY_HOME\\lib\` |\r
| \`UnsupportedClassVersionError\` | Java is older than the bytecode used by the selected Derby release | Compare \`java --version\` with the official compatibility table |\r
| \`ij\` starts but cannot connect | The connection URL or driver mode is wrong | Check the URL format in the next chapter |\r
| An old database refuses to boot | Its format may need an upgrade or the runtime may be incompatible | Back up the database, then read the upgrade guidance before changing it |\r
\r
## Practice\r
\r
1. Record the output of \`java --version\`, \`javac --version\`, and \`sysinfo\`.\r
2. Remove \`derbytools.jar\` from the classpath and start \`ij\`. Restore the jar and explain the difference.\r
3. Confirm which library files are present in the distribution you downloaded.\r
4. Write down the Java and Derby versions used by an existing application before attempting to open its database with another installation.\r
\r
## Further reading\r
\r
- [Apache Derby downloads and compatibility table](https://db.apache.org/derby/derby_downloads)\r
- [Derby scripts and libraries](https://db.apache.org/derby/docs/10.17/getstart/rgslib27507.html)\r
- [Derby system requirements and deployment options](https://db.apache.org/derby/docs/10.17/getstart/cgsintro.html)\r
\r
| [Previous: Relational databases and Derby](01-relational-databases-and-derby.md) | [Notes index](../README.md) | [Next: Using ij and creating a database](03-ij-and-first-database.md) |\r
| --- | --- | --- |\r
`,"./chapters/03-ij-and-first-database.md":`# 3. Using ij and creating a database\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Java compatibility, setup, and tools](02-compatibility-setup-and-tools.md) | [Notes index](../README.md) | [Next: Schemas, tables, and data types](04-schemas-tables-and-data-types.md) |\r
| --- | --- | --- |\r
\r
## Start ij\r
\r
\`ij\` is Derby's command-line tool for connecting to a database and entering SQL. Complete the setup from the previous chapter, then start it from PowerShell:\r
\r
\`\`\`powershell\r
java org.apache.derby.tools.ij\r
\`\`\`\r
\r
The prompt changes to \`ij>\`. Commands entered there are interpreted by \`ij\`, while statements such as \`CREATE TABLE\` and \`SELECT\` are sent to Derby as SQL.\r
\r
## Create a database and connect\r
\r
At the \`ij>\` prompt, connect with a database URL:\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby:librarydb;create=true';\r
\`\`\`\r
\r
The URL uses the embedded driver. \`librarydb\` is the database name, and \`create=true\` tells Derby to create it when it does not exist. The database is stored relative to the process's working directory in this example.\r
\r
Connect again without \`create=true\` when the database is expected to exist:\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby:librarydb';\r
\`\`\`\r
\r
This second form avoids silently creating a new database if the name or path is wrong.\r
\r
## Create a table and insert rows\r
\r
Run the following statements at the \`ij>\` prompt. Each statement ends with a semicolon:\r
\r
\`\`\`sql\r
CREATE TABLE BOOKS (\r
    BOOK_ID INTEGER NOT NULL PRIMARY KEY,\r
    TITLE VARCHAR(120) NOT NULL,\r
    PUBLISHED_YEAR INTEGER,\r
    AVAILABLE BOOLEAN DEFAULT TRUE NOT NULL\r
);\r
\r
INSERT INTO BOOKS (BOOK_ID, TITLE, PUBLISHED_YEAR)\r
VALUES (1, 'Clean Code', 2008);\r
\r
INSERT INTO BOOKS (BOOK_ID, TITLE, PUBLISHED_YEAR, AVAILABLE)\r
VALUES (2, 'The Pragmatic Programmer', 1999, FALSE);\r
\`\`\`\r
\r
\`BOOK_ID\` identifies each row. \`TITLE\` cannot be missing. \`PUBLISHED_YEAR\` may be unknown because it has no \`NOT NULL\` rule. \`AVAILABLE\` receives \`TRUE\` when an insert omits it.\r
\r
## Read the rows\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE, PUBLISHED_YEAR, AVAILABLE\r
FROM BOOKS\r
ORDER BY BOOK_ID;\r
\`\`\`\r
\r
The result should contain two rows:\r
\r
| BOOK_ID | TITLE | PUBLISHED_YEAR | AVAILABLE |\r
| ---: | --- | ---: | --- |\r
| 1 | Clean Code | 2008 | true |\r
| 2 | The Pragmatic Programmer | 1999 | false |\r
\r
Use column names rather than \`SELECT *\` when the result is part of application code. Named columns make the query's purpose clear and avoid returning columns the application does not need.\r
\r
## Save commands in a SQL file\r
\r
For repeatable work, save SQL statements in a text file such as \`C:\\derby-work\\library.sql\`:\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby:librarydb;create=true';\r
\r
CREATE TABLE BOOKS (\r
    BOOK_ID INTEGER NOT NULL PRIMARY KEY,\r
    TITLE VARCHAR(120) NOT NULL,\r
    PUBLISHED_YEAR INTEGER,\r
    AVAILABLE BOOLEAN DEFAULT TRUE NOT NULL\r
);\r
\r
INSERT INTO BOOKS (BOOK_ID, TITLE, PUBLISHED_YEAR)\r
VALUES (1, 'Clean Code', 2008);\r
\r
SELECT BOOK_ID, TITLE, PUBLISHED_YEAR, AVAILABLE\r
FROM BOOKS;\r
\`\`\`\r
\r
Start \`ij\` and run the file:\r
\r
\`\`\`sql\r
RUN 'C:/derby-work/library.sql';\r
\`\`\`\r
\r
Forward slashes make Windows file paths easier to read inside the SQL string. Running the complete file a second time will fail at \`CREATE TABLE\` because the table already exists. Use a fresh database name for a clean practice run, or deliberately remove and recreate the database after confirming that you no longer need its data.\r
\r
## Understand the files Derby creates\r
\r
Derby creates database files and a \`derby.log\` file in the process's working directory by default. The database directory contains internal files managed by the engine. Do not edit those files directly, and do not copy a live database while Derby is using it. Use the backup and shutdown procedures in later chapters.\r
\r
Keep the database working directory separate from the Derby installation directory. This makes it easier to identify application data and to back it up.\r
\r
## Common mistakes\r
\r
- Forgetting the semicolon leaves \`ij\` waiting for the rest of the statement.\r
- A JDBC URL is enclosed in quotes after the \`CONNECT\` command.\r
- \`RUN\` is an \`ij\` command, not a SQL statement. It loads a file containing SQL and other \`ij\` commands.\r
- A duplicate primary key is rejected because each \`BOOK_ID\` must be unique.\r
- Repeating \`CREATE TABLE\` fails after the table already exists.\r
- A relative database name is resolved from the Java process's working directory, which may differ from the folder containing the SQL file.\r
\r
## Practice\r
\r
1. Create a database named \`practice_library\` and connect to it.\r
2. Add a \`PUBLISHER\` column using \`ALTER TABLE\` and choose a suitable text type.\r
3. Insert a third book with no publication year. Confirm that Derby returns \`NULL\` for that column.\r
4. Run a \`SELECT\` statement with the columns in a different order and compare the result.\r
5. Run the SQL file twice and write down which statement fails on the second run.\r
\r
## Further reading\r
\r
- [Creating a database and running SQL statements with ij](https://db.apache.org/derby/docs/10.17/getstart/twwdactivity1.html)\r
- [Using the Derby tools](https://db.apache.org/derby/docs/10.17/getstart/cgsusingtoolsutils.html)\r
- [Database connection URLs in ij](https://db.apache.org/derby/docs/10.17/tools/ctoolsijtools16011.html)\r
\r
| [Previous: Java compatibility, setup, and tools](02-compatibility-setup-and-tools.md) | [Notes index](../README.md) | [Next: Schemas, tables, and data types](04-schemas-tables-and-data-types.md) |\r
| --- | --- | --- |\r
`,"./chapters/04-schemas-tables-and-data-types.md":`# 4. Schemas, tables, and data types\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Using ij and creating a database](03-ij-and-first-database.md) | [Notes index](../README.md) | [Next: Constraints and indexes](05-constraints-and-indexes.md) |\r
| --- | --- | --- |\r
\r
## Database, schema, and table\r
\r
A Derby database contains schemas. A schema is a namespace for database objects, including tables, indexes, views, and routines. The default schema for a new user is commonly \`APP\`. Derby also has system schemas whose names begin with \`SYS\`; application objects should use application-owned schemas.\r
\r
Create a schema and qualify a table name with it:\r
\r
\`\`\`sql\r
CREATE SCHEMA LIBRARY;\r
\r
CREATE TABLE LIBRARY.BOOKS (\r
    BOOK_ID INTEGER NOT NULL PRIMARY KEY,\r
    TITLE VARCHAR(120) NOT NULL,\r
    PUBLISHED_YEAR INTEGER,\r
    AVAILABLE BOOLEAN DEFAULT TRUE NOT NULL\r
);\r
\r
INSERT INTO LIBRARY.BOOKS (BOOK_ID, TITLE, PUBLISHED_YEAR, AVAILABLE)\r
VALUES (1, 'Clean Code', 2008, TRUE),\r
       (2, 'The Pragmatic Programmer', 1999, FALSE);\r
\`\`\`\r
\r
The fully qualified table name is \`LIBRARY.BOOKS\`. You can set the current schema for the connection:\r
\r
\`\`\`sql\r
SET SCHEMA LIBRARY;\r
\r
SELECT BOOK_ID, TITLE\r
FROM BOOKS;\r
\`\`\`\r
\r
The connection's current schema affects unqualified names. In shared code, qualifying important objects can make the intended schema clear.\r
\r
## Identifier rules and capitalization\r
\r
SQL keywords are case-insensitive. Unquoted SQL identifiers are also case-insensitive and are normalized by Derby. Use simple unquoted names with letters, digits, and underscores to avoid case surprises.\r
\r
\`\`\`sql\r
CREATE TABLE BOOKS (BOOK_ID INTEGER NOT NULL);\r
\r
SELECT book_id\r
FROM books;\r
\`\`\`\r
\r
Double quotes create a delimited identifier whose spelling and case are preserved. Single quotes are for text values, not table or column names:\r
\r
\`\`\`sql\r
CREATE TABLE "ReadingList" (\r
    "BookTitle" VARCHAR(120)\r
);\r
\r
INSERT INTO "ReadingList" ("BookTitle")\r
VALUES ('Database Systems');\r
\`\`\`\r
\r
Because the quoted names preserve case, later statements must use the exact quoted spelling. Use delimited names only when a specific requirement calls for them.\r
\r
## Choosing a data type\r
\r
Select a type that describes the value and supports the operations the application needs.\r
\r
| Data | Common Derby type | Example |\r
| --- | --- | --- |\r
| Whole count | \`INTEGER\` | Number of pages |\r
| Large whole count | \`BIGINT\` | Large event counter |\r
| Exact amount | \`DECIMAL(10, 2)\` | Price with two decimal places |\r
| Approximate measurement | \`DOUBLE\` | Sensor reading |\r
| Short text with a limit | \`VARCHAR(120)\` | Book title |\r
| Fixed-width text | \`CHAR(2)\` | Country code |\r
| Large text | \`CLOB\` | Long description |\r
| True or false | \`BOOLEAN\` | Whether a book is available |\r
| Calendar date | \`DATE\` | Publication date |\r
| Date and time | \`TIMESTAMP\` | Record creation time |\r
| Binary data | \`BLOB\` | Binary document content |\r
\r
Use \`DECIMAL\` for values that require exact decimal arithmetic, such as prices. \`DOUBLE\` is an approximate floating point type, so rounding differences are expected. Choose a realistic \`VARCHAR\` limit instead of using a large text type for every string.\r
\r
## \`NULL\`, defaults, and required values\r
\r
\`NULL\` means that a value is unknown or absent. It is not the same as zero or an empty string. A column allows \`NULL\` unless it is declared \`NOT NULL\`.\r
\r
\`\`\`sql\r
CREATE TABLE LIBRARY.MEMBERS (\r
    MEMBER_ID INTEGER NOT NULL PRIMARY KEY,\r
    FULL_NAME VARCHAR(100) NOT NULL,\r
    EMAIL VARCHAR(200),\r
    JOINED_ON DATE DEFAULT CURRENT_DATE NOT NULL\r
);\r
\r
INSERT INTO LIBRARY.MEMBERS (MEMBER_ID, FULL_NAME, EMAIL)\r
VALUES (1, 'Asha Rao', NULL);\r
\`\`\`\r
\r
Use \`IS NULL\` and \`IS NOT NULL\` to test missing values. A comparison such as \`EMAIL = NULL\` does not work as a null check.\r
\r
\`\`\`sql\r
SELECT MEMBER_ID, FULL_NAME\r
FROM LIBRARY.MEMBERS\r
WHERE EMAIL IS NULL;\r
\`\`\`\r
\r
## Identity columns\r
\r
An identity column lets Derby generate sequential numeric values. \`GENERATED ALWAYS\` prevents an insert from supplying its own value in the ordinary way:\r
\r
\`\`\`sql\r
CREATE TABLE LIBRARY.BOOKS_WITH_IDENTITY (\r
    BOOK_ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY\r
        (START WITH 1, INCREMENT BY 1),\r
    TITLE VARCHAR(120) NOT NULL,\r
    PRIMARY KEY (BOOK_ID)\r
);\r
\r
INSERT INTO LIBRARY.BOOKS_WITH_IDENTITY (TITLE)\r
VALUES ('Database Systems');\r
\`\`\`\r
\r
The application should not assume that generated values are gap-free. A transaction that fails or rolls back can still consume an identity value.\r
\r
## Useful date and time values\r
\r
Use SQL date and timestamp values instead of storing a formatted date as ordinary text:\r
\r
\`\`\`sql\r
CREATE TABLE LIBRARY.LOANS (\r
    LOAN_ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,\r
    BOOK_ID INTEGER NOT NULL,\r
    MEMBER_ID INTEGER NOT NULL,\r
    CHECKED_OUT_ON DATE NOT NULL,\r
    RETURNED_ON DATE,\r
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,\r
    CONSTRAINT LOANS_PK PRIMARY KEY (LOAN_ID),\r
    CONSTRAINT LOANS_BOOK_FK FOREIGN KEY (BOOK_ID)\r
        REFERENCES LIBRARY.BOOKS (BOOK_ID),\r
    CONSTRAINT LOANS_MEMBER_FK FOREIGN KEY (MEMBER_ID)\r
        REFERENCES LIBRARY.MEMBERS (MEMBER_ID)\r
);\r
\r
VALUES (DATE '2026-10-03', CURRENT_TIMESTAMP);\r
\`\`\`\r
\r
The \`VALUES\` statement shows Derby's date and timestamp values without adding a loan row. Typed date values can be compared and sorted as dates. Text dates can be sorted alphabetically, which may not match chronological order when formats differ.\r
\r
## Common mistakes\r
\r
- Using \`=\` to compare a value with \`NULL\` instead of \`IS NULL\`.\r
- Quoting every identifier and then forgetting that quoted names preserve case.\r
- Choosing \`DOUBLE\` for money even though exact decimal arithmetic is required.\r
- Putting a date into a \`VARCHAR\` column and losing date operations.\r
- Assuming an identity column returns consecutive values with no gaps.\r
- Forgetting that an unqualified table name depends on the current schema.\r
\r
## Practice\r
\r
1. Create a \`LIBRARY.PUBLISHERS\` table with an identity primary key and a required publisher name.\r
2. Add a nullable web address and query for rows where it has no value.\r
3. Create a price column with an exact decimal type. Insert two prices and order them numerically.\r
4. Create a table with one quoted mixed-case name, then query it using the exact identifier.\r
5. Change the current schema and observe how an unqualified table name is resolved.\r
\r
## Further reading\r
\r
- [Derby 10.17 Reference Manual contents](https://db.apache.org/derby/docs/10.17/ref/toc.html)\r
- [CREATE TABLE statement](https://db.apache.org/derby/docs/10.17/ref/rrefsqlj24513.html)\r
- [Derby SQL language reference](https://db.apache.org/derby/docs/10.17/ref/refderby.pdf)\r
\r
| [Previous: Using ij and creating a database](03-ij-and-first-database.md) | [Notes index](../README.md) | [Next: Constraints and indexes](05-constraints-and-indexes.md) |\r
| --- | --- | --- |\r
`,"./chapters/05-constraints-and-indexes.md":`# 5. Constraints and indexes\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Schemas, tables, and data types](04-schemas-tables-and-data-types.md) | [Notes index](../README.md) | [Next: Inserting, updating, and deleting data](06-insert-update-delete.md) |\r
| --- | --- | --- |\r
\r
## Constraints protect data\r
\r
A constraint is a rule that Derby checks when data is inserted or changed. Put important rules in the database so every client must follow them.\r
\r
Common constraints include:\r
\r
- \`NOT NULL\` requires a value.\r
- \`PRIMARY KEY\` uniquely identifies each row and does not allow null values.\r
- \`UNIQUE\` prevents duplicate values across one or more columns.\r
- \`CHECK\` requires a Boolean condition to be true or unknown for a row.\r
- \`FOREIGN KEY\` requires a reference to an existing key in another table.\r
\r
Use names for important constraints. Clear names make database errors and schema changes easier to understand.\r
\r
## Primary and unique keys\r
\r
A primary key is the main identifier for a row. A table can have one primary key, which may contain one or more columns. A unique constraint can protect another candidate identifier.\r
\r
\`\`\`sql\r
CREATE TABLE LIBRARY.PUBLISHERS (\r
    PUBLISHER_ID INTEGER NOT NULL,\r
    PUBLISHER_NAME VARCHAR(120) NOT NULL,\r
    WEBSITE VARCHAR(240),\r
    CONSTRAINT PUBLISHERS_PK PRIMARY KEY (PUBLISHER_ID),\r
    CONSTRAINT PUBLISHERS_NAME_UQ UNIQUE (PUBLISHER_NAME)\r
);\r
\`\`\`\r
\r
For a composite key, the combination of columns must be unique:\r
\r
\`\`\`sql\r
CREATE TABLE LIBRARY.BOOK_EDITIONS (\r
    BOOK_ID INTEGER NOT NULL,\r
    EDITION_NUMBER SMALLINT NOT NULL,\r
    ISBN VARCHAR(20),\r
    CONSTRAINT BOOK_EDITIONS_PK PRIMARY KEY (BOOK_ID, EDITION_NUMBER),\r
    CONSTRAINT BOOK_EDITIONS_ISBN_UQ UNIQUE (ISBN),\r
    CONSTRAINT BOOK_EDITIONS_BOOK_FK FOREIGN KEY (BOOK_ID)\r
        REFERENCES LIBRARY.BOOKS (BOOK_ID)\r
);\r
\`\`\`\r
\r
The referenced key must be a primary key or a unique key. A composite foreign key must use the same number of columns and compatible types in the same order as its referenced key.\r
\r
## Check constraints and defaults\r
\r
Use a \`CHECK\` constraint for a rule that depends on values in the same row:\r
\r
\`\`\`sql\r
CREATE TABLE LIBRARY.BOOK_COPIES (\r
    COPY_ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,\r
    BOOK_ID INTEGER NOT NULL,\r
    CONDITION VARCHAR(20) DEFAULT 'good' NOT NULL,\r
    ACQUISITION_COST DECIMAL(8, 2) NOT NULL,\r
    CONSTRAINT BOOK_COPIES_PK PRIMARY KEY (COPY_ID),\r
    CONSTRAINT BOOK_COPIES_COST_CK CHECK (ACQUISITION_COST >= 0),\r
    CONSTRAINT BOOK_COPIES_CONDITION_CK\r
        CHECK (CONDITION IN ('good', 'worn', 'damaged')),\r
    CONSTRAINT BOOK_COPIES_BOOK_FK FOREIGN KEY (BOOK_ID)\r
        REFERENCES LIBRARY.BOOKS (BOOK_ID)\r
);\r
\`\`\`\r
\r
The default value is used only when an insert omits the column or requests \`DEFAULT\`. It does not replace an explicitly supplied \`NULL\`, which is why \`NOT NULL\` is useful with a required default.\r
\r
\`CHECK\` does not replace \`NOT NULL\`. In SQL, a condition involving \`NULL\` can be unknown, and a check does not reject unknown. Declare required columns as \`NOT NULL\` as well as adding a check rule.\r
\r
## Referential integrity\r
\r
A foreign key keeps child rows connected to a parent row. For example, each copy in \`BOOK_COPIES\` must reference a book in \`BOOKS\`.\r
\r
The default delete behavior prevents deleting a referenced parent row. Choose a referential action only when it matches the application's data ownership rules. \`ON DELETE CASCADE\` removes dependent rows automatically, so use it only when that deletion is intended.\r
\r
Add a rule to a table that already exists with \`ALTER TABLE\`:\r
\r
\`\`\`sql\r
ALTER TABLE LIBRARY.BOOK_COPIES\r
ADD CONSTRAINT BOOK_COPIES_ID_CK\r
CHECK (COPY_ID > 0);\r
\`\`\`\r
\r
Before adding a constraint to an existing table, inspect the rows. Derby will reject the change if existing data violates the rule.\r
\r
## Indexes speed up selected lookups\r
\r
An index is a data structure Derby can use to find rows without scanning the entire table. Primary key and unique constraints already require supporting indexes, so do not add another index over the same columns without measuring a real need.\r
\r
\`\`\`sql\r
CREATE INDEX BOOKS_TITLE_IX\r
ON LIBRARY.BOOKS (TITLE);\r
\r
CREATE INDEX COPIES_BOOK_CONDITION_IX\r
ON LIBRARY.BOOK_COPIES (BOOK_ID, CONDITION);\r
\`\`\`\r
\r
The order of columns in a composite index matters. An index on \`(BOOK_ID, CONDITION)\` is useful for searches beginning with \`BOOK_ID\`; it may not serve a search that filters only on \`CONDITION\` as well.\r
\r
Indexes also take disk space and add work to inserts, updates, and deletes. Add indexes for frequent filters, joins, or ordering only after examining the query and its workload.\r
\r
## Common mistakes\r
\r
- Treating a \`CHECK\` rule as a replacement for \`NOT NULL\`.\r
- Referencing a parent column that is not a primary key or unique key.\r
- Adding an index that duplicates the index already created for a primary key or unique constraint.\r
- Adding many indexes without measuring the cost to writes.\r
- Assuming a foreign key automatically deletes the parent or child rows.\r
- Adding a constraint before checking existing data for violations.\r
\r
## Practice\r
\r
1. Add a unique constraint for the publisher name and test a duplicate insert.\r
2. Add a check that limits copy condition values to a short list.\r
3. Insert a copy with a book ID that does not exist and inspect the foreign-key error.\r
4. Create a two-column index and write a query whose filter begins with the first indexed column.\r
5. Explain why a primary key does not need a duplicate manually created index.\r
\r
## Further reading\r
\r
- [CREATE TABLE statement](https://db.apache.org/derby/docs/10.17/ref/rrefsqlj24513.html)\r
- [CREATE INDEX statement](https://db.apache.org/derby/docs/10.17/ref/rrefsqlj20937.html)\r
- [Derby constraints and referential integrity](https://db.apache.org/derby/docs/10.17/ref/toc.html)\r
\r
| [Previous: Schemas, tables, and data types](04-schemas-tables-and-data-types.md) | [Notes index](../README.md) | [Next: Inserting, updating, and deleting data](06-insert-update-delete.md) |\r
| --- | --- | --- |\r
`,"./chapters/06-insert-update-delete.md":`# 6. Inserting, updating, and deleting data\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Constraints and indexes](05-constraints-and-indexes.md) | [Notes index](../README.md) | [Next: Selecting and filtering data](07-select-and-filter.md) |\r
| --- | --- | --- |\r
\r
## Insert one row\r
\r
An \`INSERT\` statement adds a row to a table. List the target columns so the statement remains clear if the table later gains another column:\r
\r
\`\`\`sql\r
INSERT INTO LIBRARY.BOOKS (BOOK_ID, TITLE, PUBLISHED_YEAR)\r
VALUES (3, 'SQL Fundamentals', 2020);\r
\`\`\`\r
\r
The \`AVAILABLE\` column receives its default value because it was omitted. The \`BOOK_ID\`, \`TITLE\`, and \`PUBLISHED_YEAR\` values match the table's column types.\r
\r
Text values use single quotes. To store an apostrophe inside a text value, write it twice:\r
\r
\`\`\`sql\r
INSERT INTO LIBRARY.BOOKS (BOOK_ID, TITLE)\r
VALUES (4, 'O''Reilly SQL Guide');\r
\`\`\`\r
\r
## Insert more than one row\r
\r
Derby accepts multiple value groups in one \`INSERT\` statement:\r
\r
\`\`\`sql\r
INSERT INTO LIBRARY.BOOKS (BOOK_ID, TITLE, PUBLISHED_YEAR)\r
VALUES\r
    (5, 'SQL Fundamentals', 2020),\r
    (6, 'JDBC in Practice', 2022);\r
\`\`\`\r
\r
The whole statement must satisfy table constraints. If a primary key is duplicated or a required value is missing, Derby reports an error.\r
\r
## Use default and identity values\r
\r
An insert can explicitly request a default for a column:\r
\r
\`\`\`sql\r
INSERT INTO LIBRARY.BOOKS (BOOK_ID, TITLE, PUBLISHED_YEAR, AVAILABLE)\r
VALUES (7, 'Derby Field Notes', 2024, DEFAULT);\r
\`\`\`\r
\r
For an identity column, omit the generated column from the insert:\r
\r
\`\`\`sql\r
INSERT INTO LIBRARY.BOOK_COPIES (BOOK_ID, CONDITION, ACQUISITION_COST)\r
VALUES (1, DEFAULT, 18.50);\r
\`\`\`\r
\r
Derby generates \`COPY_ID\`, uses the default condition, and stores the supplied cost. The foreign key still requires the referenced book to exist.\r
\r
## Update selected rows\r
\r
\`UPDATE\` changes existing rows. Use a \`WHERE\` condition to identify exactly which rows should change:\r
\r
\`\`\`sql\r
UPDATE LIBRARY.BOOKS\r
SET AVAILABLE = FALSE\r
WHERE BOOK_ID = 3;\r
\`\`\`\r
\r
You can update more than one column in the same statement:\r
\r
\`\`\`sql\r
UPDATE LIBRARY.BOOKS\r
SET TITLE = 'SQL Fundamentals, Second Edition',\r
    PUBLISHED_YEAR = 2023\r
WHERE BOOK_ID = 5;\r
\`\`\`\r
\r
In \`ij\`, Derby reports how many rows were updated. If the count is zero, the condition matched no rows. If it is more than one, check that the condition selects the intended records.\r
\r
## Delete selected rows\r
\r
\`DELETE\` removes rows that match a condition:\r
\r
\`\`\`sql\r
DELETE FROM LIBRARY.BOOKS\r
WHERE BOOK_ID = 7;\r
\`\`\`\r
\r
A delete can fail if another table has a foreign key referencing that row. Decide how related data should be handled before deleting a parent record.\r
\r
Always inspect a condition before using it in an update or delete:\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR < 2000;\r
\`\`\`\r
\r
After confirming the result set, use the same condition in a change statement if that is the intended operation.\r
\r
## Insert from a query\r
\r
\`INSERT ... SELECT\` copies selected values from one table into another. The selected columns must match the target columns in count and compatible type:\r
\r
\`\`\`sql\r
CREATE TABLE LIBRARY.OLD_BOOKS (\r
    BOOK_ID INTEGER NOT NULL,\r
    TITLE VARCHAR(120) NOT NULL,\r
    PUBLISHED_YEAR INTEGER\r
);\r
\r
INSERT INTO LIBRARY.OLD_BOOKS (BOOK_ID, TITLE, PUBLISHED_YEAR)\r
SELECT BOOK_ID, TITLE, PUBLISHED_YEAR\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR < 2000;\r
\`\`\`\r
\r
The destination must not receive duplicate primary keys or rows that violate its constraints. Test the \`SELECT\` by itself before using it as an insert source.\r
\r
## Know what each statement changes\r
\r
| Statement | Purpose | Check before running |\r
| --- | --- | --- |\r
| \`INSERT\` | Adds rows | Required values, types, keys, and defaults |\r
| \`UPDATE\` | Changes rows | The \`WHERE\` condition and expected row count |\r
| \`DELETE\` | Removes rows | The rows selected and any foreign key relationships |\r
\r
An \`UPDATE\` or \`DELETE\` without a \`WHERE\` condition applies to every row in the table. That can be intentional, but it should be a deliberate decision.\r
\r
## Common mistakes\r
\r
- Leaving out the target column list and depending on the table's column order.\r
- Supplying a text value without single quotes.\r
- Forgetting to double an apostrophe inside a text literal.\r
- Updating or deleting without checking how many rows match.\r
- Sending \`NULL\` when a column is \`NOT NULL\` or has a needed default.\r
- Inserting a child row before its referenced parent row exists.\r
- Reusing a primary key that is already present.\r
\r
## Practice\r
\r
1. Add two books with one multiple-row \`INSERT\` statement.\r
2. Mark one book unavailable, then select it to confirm the change.\r
3. Update a title that contains an apostrophe.\r
4. Copy older book rows into \`OLD_BOOKS\` and compare the source and destination counts.\r
5. Write a \`DELETE\` statement, first run its matching \`SELECT\`, and record the expected row count.\r
\r
## Further reading\r
\r
- [INSERT statement](https://db.apache.org/derby/docs/10.17/ref/rrefsqlj40774.html)\r
- [UPDATE statement](https://db.apache.org/derby/docs/10.17/ref/rrefsqlj26498.html)\r
- [DELETE statement](https://db.apache.org/derby/docs/10.17/ref/rrefsqlj35981.html)\r
\r
| [Previous: Constraints and indexes](05-constraints-and-indexes.md) | [Notes index](../README.md) | [Next: Selecting and filtering data](07-select-and-filter.md) |\r
| --- | --- | --- |\r
`,"./chapters/07-select-and-filter.md":`# 7. Selecting and filtering data\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Inserting, updating, and deleting data](06-insert-update-delete.md) | [Notes index](../README.md) | [Next: Joins, subqueries, and views](08-joins-subqueries-and-views.md) |\r
| --- | --- | --- |\r
\r
## Select the columns you need\r
\r
\`SELECT\` reads rows from one or more tables. Name the columns the caller needs:\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE, PUBLISHED_YEAR\r
FROM LIBRARY.BOOKS;\r
\`\`\`\r
\r
Use an alias to make a result column easier to read:\r
\r
\`\`\`sql\r
SELECT TITLE AS BOOK_TITLE,\r
       PUBLISHED_YEAR AS YEAR_PUBLISHED\r
FROM LIBRARY.BOOKS;\r
\`\`\`\r
\r
\`SELECT *\` is useful while exploring a table. In application queries, explicit columns keep the result stable when a table gains a new column.\r
\r
## Filter rows with WHERE\r
\r
The \`WHERE\` clause keeps rows that match a condition. Derby supports comparisons such as \`=\`, \`<>\`, \`<\`, \`<=\`, \`>\`, and \`>=\`.\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE, PUBLISHED_YEAR\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR >= 2000;\r
\`\`\`\r
\r
Combine conditions with \`AND\` and \`OR\`. Use parentheses when the intended order should be obvious:\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS\r
WHERE AVAILABLE = TRUE\r
  AND (PUBLISHED_YEAR >= 2020 OR PUBLISHED_YEAR IS NULL);\r
\`\`\`\r
\r
Without parentheses, SQL evaluates \`AND\` before \`OR\`. Parentheses help readers confirm that the filter matches the intended rule.\r
\r
## Handle missing values\r
\r
\`NULL\` represents an absent or unknown value. Use \`IS NULL\` or \`IS NOT NULL\` to test it:\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR IS NULL;\r
\`\`\`\r
\r
This condition does not find null values:\r
\r
\`\`\`sql\r
WHERE PUBLISHED_YEAR = NULL\r
\`\`\`\r
\r
Comparisons with \`NULL\` produce an unknown result. Use the dedicated null predicates instead.\r
\r
## Search text and ranges\r
\r
\`LIKE\` matches text patterns. \`%\` matches zero or more characters. \`_\` matches one character:\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS\r
WHERE TITLE LIKE '%SQL%';\r
\`\`\`\r
\r
\`BETWEEN\` checks an inclusive range:\r
\r
\`\`\`sql\r
SELECT TITLE, PUBLISHED_YEAR\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR BETWEEN 2000 AND 2025;\r
\`\`\`\r
\r
For a set of exact values, use \`IN\`:\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR IN (1999, 2008, 2022);\r
\`\`\`\r
\r
## Sort and limit the result\r
\r
Use \`ORDER BY\` to request a predictable order. Without it, row order is not guaranteed:\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE, PUBLISHED_YEAR\r
FROM LIBRARY.BOOKS\r
ORDER BY PUBLISHED_YEAR DESC, TITLE ASC;\r
\`\`\`\r
\r
Use a row limit when only a small result is needed:\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS\r
ORDER BY TITLE\r
FETCH FIRST 5 ROWS ONLY;\r
\`\`\`\r
\r
The \`ORDER BY\` is important when choosing the first rows. Without an explicit order, the selected rows can vary as data or indexes change.\r
\r
## Remove duplicates and calculate values\r
\r
\`DISTINCT\` removes duplicate result values:\r
\r
\`\`\`sql\r
SELECT DISTINCT PUBLISHED_YEAR\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR IS NOT NULL\r
ORDER BY PUBLISHED_YEAR;\r
\`\`\`\r
\r
Expressions can calculate a value for each result row:\r
\r
\`\`\`sql\r
SELECT TITLE,\r
       CASE\r
           WHEN AVAILABLE = TRUE THEN 'Available'\r
           ELSE 'Checked out'\r
       END AS AVAILABILITY_LABEL\r
FROM LIBRARY.BOOKS;\r
\`\`\`\r
\r
## Aggregate rows\r
\r
Aggregate functions summarize rows. \`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, and \`MAX\` are common examples:\r
\r
\`\`\`sql\r
SELECT COUNT(*) AS BOOK_COUNT,\r
       MIN(PUBLISHED_YEAR) AS OLDEST_YEAR,\r
       MAX(PUBLISHED_YEAR) AS NEWEST_YEAR\r
FROM LIBRARY.BOOKS;\r
\`\`\`\r
\r
Use \`GROUP BY\` to calculate one summary per group:\r
\r
\`\`\`sql\r
SELECT PUBLISHED_YEAR, COUNT(*) AS BOOK_COUNT\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR IS NOT NULL\r
GROUP BY PUBLISHED_YEAR\r
HAVING COUNT(*) > 1\r
ORDER BY PUBLISHED_YEAR;\r
\`\`\`\r
\r
\`WHERE\` filters input rows before grouping. \`HAVING\` filters the groups after aggregation.\r
\r
## Common mistakes\r
\r
- Expecting a stable row order without \`ORDER BY\`.\r
- Writing \`= NULL\` instead of \`IS NULL\`.\r
- Combining \`AND\` and \`OR\` without clarifying the intended grouping.\r
- Using \`FETCH FIRST\` without deciding which rows should come first.\r
- Selecting a non-aggregated column that is not part of the \`GROUP BY\` list.\r
- Using \`WHERE\` for an aggregate condition that belongs in \`HAVING\`.\r
\r
## Practice\r
\r
1. List available books published since 2020 and sort newest first.\r
2. Find titles containing the word \`SQL\`.\r
3. Count books by publication year and keep only years with more than one book.\r
4. Return the first three books in alphabetical order.\r
5. Add a \`CASE\` expression that labels books with a missing publication year as \`Unknown\`.\r
\r
## Further reading\r
\r
- [SELECT statement and query clauses](https://db.apache.org/derby/docs/10.17/ref/rrefsqlj41360.html)\r
- [WHERE clause](https://db.apache.org/derby/docs/10.17/ref/rrefsqlj33602.html)\r
- [Aggregates and set functions](https://db.apache.org/derby/docs/10.17/ref/rrefsqlj33923.html)\r
\r
| [Previous: Inserting, updating, and deleting data](06-insert-update-delete.md) | [Notes index](../README.md) | [Next: Joins, subqueries, and views](08-joins-subqueries-and-views.md) |\r
| --- | --- | --- |\r
`,"./chapters/08-joins-subqueries-and-views.md":`# 8. Joins, subqueries, and views\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Selecting and filtering data](07-select-and-filter.md) | [Notes index](../README.md) | [Next: Transactions and concurrency](09-transactions-and-concurrency.md) |\r
| --- | --- | --- |\r
\r
## Combine related rows with a join\r
\r
A join reads related rows from more than one table. In the library database, \`LOANS.BOOK_ID\` refers to \`BOOKS.BOOK_ID\`, while \`LOANS.MEMBER_ID\` refers to \`MEMBERS.MEMBER_ID\`.\r
\r
The previous chapter defines \`LIBRARY.BOOKS\`, \`LIBRARY.MEMBERS\`, and \`LIBRARY.LOANS\`. In a fresh practice database, continue from that schema and add a second member plus two loan rows. Run this setup once:\r
\r
\`\`\`sql\r
INSERT INTO LIBRARY.MEMBERS (MEMBER_ID, FULL_NAME, EMAIL)\r
VALUES (2, 'Dev Shah', 'dev@example.com');\r
\r
INSERT INTO LIBRARY.LOANS\r
    (BOOK_ID, MEMBER_ID, CHECKED_OUT_ON, RETURNED_ON)\r
VALUES (1, 1, DATE '2026-09-01', NULL),\r
       (2, 2, DATE '2026-09-03', DATE '2026-09-10');\r
\`\`\`\r
\r
An inner join returns rows where the join condition matches on both sides:\r
\r
\`\`\`sql\r
SELECT b.BOOK_ID,\r
       b.TITLE,\r
       m.FULL_NAME,\r
       l.CHECKED_OUT_ON,\r
       l.RETURNED_ON\r
FROM LIBRARY.LOANS AS l\r
INNER JOIN LIBRARY.BOOKS AS b\r
    ON b.BOOK_ID = l.BOOK_ID\r
INNER JOIN LIBRARY.MEMBERS AS m\r
    ON m.MEMBER_ID = l.MEMBER_ID\r
ORDER BY l.CHECKED_OUT_ON;\r
\`\`\`\r
\r
The aliases \`b\`, \`l\`, and \`m\` make longer table names easier to read. Prefix each selected column with its alias when a name appears in more than one table, such as \`BOOK_ID\`.\r
\r
## Keep unmatched rows with a left join\r
\r
A left outer join returns every row from the table on the left. When no row matches on the right, Derby returns \`NULL\` for the right-side columns:\r
\r
\`\`\`sql\r
SELECT b.BOOK_ID,\r
       b.TITLE,\r
       l.CHECKED_OUT_ON,\r
       m.FULL_NAME\r
FROM LIBRARY.BOOKS AS b\r
LEFT OUTER JOIN LIBRARY.LOANS AS l\r
    ON l.BOOK_ID = b.BOOK_ID\r
   AND l.RETURNED_ON IS NULL\r
LEFT OUTER JOIN LIBRARY.MEMBERS AS m\r
    ON m.MEMBER_ID = l.MEMBER_ID\r
ORDER BY b.BOOK_ID;\r
\`\`\`\r
\r
The condition on \`RETURNED_ON\` is part of the \`ON\` clause. This keeps books without an active loan in the result. Moving that condition to \`WHERE\` would remove rows where the loan columns are \`NULL\`, changing the result into an effective inner filter.\r
\r
## Find rows with a subquery\r
\r
A subquery is a query nested inside another SQL statement. Use \`IN\` when the inner query returns a list of values:\r
\r
\`\`\`sql\r
SELECT b.BOOK_ID, b.TITLE\r
FROM LIBRARY.BOOKS AS b\r
WHERE b.BOOK_ID IN (\r
    SELECT l.BOOK_ID\r
    FROM LIBRARY.LOANS AS l\r
)\r
ORDER BY b.BOOK_ID;\r
\`\`\`\r
\r
Use \`EXISTS\` when the question is whether at least one related row exists. This correlated subquery refers to the current member through \`m.MEMBER_ID\`:\r
\r
\`\`\`sql\r
SELECT m.MEMBER_ID, m.FULL_NAME\r
FROM LIBRARY.MEMBERS AS m\r
WHERE EXISTS (\r
    SELECT 1\r
    FROM LIBRARY.LOANS AS l\r
    WHERE l.MEMBER_ID = m.MEMBER_ID\r
      AND l.RETURNED_ON IS NULL\r
)\r
ORDER BY m.MEMBER_ID;\r
\`\`\`\r
\r
Use \`NOT EXISTS\` to find members with no matching loan rows:\r
\r
\`\`\`sql\r
SELECT m.MEMBER_ID, m.FULL_NAME\r
FROM LIBRARY.MEMBERS AS m\r
WHERE NOT EXISTS (\r
    SELECT 1\r
    FROM LIBRARY.LOANS AS l\r
    WHERE l.MEMBER_ID = m.MEMBER_ID\r
)\r
ORDER BY m.MEMBER_ID;\r
\`\`\`\r
\r
\`NOT EXISTS\` is often easier to reason about than \`NOT IN\` when the subquery could return \`NULL\` values.\r
\r
## Use a scalar subquery\r
\r
A scalar subquery returns one row with one column. An aggregate such as \`COUNT(*)\` returns one value, so it can be selected beside each book:\r
\r
\`\`\`sql\r
SELECT b.BOOK_ID,\r
       b.TITLE,\r
       (\r
           SELECT COUNT(*)\r
           FROM LIBRARY.LOANS AS l\r
           WHERE l.BOOK_ID = b.BOOK_ID\r
       ) AS LOAN_COUNT\r
FROM LIBRARY.BOOKS AS b\r
ORDER BY b.BOOK_ID;\r
\`\`\`\r
\r
The inner query uses the current book row. This is a correlated scalar subquery. A scalar subquery that returns more than one row causes an error, so use an aggregate or a condition that guarantees at most one result.\r
\r
## Use a query as a temporary table\r
\r
A subquery in the \`FROM\` clause can calculate a result that the outer query joins like a table. Give the derived table a name:\r
\r
\`\`\`sql\r
SELECT b.BOOK_ID,\r
       b.TITLE,\r
       loan_counts.LOAN_COUNT\r
FROM LIBRARY.BOOKS AS b\r
LEFT JOIN (\r
    SELECT l.BOOK_ID, COUNT(*) AS LOAN_COUNT\r
    FROM LIBRARY.LOANS AS l\r
    GROUP BY l.BOOK_ID\r
) AS loan_counts\r
    ON loan_counts.BOOK_ID = b.BOOK_ID\r
ORDER BY b.BOOK_ID;\r
\`\`\`\r
\r
This query summarizes loan rows once in the derived table, then joins those totals to books. Books without loans have no matching summary row, so their \`LOAN_COUNT\` is \`NULL\`. Use \`COALESCE(loan_counts.LOAN_COUNT, 0)\` if the result should display zero instead.\r
\r
## Save a useful query as a view\r
\r
A view gives a query a reusable database name. It reads from its underlying tables when selected:\r
\r
\`\`\`sql\r
CREATE VIEW LIBRARY.ACTIVE_LOANS\r
    (BOOK_TITLE, MEMBER_NAME, CHECKED_OUT_ON)\r
AS\r
    SELECT b.TITLE, m.FULL_NAME, l.CHECKED_OUT_ON\r
    FROM LIBRARY.LOANS AS l\r
    INNER JOIN LIBRARY.BOOKS AS b\r
        ON b.BOOK_ID = l.BOOK_ID\r
    INNER JOIN LIBRARY.MEMBERS AS m\r
        ON m.MEMBER_ID = l.MEMBER_ID\r
    WHERE l.RETURNED_ON IS NULL;\r
\`\`\`\r
\r
Query the view like a table:\r
\r
\`\`\`sql\r
SELECT BOOK_TITLE, MEMBER_NAME, CHECKED_OUT_ON\r
FROM LIBRARY.ACTIVE_LOANS\r
ORDER BY CHECKED_OUT_ON;\r
\`\`\`\r
\r
In Derby, views are not updatable. Use the base tables for \`INSERT\`, \`UPDATE\`, and \`DELETE\`. Remove a view with \`DROP VIEW LIBRARY.ACTIVE_LOANS\` when it is no longer needed.\r
\r
## Choose the right approach\r
\r
| Need | Common choice |\r
| --- | --- |\r
| Return rows with a match in each table | \`INNER JOIN\` |\r
| Keep every left-side row, even without a match | \`LEFT OUTER JOIN\` |\r
| Test whether related rows exist | \`EXISTS\` |\r
| Compare a value with results from another query | \`IN\` or a scalar subquery |\r
| Reuse a named read query | View |\r
\r
## Common mistakes\r
\r
- Joining columns with similar names but no real relationship.\r
- Leaving a join column unqualified when two tables contain that name.\r
- Putting a right-table filter in \`WHERE\` when unmatched left rows must remain.\r
- Assuming a scalar subquery may return several rows.\r
- Using \`NOT IN\` without considering \`NULL\` values in its result.\r
- Expecting a Derby view to accept data changes.\r
- Forgetting that one parent row can match several child rows and therefore appear more than once.\r
\r
## Practice\r
\r
1. Add one more member and one loan, then list each member's loaned book titles.\r
2. List every book, including books with no loan history.\r
3. Find members who have never borrowed a book using \`NOT EXISTS\`.\r
4. Return a loan count for every book using a scalar subquery, then using a derived table.\r
5. Create a view of all loan history, including return dates, and query it in date order.\r
6. Add an additional loan for the same book and observe why a join can return that book on multiple rows.\r
\r
## Further reading\r
\r
- [INNER JOIN operation](https://db.apache.org/derby/docs/10.17/ref/rrefsqlj35034.html)\r
- [LEFT OUTER JOIN operation](https://db.apache.org/derby/docs/10.17/ref/rrefsqlj18922.html)\r
- [Scalar subquery](https://db.apache.org/derby/docs/10.17/ref/rrefscalarsubquery.html)\r
- [Table subquery](https://db.apache.org/derby/docs/10.17/ref/rreftablesubquery.html)\r
- [CREATE VIEW statement](https://db.apache.org/derby/docs/10.17/ref/rrefsqlj15446.html)\r
\r
| [Previous: Selecting and filtering data](07-select-and-filter.md) | [Notes index](../README.md) | [Next: Transactions and concurrency](09-transactions-and-concurrency.md) |\r
| --- | --- | --- |\r
`,"./chapters/09-transactions-and-concurrency.md":`# 9. Transactions and concurrency\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Joins, subqueries, and views](08-joins-subqueries-and-views.md) | [Notes index](../README.md) | [Next: JDBC connections and prepared statements](10-jdbc-connections-and-statements.md) |\r
| --- | --- | --- |\r
\r
## Group related changes into a transaction\r
\r
A transaction is a unit of database work. It groups statements so the application can make all of them permanent together or undo them together.\r
\r
The ACID properties describe common transaction goals:\r
\r
- **Atomicity:** the complete unit succeeds, or its changes are undone.\r
- **Consistency:** committed changes preserve database rules such as keys and constraints.\r
- **Isolation:** concurrent work follows the selected isolation level.\r
- **Durability:** committed changes survive a normal database restart.\r
\r
In the library example, lending a book involves changing its availability and inserting a loan row. Those two changes belong in one transaction. If either change fails, roll back both.\r
\r
## Understand auto-commit\r
\r
A new JDBC connection uses auto-commit by default. Each completed statement is committed as its own transaction. Turn auto-commit off when several statements must succeed together:\r
\r
\`\`\`java\r
connection.setAutoCommit(false);\r
\`\`\`\r
\r
Call \`commit()\` after all statements succeed. Call \`rollback()\` after a failure. Both methods end the current transaction and begin a new one on the same connection. There is no separate SQL \`BEGIN\` command required for ordinary JDBC work.\r
\r
## Lend a book safely with JDBC\r
\r
The following complete class reserves book \`3\` for member \`2\`. Chapter 6 inserts book \`3\`, and chapter 8 adds member \`2\`. Derby updates the book only when it is currently marked available. If no row changes, the transaction is rolled back and no loan is added.\r
\r
\`\`\`java\r
import java.sql.Connection;\r
import java.sql.DriverManager;\r
import java.sql.PreparedStatement;\r
import java.sql.SQLException;\r
\r
public class BorrowBookTransaction {\r
    public static void main(String[] args) throws SQLException {\r
        String url = "jdbc:derby:librarydb";\r
\r
        try (Connection connection = DriverManager.getConnection(url)) {\r
            connection.setTransactionIsolation(\r
                    Connection.TRANSACTION_READ_COMMITTED);\r
            connection.setAutoCommit(false);\r
\r
            try {\r
                int bookId = 3;\r
                int memberId = 2;\r
\r
                try (PreparedStatement updateBook = connection.prepareStatement(\r
                        "UPDATE LIBRARY.BOOKS "\r
                                + "SET AVAILABLE = FALSE "\r
                                + "WHERE BOOK_ID = ? AND AVAILABLE = TRUE")) {\r
                    updateBook.setInt(1, bookId);\r
\r
                    int changedRows = updateBook.executeUpdate();\r
                    if (changedRows != 1) {\r
                        throw new SQLException("Book is not available.");\r
                    }\r
                }\r
\r
                try (PreparedStatement insertLoan = connection.prepareStatement(\r
                        "INSERT INTO LIBRARY.LOANS "\r
                                + "(BOOK_ID, MEMBER_ID, CHECKED_OUT_ON) "\r
                                + "VALUES (?, ?, CURRENT_DATE)")) {\r
                    insertLoan.setInt(1, bookId);\r
                    insertLoan.setInt(2, memberId);\r
                    insertLoan.executeUpdate();\r
                }\r
\r
                connection.commit();\r
            } catch (SQLException error) {\r
                try {\r
                    connection.rollback();\r
                } catch (SQLException rollbackError) {\r
                    error.addSuppressed(rollbackError);\r
                }\r
                throw error;\r
            }\r
        }\r
    }\r
}\r
\`\`\`\r
\r
The \`UPDATE\` row count is checked before inserting a loan. This protects against a missing book or one already marked unavailable. The foreign keys provide another check that the book and member exist. The outer \`try\` closes the connection even when an exception occurs.\r
\r
## Roll back work that should not be kept\r
\r
Use \`rollback()\` when a later step fails validation or a statement throws an error. You can also roll back deliberately during practice:\r
\r
\`\`\`java\r
connection.setAutoCommit(false);\r
\r
try (PreparedStatement statement = connection.prepareStatement(\r
        "UPDATE LIBRARY.MEMBERS SET EMAIL = ? WHERE MEMBER_ID = ?")) {\r
    statement.setString(1, "temporary@example.com");\r
    statement.setInt(2, 1);\r
    statement.executeUpdate();\r
}\r
\r
connection.rollback();\r
\`\`\`\r
\r
After rollback, the email change is not committed. If auto-commit is disabled, always finish the transaction with either \`commit()\` or \`rollback()\` before returning the connection to its owner.\r
\r
## Choose an isolation level\r
\r
Isolation controls what a transaction can observe while other transactions are running. Derby's default is \`READ_COMMITTED\` (\`CS\`, or cursor stability). The JDBC constants map to Derby's names as follows:\r
\r
| JDBC level | Derby name | General effect |\r
| --- | --- | --- |\r
| \`TRANSACTION_READ_UNCOMMITTED\` | \`UR\` | Allows dirty reads, so a query can observe another transaction's uncommitted change. |\r
| \`TRANSACTION_READ_COMMITTED\` | \`CS\` | Does not expose uncommitted changes. This is Derby's default. |\r
| \`TRANSACTION_REPEATABLE_READ\` | \`RS\` | Keeps rows read by the transaction stable for repeated reads. |\r
| \`TRANSACTION_SERIALIZABLE\` | \`RR\` | Provides the strongest isolation and may block more concurrent work. |\r
\r
Set the level before doing transaction work:\r
\r
\`\`\`java\r
connection.setTransactionIsolation(Connection.TRANSACTION_SERIALIZABLE);\r
\`\`\`\r
\r
Changing the isolation level commits the current transaction in Derby. Choose the level before making changes you may still need to roll back. Stronger isolation can reduce concurrency, so keep transactions short and use the level the application requires.\r
\r
The equivalent command at the \`ij\` prompt is:\r
\r
\`\`\`sql\r
SET ISOLATION READ COMMITTED;\r
\`\`\`\r
\r
\`SET ISOLATION\` is a Derby SQL statement. It commits the current transaction when issued, so do not use it in the middle of work that must remain uncommitted.\r
\r
## Handle concurrent updates\r
\r
When two connections update the same data, Derby coordinates them with locks. One transaction may wait for another to finish. A deadlock can happen when transactions each hold a lock the other needs. Derby aborts a transaction in a deadlock so the application can recover.\r
\r
To reduce lock waits and deadlocks:\r
\r
- Keep transactions short and commit promptly.\r
- Access shared tables and rows in a consistent order.\r
- Avoid waiting for user input or network calls while a transaction is open.\r
- Read the SQL state and exception details before deciding whether retry is appropriate.\r
- Retry a complete, idempotent unit of work, not just the statement that failed.\r
\r
## Common mistakes\r
\r
- Leaving auto-commit on when multiple statements must succeed together.\r
- Forgetting to commit or roll back before a connection is reused.\r
- Catching an exception and continuing as if the transaction succeeded.\r
- Changing isolation after making edits that should remain rollbackable.\r
- Keeping a transaction open while doing unrelated application work.\r
- Retrying a write without checking whether repeating it would create duplicate effects.\r
\r
## Practice\r
\r
1. Run the loan transaction and confirm that book \`3\` becomes unavailable and one loan row is added.\r
2. Run it again and confirm that the availability check prevents another loan row.\r
3. Make the member ID invalid, run the transaction, and confirm that the book update is rolled back when the foreign key rejects the loan.\r
4. Update a member email with auto-commit disabled, roll back, then select the row to confirm that the original value remains.\r
5. Open two connections and update the same book. Record when one connection waits and what happens after the other commits.\r
6. Compare the result of a read under \`READ_COMMITTED\` and \`SERIALIZABLE\` while another connection changes the same row.\r
\r
## Further reading\r
\r
- [Derby transaction isolation levels](https://db.apache.org/derby/docs/10.17/ref/rrefjavcsti.html)\r
- [SET ISOLATION statement](https://db.apache.org/derby/docs/10.17/ref/rrefsqlj41180.html)\r
- [Derby Developer's Guide](https://db.apache.org/derby/docs/10.17/devguide/derbydev.pdf)\r
- [Derby manuals](https://db.apache.org/derby/manuals/)\r
\r
| [Previous: Joins, subqueries, and views](08-joins-subqueries-and-views.md) | [Notes index](../README.md) | [Next: JDBC connections and prepared statements](10-jdbc-connections-and-statements.md) |\r
| --- | --- | --- |\r
`,"./chapters/10-jdbc-connections-and-statements.md":`# 10. JDBC connections and prepared statements\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Transactions and concurrency](09-transactions-and-concurrency.md) | [Notes index](../README.md) | [Next: Embedded mode and database lifecycle](11-embedded-mode-and-lifecycle.md) |\r
| --- | --- | --- |\r
\r
## How JDBC fits together\r
\r
JDBC is Java's standard API for working with a relational database. A typical read follows this path:\r
\r
1. \`DriverManager\` opens a \`Connection\` using a database URL.\r
2. The connection creates a \`PreparedStatement\` containing SQL.\r
3. The statement runs and returns a \`ResultSet\`.\r
4. The application reads each row from the result set.\r
5. Try-with-resources closes the result set, statement, and connection.\r
\r
For Derby 10.17 with Java 21, put the Derby libraries on the application's classpath as described in chapter 2. Derby loads its JDBC driver automatically when \`DriverManager\` first requests a connection, so a separate \`Class.forName\` call is not needed in this setup.\r
\r
## Open an embedded connection\r
\r
An embedded connection uses the database engine in the same Java process:\r
\r
\`\`\`java\r
String url = "jdbc:derby:librarydb";\r
Connection connection = DriverManager.getConnection(url);\r
\`\`\`\r
\r
Use \`create=true\` only when the application should create a database that does not exist yet:\r
\r
\`\`\`java\r
String url = "jdbc:derby:librarydb;create=true";\r
\`\`\`\r
\r
Without that attribute, a missing database causes a connection error. Derby resolves the relative name \`librarydb\` from the Java process's working directory. Chapter 11 covers embedded database ownership and shutdown.\r
\r
\`DriverManager\` keeps small examples direct. Applications running inside a server or framework commonly receive a \`DataSource\` and call its \`getConnection()\` method instead. Code that depends on the \`Connection\` interface can work with either source.\r
\r
## Choose a statement type\r
\r
Use \`Statement\` for fixed SQL that has no changing values. Use \`PreparedStatement\` when a query has input values, when data comes from a user, or when the same SQL runs with different values:\r
\r
\`\`\`java\r
try (java.sql.Statement statement = connection.createStatement();\r
     ResultSet results = statement.executeQuery(\r
             "SELECT BOOK_ID, TITLE FROM LIBRARY.BOOKS ORDER BY TITLE")) {\r
    while (results.next()) {\r
        System.out.println(results.getString("TITLE"));\r
    }\r
}\r
\`\`\`\r
\r
Prepared statements also make parameter types explicit and keep data values separate from SQL text. The next section shows their parameter syntax.\r
\r
## Read rows with a prepared statement\r
\r
A \`PreparedStatement\` keeps SQL structure separate from values. Each \`?\` is a parameter. Set parameters in order, starting at 1:\r
\r
\`\`\`java\r
import java.sql.Connection;\r
import java.sql.DriverManager;\r
import java.sql.PreparedStatement;\r
import java.sql.ResultSet;\r
import java.sql.SQLException;\r
\r
public class FindBooks {\r
    public static void main(String[] args) throws SQLException {\r
        String url = "jdbc:derby:librarydb";\r
        String sql = "SELECT BOOK_ID, TITLE, PUBLISHED_YEAR "\r
                + "FROM LIBRARY.BOOKS "\r
                + "WHERE TITLE LIKE ? "\r
                + "ORDER BY TITLE";\r
\r
        try (Connection connection = DriverManager.getConnection(url);\r
             PreparedStatement statement = connection.prepareStatement(sql)) {\r
\r
            statement.setString(1, "%SQL%");\r
\r
            try (ResultSet results = statement.executeQuery()) {\r
                while (results.next()) {\r
                    int bookId = results.getInt("BOOK_ID");\r
                    String title = results.getString("TITLE");\r
                    int yearValue = results.getInt("PUBLISHED_YEAR");\r
                    Integer publishedYear = results.wasNull()\r
                            ? null\r
                            : yearValue;\r
\r
                    System.out.println(bookId + " | " + title + " | "\r
                            + publishedYear);\r
                }\r
            }\r
        }\r
    }\r
}\r
\`\`\`\r
\r
The result set cursor starts before the first row. Each \`next()\` call moves it forward and returns \`false\` when there are no more rows. \`getInt\` returns \`0\` for SQL \`NULL\`, so call \`wasNull()\` immediately after reading the column when the difference between \`NULL\` and zero matters.\r
\r
## Change data and check the row count\r
\r
Use \`executeUpdate()\` for \`INSERT\`, \`UPDATE\`, and \`DELETE\`. It returns the number of changed rows:\r
\r
\`\`\`java\r
String sql = "UPDATE LIBRARY.BOOKS "\r
        + "SET AVAILABLE = ? "\r
        + "WHERE BOOK_ID = ?";\r
\r
try (PreparedStatement statement = connection.prepareStatement(sql)) {\r
    statement.setBoolean(1, false);\r
    statement.setInt(2, 3);\r
\r
    int changedRows = statement.executeUpdate();\r
    System.out.println("Updated rows: " + changedRows);\r
}\r
\`\`\`\r
\r
When the application expects exactly one row, check that the returned count is \`1\`. A count of \`0\` means no row matched. A count above \`1\` may mean the \`WHERE\` condition is too broad.\r
\r
Use \`executeQuery()\` for a statement that returns rows. Use \`executeUpdate()\` for a data change or a statement that returns no rows. \`execute()\` is available when the result type is not known in advance.\r
\r
## Bind values safely\r
\r
Do not build SQL by joining user input into a string:\r
\r
\`\`\`java\r
// Avoid this pattern.\r
String sql = "SELECT BOOK_ID FROM LIBRARY.BOOKS WHERE TITLE = '"\r
        + userInput + "'";\r
\`\`\`\r
\r
Pass the value as a parameter instead:\r
\r
\`\`\`java\r
String sql = "SELECT BOOK_ID FROM LIBRARY.BOOKS WHERE TITLE = ?";\r
\r
try (PreparedStatement statement = connection.prepareStatement(sql)) {\r
    statement.setString(1, userInput);\r
    try (ResultSet results = statement.executeQuery()) {\r
        while (results.next()) {\r
            System.out.println(results.getInt("BOOK_ID"));\r
        }\r
    }\r
}\r
\`\`\`\r
\r
Parameters represent values, not SQL structure. A placeholder cannot stand for a table name, column name, or sort direction. If a query must choose among identifiers, map an application choice to a fixed list of known SQL fragments.\r
\r
Use a typed setter such as \`setInt\`, \`setBoolean\`, \`setDate\`, or \`setString\` when the value type is known. Use \`setNull(parameterNumber, sqlType)\` when setting a SQL \`NULL\` value.\r
\r
## Retrieve an identity value\r
\r
When an insert creates a row with an identity column, request the generated key and read it from the returned result set:\r
\r
\`\`\`java\r
String sql = "INSERT INTO LIBRARY.LOANS "\r
        + "(BOOK_ID, MEMBER_ID, CHECKED_OUT_ON) "\r
        + "VALUES (?, ?, CURRENT_DATE)";\r
\r
try (PreparedStatement statement = connection.prepareStatement(\r
        sql, java.sql.Statement.RETURN_GENERATED_KEYS)) {\r
    statement.setInt(1, 3);\r
    statement.setInt(2, 2);\r
    statement.executeUpdate();\r
\r
    try (ResultSet keys = statement.getGeneratedKeys()) {\r
        if (keys.next()) {\r
            int loanId = keys.getInt(1);\r
            System.out.println("Created loan " + loanId);\r
        }\r
    }\r
}\r
\`\`\`\r
\r
Use generated keys for a single-row insert. Derby documents limitations for generated keys with multi-row inserts, so retrieve each identity value through a separate single-row insert when each generated key is needed.\r
\r
## Close JDBC resources\r
\r
Connections, statements, and result sets use database and application resources. Try-with-resources closes them even when a query fails. Close nested resources in the order they are used:\r
\r
\`\`\`java\r
try (Connection connection = DriverManager.getConnection(url);\r
     PreparedStatement statement = connection.prepareStatement(sql);\r
     ResultSet results = statement.executeQuery()) {\r
    while (results.next()) {\r
        // Read the current row here.\r
    }\r
}\r
\`\`\`\r
\r
When statements are part of a transaction, use chapter 9's commit and rollback structure. Try-with-resources can still close statements and result sets, while the connection stays open until the transaction finishes.\r
\r
## Read JDBC errors\r
\r
JDBC reports database and connection problems with \`SQLException\`. Inspect the message and SQL state, and follow the chained exceptions when present:\r
\r
\`\`\`java\r
catch (SQLException error) {\r
    System.err.println("Message: " + error.getMessage());\r
    System.err.println("SQL state: " + error.getSQLState());\r
    System.err.println("Error code: " + error.getErrorCode());\r
\r
    for (SQLException next = error.getNextException();\r
         next != null;\r
         next = next.getNextException()) {\r
        System.err.println("Related error: " + next.getMessage());\r
    }\r
}\r
\`\`\`\r
\r
Use SQL states to make application decisions only when the Derby documentation defines the state for that error. Chapter 16 covers common failures and diagnostics.\r
\r
## Common mistakes\r
\r
- Forgetting that parameter positions start at \`1\`, not \`0\`.\r
- Calling \`executeQuery()\` for an update or \`executeUpdate()\` for a query.\r
- Leaving a result set or statement open after the operation finishes.\r
- Reading a nullable numeric column without checking \`wasNull()\`.\r
- Concatenating input values into SQL.\r
- Trying to bind a table name or column name with \`?\`.\r
- Reusing a connection after an error without checking its transaction state.\r
- Expecting \`getGeneratedKeys()\` to return a key without requesting generated keys first.\r
\r
## Practice\r
\r
1. Run \`FindBooks\` and change the title pattern to search for another word.\r
2. Change the query to filter on \`PUBLISHED_YEAR\` with an integer parameter.\r
3. Update one book and check that the row count is exactly one.\r
4. Read \`PUBLISHED_YEAR\` from a row where it is \`NULL\` and compare \`wasNull()\` with the numeric result.\r
5. Insert a loan and retrieve its generated \`LOAN_ID\`.\r
6. Temporarily omit one Derby jar from the runtime classpath and record the connection error. Restore the jar before continuing.\r
\r
## Further reading\r
\r
- [Derby embedded basics](https://db.apache.org/derby/docs/10.17/devguide/cdevdvlp39409.html)\r
- [Derby JDBC driver loading](https://db.apache.org/derby/docs/10.17/devguide/cdevdvlp40653.html)\r
- [DriverManager and Derby connection URLs](https://db.apache.org/derby/docs/10.17/ref/rrefjdbc34565.html)\r
- [PreparedStatement interface](https://db.apache.org/derby/docs/10.17/ref/rrefjdbc29874.html)\r
- [ResultSet interface](https://db.apache.org/derby/docs/10.17/ref/rrefjdbc23502.html)\r
- [Autogenerated keys](https://db.apache.org/derby/docs/10.17/ref/crefjavstateautogen.html)\r
\r
| [Previous: Transactions and concurrency](09-transactions-and-concurrency.md) | [Notes index](../README.md) | [Next: Embedded mode and database lifecycle](11-embedded-mode-and-lifecycle.md) |\r
| --- | --- | --- |\r
`,"./chapters/11-embedded-mode-and-lifecycle.md":`# 11. Embedded mode and database lifecycle\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: JDBC connections and prepared statements](10-jdbc-connections-and-statements.md) | [Notes index](../README.md) | [Next: Network Server and client connections](12-network-server-and-client.md) |\r
| --- | --- | --- |\r
\r
## What embedded mode means\r
\r
In embedded mode, the Java application and Derby engine run in the same JVM. The application uses the embedded driver, and Derby reads and writes its database files on the local machine.\r
\r
\`\`\`text\r
Java application and Derby engine in one JVM\r
                    |\r
                    v\r
           Local database files\r
\`\`\`\r
\r
Embedded mode fits a standalone application that owns its database, such as a desktop tool or a local service. It avoids running a separate database server process. A second JVM cannot open the same database files while the embedded engine has them booted. Use Derby Network Server when separate application processes need shared access. Chapter 12 covers that mode.\r
\r
## Locate the Derby system and database\r
\r
A Derby system is one running Derby engine, a system directory, and the databases available to that engine. The system directory holds system configuration such as \`derby.properties\` and the default error log \`derby.log\`. Each disk database lives in its own subdirectory.\r
\r
Set \`derby.system.home\` before starting the application so database paths stay predictable:\r
\r
\`\`\`powershell\r
java -Dderby.system.home=C:/data/derby-system \`\r
     -cp "$env:DERBY_HOME/lib/*;." \`\r
     com.example.LibraryApplication\r
\`\`\`\r
\r
With that system directory selected, this relative URL looks for \`librarydb\` inside it:\r
\r
\`\`\`java\r
String url = "jdbc:derby:librarydb";\r
\`\`\`\r
\r
An absolute path can identify a database elsewhere on the same machine:\r
\r
\`\`\`java\r
String url = "jdbc:derby:C:/data/librarydb";\r
\`\`\`\r
\r
The \`derby.system.home\` property is read when Derby starts. Set it before the first connection request. If it is omitted, Derby uses the Java process's current directory as its system directory.\r
\r
## Understand boot and connection ownership\r
\r
The first connection boots a database. Derby checks the database and performs recovery when needed. A later connection in the same Derby system can connect to an already booted database.\r
\r
Derby uses a lock file named \`db.lck\` to prevent another Derby instance from booting a database that is already in use. Do not delete this file to try to force a database open. Close every connection and perform a clean shutdown before moving or restoring database files.\r
\r
An embedded database can have several \`Connection\` objects inside its owning application. Use a separate connection for each independent unit of work. Keep transaction boundaries explicit when a task changes multiple rows, as described in chapter 9.\r
\r
## Shut down a database cleanly\r
\r
Closing a \`Connection\` releases that connection's JDBC resources. It does not shut down the Derby engine. When the application owns the embedded engine, close all statements, result sets, and connections before requesting a shutdown.\r
\r
Shut down just \`librarydb\` when other databases in the same Derby system should stay open:\r
\r
\`\`\`java\r
DriverManager.getConnection("jdbc:derby:librarydb;shutdown=true");\r
\`\`\`\r
\r
Shut down the entire embedded Derby system when the application is finished with every database:\r
\r
\`\`\`java\r
DriverManager.getConnection("jdbc:derby:;shutdown=true");\r
\`\`\`\r
\r
Derby reports a successful shutdown with an \`SQLException\`. For a single database the SQL state is \`08006\`. For the full embedded system it is \`XJ015\`. Other SQL states indicate a shutdown problem, so do not treat every exception as success.\r
\r
\`\`\`java\r
static void shutdownLibrary() throws SQLException {\r
    try {\r
        DriverManager.getConnection("jdbc:derby:librarydb;shutdown=true");\r
        throw new SQLException("Derby did not report a successful shutdown.");\r
    } catch (SQLException error) {\r
        if (!"08006".equals(error.getSQLState())) {\r
            throw error;\r
        }\r
    }\r
}\r
\`\`\`\r
\r
The example expects the documented single-database shutdown state. If it receives a different state, it passes the error to the caller instead of hiding it.\r
\r
## Use an in-memory database for temporary work\r
\r
An in-memory database lives in memory instead of a database directory. It is useful for tests and temporary work where the data can be rebuilt:\r
\r
\`\`\`java\r
String url = "jdbc:derby:memory:library-test;create=true";\r
\`\`\`\r
\r
An in-memory database is not a replacement for a saved disk database. It is lost when its Derby engine or JVM shuts down. For the embedded driver, the \`drop=true\` URL attribute removes a named in-memory database when the test is finished:\r
\r
\`\`\`text\r
jdbc:derby:memory:library-test;drop=true\r
\`\`\`\r
\r
Derby signals a successful drop with SQL state \`08006\`, so handle that expected exception the same way as a database shutdown. \`drop=true\` applies to in-memory databases; Derby rejects it for a disk database.\r
\r
## Preserve the database files\r
\r
Derby manages the database directory and transaction log. Do not edit individual files, copy a live database directory, or use file deletion as a shutdown method. Use the backup and restore procedures covered in chapter 14. Keep the system directory in a location with permissions appropriate for the account running the application.\r
\r
## Common mistakes\r
\r
- Assuming closing the last connection shuts down the embedded engine.\r
- Using a relative database URL without knowing the process's system directory.\r
- Changing \`derby.system.home\` after Derby has already started.\r
- Starting another JVM against a database that is already booted.\r
- Deleting \`db.lck\` or internal database files to bypass a lock.\r
- Treating the expected shutdown \`SQLException\` as an ordinary failure without checking its SQL state.\r
- Expecting an in-memory database to keep data after the engine exits.\r
- Copying database files while Derby is still using them.\r
\r
## Practice\r
\r
1. Set \`derby.system.home\` to a dedicated local directory and create \`librarydb\` there.\r
2. Print the Java process's current directory and compare it with the chosen Derby system directory.\r
3. Close a connection, reopen the database, and confirm that closing a connection alone did not shut down Derby.\r
4. Shut down \`librarydb\`, then connect again and confirm that Derby boots it on the new connection.\r
5. Shut down the whole system and check that the application handles SQL state \`XJ015\` as the expected success signal.\r
6. Create an in-memory database, add a table, shut down its engine, and confirm that the database contents are gone.\r
7. Start two Java processes and observe that the second one cannot boot the same disk database while the first is using it. Stop the first cleanly before repeating the test.\r
\r
## Further reading\r
\r
- [Derby embedded basics](https://db.apache.org/derby/docs/10.17/devguide/cdevdvlp39409.html)\r
- [Derby system directory and database locks](https://db.apache.org/derby/docs/10.17/devguide/cdevdvlp27610.html)\r
- [Embedded shutdown example and SQL states](https://db.apache.org/derby/docs/10.17/getstart/rwwdactivity3.html)\r
- [shutdown=true attribute](https://db.apache.org/derby/docs/10.17/ref/rrefattrib16471.html)\r
- [Threading and connection modes](https://db.apache.org/derby/docs/10.17/devguide/rdevconcepts713.html)\r
- [Derby Developer's Guide](https://db.apache.org/derby/docs/10.17/devguide/derbydev.pdf)\r
\r
| [Previous: JDBC connections and prepared statements](10-jdbc-connections-and-statements.md) | [Notes index](../README.md) | [Next: Network Server and client connections](12-network-server-and-client.md) |\r
| --- | --- | --- |\r
`,"./chapters/12-network-server-and-client.md":`# 12. Network Server and client connections\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Embedded mode and database lifecycle](11-embedded-mode-and-lifecycle.md) | [Notes index](../README.md) | [Next: Metadata and schema changes](13-metadata-and-schema-changes.md) |\r
| --- | --- | --- |\r
\r
## When to use Network Server\r
\r
The Derby Network Server runs the database engine in one server process. Applications in other JVMs connect to it over the network with Derby's client JDBC driver.\r
\r
\`\`\`text\r
Java application A -- client driver --+\r
                                      |\r
Java application B -- client driver --> Derby Network Server -- database files\r
                                      |\r
Java command line -- client driver --+\r
\`\`\`\r
\r
Use this arrangement when multiple applications need concurrent access to one database. The server process owns the database files. Client applications send JDBC requests and do not open those files directly. Only one server process should own a given disk database at a time.\r
\r
The server listens on localhost by default and uses port \`1527\`. Localhost is useful for development on one machine. Chapter 15 covers authentication, authorization, and protected connections before remote clients are allowed.\r
\r
## Start the Network Server on Windows\r
\r
Set \`DERBY_HOME\` to the Derby installation folder. Start the server from a dedicated PowerShell window and leave it running while clients connect:\r
\r
\`\`\`powershell\r
$env:DERBY_HOME = 'C:\\tools\\db-derby-10.17.1.0-bin'\r
java -Dderby.system.home=C:/data/derby-system \`\r
     -jar "$env:DERBY_HOME/lib/derbyrun.jar" server start\r
\`\`\`\r
\r
The server command reports that it is ready to accept connections on port \`1527\`. Setting \`derby.system.home\` on the server process tells it where to find \`librarydb\`. If the property is omitted, the server uses its current directory as the Derby system directory.\r
\r
Check that the server is responding from a second PowerShell window:\r
\r
\`\`\`powershell\r
java -jar "$env:DERBY_HOME/lib/derbyrun.jar" server ping\r
\`\`\`\r
\r
Use the same Derby installation for the server and client libraries while learning. For another port or host binding, consult the server guide and apply the security requirements from chapter 15 before allowing connections outside localhost.\r
\r
## Connect from a Java application\r
\r
The Network Client driver uses \`derbyclient.jar\` and the shared Derby library. Add them and the application classes to the client classpath:\r
\r
\`\`\`powershell\r
$env:CLASSPATH = @(\r
    "$env:DERBY_HOME\\lib\\derbyclient.jar",\r
    "$env:DERBY_HOME\\lib\\derbyshared.jar",\r
    '.'\r
) -join ';'\r
\`\`\`\r
\r
Use the client URL format \`jdbc:derby://host:port/databaseName\`:\r
\r
\`\`\`java\r
String url = "jdbc:derby://localhost:1527/librarydb";\r
\r
try (Connection connection = DriverManager.getConnection(url);\r
     PreparedStatement statement = connection.prepareStatement(\r
             "SELECT BOOK_ID, TITLE FROM LIBRARY.BOOKS ORDER BY BOOK_ID");\r
     ResultSet results = statement.executeQuery()) {\r
    while (results.next()) {\r
        System.out.println(results.getInt("BOOK_ID") + ": "\r
                + results.getString("TITLE"));\r
    }\r
}\r
\`\`\`\r
\r
The \`Connection\`, \`PreparedStatement\`, and \`ResultSet\` APIs are the same as in embedded mode. The URL selects the client driver because it begins with \`jdbc:derby://\`.\r
\r
Add \`;create=true\` only when the client should ask the server to create a missing database:\r
\r
\`\`\`java\r
String url = "jdbc:derby://localhost:1527/librarydb;create=true";\r
\`\`\`\r
\r
For normal use, omit \`create=true\`. This makes a wrong database name fail clearly instead of creating a new empty database on the server.\r
\r
## Connect with ij\r
\r
The \`ij\` tool can connect through the Network Client too. Start it with the Derby tools available, then use the network URL:\r
\r
\`\`\`powershell\r
$env:CLASSPATH = @(\r
    "$env:DERBY_HOME\\lib\\derbyclient.jar",\r
    "$env:DERBY_HOME\\lib\\derbyshared.jar",\r
    "$env:DERBY_HOME\\lib\\derbytools.jar",\r
    '.'\r
) -join ';'\r
java org.apache.derby.tools.ij\r
\`\`\`\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby://localhost:1527/librarydb';\r
\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS\r
ORDER BY BOOK_ID;\r
\`\`\`\r
\r
The server process must be running before this connection is made. Close the \`ij\` connection with \`DISCONNECT\` when finished.\r
\r
## Stop the server cleanly\r
\r
Close client connections before stopping the server. In another PowerShell window on the server machine, run:\r
\r
\`\`\`powershell\r
java -jar "$env:DERBY_HOME/lib/derbyrun.jar" server shutdown\r
\`\`\`\r
\r
The shutdown command contacts the local Network Server and asks it to stop. Use the same port and host options used at startup if the server does not use the defaults. Authentication can require credentials for management commands. Keep the server window open until it confirms shutdown.\r
\r
## Understand which process owns each file\r
\r
| Component | Libraries | Responsibility |\r
| --- | --- | --- |\r
| Network Server process | \`derbynet.jar\`, \`derby.jar\`, \`derbyshared.jar\` | Opens and manages the database files. |\r
| Client application | \`derbyclient.jar\`, \`derbyshared.jar\` | Sends JDBC requests to the server. |\r
| \`ij\` client | \`derbytools.jar\` and \`derbyclient.jar\` | Provides a command prompt and connects to the server. |\r
\r
The client and server must agree on the database name and network address. The server's working directory or \`derby.system.home\` determines where a relative database name is resolved. A client working directory does not determine the server's database file path.\r
\r
## Common connection problems\r
\r
| Symptom | Check |\r
| --- | --- |\r
| Connection refused | Confirm the server is running and listening on the requested host and port. |\r
| Database not found | Check the server's \`derby.system.home\` and database name. |\r
| \`ClassNotFoundException\` for a client class | Add \`derbyclient.jar\` and \`derbyshared.jar\` to the client classpath. |\r
| Client attempts embedded mode | Confirm the URL starts with \`jdbc:derby://\`. |\r
| Client and server report different behavior | Confirm both use compatible Derby libraries from the same release family. |\r
| Server cannot shut down | Run the command on the server machine, use the correct port, and supply required credentials. |\r
\r
## Common mistakes\r
\r
- Starting the Network Server and assuming it is the same as an embedded connection.\r
- Adding \`derby.jar\` to a remote client when the client driver jar is required.\r
- Using \`jdbc:derby:librarydb\` from a remote client instead of the network URL.\r
- Starting the server from an unexpected system directory.\r
- Letting an application use \`create=true\` when the database should already exist.\r
- Ending the server process without using its shutdown command.\r
- Binding to a network-facing interface before configuring access controls and transport security.\r
- Starting multiple servers that try to own the same database files.\r
\r
## Practice\r
\r
1. Start the server and confirm that it is ready on localhost port \`1527\`.\r
2. Connect with \`ij\` through \`jdbc:derby://localhost:1527/librarydb\` and select the sample books.\r
3. Run the Java query from this chapter using the client classpath.\r
4. Open a second client process and read the same database through the server.\r
5. Change the URL to a database name that does not exist and observe the error without \`create=true\`.\r
6. Stop the server with its shutdown command, then ping it and confirm it is no longer available.\r
7. Check the server guide before choosing a non-default host or port.\r
\r
## Further reading\r
\r
- [Derby Network Client activity](https://db.apache.org/derby/docs/10.17/getstart/twwdactivity4.html)\r
- [Database connection URL formats](https://db.apache.org/derby/docs/10.17/tools/ctoolsijtools16011.html)\r
- [NetworkServerControl API](https://db.apache.org/derby/docs/10.17/publishedapi/org.apache.derby.server/org/apache/derby/drda/NetworkServerControl.html)\r
- [Network Server security guidance](https://db.apache.org/derby/docs/10.17/security/tseccsecure82556.html)\r
- [Derby manuals](https://db.apache.org/derby/manuals/)\r
\r
| [Previous: Embedded mode and database lifecycle](11-embedded-mode-and-lifecycle.md) | [Notes index](../README.md) | [Next: Metadata and schema changes](13-metadata-and-schema-changes.md) |\r
| --- | --- | --- |\r
`,"./chapters/13-metadata-and-schema-changes.md":`# 13. Metadata and schema changes\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Network Server and client connections](12-network-server-and-client.md) | [Notes index](../README.md) | [Next: Import, export, backup, and recovery](14-import-export-backup-and-recovery.md) |\r
| --- | --- | --- |\r
\r
## Read database metadata through JDBC\r
\r
Metadata describes the database structure: tables, columns, keys, types, and the columns returned by a query. \`DatabaseMetaData\` is useful when an application needs to inspect the database it has connected to.\r
\r
List tables and views in the \`LIBRARY\` schema:\r
\r
\`\`\`java\r
DatabaseMetaData metadata = connection.getMetaData();\r
String[] objectTypes = { "TABLE", "VIEW" };\r
\r
try (ResultSet tables = metadata.getTables(\r
        null, "LIBRARY", "%", objectTypes)) {\r
    while (tables.next()) {\r
        String schema = tables.getString("TABLE_SCHEM");\r
        String name = tables.getString("TABLE_NAME");\r
        String type = tables.getString("TABLE_TYPE");\r
        System.out.println(schema + "." + name + " (" + type + ")");\r
    }\r
}\r
\`\`\`\r
\r
Derby does not use catalogs, so pass \`null\` for the catalog argument. The schema and table arguments are patterns. \`%\` matches any number of characters, and \`_\` matches one character. Unquoted Derby names are stored in uppercase, so \`LIBRARY\` and \`BOOKS\` are the usual values for this sample schema.\r
\r
List the columns of \`LIBRARY.BOOKS\`:\r
\r
\`\`\`java\r
try (ResultSet columns = metadata.getColumns(\r
        null, "LIBRARY", "BOOKS", "%")) {\r
    while (columns.next()) {\r
        System.out.println(\r
                columns.getString("COLUMN_NAME") + " | "\r
                        + columns.getString("TYPE_NAME") + " | nullable="\r
                        + columns.getInt("NULLABLE"));\r
    }\r
}\r
\`\`\`\r
\r
The metadata result includes details such as column size, nullability, default value, and whether a column is generated. Use the method documentation for the full list of result columns.\r
\r
## Inspect keys and query result columns\r
\r
\`DatabaseMetaData\` can report the primary key and foreign keys declared on a table:\r
\r
\`\`\`java\r
try (ResultSet keys = metadata.getPrimaryKeys(\r
        null, "LIBRARY", "BOOKS")) {\r
    while (keys.next()) {\r
        System.out.println(\r
                keys.getString("COLUMN_NAME") + " is part of "\r
                        + keys.getString("PK_NAME"));\r
    }\r
}\r
\r
try (ResultSet references = metadata.getImportedKeys(\r
        null, "LIBRARY", "LOANS")) {\r
    while (references.next()) {\r
        System.out.println(\r
                references.getString("FKCOLUMN_NAME") + " references "\r
                        + references.getString("PKTABLE_SCHEM") + "."\r
                        + references.getString("PKTABLE_NAME") + "."\r
                        + references.getString("PKCOLUMN_NAME"));\r
    }\r
}\r
\`\`\`\r
\r
Use \`ResultSetMetaData\` when the query's result columns are not known until runtime:\r
\r
\`\`\`java\r
try (PreparedStatement statement = connection.prepareStatement(\r
        "SELECT BOOK_ID, TITLE, PUBLISHED_YEAR "\r
                + "FROM LIBRARY.BOOKS");\r
     ResultSet results = statement.executeQuery()) {\r
\r
    ResultSetMetaData resultInfo = results.getMetaData();\r
    for (int position = 1;\r
         position <= resultInfo.getColumnCount();\r
         position++) {\r
        System.out.println(\r
                resultInfo.getColumnLabel(position) + " | "\r
                        + resultInfo.getColumnTypeName(position));\r
    }\r
}\r
\`\`\`\r
\r
The column index starts at \`1\`, just like a prepared statement's parameter index. Prefer column labels when reading result values by name.\r
\r
## Query Derby's system catalogs\r
\r
Derby stores database structure in system tables in the \`SYS\` schema. You can query them while learning how the catalog is organized:\r
\r
\`\`\`sql\r
SELECT s.SCHEMANAME, t.TABLENAME\r
FROM SYS.SYSTABLES AS t\r
INNER JOIN SYS.SYSSCHEMAS AS s\r
    ON s.SCHEMAID = t.SCHEMAID\r
WHERE s.SCHEMANAME = 'LIBRARY'\r
ORDER BY t.TABLENAME;\r
\`\`\`\r
\r
System catalogs are owned by Derby. Query them only for inspection; do not insert, update, or delete their rows. For application code, prefer \`DatabaseMetaData\`, which exposes structure through the JDBC API.\r
\r
## Add a column safely\r
\r
\`ALTER TABLE\` changes an existing table. This adds a required \`CATEGORY\` column to the sample books table:\r
\r
\`\`\`sql\r
ALTER TABLE LIBRARY.BOOKS\r
ADD COLUMN CATEGORY VARCHAR(40) DEFAULT 'general' NOT NULL;\r
\`\`\`\r
\r
Derby adds a new column at the end of the row. The default gives existing rows a value, so the new \`NOT NULL\` requirement can be satisfied. An added \`NOT NULL\` column needs a default when the table already contains rows.\r
\r
Add a constraint after checking that existing data satisfies it:\r
\r
\`\`\`sql\r
ALTER TABLE LIBRARY.BOOKS\r
ADD CONSTRAINT BOOKS_YEAR_CK\r
CHECK (PUBLISHED_YEAR IS NULL OR PUBLISHED_YEAR >= 1000);\r
\`\`\`\r
\r
Derby validates existing rows when a foreign key or check constraint is added. If any existing row violates the new rule, the statement fails and the constraint is not added.\r
\r
## Rename or remove a column\r
\r
Use \`RENAME COLUMN\` to give a column a new name:\r
\r
\`\`\`sql\r
RENAME COLUMN LIBRARY.BOOKS.CATEGORY TO SECTION;\r
\`\`\`\r
\r
Renaming a column can fail when a view, trigger, check rule, or generated column depends on it. Close any open cursor that reads the column before applying the rename.\r
\r
Remove a column with \`RESTRICT\` when you want Derby to reject the change if a dependent object would become invalid:\r
\r
\`\`\`sql\r
ALTER TABLE LIBRARY.BOOKS\r
DROP COLUMN SECTION RESTRICT;\r
\`\`\`\r
\r
Avoid \`CASCADE\` for routine practice because it can remove dependent objects. Review the affected views, constraints, indexes, and application queries before dropping a column.\r
\r
## Plan a schema migration\r
\r
Treat a schema change as a migration with a clear before and after state:\r
\r
1. Inspect the current tables, columns, constraints, and data.\r
2. Back up the database before a change that could remove or reinterpret data.\r
3. Test the migration against a copy with representative rows.\r
4. Apply the DDL once, then verify the new metadata and sample queries.\r
5. Update application code that reads or writes the changed columns.\r
\r
Derby supports adding and dropping columns, adding and dropping constraints, widening certain character and large-object columns, and changing selected defaults, nullability, and identity properties. Its \`ALTER COLUMN\` syntax does not allow arbitrary type changes. For a type change that Derby does not support directly, create a replacement column, copy and validate the data, and then plan the old-column removal as a separate migration.\r
\r
An existing view that uses \`SELECT *\` does not automatically gain a newly added base-table column. Drop and recreate that view if the new column should appear in its results. Views with explicit column lists keep their declared shape.\r
\r
## Common mistakes\r
\r
- Passing a catalog name instead of \`null\` to Derby metadata methods.\r
- Using lowercase patterns when metadata expects the stored uppercase names.\r
- Editing a \`SYS\` catalog table directly.\r
- Adding a \`NOT NULL\` column to populated data without a default.\r
- Adding a constraint before checking whether existing rows meet it.\r
- Assuming Derby can alter any column to any other data type in one statement.\r
- Dropping a column without checking dependent views, keys, indexes, and application code.\r
- Assuming a view with \`SELECT *\` updates its result columns when the base table changes.\r
- Running a one-time migration more than once without checking its current schema state.\r
\r
## Practice\r
\r
1. List the tables and views in the \`LIBRARY\` schema through \`DatabaseMetaData\`.\r
2. List every column in \`LIBRARY.BOOKS\`, including its type and nullability.\r
3. Read the primary key columns for \`LIBRARY.BOOKS\` and the imported keys for \`LIBRARY.LOANS\`.\r
4. Query \`SYS.SYSTABLES\` and \`SYS.SYSSCHEMAS\` to list the sample tables, then describe why application code should use JDBC metadata.\r
5. Add a category column with a default and verify its value for existing rows.\r
6. Add a check constraint, attempt to insert a row that violates it, then rename and remove the category column with the shown statements.\r
7. Create a view with \`SELECT *\`, add a column to its base table, and inspect why the view result does not gain that column automatically.\r
\r
## Further reading\r
\r
- [DatabaseMetaData interface](https://db.apache.org/derby/docs/10.17/ref/rrefjdbc15905.html)\r
- [ALTER TABLE statement](https://db.apache.org/derby/docs/10.17/ref/rrefsqlj81859.html)\r
- [RENAME COLUMN statement](https://db.apache.org/derby/docs/10.17/ref/rrefsqljrenamecolumnstatement.html)\r
- [Derby system tables](https://db.apache.org/derby/docs/10.17/ref/toc.html)\r
- [Derby Reference Manual](https://db.apache.org/derby/docs/10.17/ref/refderby.pdf)\r
\r
| [Previous: Network Server and client connections](12-network-server-and-client.md) | [Notes index](../README.md) | [Next: Import, export, backup, and recovery](14-import-export-backup-and-recovery.md) |\r
| --- | --- | --- |\r
`,"./chapters/14-import-export-backup-and-recovery.md":`# 14. Import, export, backup, and recovery\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Metadata and schema changes](13-metadata-and-schema-changes.md) | [Notes index](../README.md) | [Next: Authentication, authorization, and security](15-authentication-authorization-and-security.md) |\r
| --- | --- | --- |\r
\r
## Move table data with delimited files\r
\r
Import and export procedures move rows between a Derby table and a delimited text file. They are useful for small migrations, test data, and exchanging data with other tools. They do not copy a database's table definitions, indexes, constraints, users, or complete transaction history. Use a database backup when you need a full database copy.\r
\r
Export all rows from the sample books table:\r
\r
\`\`\`sql\r
CALL SYSCS_UTIL.SYSCS_EXPORT_TABLE(\r
    'LIBRARY',\r
    'BOOKS',\r
    'C:/derby-transfer/books.del',\r
    ',',\r
    '"',\r
    'UTF-8'\r
);\r
\`\`\`\r
\r
The six arguments are schema, table, output file, column delimiter, character delimiter, and character set. Derby uses commas and double quotes when the delimiter arguments are \`NULL\`. The output file must not already exist. Use a new file name for each export, or move an older file out of the way first. With the Network Server, the path belongs to the server machine, because the server reads and writes the file.\r
\r
The sample file has one row per book and no heading row, for example:\r
\r
\`\`\`text\r
1,"Clean Code",2008,TRUE\r
2,"The Pragmatic Programmer",1999,FALSE\r
\`\`\`\r
\r
The fields must match the table's column order and types. Text containing a comma is enclosed by the character delimiter so it stays in one field. Choose a character set supported by the Java runtime and use the same one when importing the file.\r
\r
## Import into a matching table\r
\r
An import fills an existing table. Create a separate empty table for the first practice run so that imported primary keys do not collide with rows already in \`LIBRARY.BOOKS\`:\r
\r
\`\`\`sql\r
CREATE TABLE LIBRARY.BOOKS_IMPORT (\r
    BOOK_ID INTEGER NOT NULL PRIMARY KEY,\r
    TITLE VARCHAR(120) NOT NULL,\r
    PUBLISHED_YEAR INTEGER,\r
    AVAILABLE BOOLEAN DEFAULT TRUE NOT NULL\r
);\r
\`\`\`\r
\r
Import every field from the exported file. The final argument \`0\` selects insert mode, which keeps existing rows and adds imported rows:\r
\r
\`\`\`sql\r
CALL SYSCS_UTIL.SYSCS_IMPORT_TABLE(\r
    'LIBRARY',\r
    'BOOKS_IMPORT',\r
    'C:/derby-transfer/books.del',\r
    ',',\r
    '"',\r
    'UTF-8',\r
    0\r
);\r
\r
SELECT BOOK_ID, TITLE, PUBLISHED_YEAR, AVAILABLE\r
FROM LIBRARY.BOOKS_IMPORT\r
ORDER BY BOOK_ID;\r
\`\`\`\r
\r
The table column count, order, and data types must agree with the file. Constraints still apply during import, so bad types, duplicate keys, nulls in required columns, or invalid references can make the operation fail. Importing into a table with foreign keys may require loading referenced rows first.\r
\r
The final import argument controls what happens to existing rows. \`0\` means insert the imported rows. Any non-zero value means replace: Derby removes the table's existing rows, then loads the file. Replace does not change the table definition or its indexes. Use it only when deleting every current row is intended.\r
\r
Use \`SYSCS_UTIL.SYSCS_IMPORT_DATA\` when the file has extra fields or the target table needs only selected fields. Its argument list includes the target column names and one-based input field positions:\r
\r
For this example, create a separate target table with only the two columns to be loaded:\r
\r
\`\`\`sql\r
CREATE TABLE LIBRARY.BOOKS_IMPORT_MIN (\r
    BOOK_ID INTEGER NOT NULL PRIMARY KEY,\r
    TITLE VARCHAR(120) NOT NULL\r
);\r
\`\`\`\r
\r
\`\`\`sql\r
CALL SYSCS_UTIL.SYSCS_IMPORT_DATA(\r
    'LIBRARY',\r
    'BOOKS_IMPORT_MIN',\r
    'BOOK_ID,TITLE',\r
    '1,2',\r
    'C:/derby-transfer/books-with-extra-fields.del',\r
    ',',\r
    '"',\r
    'UTF-8',\r
    0\r
);\r
\`\`\`\r
\r
When importing a subset, make sure omitted target columns can be filled by defaults or allow \`NULL\`; otherwise the insert cannot satisfy the table definition.\r
\r
## Import and export transaction behavior\r
\r
Derby commits when an import or export procedure succeeds and rolls back when it fails. Complete any pending transaction before calling one of these procedures so the procedure does not commit unrelated work or wait on locks held by the current connection:\r
\r
\`\`\`sql\r
COMMIT;\r
CALL SYSCS_UTIL.SYSCS_EXPORT_TABLE(\r
    'LIBRARY', 'BOOKS',\r
    'C:/derby-transfer/books-next.del', ',', '"', 'UTF-8'\r
);\r
\`\`\`\r
\r
With authentication and SQL authorization enabled, the caller also needs permission to run the procedure and the relevant \`SELECT\` or \`INSERT\` permission on the table. Large objects such as \`BLOB\` and \`CLOB\` use Derby's LOB import and export procedures, which store the LOB content in external files. The regular table procedure is not a substitute for those LOB procedures.\r
\r
## Make an online full backup\r
\r
An online backup copies the whole database while Derby is running. Use an absolute path so its meaning does not depend on the server process's working directory:\r
\r
\`\`\`sql\r
CALL SYSCS_UTIL.SYSCS_BACKUP_DATABASE(\r
    'C:/derby-backups/librarydb-2026-10-03'\r
);\r
\`\`\`\r
\r
The argument is the destination directory for this backup copy. Back up to a new location for each retained copy. The procedure brings the database to a consistent state for copying; writes are blocked while the copy runs, while normal reads can continue. Give the Derby process permission to create and write the destination directory. If the database runs on another machine, this path is on that machine.\r
\r
A backup should be separate from the live database directory. Protect it with the same care as the database, keep more than one recovery point when required, and copy important backups to another storage location. A successful backup call is not proof that your recovery steps work, so periodically restore a copy in an isolated test location and check the data.\r
\r
## Make an offline backup\r
\r
For a small local database, an offline file copy is also possible:\r
\r
1. Shut down the database cleanly and confirm no Derby process still has it open.\r
2. Copy the entire database directory, including its log and service subdirectories.\r
3. Store the copy in a separate backup location.\r
4. Keep the original database directory untouched until the copy is complete.\r
\r
Do not copy a live database directory with ordinary file-copy tools. A partial copy can capture data files and logs from different points in time. Use the online backup procedure while the database is running.\r
\r
## Restore a full backup\r
\r
The \`restoreFrom\` connection attribute boots a database from a full backup copy. Stop applications that use the database first. Restoring over a database with the same name under \`derby.system.home\` replaces that database's full contents, so rehearse this with a disposable database or a separate Derby home before using it on important data.\r
\r
\`\`\`text\r
CONNECT 'jdbc:derby:librarydb;restoreFrom=C:/derby-backups/librarydb-2026-10-03';\r
\`\`\`\r
\r
This is a boot-time connection attribute, not a normal SQL statement. Do not combine \`restoreFrom\` with \`create\`, \`createFrom\`, or \`rollForwardRecoveryFrom\`. Confirm the chosen backup path and target database name before connecting.\r
\r
## Understand roll-forward recovery\r
\r
A full backup restores the database to the point when that copy was made. Roll-forward recovery can replay later transactions, but it requires a full backup plus every needed archived log and the active log. Log archiving must have been enabled before the failure, and all required log files must still be available. It recovers the whole database, not a single table.\r
\r
The boot-time connection attribute is \`rollForwardRecoveryFrom\`:\r
\r
\`\`\`text\r
CONNECT 'jdbc:derby:librarydb;rollForwardRecoveryFrom=C:/derby-backups/librarydb-2026-10-03';\r
\`\`\`\r
\r
Use this only with a recovery plan tested against a copy. If log archiving was not enabled or required logs are missing, a full backup restore may be the available recovery point. Do not delete archived logs until the backup and recovery policy says they are no longer needed.\r
\r
## Common mistakes\r
\r
- Exporting to a file that already exists.\r
- Using a client machine path when the Network Server needs a server-side path.\r
- Importing rows into a table whose columns or constraints do not match the file.\r
- Choosing replace mode when the table's existing rows must be kept.\r
- Calling import or export with unrelated work still pending in the transaction.\r
- Copying a live database directory with normal file tools.\r
- Restoring over the wrong database name or directory.\r
- Expecting roll-forward recovery to work without archived and active log files.\r
- Treating an exported delimited file as a full database backup.\r
\r
## Practice\r
\r
1. Export \`LIBRARY.BOOKS\` to a new delimited file and inspect the field order and quoting.\r
2. Create \`LIBRARY.BOOKS_IMPORT\` with the matching columns and import the file in insert mode.\r
3. Query both tables and compare row counts and values.\r
4. Try importing into a table containing a duplicate primary key and observe the error.\r
5. Create a new backup directory with the online backup procedure, then restore it under an isolated Derby home.\r
6. Write down which files and configuration a future roll-forward recovery would require, and explain why a plain export file is insufficient.\r
\r
## Further reading\r
\r
- [SYSCS_UTIL.SYSCS_EXPORT_TABLE](https://db.apache.org/derby/docs/10.17/ref/rrefexportproc.html)\r
- [SYSCS_UTIL.SYSCS_IMPORT_TABLE](https://db.apache.org/derby/docs/10.17/ref/rrefimportproc.html)\r
- [SYSCS_UTIL.SYSCS_IMPORT_DATA](https://db.apache.org/derby/docs/10.17/ref/rrefimportdataproc.html)\r
- [SYSCS_UTIL.SYSCS_BACKUP_DATABASE](https://db.apache.org/derby/docs/10.17/ref/rrefbackupdbproc.html)\r
- [restoreFrom connection attribute](https://db.apache.org/derby/docs/10.17/ref/rrefrestorefrom.html)\r
- [rollForwardRecoveryFrom connection attribute](https://db.apache.org/derby/docs/10.17/ref/rrefrollforward.html)\r
- [Backing up and restoring databases](https://db.apache.org/derby/docs/10.17/adminguide/cadminhubbkup98797.html)\r
\r
| [Previous: Metadata and schema changes](13-metadata-and-schema-changes.md) | [Notes index](../README.md) | [Next: Authentication, authorization, and security](15-authentication-authorization-and-security.md) |\r
| --- | --- | --- |\r
`,"./chapters/15-authentication-authorization-and-security.md":`# 15. Authentication, authorization, and security\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Import, export, backup, and recovery](14-import-export-backup-and-recovery.md) | [Notes index](../README.md) | [Next: Testing and troubleshooting](16-testing-and-troubleshooting.md) |\r
| --- | --- | --- |\r
\r
## Authentication and authorization solve different problems\r
\r
Authentication checks who is connecting. Authorization checks what that user is allowed to do after connecting. A password can identify a valid user, but it does not decide whether that user may read \`LIBRARY.BOOKS\`, add a row, or change the schema.\r
\r
Derby supports NATIVE authentication, LDAP authentication, and user-defined authentication. NATIVE authentication stores users and encrypted passwords in a Derby database. The examples here use NATIVE authentication because it is available without configuring an external directory service.\r
\r
## Enable NATIVE authentication\r
\r
For a new local practice database, connect once as the account that will own the database. Create the database as \`DBOWNER\`, then store credentials for the owner first, followed by the application users:\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby:securedb;create=true;user=DBOWNER';\r
\r
CALL SYSCS_UTIL.SYSCS_CREATE_USER(\r
    'DBOWNER', 'replace-with-a-strong-owner-password'\r
);\r
CALL SYSCS_UTIL.SYSCS_CREATE_USER(\r
    'APP_READER', 'replace-with-a-strong-reader-password'\r
);\r
CALL SYSCS_UTIL.SYSCS_CREATE_USER(\r
    'APP_WRITER', 'replace-with-a-strong-writer-password'\r
);\r
\`\`\`\r
\r
The password strings above are placeholders. Replace them with unique secrets and do not put real passwords in source control, command history, or shared notes. The first user added through \`SYSCS_CREATE_USER\` must be the database owner. After the users are created, shut down and reboot the database. NATIVE authentication takes effect on the next boot.\r
\r
\`\`\`text\r
CONNECT 'jdbc:derby:securedb;shutdown=true';\r
\`\`\`\r
\r
For an embedded database, Derby reports that the database shut down as an exception from the shutdown connection. That response is expected. On the next connection, provide a valid user and password. Once NATIVE authentication has been enabled this way, it cannot be turned off for that database.\r
\r
NATIVE authentication also enables Derby's fine-grained SQL authorization. If another authentication provider is used, enable SQL authorization separately for the database before using \`GRANT\` and \`REVOKE\`:\r
\r
\`\`\`sql\r
CALL SYSCS_UTIL.SYSCS_SET_DATABASE_PROPERTY(\r
    'derby.database.sqlAuthorization', 'true'\r
);\r
\`\`\`\r
\r
Treat this as a permanent security decision. Derby does not allow the SQL authorization property to be turned back off after it has been enabled.\r
\r
## Connect with a database identity\r
\r
In \`ij\`, provide credentials as connection attributes:\r
\r
\`\`\`text\r
CONNECT 'jdbc:derby:securedb;user=DBOWNER;password=replace-with-owner-password';\r
\`\`\`\r
\r
In JDBC, pass the login separately from the URL. Load the values from a protected configuration source supplied by the deployment environment:\r
\r
\`\`\`java\r
Properties credentials = new Properties();\r
credentials.setProperty("user", System.getenv("DERBY_USER"));\r
credentials.setProperty("password", System.getenv("DERBY_PASSWORD"));\r
\r
try (Connection connection = DriverManager.getConnection(\r
        "jdbc:derby:securedb", credentials)) {\r
    System.out.println("Connected as " + connection.getMetaData().getUserName());\r
}\r
\`\`\`\r
\r
For a Network Server connection, the URL names the server and database, for example \`jdbc:derby://localhost:1527/securedb\`. Keep credentials outside the URL when application configuration allows it. Never print a password or include it in an exception message that may be logged.\r
\r
## Give users only the needed permissions\r
\r
After authentication is enabled, use roles to group privileges by job. The database owner can create roles and grant them to users. This example makes a read-only role for the library's books table:\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby:securedb;user=DBOWNER;password=replace-with-owner-password';\r
\r
CREATE ROLE library_reader;\r
GRANT SELECT ON TABLE LIBRARY.BOOKS TO library_reader;\r
GRANT library_reader TO APP_READER;\r
\`\`\`\r
\r
The reader connects with its own identity, then activates the role for the session:\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby:securedb;user=APP_READER;password=replace-with-reader-password';\r
SET ROLE library_reader;\r
\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS;\r
\`\`\`\r
\r
The role cannot insert or delete rows because it has only \`SELECT\`. A writer can receive only the changes it needs:\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby:securedb;user=DBOWNER;password=replace-with-owner-password';\r
\r
CREATE ROLE library_writer;\r
GRANT SELECT, INSERT, UPDATE ON TABLE LIBRARY.BOOKS TO library_writer;\r
GRANT library_writer TO APP_WRITER;\r
\`\`\`\r
\r
Avoid \`ALL PRIVILEGES\` and broad grants to \`PUBLIC\` when a smaller permission set is enough. \`PUBLIC\` applies to all current and future users. A user with no privilege on an application table should not be able to query or modify it.\r
\r
Remove a permission when a role no longer needs it:\r
\r
\`\`\`sql\r
REVOKE INSERT ON TABLE LIBRARY.BOOKS FROM library_writer;\r
\`\`\`\r
\r
The object owner or database owner can grant privileges on a table. The database owner controls grants of roles to users. Derby returns an authorization error when a user attempts an operation that their identity and active roles do not permit.\r
\r
## Protect the Network Server\r
\r
Keep the Network Server bound to localhost unless remote access is required. If clients connect across a network, restrict access with a firewall and protect the connection with SSL/TLS. Authentication alone does not encrypt the data sent between a client and server. Derby documents other network authentication mechanisms, but they do not replace transport encryption.\r
\r
Protect the database directory, backup directories, and \`derby.properties\` with operating system permissions. Limit who can read or change them, and do not expose the database files through a public file share. A user with operating system access to those files may bypass application-level controls or damage the data.\r
\r
## Common mistakes\r
\r
- Treating a valid login as permission to read or change every table.\r
- Creating another NATIVE user before adding credentials for the database owner.\r
- Forgetting to shut down and reboot after initially adding NATIVE credentials.\r
- Assuming NATIVE authentication can be disabled after it has been enabled.\r
- Turning on SQL authorization without recording that the setting cannot be reversed.\r
- Giving an application account database-owner credentials.\r
- Granting \`ALL PRIVILEGES\` or \`PUBLIC\` when a limited role is sufficient.\r
- Putting passwords in source files, public repositories, URLs, or application logs.\r
- Exposing a Network Server to a network without firewall rules and SSL/TLS.\r
- Assuming network authentication encrypts query results and other traffic.\r
\r
## Practice\r
\r
1. Create an isolated database and enable NATIVE authentication with distinct owner, reader, and writer accounts.\r
2. Shut down and reconnect with the owner password, then verify that a connection without a password fails.\r
3. Grant \`SELECT\` on \`LIBRARY.BOOKS\` to a reader role and check that an insert is rejected.\r
4. Grant \`SELECT\`, \`INSERT\`, and \`UPDATE\` to a writer role, then confirm that delete remains unavailable.\r
5. Revoke one permission and test the operation again in a new session.\r
6. Review where your application reads its database credentials and confirm that none are committed or written to logs.\r
7. Review the Network Server host, firewall rules, and TLS configuration before allowing remote clients.\r
\r
## Further reading\r
\r
- [Derby Security Guide](https://db.apache.org/derby/docs/10.17/security/)\r
- [Configuring NATIVE authentication](https://db.apache.org/derby/docs/10.17/security/cseccsecurenativeauth.html)\r
- [Configuring fine-grained user authorization](https://db.apache.org/derby/docs/10.17/security/csecauthorfine.html)\r
- [NATIVE authentication and SQL authorization example](https://db.apache.org/derby/docs/10.17/security/rseccsecurenativeauthex.html)\r
- [SYSCS_UTIL.SYSCS_CREATE_USER](https://db.apache.org/derby/docs/10.17/ref/rrefnativecreateuserproc.html)\r
- [GRANT statement](https://db.apache.org/derby/docs/10.17/ref/rrefsqljgrant.html)\r
- [REVOKE statement](https://db.apache.org/derby/docs/10.17/ref/rrefsqljrevoke.html)\r
- [Network Server security](https://db.apache.org/derby/docs/10.17/security/tseccsecure82556.html)\r
\r
| [Previous: Import, export, backup, and recovery](14-import-export-backup-and-recovery.md) | [Notes index](../README.md) | [Next: Testing and troubleshooting](16-testing-and-troubleshooting.md) |\r
| --- | --- | --- |\r
`,"./chapters/16-testing-and-troubleshooting.md":`# 16. Testing and troubleshooting\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Authentication, authorization, and security](15-authentication-authorization-and-security.md) | [Notes index](../README.md) | [Next: Performance and operating considerations](17-performance-and-operations.md) |\r
| --- | --- | --- |\r
\r
## Test against an isolated database\r
\r
Database tests should not depend on your personal working database or a production database. Use a separate database with a known schema and predictable rows. Give each run a clean database location, then remove it only after Derby has shut it down. This makes failures repeatable and prevents a test from changing real data.\r
\r
Create a small test database with \`ij\`:\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby:library_test;create=true';\r
\r
CREATE TABLE APP.TEST_BOOKS (\r
    BOOK_ID INTEGER NOT NULL PRIMARY KEY,\r
    TITLE VARCHAR(120) NOT NULL\r
);\r
\r
INSERT INTO APP.TEST_BOOKS (BOOK_ID, TITLE)\r
VALUES (1, 'Test Book');\r
\r
SELECT BOOK_ID, TITLE\r
FROM APP.TEST_BOOKS;\r
\`\`\`\r
\r
An integration test can open this test database through JDBC and verify results using the same driver and SQL that the application uses. Keep setup data small and explicit. If one test needs a different starting state, create that state in its own setup code or roll back its transaction at the end.\r
\r
Use a prepared statement for values and assert the result:\r
\r
\`\`\`java\r
String sql = "SELECT TITLE FROM APP.TEST_BOOKS WHERE BOOK_ID = ?";\r
\r
try (PreparedStatement statement = connection.prepareStatement(sql)) {\r
    statement.setInt(1, 1);\r
\r
    try (ResultSet results = statement.executeQuery()) {\r
        if (!results.next()) {\r
            throw new AssertionError("Expected one test book");\r
        }\r
\r
        String title = results.getString("TITLE");\r
        if (!"Test Book".equals(title)) {\r
            throw new AssertionError("Unexpected title: " + title);\r
        }\r
        if (results.next()) {\r
            throw new AssertionError("Expected exactly one matching row");\r
        }\r
    }\r
}\r
\`\`\`\r
\r
This check does not rely on Java's optional \`assert\` keyword, which is disabled unless the JVM starts with \`-ea\`. Close statements, result sets, and connections with try-with-resources so a failed check does not leave resources open.\r
\r
## Test constraints and transaction behavior\r
\r
Test both accepted and rejected data. A primary key should accept a unique key and reject a duplicate. A \`NOT NULL\` column should reject a missing value. A foreign key should reject a reference to a row that does not exist. Run these checks only in the disposable test database.\r
\r
For example, after inserting \`BOOK_ID = 1\` in \`APP.TEST_BOOKS\`, this insert should fail with an integrity constraint error because that key already exists:\r
\r
\`\`\`sql\r
INSERT INTO APP.TEST_BOOKS (BOOK_ID, TITLE)\r
VALUES (1, 'Duplicate key');\r
\`\`\`\r
\r
If the test must preserve existing rows, run the test work in a transaction and roll it back:\r
\r
\`\`\`java\r
connection.setAutoCommit(false);\r
try {\r
    // Perform test inserts and updates here.\r
    connection.rollback();\r
} catch (SQLException exception) {\r
    connection.rollback();\r
    throw exception;\r
} finally {\r
    connection.setAutoCommit(true);\r
}\r
\`\`\`\r
\r
Do not use rollback as a substitute for an isolated test database. DDL and stored procedures can have transaction behavior that differs from ordinary inserts and updates, and a failed test must never leave shared data uncertain.\r
\r
## Read Derby exceptions in JDBC\r
\r
When JDBC reports an error, inspect the SQLState and message before changing code. Derby can return more than one \`SQLException\` for a failure. The first exception is often the most severe, while a later exception may contain a more specific cause. Walk the exception chain:\r
\r
\`\`\`java\r
try {\r
    // Run a statement that uses the database.\r
} catch (SQLException exception) {\r
    for (SQLException current = exception;\r
         current != null;\r
         current = current.getNextException()) {\r
        System.err.printf(\r
                "SQLState=%s, code=%d, message=%s%n",\r
                current.getSQLState(),\r
                current.getErrorCode(),\r
                current.getMessage());\r
    }\r
}\r
\`\`\`\r
\r
Use SQLState to classify a failure, such as a connection problem, invalid SQL, a constraint violation, or a transaction rollback. Read the full message and chain as well. Derby's numeric error code represents severity and is not a unique error identifier, so application logic should not depend on it.\r
\r
If Derby returns a \`SQLWarning\`, inspect it too. A warning does not necessarily mean the statement failed. For example, Derby can return a warning when \`create=true\` connects to a database that already exists.\r
\r
## Check a table after a suspected storage issue\r
\r
\`SYSCS_UTIL.SYSCS_CHECK_TABLE\` checks a table's internal consistency and verifies that its indexes agree with the base table. Run it when investigating a suspected storage problem or validating a backup copy. It can take a long time on a large table, so it is not a routine check to run after every query.\r
\r
\`\`\`sql\r
VALUES SYSCS_UTIL.SYSCS_CHECK_TABLE('LIBRARY', 'BOOKS');\r
\`\`\`\r
\r
A non-zero result means the table is consistent. An inconsistency raises an exception. After a backup, keep the previous known-good copy until the new copy has been checked and a restore test succeeds.\r
\r
## Inspect a query plan\r
\r
When a query is slower than expected, inspect Derby's runtime statistics in the same connection. Enable collection, run the query, read the plan, then turn collection off:\r
\r
\`\`\`sql\r
CALL SYSCS_UTIL.SYSCS_SET_RUNTIMESTATISTICS(1);\r
\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR >= 2000;\r
\r
VALUES SYSCS_UTIL.SYSCS_GET_RUNTIMESTATISTICS();\r
\r
CALL SYSCS_UTIL.SYSCS_SET_RUNTIMESTATISTICS(0);\r
\`\`\`\r
\r
The result shows the execution plan and statistics such as the rows read and returned. In \`ij\`, increase the display width before reading the result so long lines are not cut off:\r
\r
\`\`\`text\r
MaximumDisplayWidth 5000\r
\`\`\`\r
\r
Statistics are connection-specific. Enable timing only when you need execution timing, because timing is off by default:\r
\r
\`\`\`sql\r
CALL SYSCS_UTIL.SYSCS_SET_RUNTIMESTATISTICS(1);\r
CALL SYSCS_UTIL.SYSCS_SET_STATISTICS_TIMING(1);\r
\`\`\`\r
\r
Compare plans after changing a query or index. Do not assume that adding an index always improves a query; inspect the actual predicates, row counts, and plan.\r
\r
## Use the Derby tools to narrow down a problem\r
\r
The Derby distribution includes tools for common checks:\r
\r
| Tool | Use |\r
| --- | --- |\r
| \`ij\` | Open a connection, run SQL, and execute a saved SQL script. |\r
| \`sysinfo\` | Check the Java environment and Derby libraries visible to the process. |\r
| \`dblook\` | Generate DDL from a database to review its schema. |\r
| \`NetworkServerControl\` | Start, stop, or inspect the Network Server. |\r
\r
Run \`sysinfo\` when a driver cannot load or different Derby versions may be on the classpath:\r
\r
\`\`\`text\r
java -jar "\${env:DERBY_HOME}/lib/derbyrun.jar" sysinfo\r
\`\`\`\r
\r
Use \`dblook\` to inspect the DDL for a local database:\r
\r
\`\`\`text\r
java -jar "\${env:DERBY_HOME}/lib/derbyrun.jar" dblook -d "jdbc:derby:librarydb"\r
\`\`\`\r
\r
\`dblook\` prints generated DDL to the console by default. Check the Derby Tools and Utilities Guide for its schema filters and output options. Avoid putting production passwords directly in shell history when connecting to an authenticated database.\r
\r
## Troubleshoot in a consistent order\r
\r
1. Read the complete exception chain, SQLState, and message.\r
2. Confirm the JDBC URL, database path, driver, and Java version.\r
3. Use \`sysinfo\` to check the libraries loaded by the failing process.\r
4. Confirm the database is booted and the expected schema and table exist in \`ij\`.\r
5. Check the current user and its table or role privileges if the error is an authorization failure.\r
6. Reproduce the error with the smallest SQL statement and the same connection mode.\r
7. Inspect runtime statistics only if the issue is query behavior or speed.\r
8. Back up the database before attempting a repair or changing stored data.\r
\r
For Network Server failures, verify that the server is running, the client uses the right host and port, the database name is correct, and firewall rules allow the connection. For lock waits or deadlocks, keep transactions short, access tables in a consistent order, and handle transaction rollback by starting a new transaction when appropriate.\r
\r
## Common mistakes\r
\r
- Running a test against the only copy of important data.\r
- Relying on \`assert\` while forgetting that it is disabled by default.\r
- Leaving a result set, statement, or connection open after a failed test.\r
- Looking only at the first SQL exception and missing the next exception in the chain.\r
- Treating Derby's error code as a unique identifier.\r
- Running a full table consistency check on a large database after every change.\r
- Collecting runtime statistics in one connection and reading them from another.\r
- Using \`dblook\` or \`ij\` from an old Derby installation on the classpath.\r
- Trying to repair database files before creating a safe backup.\r
\r
## Practice\r
\r
1. Create the \`library_test\` database and \`APP.TEST_BOOKS\` table with \`ij\`.\r
2. Run the JDBC result check and verify that an incorrect expected title makes it fail.\r
3. Try the duplicate-key insert and record the SQLState and full exception message.\r
4. Run \`sysinfo\` and confirm which Derby version and jar files are in use.\r
5. Generate the test database DDL with \`dblook\` and compare it with the statements you wrote.\r
6. Enable runtime statistics, run a filtered books query, and identify the scan or index access in the plan.\r
7. On a backup copy, run \`SYSCS_CHECK_TABLE\` for \`LIBRARY.BOOKS\` and record the returned value.\r
\r
## Further reading\r
\r
- [Working with Derby SQLExceptions](https://db.apache.org/derby/docs/10.17/devguide/cdevconcepts844813.html)\r
- [SQLException reference](https://db.apache.org/derby/docs/10.17/ref/rrefjdbc16643.html)\r
- [Derby tools and startup utilities](https://db.apache.org/derby/docs/10.17/getstart/cgsusingtoolsutils.html)\r
- [Running dblook](https://db.apache.org/derby/docs/10.17/getstart/tgsrunningdblook.html)\r
- [SYSCS_DIAG.ERROR_MESSAGES](https://db.apache.org/derby/docs/10.17/ref/rrefsyscsdiagerrormessages.html)\r
- [SYSCS_UTIL.SYSCS_CHECK_TABLE](https://db.apache.org/derby/docs/10.17/ref/rrefsyscschecktablefunc.html)\r
- [Runtime statistics in the Reference Manual](https://db.apache.org/derby/docs/10.17/ref/refderby.pdf)\r
- [Derby Tuning Guide](https://db.apache.org/derby/docs/10.17/tuning/)\r
\r
| [Previous: Authentication, authorization, and security](15-authentication-authorization-and-security.md) | [Notes index](../README.md) | [Next: Performance and operating considerations](17-performance-and-operations.md) |\r
| --- | --- | --- |\r
`,"./chapters/17-performance-and-operations.md":`# 17. Performance and operating considerations\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Testing and troubleshooting](16-testing-and-troubleshooting.md) | [Notes index](../README.md) | [Next: All code samples](98-all-code-samples.md) |\r
| --- | --- | --- |\r
\r
## Measure before changing a query\r
\r
Start with the query that is slow and inspect its runtime statistics, as shown in the previous chapter. Record the query, input values, table size, and current plan before changing indexes or SQL. Test with representative data because a plan that works well for a small sample may not work well after the table grows.\r
\r
Return only the columns the application uses and filter rows in SQL:\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR >= 2000\r
ORDER BY PUBLISHED_YEAR, BOOK_ID;\r
\`\`\`\r
\r
This keeps the result smaller than \`SELECT *\` and lets Derby evaluate the filter and ordering. In application code, bind input values with a \`PreparedStatement\` instead of joining values into the SQL string:\r
\r
\`\`\`java\r
String sql = "SELECT BOOK_ID, TITLE "\r
        + "FROM LIBRARY.BOOKS "\r
        + "WHERE PUBLISHED_YEAR >= ? "\r
        + "ORDER BY PUBLISHED_YEAR, BOOK_ID";\r
\r
try (PreparedStatement statement = connection.prepareStatement(sql)) {\r
    statement.setInt(1, firstYear);\r
    try (ResultSet results = statement.executeQuery()) {\r
        while (results.next()) {\r
            System.out.println(\r
                    results.getInt("BOOK_ID") + ": "\r
                            + results.getString("TITLE"));\r
        }\r
    }\r
}\r
\`\`\`\r
\r
## Add indexes for measured access patterns\r
\r
An index can reduce the rows Derby needs to inspect when a query filters, joins, or sorts on indexed columns. Indexes also take disk space and make inserts, updates, and deletes do more work. Add an index to answer a measured query, then compare its plan and write cost.\r
\r
For the filtered books query, test an index on the publication year:\r
\r
\`\`\`sql\r
CREATE INDEX LIBRARY.BOOKS_YEAR_IX\r
ON LIBRARY.BOOKS (PUBLISHED_YEAR);\r
\`\`\`\r
\r
For a query that filters by both author and year in another schema, a composite index may fit that access pattern:\r
\r
\`\`\`sql\r
CREATE INDEX LIBRARY.BOOKS_YEAR_TITLE_IX\r
ON LIBRARY.BOOKS (PUBLISHED_YEAR, TITLE);\r
\`\`\`\r
\r
Column order matters. Put the columns that your queries search together in an order that matches the predicates and sort requirements. A composite index is most useful when a query can use its leading columns. Check the actual plan instead of adding every queried column to one large index.\r
\r
## Refresh index statistics when data changes shape\r
\r
Derby uses cardinality statistics to estimate how many rows a predicate will match. Large changes in the number or distribution of distinct values can make an index's statistics less useful. After a substantial data change, the database or schema owner can refresh statistics for every index on a table:\r
\r
\`\`\`sql\r
CALL SYSCS_UTIL.SYSCS_UPDATE_STATISTICS(\r
    'LIBRARY', 'BOOKS', NULL\r
);\r
\`\`\`\r
\r
Run the query again and compare its runtime plan. Refreshing statistics does not guarantee a faster plan; it gives Derby updated information to choose a plan. Do this when data changes enough to make the old estimates stale, not after every row write.\r
\r
## Batch related writes\r
\r
When an application must insert many rows, a prepared statement batch can reduce repeated JDBC calls. Keep a clear transaction boundary and roll back the transaction if a batch fails:\r
\r
\`\`\`java\r
String sql = "INSERT INTO LIBRARY.BOOKS "\r
        + "(BOOK_ID, TITLE, PUBLISHED_YEAR, AVAILABLE) "\r
        + "VALUES (?, ?, ?, ?)";\r
\r
connection.setAutoCommit(false);\r
try (PreparedStatement statement = connection.prepareStatement(sql)) {\r
    for (Book book : books) {\r
        statement.setInt(1, book.id());\r
        statement.setString(2, book.title());\r
        statement.setInt(3, book.publishedYear());\r
        statement.setBoolean(4, book.available());\r
        statement.addBatch();\r
    }\r
\r
    statement.executeBatch();\r
    connection.commit();\r
} catch (SQLException exception) {\r
    connection.rollback();\r
    throw exception;\r
} finally {\r
    connection.setAutoCommit(true);\r
}\r
\`\`\`\r
\r
This assumes a \`Book\` type with the shown accessor methods and a connection that is not shared with another task. Choose a batch size that fits the workload and available memory. A single huge transaction can hold locks and log space for too long. If the batch fails, inspect the \`BatchUpdateException\` and its chained SQL exceptions before deciding whether to retry.\r
\r
## Keep transactions short\r
\r
Transactions hold locks until commit or rollback. Read or write the rows needed for one unit of work, finish promptly, and release locks. Avoid waiting for user input, network calls, or long computations while a transaction is open. When two transactions update the same rows, they may wait or deadlock; access shared tables in a consistent order and handle transaction rollback by restarting the complete unit of work.\r
\r
Connection and transaction behavior is covered in [Transactions and concurrency](09-transactions-and-concurrency.md). Use the same isolation level only when its guarantees are needed. A more restrictive isolation level can increase waiting between concurrent tasks.\r
\r
## Reclaim space after large deletes\r
\r
Deleting rows does not necessarily make the database file smaller. Derby can reuse freed space for later rows, and a table may keep allocated pages after a large delete. Check whether space has accumulated before running a maintenance procedure.\r
\r
\`SYSCS_UTIL.SYSCS_COMPRESS_TABLE\` rebuilds a table and its indexes to reclaim unused allocated space. Run it in auto-commit mode after backing up the database:\r
\r
\`\`\`sql\r
CALL SYSCS_UTIL.SYSCS_COMPRESS_TABLE(\r
    'LIBRARY', 'BOOKS', 1\r
);\r
\`\`\`\r
\r
The final argument \`1\` requests sequential compression. It uses less temporary disk space and memory than rebuilding the table and indexes concurrently, but takes longer. Compression takes an exclusive table lock, so schedule it when applications can wait. It also updates index statistics. Do not run it as an automatic response to every delete.\r
\r
## Keep the runtime and database files consistent\r
\r
Set \`derby.system.home\` before Derby starts when the application needs databases stored in a known location. Use one Derby version across the application's classpath or module path. \`sysinfo\` can help identify duplicate or unexpected Derby libraries.\r
\r
Shut down embedded databases cleanly and stop Network Server processes through their supported controls. Do not rename, edit, or copy individual files inside a running database directory. Use Derby's backup procedures for a live database and shut it down before making a file-system copy.\r
\r
Before upgrading a database, create and verify a backup, check that only the intended Derby libraries are loaded, and test the upgrade on a copy. A full database upgrade is a one-way change for older Derby versions: after the upgrade, do not expect an older engine to open that database.\r
\r
Apache Derby entered read-only retired status on October 10, 2025. Its developers have ended development and bug fixes, and no further releases are planned. These notes are useful for learning SQL and maintaining existing Derby installations. Check the project's status before choosing it for new systems.\r
\r
## Common mistakes\r
\r
- Adding indexes without measuring the queries that need them.\r
- Expecting an index to help a query whose plan still scans the full table.\r
- Using one very wide composite index for unrelated queries.\r
- Ignoring added storage and write cost when creating indexes.\r
- Refreshing statistics after every write instead of after meaningful data changes.\r
- Keeping a transaction open while doing unrelated work.\r
- Retrying a failed batch without checking which statements succeeded.\r
- Expecting a large delete to shrink the database file immediately.\r
- Running compression while an application needs unrestricted access to the table.\r
- Upgrading the only database copy before testing the process on a backup.\r
- Loading multiple Derby versions into the same process.\r
- Copying or editing files in a database directory while Derby is running.\r
\r
## Practice\r
\r
1. Run the filtered books query before and after creating \`BOOKS_YEAR_IX\`, then compare the runtime plans.\r
2. Insert enough test books to change the data distribution, refresh the index statistics, and compare the plan again.\r
3. Insert several books using a JDBC batch in a test database, then force a constraint failure and observe the transaction result.\r
4. Delete many rows from a disposable table, inspect the database size, then compare sequential compression with ordinary compression.\r
5. Write down which Derby libraries your application loads and test a planned upgrade against a restored copy.\r
6. Review the current Derby project status before using the engine in a new system.\r
\r
## Further reading\r
\r
- [Derby Tuning Guide](https://db.apache.org/derby/docs/10.17/tuning/)\r
- [Working with cardinality statistics](https://db.apache.org/derby/docs/10.17/tuning/ctunstats57373.html)\r
- [SYSCS_UTIL.SYSCS_UPDATE_STATISTICS](https://db.apache.org/derby/docs/10.17/ref/rrefupdatestatsproc.html)\r
- [SYSCS_UTIL.SYSCS_COMPRESS_TABLE](https://db.apache.org/derby/docs/10.17/ref/rrefaltertablecompress.html)\r
- [Preparing to upgrade](https://db.apache.org/derby/docs/10.17/devguide/tdevpreupgrade.html)\r
- [upgrade=true connection attribute](https://db.apache.org/derby/docs/10.17/ref/rrefattribupgrade.html)\r
- [Apache Derby current status](https://db.apache.org/derby/derby_downloads)\r
\r
| [Previous: Testing and troubleshooting](16-testing-and-troubleshooting.md) | [Notes index](../README.md) | [Next: All code samples](98-all-code-samples.md) |\r
| --- | --- | --- |\r
`,"./chapters/98-all-code-samples.md":`# 98. All code samples\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Performance and operating considerations](17-performance-and-operations.md) | [Notes index](../README.md) | [Next: Complete questions and answers](99-complete-q-and-a.md) |\r
| --- | --- | --- |\r
\r
This appendix gathers every fenced code block from the core chapters in chapter order. The original chapters contain the explanation, setup, and expected behavior for each example. Some blocks are fragments that continue an earlier example, so use the linked source chapter when you need the surrounding context.\r
\r
## Chapter 1. Relational databases and Derby\r
\r
[Open source chapter](./01-relational-databases-and-derby.md)\r
\r
### Example 1\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby:librarydb;create=true';\r
\r
CREATE TABLE BOOKS (\r
    BOOK_ID INTEGER NOT NULL PRIMARY KEY,\r
    TITLE VARCHAR(120) NOT NULL,\r
    PUBLISHED_YEAR INTEGER\r
);\r
\r
INSERT INTO BOOKS (BOOK_ID, TITLE, PUBLISHED_YEAR)\r
VALUES (1, 'Clean Code', 2008);\r
\r
SELECT BOOK_ID, TITLE, PUBLISHED_YEAR\r
FROM BOOKS;\r
\`\`\`\r
\r
### Example 2\r
\r
\`\`\`java\r
import java.sql.Connection;\r
import java.sql.DriverManager;\r
import java.sql.ResultSet;\r
import java.sql.Statement;\r
\r
public class ReadBooks {\r
    public static void main(String[] args) throws Exception {\r
        String url = "jdbc:derby:librarydb";\r
\r
        try (Connection connection = DriverManager.getConnection(url);\r
             Statement statement = connection.createStatement();\r
             ResultSet results = statement.executeQuery(\r
                     "SELECT BOOK_ID, TITLE FROM BOOKS")) {\r
\r
            while (results.next()) {\r
                int id = results.getInt("BOOK_ID");\r
                String title = results.getString("TITLE");\r
                System.out.println(id + ": " + title);\r
            }\r
        }\r
    }\r
}\r
\`\`\`\r
\r
## Chapter 2. Java compatibility, setup, and tools\r
\r
[Open source chapter](./02-compatibility-setup-and-tools.md)\r
\r
### Example 1\r
\r
\`\`\`powershell\r
java --version\r
javac --version\r
\`\`\`\r
\r
### Example 2\r
\r
\`\`\`text\r
C:\\tools\\db-derby-10.17.1.0-bin\r
\`\`\`\r
\r
### Example 3\r
\r
\`\`\`powershell\r
$env:DERBY_HOME = 'C:\\tools\\db-derby-10.17.1.0-bin'\r
Get-ChildItem "$env:DERBY_HOME\\lib"\r
\`\`\`\r
\r
### Example 4\r
\r
\`\`\`powershell\r
$env:CLASSPATH = @(\r
    "$env:DERBY_HOME\\lib\\derby.jar",\r
    "$env:DERBY_HOME\\lib\\derbytools.jar",\r
    "$env:DERBY_HOME\\lib\\derbyshared.jar"\r
) -join ';'\r
\`\`\`\r
\r
### Example 5\r
\r
\`\`\`powershell\r
java org.apache.derby.tools.sysinfo\r
java org.apache.derby.tools.ij\r
\`\`\`\r
\r
### Example 6\r
\r
\`\`\`powershell\r
$env:CLASSPATH -split ';'\r
Test-Path "$env:DERBY_HOME\\lib\\derby.jar"\r
Test-Path "$env:DERBY_HOME\\lib\\derbytools.jar"\r
java org.apache.derby.tools.sysinfo\r
\`\`\`\r
\r
## Chapter 3. Using ij and creating a database\r
\r
[Open source chapter](./03-ij-and-first-database.md)\r
\r
### Example 1\r
\r
\`\`\`powershell\r
java org.apache.derby.tools.ij\r
\`\`\`\r
\r
### Example 2\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby:librarydb;create=true';\r
\`\`\`\r
\r
### Example 3\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby:librarydb';\r
\`\`\`\r
\r
### Example 4\r
\r
\`\`\`sql\r
CREATE TABLE BOOKS (\r
    BOOK_ID INTEGER NOT NULL PRIMARY KEY,\r
    TITLE VARCHAR(120) NOT NULL,\r
    PUBLISHED_YEAR INTEGER,\r
    AVAILABLE BOOLEAN DEFAULT TRUE NOT NULL\r
);\r
\r
INSERT INTO BOOKS (BOOK_ID, TITLE, PUBLISHED_YEAR)\r
VALUES (1, 'Clean Code', 2008);\r
\r
INSERT INTO BOOKS (BOOK_ID, TITLE, PUBLISHED_YEAR, AVAILABLE)\r
VALUES (2, 'The Pragmatic Programmer', 1999, FALSE);\r
\`\`\`\r
\r
### Example 5\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE, PUBLISHED_YEAR, AVAILABLE\r
FROM BOOKS\r
ORDER BY BOOK_ID;\r
\`\`\`\r
\r
### Example 6\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby:librarydb;create=true';\r
\r
CREATE TABLE BOOKS (\r
    BOOK_ID INTEGER NOT NULL PRIMARY KEY,\r
    TITLE VARCHAR(120) NOT NULL,\r
    PUBLISHED_YEAR INTEGER,\r
    AVAILABLE BOOLEAN DEFAULT TRUE NOT NULL\r
);\r
\r
INSERT INTO BOOKS (BOOK_ID, TITLE, PUBLISHED_YEAR)\r
VALUES (1, 'Clean Code', 2008);\r
\r
SELECT BOOK_ID, TITLE, PUBLISHED_YEAR, AVAILABLE\r
FROM BOOKS;\r
\`\`\`\r
\r
### Example 7\r
\r
\`\`\`sql\r
RUN 'C:/derby-work/library.sql';\r
\`\`\`\r
\r
## Chapter 4. Schemas, tables, and data types\r
\r
[Open source chapter](./04-schemas-tables-and-data-types.md)\r
\r
### Example 1\r
\r
\`\`\`sql\r
CREATE SCHEMA LIBRARY;\r
\r
CREATE TABLE LIBRARY.BOOKS (\r
    BOOK_ID INTEGER NOT NULL PRIMARY KEY,\r
    TITLE VARCHAR(120) NOT NULL,\r
    PUBLISHED_YEAR INTEGER,\r
    AVAILABLE BOOLEAN DEFAULT TRUE NOT NULL\r
);\r
\r
INSERT INTO LIBRARY.BOOKS (BOOK_ID, TITLE, PUBLISHED_YEAR, AVAILABLE)\r
VALUES (1, 'Clean Code', 2008, TRUE),\r
       (2, 'The Pragmatic Programmer', 1999, FALSE);\r
\`\`\`\r
\r
### Example 2\r
\r
\`\`\`sql\r
SET SCHEMA LIBRARY;\r
\r
SELECT BOOK_ID, TITLE\r
FROM BOOKS;\r
\`\`\`\r
\r
### Example 3\r
\r
\`\`\`sql\r
CREATE TABLE BOOKS (BOOK_ID INTEGER NOT NULL);\r
\r
SELECT book_id\r
FROM books;\r
\`\`\`\r
\r
### Example 4\r
\r
\`\`\`sql\r
CREATE TABLE "ReadingList" (\r
    "BookTitle" VARCHAR(120)\r
);\r
\r
INSERT INTO "ReadingList" ("BookTitle")\r
VALUES ('Database Systems');\r
\`\`\`\r
\r
### Example 5\r
\r
\`\`\`sql\r
CREATE TABLE LIBRARY.MEMBERS (\r
    MEMBER_ID INTEGER NOT NULL PRIMARY KEY,\r
    FULL_NAME VARCHAR(100) NOT NULL,\r
    EMAIL VARCHAR(200),\r
    JOINED_ON DATE DEFAULT CURRENT_DATE NOT NULL\r
);\r
\r
INSERT INTO LIBRARY.MEMBERS (MEMBER_ID, FULL_NAME, EMAIL)\r
VALUES (1, 'Asha Rao', NULL);\r
\`\`\`\r
\r
### Example 6\r
\r
\`\`\`sql\r
SELECT MEMBER_ID, FULL_NAME\r
FROM LIBRARY.MEMBERS\r
WHERE EMAIL IS NULL;\r
\`\`\`\r
\r
### Example 7\r
\r
\`\`\`sql\r
CREATE TABLE LIBRARY.BOOKS_WITH_IDENTITY (\r
    BOOK_ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY\r
        (START WITH 1, INCREMENT BY 1),\r
    TITLE VARCHAR(120) NOT NULL,\r
    PRIMARY KEY (BOOK_ID)\r
);\r
\r
INSERT INTO LIBRARY.BOOKS_WITH_IDENTITY (TITLE)\r
VALUES ('Database Systems');\r
\`\`\`\r
\r
### Example 8\r
\r
\`\`\`sql\r
CREATE TABLE LIBRARY.LOANS (\r
    LOAN_ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,\r
    BOOK_ID INTEGER NOT NULL,\r
    MEMBER_ID INTEGER NOT NULL,\r
    CHECKED_OUT_ON DATE NOT NULL,\r
    RETURNED_ON DATE,\r
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,\r
    CONSTRAINT LOANS_PK PRIMARY KEY (LOAN_ID),\r
    CONSTRAINT LOANS_BOOK_FK FOREIGN KEY (BOOK_ID)\r
        REFERENCES LIBRARY.BOOKS (BOOK_ID),\r
    CONSTRAINT LOANS_MEMBER_FK FOREIGN KEY (MEMBER_ID)\r
        REFERENCES LIBRARY.MEMBERS (MEMBER_ID)\r
);\r
\r
VALUES (DATE '2026-10-03', CURRENT_TIMESTAMP);\r
\`\`\`\r
\r
## Chapter 5. Constraints and indexes\r
\r
[Open source chapter](./05-constraints-and-indexes.md)\r
\r
### Example 1\r
\r
\`\`\`sql\r
CREATE TABLE LIBRARY.PUBLISHERS (\r
    PUBLISHER_ID INTEGER NOT NULL,\r
    PUBLISHER_NAME VARCHAR(120) NOT NULL,\r
    WEBSITE VARCHAR(240),\r
    CONSTRAINT PUBLISHERS_PK PRIMARY KEY (PUBLISHER_ID),\r
    CONSTRAINT PUBLISHERS_NAME_UQ UNIQUE (PUBLISHER_NAME)\r
);\r
\`\`\`\r
\r
### Example 2\r
\r
\`\`\`sql\r
CREATE TABLE LIBRARY.BOOK_EDITIONS (\r
    BOOK_ID INTEGER NOT NULL,\r
    EDITION_NUMBER SMALLINT NOT NULL,\r
    ISBN VARCHAR(20),\r
    CONSTRAINT BOOK_EDITIONS_PK PRIMARY KEY (BOOK_ID, EDITION_NUMBER),\r
    CONSTRAINT BOOK_EDITIONS_ISBN_UQ UNIQUE (ISBN),\r
    CONSTRAINT BOOK_EDITIONS_BOOK_FK FOREIGN KEY (BOOK_ID)\r
        REFERENCES LIBRARY.BOOKS (BOOK_ID)\r
);\r
\`\`\`\r
\r
### Example 3\r
\r
\`\`\`sql\r
CREATE TABLE LIBRARY.BOOK_COPIES (\r
    COPY_ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,\r
    BOOK_ID INTEGER NOT NULL,\r
    CONDITION VARCHAR(20) DEFAULT 'good' NOT NULL,\r
    ACQUISITION_COST DECIMAL(8, 2) NOT NULL,\r
    CONSTRAINT BOOK_COPIES_PK PRIMARY KEY (COPY_ID),\r
    CONSTRAINT BOOK_COPIES_COST_CK CHECK (ACQUISITION_COST >= 0),\r
    CONSTRAINT BOOK_COPIES_CONDITION_CK\r
        CHECK (CONDITION IN ('good', 'worn', 'damaged')),\r
    CONSTRAINT BOOK_COPIES_BOOK_FK FOREIGN KEY (BOOK_ID)\r
        REFERENCES LIBRARY.BOOKS (BOOK_ID)\r
);\r
\`\`\`\r
\r
### Example 4\r
\r
\`\`\`sql\r
ALTER TABLE LIBRARY.BOOK_COPIES\r
ADD CONSTRAINT BOOK_COPIES_ID_CK\r
CHECK (COPY_ID > 0);\r
\`\`\`\r
\r
### Example 5\r
\r
\`\`\`sql\r
CREATE INDEX BOOKS_TITLE_IX\r
ON LIBRARY.BOOKS (TITLE);\r
\r
CREATE INDEX COPIES_BOOK_CONDITION_IX\r
ON LIBRARY.BOOK_COPIES (BOOK_ID, CONDITION);\r
\`\`\`\r
\r
## Chapter 6. Inserting, updating, and deleting data\r
\r
[Open source chapter](./06-insert-update-delete.md)\r
\r
### Example 1\r
\r
\`\`\`sql\r
INSERT INTO LIBRARY.BOOKS (BOOK_ID, TITLE, PUBLISHED_YEAR)\r
VALUES (3, 'SQL Fundamentals', 2020);\r
\`\`\`\r
\r
### Example 2\r
\r
\`\`\`sql\r
INSERT INTO LIBRARY.BOOKS (BOOK_ID, TITLE)\r
VALUES (4, 'O''Reilly SQL Guide');\r
\`\`\`\r
\r
### Example 3\r
\r
\`\`\`sql\r
INSERT INTO LIBRARY.BOOKS (BOOK_ID, TITLE, PUBLISHED_YEAR)\r
VALUES\r
    (5, 'SQL Fundamentals', 2020),\r
    (6, 'JDBC in Practice', 2022);\r
\`\`\`\r
\r
### Example 4\r
\r
\`\`\`sql\r
INSERT INTO LIBRARY.BOOKS (BOOK_ID, TITLE, PUBLISHED_YEAR, AVAILABLE)\r
VALUES (7, 'Derby Field Notes', 2024, DEFAULT);\r
\`\`\`\r
\r
### Example 5\r
\r
\`\`\`sql\r
INSERT INTO LIBRARY.BOOK_COPIES (BOOK_ID, CONDITION, ACQUISITION_COST)\r
VALUES (1, DEFAULT, 18.50);\r
\`\`\`\r
\r
### Example 6\r
\r
\`\`\`sql\r
UPDATE LIBRARY.BOOKS\r
SET AVAILABLE = FALSE\r
WHERE BOOK_ID = 3;\r
\`\`\`\r
\r
### Example 7\r
\r
\`\`\`sql\r
UPDATE LIBRARY.BOOKS\r
SET TITLE = 'SQL Fundamentals, Second Edition',\r
    PUBLISHED_YEAR = 2023\r
WHERE BOOK_ID = 5;\r
\`\`\`\r
\r
### Example 8\r
\r
\`\`\`sql\r
DELETE FROM LIBRARY.BOOKS\r
WHERE BOOK_ID = 7;\r
\`\`\`\r
\r
### Example 9\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR < 2000;\r
\`\`\`\r
\r
### Example 10\r
\r
\`\`\`sql\r
CREATE TABLE LIBRARY.OLD_BOOKS (\r
    BOOK_ID INTEGER NOT NULL,\r
    TITLE VARCHAR(120) NOT NULL,\r
    PUBLISHED_YEAR INTEGER\r
);\r
\r
INSERT INTO LIBRARY.OLD_BOOKS (BOOK_ID, TITLE, PUBLISHED_YEAR)\r
SELECT BOOK_ID, TITLE, PUBLISHED_YEAR\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR < 2000;\r
\`\`\`\r
\r
## Chapter 7. Selecting and filtering data\r
\r
[Open source chapter](./07-select-and-filter.md)\r
\r
### Example 1\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE, PUBLISHED_YEAR\r
FROM LIBRARY.BOOKS;\r
\`\`\`\r
\r
### Example 2\r
\r
\`\`\`sql\r
SELECT TITLE AS BOOK_TITLE,\r
       PUBLISHED_YEAR AS YEAR_PUBLISHED\r
FROM LIBRARY.BOOKS;\r
\`\`\`\r
\r
### Example 3\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE, PUBLISHED_YEAR\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR >= 2000;\r
\`\`\`\r
\r
### Example 4\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS\r
WHERE AVAILABLE = TRUE\r
  AND (PUBLISHED_YEAR >= 2020 OR PUBLISHED_YEAR IS NULL);\r
\`\`\`\r
\r
### Example 5\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR IS NULL;\r
\`\`\`\r
\r
### Example 6\r
\r
\`\`\`sql\r
WHERE PUBLISHED_YEAR = NULL\r
\`\`\`\r
\r
### Example 7\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS\r
WHERE TITLE LIKE '%SQL%';\r
\`\`\`\r
\r
### Example 8\r
\r
\`\`\`sql\r
SELECT TITLE, PUBLISHED_YEAR\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR BETWEEN 2000 AND 2025;\r
\`\`\`\r
\r
### Example 9\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR IN (1999, 2008, 2022);\r
\`\`\`\r
\r
### Example 10\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE, PUBLISHED_YEAR\r
FROM LIBRARY.BOOKS\r
ORDER BY PUBLISHED_YEAR DESC, TITLE ASC;\r
\`\`\`\r
\r
### Example 11\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS\r
ORDER BY TITLE\r
FETCH FIRST 5 ROWS ONLY;\r
\`\`\`\r
\r
### Example 12\r
\r
\`\`\`sql\r
SELECT DISTINCT PUBLISHED_YEAR\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR IS NOT NULL\r
ORDER BY PUBLISHED_YEAR;\r
\`\`\`\r
\r
### Example 13\r
\r
\`\`\`sql\r
SELECT TITLE,\r
       CASE\r
           WHEN AVAILABLE = TRUE THEN 'Available'\r
           ELSE 'Checked out'\r
       END AS AVAILABILITY_LABEL\r
FROM LIBRARY.BOOKS;\r
\`\`\`\r
\r
### Example 14\r
\r
\`\`\`sql\r
SELECT COUNT(*) AS BOOK_COUNT,\r
       MIN(PUBLISHED_YEAR) AS OLDEST_YEAR,\r
       MAX(PUBLISHED_YEAR) AS NEWEST_YEAR\r
FROM LIBRARY.BOOKS;\r
\`\`\`\r
\r
### Example 15\r
\r
\`\`\`sql\r
SELECT PUBLISHED_YEAR, COUNT(*) AS BOOK_COUNT\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR IS NOT NULL\r
GROUP BY PUBLISHED_YEAR\r
HAVING COUNT(*) > 1\r
ORDER BY PUBLISHED_YEAR;\r
\`\`\`\r
\r
## Chapter 8. Joins, subqueries, and views\r
\r
[Open source chapter](./08-joins-subqueries-and-views.md)\r
\r
### Example 1\r
\r
\`\`\`sql\r
INSERT INTO LIBRARY.MEMBERS (MEMBER_ID, FULL_NAME, EMAIL)\r
VALUES (2, 'Dev Shah', 'dev@example.com');\r
\r
INSERT INTO LIBRARY.LOANS\r
    (BOOK_ID, MEMBER_ID, CHECKED_OUT_ON, RETURNED_ON)\r
VALUES (1, 1, DATE '2026-09-01', NULL),\r
       (2, 2, DATE '2026-09-03', DATE '2026-09-10');\r
\`\`\`\r
\r
### Example 2\r
\r
\`\`\`sql\r
SELECT b.BOOK_ID,\r
       b.TITLE,\r
       m.FULL_NAME,\r
       l.CHECKED_OUT_ON,\r
       l.RETURNED_ON\r
FROM LIBRARY.LOANS AS l\r
INNER JOIN LIBRARY.BOOKS AS b\r
    ON b.BOOK_ID = l.BOOK_ID\r
INNER JOIN LIBRARY.MEMBERS AS m\r
    ON m.MEMBER_ID = l.MEMBER_ID\r
ORDER BY l.CHECKED_OUT_ON;\r
\`\`\`\r
\r
### Example 3\r
\r
\`\`\`sql\r
SELECT b.BOOK_ID,\r
       b.TITLE,\r
       l.CHECKED_OUT_ON,\r
       m.FULL_NAME\r
FROM LIBRARY.BOOKS AS b\r
LEFT OUTER JOIN LIBRARY.LOANS AS l\r
    ON l.BOOK_ID = b.BOOK_ID\r
   AND l.RETURNED_ON IS NULL\r
LEFT OUTER JOIN LIBRARY.MEMBERS AS m\r
    ON m.MEMBER_ID = l.MEMBER_ID\r
ORDER BY b.BOOK_ID;\r
\`\`\`\r
\r
### Example 4\r
\r
\`\`\`sql\r
SELECT b.BOOK_ID, b.TITLE\r
FROM LIBRARY.BOOKS AS b\r
WHERE b.BOOK_ID IN (\r
    SELECT l.BOOK_ID\r
    FROM LIBRARY.LOANS AS l\r
)\r
ORDER BY b.BOOK_ID;\r
\`\`\`\r
\r
### Example 5\r
\r
\`\`\`sql\r
SELECT m.MEMBER_ID, m.FULL_NAME\r
FROM LIBRARY.MEMBERS AS m\r
WHERE EXISTS (\r
    SELECT 1\r
    FROM LIBRARY.LOANS AS l\r
    WHERE l.MEMBER_ID = m.MEMBER_ID\r
      AND l.RETURNED_ON IS NULL\r
)\r
ORDER BY m.MEMBER_ID;\r
\`\`\`\r
\r
### Example 6\r
\r
\`\`\`sql\r
SELECT m.MEMBER_ID, m.FULL_NAME\r
FROM LIBRARY.MEMBERS AS m\r
WHERE NOT EXISTS (\r
    SELECT 1\r
    FROM LIBRARY.LOANS AS l\r
    WHERE l.MEMBER_ID = m.MEMBER_ID\r
)\r
ORDER BY m.MEMBER_ID;\r
\`\`\`\r
\r
### Example 7\r
\r
\`\`\`sql\r
SELECT b.BOOK_ID,\r
       b.TITLE,\r
       (\r
           SELECT COUNT(*)\r
           FROM LIBRARY.LOANS AS l\r
           WHERE l.BOOK_ID = b.BOOK_ID\r
       ) AS LOAN_COUNT\r
FROM LIBRARY.BOOKS AS b\r
ORDER BY b.BOOK_ID;\r
\`\`\`\r
\r
### Example 8\r
\r
\`\`\`sql\r
SELECT b.BOOK_ID,\r
       b.TITLE,\r
       loan_counts.LOAN_COUNT\r
FROM LIBRARY.BOOKS AS b\r
LEFT JOIN (\r
    SELECT l.BOOK_ID, COUNT(*) AS LOAN_COUNT\r
    FROM LIBRARY.LOANS AS l\r
    GROUP BY l.BOOK_ID\r
) AS loan_counts\r
    ON loan_counts.BOOK_ID = b.BOOK_ID\r
ORDER BY b.BOOK_ID;\r
\`\`\`\r
\r
### Example 9\r
\r
\`\`\`sql\r
CREATE VIEW LIBRARY.ACTIVE_LOANS\r
    (BOOK_TITLE, MEMBER_NAME, CHECKED_OUT_ON)\r
AS\r
    SELECT b.TITLE, m.FULL_NAME, l.CHECKED_OUT_ON\r
    FROM LIBRARY.LOANS AS l\r
    INNER JOIN LIBRARY.BOOKS AS b\r
        ON b.BOOK_ID = l.BOOK_ID\r
    INNER JOIN LIBRARY.MEMBERS AS m\r
        ON m.MEMBER_ID = l.MEMBER_ID\r
    WHERE l.RETURNED_ON IS NULL;\r
\`\`\`\r
\r
### Example 10\r
\r
\`\`\`sql\r
SELECT BOOK_TITLE, MEMBER_NAME, CHECKED_OUT_ON\r
FROM LIBRARY.ACTIVE_LOANS\r
ORDER BY CHECKED_OUT_ON;\r
\`\`\`\r
\r
## Chapter 9. Transactions and concurrency\r
\r
[Open source chapter](./09-transactions-and-concurrency.md)\r
\r
### Example 1\r
\r
\`\`\`java\r
connection.setAutoCommit(false);\r
\`\`\`\r
\r
### Example 2\r
\r
\`\`\`java\r
import java.sql.Connection;\r
import java.sql.DriverManager;\r
import java.sql.PreparedStatement;\r
import java.sql.SQLException;\r
\r
public class BorrowBookTransaction {\r
    public static void main(String[] args) throws SQLException {\r
        String url = "jdbc:derby:librarydb";\r
\r
        try (Connection connection = DriverManager.getConnection(url)) {\r
            connection.setTransactionIsolation(\r
                    Connection.TRANSACTION_READ_COMMITTED);\r
            connection.setAutoCommit(false);\r
\r
            try {\r
                int bookId = 3;\r
                int memberId = 2;\r
\r
                try (PreparedStatement updateBook = connection.prepareStatement(\r
                        "UPDATE LIBRARY.BOOKS "\r
                                + "SET AVAILABLE = FALSE "\r
                                + "WHERE BOOK_ID = ? AND AVAILABLE = TRUE")) {\r
                    updateBook.setInt(1, bookId);\r
\r
                    int changedRows = updateBook.executeUpdate();\r
                    if (changedRows != 1) {\r
                        throw new SQLException("Book is not available.");\r
                    }\r
                }\r
\r
                try (PreparedStatement insertLoan = connection.prepareStatement(\r
                        "INSERT INTO LIBRARY.LOANS "\r
                                + "(BOOK_ID, MEMBER_ID, CHECKED_OUT_ON) "\r
                                + "VALUES (?, ?, CURRENT_DATE)")) {\r
                    insertLoan.setInt(1, bookId);\r
                    insertLoan.setInt(2, memberId);\r
                    insertLoan.executeUpdate();\r
                }\r
\r
                connection.commit();\r
            } catch (SQLException error) {\r
                try {\r
                    connection.rollback();\r
                } catch (SQLException rollbackError) {\r
                    error.addSuppressed(rollbackError);\r
                }\r
                throw error;\r
            }\r
        }\r
    }\r
}\r
\`\`\`\r
\r
### Example 3\r
\r
\`\`\`java\r
connection.setAutoCommit(false);\r
\r
try (PreparedStatement statement = connection.prepareStatement(\r
        "UPDATE LIBRARY.MEMBERS SET EMAIL = ? WHERE MEMBER_ID = ?")) {\r
    statement.setString(1, "temporary@example.com");\r
    statement.setInt(2, 1);\r
    statement.executeUpdate();\r
}\r
\r
connection.rollback();\r
\`\`\`\r
\r
### Example 4\r
\r
\`\`\`java\r
connection.setTransactionIsolation(Connection.TRANSACTION_SERIALIZABLE);\r
\`\`\`\r
\r
### Example 5\r
\r
\`\`\`sql\r
SET ISOLATION READ COMMITTED;\r
\`\`\`\r
\r
## Chapter 10. JDBC connections and prepared statements\r
\r
[Open source chapter](./10-jdbc-connections-and-statements.md)\r
\r
### Example 1\r
\r
\`\`\`java\r
String url = "jdbc:derby:librarydb";\r
Connection connection = DriverManager.getConnection(url);\r
\`\`\`\r
\r
### Example 2\r
\r
\`\`\`java\r
String url = "jdbc:derby:librarydb;create=true";\r
\`\`\`\r
\r
### Example 3\r
\r
\`\`\`java\r
try (java.sql.Statement statement = connection.createStatement();\r
     ResultSet results = statement.executeQuery(\r
             "SELECT BOOK_ID, TITLE FROM LIBRARY.BOOKS ORDER BY TITLE")) {\r
    while (results.next()) {\r
        System.out.println(results.getString("TITLE"));\r
    }\r
}\r
\`\`\`\r
\r
### Example 4\r
\r
\`\`\`java\r
import java.sql.Connection;\r
import java.sql.DriverManager;\r
import java.sql.PreparedStatement;\r
import java.sql.ResultSet;\r
import java.sql.SQLException;\r
\r
public class FindBooks {\r
    public static void main(String[] args) throws SQLException {\r
        String url = "jdbc:derby:librarydb";\r
        String sql = "SELECT BOOK_ID, TITLE, PUBLISHED_YEAR "\r
                + "FROM LIBRARY.BOOKS "\r
                + "WHERE TITLE LIKE ? "\r
                + "ORDER BY TITLE";\r
\r
        try (Connection connection = DriverManager.getConnection(url);\r
             PreparedStatement statement = connection.prepareStatement(sql)) {\r
\r
            statement.setString(1, "%SQL%");\r
\r
            try (ResultSet results = statement.executeQuery()) {\r
                while (results.next()) {\r
                    int bookId = results.getInt("BOOK_ID");\r
                    String title = results.getString("TITLE");\r
                    int yearValue = results.getInt("PUBLISHED_YEAR");\r
                    Integer publishedYear = results.wasNull()\r
                            ? null\r
                            : yearValue;\r
\r
                    System.out.println(bookId + " | " + title + " | "\r
                            + publishedYear);\r
                }\r
            }\r
        }\r
    }\r
}\r
\`\`\`\r
\r
### Example 5\r
\r
\`\`\`java\r
String sql = "UPDATE LIBRARY.BOOKS "\r
        + "SET AVAILABLE = ? "\r
        + "WHERE BOOK_ID = ?";\r
\r
try (PreparedStatement statement = connection.prepareStatement(sql)) {\r
    statement.setBoolean(1, false);\r
    statement.setInt(2, 3);\r
\r
    int changedRows = statement.executeUpdate();\r
    System.out.println("Updated rows: " + changedRows);\r
}\r
\`\`\`\r
\r
### Example 6\r
\r
\`\`\`java\r
// Avoid this pattern.\r
String sql = "SELECT BOOK_ID FROM LIBRARY.BOOKS WHERE TITLE = '"\r
        + userInput + "'";\r
\`\`\`\r
\r
### Example 7\r
\r
\`\`\`java\r
String sql = "SELECT BOOK_ID FROM LIBRARY.BOOKS WHERE TITLE = ?";\r
\r
try (PreparedStatement statement = connection.prepareStatement(sql)) {\r
    statement.setString(1, userInput);\r
    try (ResultSet results = statement.executeQuery()) {\r
        while (results.next()) {\r
            System.out.println(results.getInt("BOOK_ID"));\r
        }\r
    }\r
}\r
\`\`\`\r
\r
### Example 8\r
\r
\`\`\`java\r
String sql = "INSERT INTO LIBRARY.LOANS "\r
        + "(BOOK_ID, MEMBER_ID, CHECKED_OUT_ON) "\r
        + "VALUES (?, ?, CURRENT_DATE)";\r
\r
try (PreparedStatement statement = connection.prepareStatement(\r
        sql, java.sql.Statement.RETURN_GENERATED_KEYS)) {\r
    statement.setInt(1, 3);\r
    statement.setInt(2, 2);\r
    statement.executeUpdate();\r
\r
    try (ResultSet keys = statement.getGeneratedKeys()) {\r
        if (keys.next()) {\r
            int loanId = keys.getInt(1);\r
            System.out.println("Created loan " + loanId);\r
        }\r
    }\r
}\r
\`\`\`\r
\r
### Example 9\r
\r
\`\`\`java\r
try (Connection connection = DriverManager.getConnection(url);\r
     PreparedStatement statement = connection.prepareStatement(sql);\r
     ResultSet results = statement.executeQuery()) {\r
    while (results.next()) {\r
        // Read the current row here.\r
    }\r
}\r
\`\`\`\r
\r
### Example 10\r
\r
\`\`\`java\r
catch (SQLException error) {\r
    System.err.println("Message: " + error.getMessage());\r
    System.err.println("SQL state: " + error.getSQLState());\r
    System.err.println("Error code: " + error.getErrorCode());\r
\r
    for (SQLException next = error.getNextException();\r
         next != null;\r
         next = next.getNextException()) {\r
        System.err.println("Related error: " + next.getMessage());\r
    }\r
}\r
\`\`\`\r
\r
## Chapter 11. Embedded mode and database lifecycle\r
\r
[Open source chapter](./11-embedded-mode-and-lifecycle.md)\r
\r
### Example 1\r
\r
\`\`\`text\r
Java application and Derby engine in one JVM\r
                    |\r
                    v\r
           Local database files\r
\`\`\`\r
\r
### Example 2\r
\r
\`\`\`powershell\r
java -Dderby.system.home=C:/data/derby-system \`\r
     -cp "$env:DERBY_HOME/lib/*;." \`\r
     com.example.LibraryApplication\r
\`\`\`\r
\r
### Example 3\r
\r
\`\`\`java\r
String url = "jdbc:derby:librarydb";\r
\`\`\`\r
\r
### Example 4\r
\r
\`\`\`java\r
String url = "jdbc:derby:C:/data/librarydb";\r
\`\`\`\r
\r
### Example 5\r
\r
\`\`\`java\r
DriverManager.getConnection("jdbc:derby:librarydb;shutdown=true");\r
\`\`\`\r
\r
### Example 6\r
\r
\`\`\`java\r
DriverManager.getConnection("jdbc:derby:;shutdown=true");\r
\`\`\`\r
\r
### Example 7\r
\r
\`\`\`java\r
static void shutdownLibrary() throws SQLException {\r
    try {\r
        DriverManager.getConnection("jdbc:derby:librarydb;shutdown=true");\r
        throw new SQLException("Derby did not report a successful shutdown.");\r
    } catch (SQLException error) {\r
        if (!"08006".equals(error.getSQLState())) {\r
            throw error;\r
        }\r
    }\r
}\r
\`\`\`\r
\r
### Example 8\r
\r
\`\`\`java\r
String url = "jdbc:derby:memory:library-test;create=true";\r
\`\`\`\r
\r
### Example 9\r
\r
\`\`\`text\r
jdbc:derby:memory:library-test;drop=true\r
\`\`\`\r
\r
## Chapter 12. Network Server and client connections\r
\r
[Open source chapter](./12-network-server-and-client.md)\r
\r
### Example 1\r
\r
\`\`\`text\r
Java application A -- client driver --+\r
                                      |\r
Java application B -- client driver --> Derby Network Server -- database files\r
                                      |\r
Java command line -- client driver --+\r
\`\`\`\r
\r
### Example 2\r
\r
\`\`\`powershell\r
$env:DERBY_HOME = 'C:\\tools\\db-derby-10.17.1.0-bin'\r
java -Dderby.system.home=C:/data/derby-system \`\r
     -jar "$env:DERBY_HOME/lib/derbyrun.jar" server start\r
\`\`\`\r
\r
### Example 3\r
\r
\`\`\`powershell\r
java -jar "$env:DERBY_HOME/lib/derbyrun.jar" server ping\r
\`\`\`\r
\r
### Example 4\r
\r
\`\`\`powershell\r
$env:CLASSPATH = @(\r
    "$env:DERBY_HOME\\lib\\derbyclient.jar",\r
    "$env:DERBY_HOME\\lib\\derbyshared.jar",\r
    '.'\r
) -join ';'\r
\`\`\`\r
\r
### Example 5\r
\r
\`\`\`java\r
String url = "jdbc:derby://localhost:1527/librarydb";\r
\r
try (Connection connection = DriverManager.getConnection(url);\r
     PreparedStatement statement = connection.prepareStatement(\r
             "SELECT BOOK_ID, TITLE FROM LIBRARY.BOOKS ORDER BY BOOK_ID");\r
     ResultSet results = statement.executeQuery()) {\r
    while (results.next()) {\r
        System.out.println(results.getInt("BOOK_ID") + ": "\r
                + results.getString("TITLE"));\r
    }\r
}\r
\`\`\`\r
\r
### Example 6\r
\r
\`\`\`java\r
String url = "jdbc:derby://localhost:1527/librarydb;create=true";\r
\`\`\`\r
\r
### Example 7\r
\r
\`\`\`powershell\r
$env:CLASSPATH = @(\r
    "$env:DERBY_HOME\\lib\\derbyclient.jar",\r
    "$env:DERBY_HOME\\lib\\derbyshared.jar",\r
    "$env:DERBY_HOME\\lib\\derbytools.jar",\r
    '.'\r
) -join ';'\r
java org.apache.derby.tools.ij\r
\`\`\`\r
\r
### Example 8\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby://localhost:1527/librarydb';\r
\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS\r
ORDER BY BOOK_ID;\r
\`\`\`\r
\r
### Example 9\r
\r
\`\`\`powershell\r
java -jar "$env:DERBY_HOME/lib/derbyrun.jar" server shutdown\r
\`\`\`\r
\r
## Chapter 13. Metadata and schema changes\r
\r
[Open source chapter](./13-metadata-and-schema-changes.md)\r
\r
### Example 1\r
\r
\`\`\`java\r
DatabaseMetaData metadata = connection.getMetaData();\r
String[] objectTypes = { "TABLE", "VIEW" };\r
\r
try (ResultSet tables = metadata.getTables(\r
        null, "LIBRARY", "%", objectTypes)) {\r
    while (tables.next()) {\r
        String schema = tables.getString("TABLE_SCHEM");\r
        String name = tables.getString("TABLE_NAME");\r
        String type = tables.getString("TABLE_TYPE");\r
        System.out.println(schema + "." + name + " (" + type + ")");\r
    }\r
}\r
\`\`\`\r
\r
### Example 2\r
\r
\`\`\`java\r
try (ResultSet columns = metadata.getColumns(\r
        null, "LIBRARY", "BOOKS", "%")) {\r
    while (columns.next()) {\r
        System.out.println(\r
                columns.getString("COLUMN_NAME") + " | "\r
                        + columns.getString("TYPE_NAME") + " | nullable="\r
                        + columns.getInt("NULLABLE"));\r
    }\r
}\r
\`\`\`\r
\r
### Example 3\r
\r
\`\`\`java\r
try (ResultSet keys = metadata.getPrimaryKeys(\r
        null, "LIBRARY", "BOOKS")) {\r
    while (keys.next()) {\r
        System.out.println(\r
                keys.getString("COLUMN_NAME") + " is part of "\r
                        + keys.getString("PK_NAME"));\r
    }\r
}\r
\r
try (ResultSet references = metadata.getImportedKeys(\r
        null, "LIBRARY", "LOANS")) {\r
    while (references.next()) {\r
        System.out.println(\r
                references.getString("FKCOLUMN_NAME") + " references "\r
                        + references.getString("PKTABLE_SCHEM") + "."\r
                        + references.getString("PKTABLE_NAME") + "."\r
                        + references.getString("PKCOLUMN_NAME"));\r
    }\r
}\r
\`\`\`\r
\r
### Example 4\r
\r
\`\`\`java\r
try (PreparedStatement statement = connection.prepareStatement(\r
        "SELECT BOOK_ID, TITLE, PUBLISHED_YEAR "\r
                + "FROM LIBRARY.BOOKS");\r
     ResultSet results = statement.executeQuery()) {\r
\r
    ResultSetMetaData resultInfo = results.getMetaData();\r
    for (int position = 1;\r
         position <= resultInfo.getColumnCount();\r
         position++) {\r
        System.out.println(\r
                resultInfo.getColumnLabel(position) + " | "\r
                        + resultInfo.getColumnTypeName(position));\r
    }\r
}\r
\`\`\`\r
\r
### Example 5\r
\r
\`\`\`sql\r
SELECT s.SCHEMANAME, t.TABLENAME\r
FROM SYS.SYSTABLES AS t\r
INNER JOIN SYS.SYSSCHEMAS AS s\r
    ON s.SCHEMAID = t.SCHEMAID\r
WHERE s.SCHEMANAME = 'LIBRARY'\r
ORDER BY t.TABLENAME;\r
\`\`\`\r
\r
### Example 6\r
\r
\`\`\`sql\r
ALTER TABLE LIBRARY.BOOKS\r
ADD COLUMN CATEGORY VARCHAR(40) DEFAULT 'general' NOT NULL;\r
\`\`\`\r
\r
### Example 7\r
\r
\`\`\`sql\r
ALTER TABLE LIBRARY.BOOKS\r
ADD CONSTRAINT BOOKS_YEAR_CK\r
CHECK (PUBLISHED_YEAR IS NULL OR PUBLISHED_YEAR >= 1000);\r
\`\`\`\r
\r
### Example 8\r
\r
\`\`\`sql\r
RENAME COLUMN LIBRARY.BOOKS.CATEGORY TO SECTION;\r
\`\`\`\r
\r
### Example 9\r
\r
\`\`\`sql\r
ALTER TABLE LIBRARY.BOOKS\r
DROP COLUMN SECTION RESTRICT;\r
\`\`\`\r
\r
## Chapter 14. Import, export, backup, and recovery\r
\r
[Open source chapter](./14-import-export-backup-and-recovery.md)\r
\r
### Example 1\r
\r
\`\`\`sql\r
CALL SYSCS_UTIL.SYSCS_EXPORT_TABLE(\r
    'LIBRARY',\r
    'BOOKS',\r
    'C:/derby-transfer/books.del',\r
    ',',\r
    '"',\r
    'UTF-8'\r
);\r
\`\`\`\r
\r
### Example 2\r
\r
\`\`\`text\r
1,"Clean Code",2008,TRUE\r
2,"The Pragmatic Programmer",1999,FALSE\r
\`\`\`\r
\r
### Example 3\r
\r
\`\`\`sql\r
CREATE TABLE LIBRARY.BOOKS_IMPORT (\r
    BOOK_ID INTEGER NOT NULL PRIMARY KEY,\r
    TITLE VARCHAR(120) NOT NULL,\r
    PUBLISHED_YEAR INTEGER,\r
    AVAILABLE BOOLEAN DEFAULT TRUE NOT NULL\r
);\r
\`\`\`\r
\r
### Example 4\r
\r
\`\`\`sql\r
CALL SYSCS_UTIL.SYSCS_IMPORT_TABLE(\r
    'LIBRARY',\r
    'BOOKS_IMPORT',\r
    'C:/derby-transfer/books.del',\r
    ',',\r
    '"',\r
    'UTF-8',\r
    0\r
);\r
\r
SELECT BOOK_ID, TITLE, PUBLISHED_YEAR, AVAILABLE\r
FROM LIBRARY.BOOKS_IMPORT\r
ORDER BY BOOK_ID;\r
\`\`\`\r
\r
### Example 5\r
\r
\`\`\`sql\r
CREATE TABLE LIBRARY.BOOKS_IMPORT_MIN (\r
    BOOK_ID INTEGER NOT NULL PRIMARY KEY,\r
    TITLE VARCHAR(120) NOT NULL\r
);\r
\`\`\`\r
\r
### Example 6\r
\r
\`\`\`sql\r
CALL SYSCS_UTIL.SYSCS_IMPORT_DATA(\r
    'LIBRARY',\r
    'BOOKS_IMPORT_MIN',\r
    'BOOK_ID,TITLE',\r
    '1,2',\r
    'C:/derby-transfer/books-with-extra-fields.del',\r
    ',',\r
    '"',\r
    'UTF-8',\r
    0\r
);\r
\`\`\`\r
\r
### Example 7\r
\r
\`\`\`sql\r
COMMIT;\r
CALL SYSCS_UTIL.SYSCS_EXPORT_TABLE(\r
    'LIBRARY', 'BOOKS',\r
    'C:/derby-transfer/books-next.del', ',', '"', 'UTF-8'\r
);\r
\`\`\`\r
\r
### Example 8\r
\r
\`\`\`sql\r
CALL SYSCS_UTIL.SYSCS_BACKUP_DATABASE(\r
    'C:/derby-backups/librarydb-2026-10-03'\r
);\r
\`\`\`\r
\r
### Example 9\r
\r
\`\`\`text\r
CONNECT 'jdbc:derby:librarydb;restoreFrom=C:/derby-backups/librarydb-2026-10-03';\r
\`\`\`\r
\r
### Example 10\r
\r
\`\`\`text\r
CONNECT 'jdbc:derby:librarydb;rollForwardRecoveryFrom=C:/derby-backups/librarydb-2026-10-03';\r
\`\`\`\r
\r
## Chapter 15. Authentication, authorization, and security\r
\r
[Open source chapter](./15-authentication-authorization-and-security.md)\r
\r
### Example 1\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby:securedb;create=true;user=DBOWNER';\r
\r
CALL SYSCS_UTIL.SYSCS_CREATE_USER(\r
    'DBOWNER', 'replace-with-a-strong-owner-password'\r
);\r
CALL SYSCS_UTIL.SYSCS_CREATE_USER(\r
    'APP_READER', 'replace-with-a-strong-reader-password'\r
);\r
CALL SYSCS_UTIL.SYSCS_CREATE_USER(\r
    'APP_WRITER', 'replace-with-a-strong-writer-password'\r
);\r
\`\`\`\r
\r
### Example 2\r
\r
\`\`\`text\r
CONNECT 'jdbc:derby:securedb;shutdown=true';\r
\`\`\`\r
\r
### Example 3\r
\r
\`\`\`sql\r
CALL SYSCS_UTIL.SYSCS_SET_DATABASE_PROPERTY(\r
    'derby.database.sqlAuthorization', 'true'\r
);\r
\`\`\`\r
\r
### Example 4\r
\r
\`\`\`text\r
CONNECT 'jdbc:derby:securedb;user=DBOWNER;password=replace-with-owner-password';\r
\`\`\`\r
\r
### Example 5\r
\r
\`\`\`java\r
Properties credentials = new Properties();\r
credentials.setProperty("user", System.getenv("DERBY_USER"));\r
credentials.setProperty("password", System.getenv("DERBY_PASSWORD"));\r
\r
try (Connection connection = DriverManager.getConnection(\r
        "jdbc:derby:securedb", credentials)) {\r
    System.out.println("Connected as " + connection.getMetaData().getUserName());\r
}\r
\`\`\`\r
\r
### Example 6\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby:securedb;user=DBOWNER;password=replace-with-owner-password';\r
\r
CREATE ROLE library_reader;\r
GRANT SELECT ON TABLE LIBRARY.BOOKS TO library_reader;\r
GRANT library_reader TO APP_READER;\r
\`\`\`\r
\r
### Example 7\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby:securedb;user=APP_READER;password=replace-with-reader-password';\r
SET ROLE library_reader;\r
\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS;\r
\`\`\`\r
\r
### Example 8\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby:securedb;user=DBOWNER;password=replace-with-owner-password';\r
\r
CREATE ROLE library_writer;\r
GRANT SELECT, INSERT, UPDATE ON TABLE LIBRARY.BOOKS TO library_writer;\r
GRANT library_writer TO APP_WRITER;\r
\`\`\`\r
\r
### Example 9\r
\r
\`\`\`sql\r
REVOKE INSERT ON TABLE LIBRARY.BOOKS FROM library_writer;\r
\`\`\`\r
\r
## Chapter 16. Testing and troubleshooting\r
\r
[Open source chapter](./16-testing-and-troubleshooting.md)\r
\r
### Example 1\r
\r
\`\`\`sql\r
CONNECT 'jdbc:derby:library_test;create=true';\r
\r
CREATE TABLE APP.TEST_BOOKS (\r
    BOOK_ID INTEGER NOT NULL PRIMARY KEY,\r
    TITLE VARCHAR(120) NOT NULL\r
);\r
\r
INSERT INTO APP.TEST_BOOKS (BOOK_ID, TITLE)\r
VALUES (1, 'Test Book');\r
\r
SELECT BOOK_ID, TITLE\r
FROM APP.TEST_BOOKS;\r
\`\`\`\r
\r
### Example 2\r
\r
\`\`\`java\r
String sql = "SELECT TITLE FROM APP.TEST_BOOKS WHERE BOOK_ID = ?";\r
\r
try (PreparedStatement statement = connection.prepareStatement(sql)) {\r
    statement.setInt(1, 1);\r
\r
    try (ResultSet results = statement.executeQuery()) {\r
        if (!results.next()) {\r
            throw new AssertionError("Expected one test book");\r
        }\r
\r
        String title = results.getString("TITLE");\r
        if (!"Test Book".equals(title)) {\r
            throw new AssertionError("Unexpected title: " + title);\r
        }\r
        if (results.next()) {\r
            throw new AssertionError("Expected exactly one matching row");\r
        }\r
    }\r
}\r
\`\`\`\r
\r
### Example 3\r
\r
\`\`\`sql\r
INSERT INTO APP.TEST_BOOKS (BOOK_ID, TITLE)\r
VALUES (1, 'Duplicate key');\r
\`\`\`\r
\r
### Example 4\r
\r
\`\`\`java\r
connection.setAutoCommit(false);\r
try {\r
    // Perform test inserts and updates here.\r
    connection.rollback();\r
} catch (SQLException exception) {\r
    connection.rollback();\r
    throw exception;\r
} finally {\r
    connection.setAutoCommit(true);\r
}\r
\`\`\`\r
\r
### Example 5\r
\r
\`\`\`java\r
try {\r
    // Run a statement that uses the database.\r
} catch (SQLException exception) {\r
    for (SQLException current = exception;\r
         current != null;\r
         current = current.getNextException()) {\r
        System.err.printf(\r
                "SQLState=%s, code=%d, message=%s%n",\r
                current.getSQLState(),\r
                current.getErrorCode(),\r
                current.getMessage());\r
    }\r
}\r
\`\`\`\r
\r
### Example 6\r
\r
\`\`\`sql\r
VALUES SYSCS_UTIL.SYSCS_CHECK_TABLE('LIBRARY', 'BOOKS');\r
\`\`\`\r
\r
### Example 7\r
\r
\`\`\`sql\r
CALL SYSCS_UTIL.SYSCS_SET_RUNTIMESTATISTICS(1);\r
\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR >= 2000;\r
\r
VALUES SYSCS_UTIL.SYSCS_GET_RUNTIMESTATISTICS();\r
\r
CALL SYSCS_UTIL.SYSCS_SET_RUNTIMESTATISTICS(0);\r
\`\`\`\r
\r
### Example 8\r
\r
\`\`\`text\r
MaximumDisplayWidth 5000\r
\`\`\`\r
\r
### Example 9\r
\r
\`\`\`sql\r
CALL SYSCS_UTIL.SYSCS_SET_RUNTIMESTATISTICS(1);\r
CALL SYSCS_UTIL.SYSCS_SET_STATISTICS_TIMING(1);\r
\`\`\`\r
\r
### Example 10\r
\r
\`\`\`text\r
java -jar "\${env:DERBY_HOME}/lib/derbyrun.jar" sysinfo\r
\`\`\`\r
\r
### Example 11\r
\r
\`\`\`text\r
java -jar "\${env:DERBY_HOME}/lib/derbyrun.jar" dblook -d "jdbc:derby:librarydb"\r
\`\`\`\r
\r
## Chapter 17. Performance and operating considerations\r
\r
[Open source chapter](./17-performance-and-operations.md)\r
\r
### Example 1\r
\r
\`\`\`sql\r
SELECT BOOK_ID, TITLE\r
FROM LIBRARY.BOOKS\r
WHERE PUBLISHED_YEAR >= 2000\r
ORDER BY PUBLISHED_YEAR, BOOK_ID;\r
\`\`\`\r
\r
### Example 2\r
\r
\`\`\`java\r
String sql = "SELECT BOOK_ID, TITLE "\r
        + "FROM LIBRARY.BOOKS "\r
        + "WHERE PUBLISHED_YEAR >= ? "\r
        + "ORDER BY PUBLISHED_YEAR, BOOK_ID";\r
\r
try (PreparedStatement statement = connection.prepareStatement(sql)) {\r
    statement.setInt(1, firstYear);\r
    try (ResultSet results = statement.executeQuery()) {\r
        while (results.next()) {\r
            System.out.println(\r
                    results.getInt("BOOK_ID") + ": "\r
                            + results.getString("TITLE"));\r
        }\r
    }\r
}\r
\`\`\`\r
\r
### Example 3\r
\r
\`\`\`sql\r
CREATE INDEX LIBRARY.BOOKS_YEAR_IX\r
ON LIBRARY.BOOKS (PUBLISHED_YEAR);\r
\`\`\`\r
\r
### Example 4\r
\r
\`\`\`sql\r
CREATE INDEX LIBRARY.BOOKS_YEAR_TITLE_IX\r
ON LIBRARY.BOOKS (PUBLISHED_YEAR, TITLE);\r
\`\`\`\r
\r
### Example 5\r
\r
\`\`\`sql\r
CALL SYSCS_UTIL.SYSCS_UPDATE_STATISTICS(\r
    'LIBRARY', 'BOOKS', NULL\r
);\r
\`\`\`\r
\r
### Example 6\r
\r
\`\`\`java\r
String sql = "INSERT INTO LIBRARY.BOOKS "\r
        + "(BOOK_ID, TITLE, PUBLISHED_YEAR, AVAILABLE) "\r
        + "VALUES (?, ?, ?, ?)";\r
\r
connection.setAutoCommit(false);\r
try (PreparedStatement statement = connection.prepareStatement(sql)) {\r
    for (Book book : books) {\r
        statement.setInt(1, book.id());\r
        statement.setString(2, book.title());\r
        statement.setInt(3, book.publishedYear());\r
        statement.setBoolean(4, book.available());\r
        statement.addBatch();\r
    }\r
\r
    statement.executeBatch();\r
    connection.commit();\r
} catch (SQLException exception) {\r
    connection.rollback();\r
    throw exception;\r
} finally {\r
    connection.setAutoCommit(true);\r
}\r
\`\`\`\r
\r
### Example 7\r
\r
\`\`\`sql\r
CALL SYSCS_UTIL.SYSCS_COMPRESS_TABLE(\r
    'LIBRARY', 'BOOKS', 1\r
);\r
\`\`\`\r
\r
| [Previous: Performance and operating considerations](17-performance-and-operations.md) | [Notes index](../README.md) | [Next: Complete questions and answers](99-complete-q-and-a.md) |\r
| --- | --- | --- |\r
`,"./chapters/99-complete-q-and-a.md":`# 99. Complete questions and answers\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: All code samples](98-all-code-samples.md) | [Notes index](../README.md) | [Next: Notes index](../README.md) |\r
| --- | --- | --- |\r
\r
Use these questions to review the core ideas from the notes. Answers focus on the reason behind each concept. For full SQL and Java examples, open the linked chapter or the [all code samples appendix](98-all-code-samples.md).\r
\r
## 1. Relational databases and Derby\r
\r
### 1. What does a relational database store?\r
\r
It stores related data in tables. A table has columns that describe each value and rows that hold individual records.\r
\r
### 2. Why does a table need a primary key?\r
\r
A primary key identifies each row uniquely and cannot be \`NULL\`. Other tables can refer to that stable identifier instead of copying all of the row's values.\r
\r
### 3. What does a foreign key protect?\r
\r
A foreign key requires a value in one table to match a key in a referenced table. It prevents a row from pointing to a record that does not exist.\r
\r
### 4. What is a Derby database?\r
\r
It is a set of database files managed by the Derby engine. Applications connect to it through Derby's JDBC driver.\r
\r
### 5. How do embedded and Network Server modes differ?\r
\r
In embedded mode, the application and Derby engine run in the same Java process. In Network Server mode, a separate Derby server process accepts JDBC connections from clients.\r
\r
### 6. Does Derby require a separate database server for embedded use?\r
\r
No. An embedded application loads the Derby engine directly. The Network Server is only needed when separate client processes must connect over a network.\r
\r
## 2. Java compatibility, setup, and tools\r
\r
### 7. Which Derby version do these notes use?\r
\r
The examples use Derby 10.17.1.0. That release is listed for Java 21 and higher, so confirm the Java requirement before selecting jars for an older runtime.\r
\r
### 8. What is \`DERBY_HOME\`?\r
\r
It is a convenient environment variable pointing to the Derby installation directory. The \`lib\` folder contains jars, and the \`bin\` folder contains command scripts in the binary distribution.\r
\r
### 9. Which jar is needed for embedded JDBC?\r
\r
The embedded engine and driver are in \`derby.jar\`. Tools such as \`ij\` and \`dblook\` also need the Derby tools classes, which are included in the distribution's tools jars or launch setup.\r
\r
### 10. What does \`ij\` do?\r
\r
\`ij\` is a command-line JDBC tool for connecting to Derby and running SQL statements or scripts. It is useful for checking database setup without writing an application first.\r
\r
### 11. What does \`sysinfo\` tell me?\r
\r
It reports details about the Java environment and Derby libraries that the process can see. Use it to investigate a missing driver or multiple Derby versions on the classpath.\r
\r
### 12. What is the current maintenance status of Derby?\r
\r
The Apache project moved Derby to retired, read-only status on October 10, 2025. Development and bug fixes have ended, and no further releases are planned.\r
\r
## 3. Using \`ij\` and creating a database\r
\r
### 13. How do I create a database from \`ij\`?\r
\r
Connect with a JDBC URL such as \`jdbc:derby:librarydb;create=true\`. Derby creates the database if it does not already exist.\r
\r
### 14. Is \`CREATE DATABASE\` a Derby SQL statement?\r
\r
No. Create or access a Derby database through connection URL attributes such as \`create=true\`.\r
\r
### 15. Where does Derby put a relative database path?\r
\r
It uses the configured Derby system home or the process working directory, depending on configuration. Use a deliberate system home or an absolute path so the database location is clear.\r
\r
### 16. How do I run a saved SQL file?\r
\r
Start \`ij\` with the script file path or use \`ij\`'s run command. Keep statements terminated correctly and include the \`CONNECT\` command if the script needs a particular database.\r
\r
### 17. Why might a shutdown connection report an exception?\r
\r
Derby reports that the database has shut down through the JDBC connection attempt. For the documented shutdown URL, that exception is the expected confirmation that shutdown completed.\r
\r
### 18. Can I delete a database while Derby is using it?\r
\r
No. Shut the database down first. Removing files while the engine has the database open can damage the database.\r
\r
## 4. Schemas, tables, and data types\r
\r
### 19. What is a schema?\r
\r
A schema is a namespace for database objects such as tables, views, indexes, and routines. Qualifying a table as \`LIBRARY.BOOKS\` makes its schema explicit.\r
\r
### 20. What is Derby's common default schema?\r
\r
For a new user it is commonly \`APP\`. The current schema affects how Derby resolves unqualified object names.\r
\r
### 21. What is the difference between \`NULL\` and an empty string?\r
\r
\`NULL\` means a value is absent or unknown. An empty string is a present text value with zero characters.\r
\r
### 22. When should I use \`DECIMAL\` instead of \`DOUBLE\`?\r
\r
Use \`DECIMAL\` for exact decimal values such as prices. \`DOUBLE\` is approximate and can produce small rounding differences.\r
\r
### 23. When is an identity column useful?\r
\r
Use it when Derby should generate a numeric key for each inserted row. Generated values can have gaps, so do not treat them as a gap-free count.\r
\r
### 24. Why use \`DATE\` or \`TIMESTAMP\` instead of text for dates?\r
\r
Date and timestamp types support date comparisons, sorting, and date operations. Text dates can sort incorrectly when their formats differ.\r
\r
## 5. Constraints and indexes\r
\r
### 25. What is a \`NOT NULL\` constraint for?\r
\r
It requires every row to provide a value for that column. Use it when a record is incomplete or invalid without that value.\r
\r
### 26. What is the difference between \`UNIQUE\` and a primary key?\r
\r
Both prevent duplicate key values. A primary key also identifies the table's main row key and cannot contain \`NULL\` values.\r
\r
### 27. What does a \`CHECK\` constraint do?\r
\r
It limits values to a condition that must be true for each row. For example, a year can be required to be positive or within an accepted range.\r
\r
### 28. Why might Derby create an index automatically?\r
\r
Primary key and unique constraints use an index to enforce uniqueness. The referenced side of a foreign key must have a primary key or unique key; an index on the referencing columns can also help queries and deletes that look up related rows.\r
\r
### 29. Should I index every column used in a query?\r
\r
No. Each index uses storage and adds work to inserts, updates, and deletes. Add indexes for measured query patterns and compare the execution plan.\r
\r
### 30. What is a composite index?\r
\r
It is one index containing multiple columns in a defined order. The order affects which filters and sorts can use it, so choose it based on actual query patterns.\r
\r
## 6. Inserting, updating, and deleting data\r
\r
### 31. How can I insert only selected columns?\r
\r
Name the target columns in the \`INSERT\` statement and provide values in the same order. Other columns need defaults or must allow \`NULL\`.\r
\r
### 32. What happens if an \`UPDATE\` has no \`WHERE\` clause?\r
\r
It updates every row in the table. Check the predicate and target rows before running an update against important data.\r
\r
### 33. What happens if a \`DELETE\` has no \`WHERE\` clause?\r
\r
It deletes every row in the table. It keeps the table definition, unlike dropping the table.\r
\r
### 34. How do I update one row safely?\r
\r
Use a predicate that identifies the intended row, preferably through a primary key. In JDBC, bind the key with a prepared statement and check the affected-row count.\r
\r
### 35. What should an application do if an insert violates a constraint?\r
\r
Catch the \`SQLException\`, inspect its SQLState and message, and decide whether to show a validation error or roll back the transaction. Do not silently ignore the failure.\r
\r
### 36. What does \`COMMIT\` do?\r
\r
It makes the current transaction's changes permanent and releases the transaction's locks. With JDBC auto-commit enabled, Derby commits each completed statement automatically.\r
\r
## 7. Selecting and filtering data\r
\r
### 37. Why should a query list its columns instead of using \`SELECT *\`?\r
\r
It returns only the fields the caller needs and makes the result shape clear. It also avoids unexpected extra data when the table changes.\r
\r
### 38. How do I test whether a column has no value?\r
\r
Use \`IS NULL\` or \`IS NOT NULL\`. Comparing with \`= NULL\` does not test for missing values correctly.\r
\r
### 39. Does a query have a guaranteed row order without \`ORDER BY\`?\r
\r
No. Specify \`ORDER BY\` whenever the application depends on a particular order.\r
\r
### 40. What do \`%\` and \`_\` mean in a \`LIKE\` pattern?\r
\r
\`%\` matches any number of characters, including none. \`_\` matches exactly one character.\r
\r
### 41. How do I return only the first few rows?\r
\r
Use Derby's \`FETCH FIRST n ROWS ONLY\` clause. Pair it with \`ORDER BY\` when you need a predictable set of rows.\r
\r
### 42. Why should Java bind values with \`PreparedStatement\`?\r
\r
It keeps values separate from SQL syntax, handles type conversion, and helps prevent input from changing the query structure. It does not bind table or column names.\r
\r
## 8. Joins, subqueries, and views\r
\r
### 43. What rows does an inner join return?\r
\r
It returns rows with matching join values in both inputs. Rows without a match are omitted.\r
\r
### 44. When is a left join useful?\r
\r
It keeps every row from the left table and adds matching values from the right table when they exist. The right-side columns are \`NULL\` when there is no match.\r
\r
### 45. Why should a join condition compare related keys?\r
\r
It expresses the relationship between the tables. Missing or incorrect join conditions can create many unintended row combinations.\r
\r
### 46. What is a correlated subquery?\r
\r
It refers to a value from the outer query. It is evaluated in relation to each candidate outer row, so check the plan and result carefully for large inputs.\r
\r
### 47. When can \`EXISTS\` be clearer than a join?\r
\r
Use \`EXISTS\` when the question is whether at least one related row exists and no columns from that related row are needed in the result.\r
\r
### 48. Is a Derby view a stored copy of its query results?\r
\r
No. A view stores a query definition and presents its results when queried. Derby views are not updatable, and a view defined with \`SELECT *\` does not automatically gain columns added to its base table.\r
\r
## 9. Transactions and concurrency\r
\r
### 49. What is a transaction?\r
\r
It is a group of database operations treated as one unit. A transaction either commits its changes or rolls them back.\r
\r
### 50. What does JDBC auto-commit mean?\r
\r
Each completed statement is committed automatically. Turn auto-commit off when several statements must succeed or fail together.\r
\r
### 51. When should an application call \`rollback()\`?\r
\r
Call it when a transaction cannot safely complete. It undoes the uncommitted work in that transaction.\r
\r
### 52. What is isolation in a database?\r
\r
Isolation controls which changes one transaction can observe while other transactions are running. More restrictive isolation can reduce anomalies but can increase waiting.\r
\r
### 53. What is a deadlock?\r
\r
It is a cycle where transactions each wait for a lock held by another transaction in the cycle. Derby aborts a transaction so the remaining work can proceed.\r
\r
### 54. How can an application reduce lock contention?\r
\r
Keep transactions short, access shared tables in a consistent order, and avoid waiting for network or user activity while holding locks.\r
\r
## 10. JDBC connections and prepared statements\r
\r
### 55. What does JDBC provide?\r
\r
JDBC is Java's API for opening database connections, executing SQL, and reading results. Derby supplies JDBC drivers for embedded and Network Server connections.\r
\r
### 56. Why use \`try\` with resources for JDBC objects?\r
\r
It closes a \`Connection\`, \`Statement\`, and \`ResultSet\` when the code finishes or fails. Leaving them open can hold locks and database resources.\r
\r
### 57. Which number does the first prepared-statement parameter use?\r
\r
Parameters are numbered from \`1\`. Bind each value using the setter that matches its type.\r
\r
### 58. Should user input be concatenated into SQL?\r
\r
No. Use placeholders and bind values with a prepared statement. Build dynamic identifiers only from a controlled allowlist because parameters represent values, not SQL identifiers.\r
\r
### 59. How do I know how many rows an update changed?\r
\r
Read the integer returned by \`executeUpdate()\`. Use it to confirm that the expected number of rows matched the statement.\r
\r
### 60. How do I read a query result?\r
\r
Call \`executeQuery()\` and advance its \`ResultSet\` with \`next()\`. Read each current row by column label or index before advancing again.\r
\r
## 11. Embedded mode and database lifecycle\r
\r
### 61. Where does the embedded Derby engine run?\r
\r
Inside the application's Java process. The application and database engine share a JVM and load the embedded driver.\r
\r
### 62. Can two unrelated processes open the same embedded database at once?\r
\r
An embedded database is normally owned by the process that booted it. Use Network Server mode when separate client processes need concurrent access to one database.\r
\r
### 63. What does \`derby.system.home\` control?\r
\r
It sets the base directory Derby uses for relative database names and system files. Configure it before the engine starts so databases are created in a predictable place.\r
\r
### 64. How do I shut down one embedded database?\r
\r
Use the database connection URL with \`shutdown=true\` and the database name. Derby closes that database and reports the shutdown through the connection attempt.\r
\r
### 65. How do I shut down the full Derby engine?\r
\r
Use the system shutdown URL without a database name, such as \`jdbc:derby:;shutdown=true\`. The exact shutdown procedure depends on embedded or Network Server mode.\r
\r
### 66. Can I move a database directory while Derby is running?\r
\r
No. Shut the database down cleanly first, or use Derby's online backup procedure to create a consistent copy.\r
\r
## 12. Network Server and client connections\r
\r
### 67. What is the role of the Network Server?\r
\r
It hosts the Derby engine and accepts remote JDBC client connections. It lets multiple client processes connect to the same database through the server.\r
\r
### 68. What is the role of the Network Client driver?\r
\r
It sends JDBC requests from the application to a Derby Network Server. It does not host the database engine itself.\r
\r
### 69. What does a network JDBC URL look like?\r
\r
It commonly looks like \`jdbc:derby://host:1527/databaseName\`. Replace the host and database name with the actual server and database.\r
\r
### 70. Where does a server-side import or export file path refer to?\r
\r
It refers to the server machine's file system, because the Derby engine running on the server reads or writes the file.\r
\r
### 71. Should the Network Server listen on every network interface by default?\r
\r
No. Keep it on localhost unless remote connections are needed. If remote access is enabled, restrict it with firewall rules and protect the connection with SSL/TLS.\r
\r
### 72. What should I check when a client cannot connect?\r
\r
Check that the server is running, the host and port are correct, the database name exists, network rules allow the connection, and the client has the matching Derby network driver.\r
\r
## 13. Metadata and schema changes\r
\r
### 73. What can \`DatabaseMetaData\` tell an application?\r
\r
It can report tables, columns, keys, driver details, and other database structure information through JDBC. It is useful when the application must inspect a database at runtime.\r
\r
### 74. Why does Derby metadata code often pass \`null\` for catalog?\r
\r
Derby does not use catalogs in the same way as some databases. Pass \`null\` for the catalog argument and provide the schema and table patterns.\r
\r
### 75. Why do metadata searches often use uppercase names?\r
\r
Unquoted Derby identifiers are normalized to uppercase. Metadata patterns should match the stored form, such as \`LIBRARY\` and \`BOOKS\`.\r
\r
### 76. Should application code write to \`SYS\` catalog tables?\r
\r
No. Treat system catalogs as read-only sources for inspection. Use supported SQL statements and JDBC metadata methods to change or inspect schema objects.\r
\r
### 77. Why should a migration be tested before applying it?\r
\r
A migration can fail because existing rows violate a new constraint or because a dependent view or query expects an old column. Test it against a copy and back up important data first.\r
\r
### 78. Does a view using \`SELECT *\` gain columns when its table changes?\r
\r
No. Its result columns are fixed when the view is created. Recreate the view if it should include a newly added base-table column.\r
\r
## 14. Import, export, backup, and recovery\r
\r
### 79. When should I export rows instead of backing up the database?\r
\r
Export rows when moving or inspecting table data in a delimited file. Use a database backup when you need a consistent copy of the complete Derby database.\r
\r
### 80. Can \`SYSCS_EXPORT_TABLE\` overwrite an existing file?\r
\r
No. The export destination must be a new file. Choose a new path or move the previous file before exporting again.\r
\r
### 81. What must be true before importing a file?\r
\r
The target table must already exist, and the input columns, order, types, and delimiters must match the import call. Table constraints still apply to imported rows.\r
\r
### 82. What is the difference between import insert and replace modes?\r
\r
Insert mode appends imported rows to existing table data. Replace mode removes all existing rows before loading the file, while keeping the table definition and indexes.\r
\r
### 83. Why should I complete a transaction before an import or export procedure?\r
\r
Derby commits after a successful import or export procedure and rolls back after a failure. Finish unrelated work first so the procedure does not commit it unexpectedly.\r
\r
### 84. What does an online backup contain?\r
\r
It copies the full database directory to a backup location while Derby is running. It is different from a delimited file export of one table.\r
\r
### 85. Is restoring a full backup safe over an existing database?\r
\r
It replaces a same-named database in the configured Derby home. Confirm the target and rehearse on an isolated copy before restoring important data.\r
\r
### 86. What does roll-forward recovery require?\r
\r
It requires a full backup plus the archived and active log files needed to replay transactions since the backup. It restores the whole database, not a single table.\r
\r
## 15. Authentication, authorization, and security\r
\r
### 87. What is the difference between authentication and authorization?\r
\r
Authentication checks who is connecting. Authorization checks which database operations that identity may perform.\r
\r
### 88. What is NATIVE authentication?\r
\r
It stores user names and encrypted passwords in a Derby database. Derby can use that database's credentials to authenticate users.\r
\r
### 89. Which user must be created first when enabling NATIVE authentication?\r
\r
The database owner must be the first user whose credentials are stored. Derby enables NATIVE authentication after the database is shut down and booted again.\r
\r
### 90. Does NATIVE authentication also enable SQL authorization?\r
\r
Yes. Derby enables fine-grained SQL authorization with NATIVE authentication, so the database owner can use roles and \`GRANT\` statements to assign privileges.\r
\r
### 91. Why grant privileges through roles?\r
\r
Roles group permissions by job, such as read-only access or the ability to add and update books. This is easier to review and narrower than giving each user broad access.\r
\r
### 92. What is the risk of granting a privilege to \`PUBLIC\`?\r
\r
The privilege applies to every current and future user. Grant it only when that broad access is intended.\r
\r
### 93. Does a password protect Network Server traffic from being read?\r
\r
No. Authentication verifies identity, but transport encryption requires SSL/TLS. Restrict remote access with a firewall as well.\r
\r
### 94. Where should an application store database credentials?\r
\r
Use a protected configuration source supplied by the runtime environment. Do not commit passwords, place them in public URLs, or write them to logs.\r
\r
## 16. Testing and troubleshooting\r
\r
### 95. Why should database tests use an isolated database?\r
\r
An isolated database gives each test predictable data and prevents tests from changing a real working database. It also makes failures easier to repeat.\r
\r
### 96. What information should I inspect in a Derby \`SQLException\`?\r
\r
Inspect the SQLState, message, error code, and chained exceptions. The next exception can contain details that are not in the first one.\r
\r
### 97. Is Derby's integer error code a unique error identifier?\r
\r
No. It represents error severity and is not unique to each error. Use the SQLState and message to understand the failure.\r
\r
### 98. What does \`SYSCS_UTIL.SYSCS_CHECK_TABLE\` return for a consistent table?\r
\r
It returns a non-zero \`SMALLINT\`, normally \`1\`. If Derby finds an inconsistency, it throws an exception.\r
\r
### 99. How do I inspect a query's execution plan in Derby?\r
\r
Enable runtime statistics on the connection, run the query, and read \`SYSCS_UTIL.SYSCS_GET_RUNTIMESTATISTICS()\`. Turn statistics collection off after the inspection.\r
\r
### 100. Which Derby tools help diagnose setup problems?\r
\r
Use \`ij\` to connect and run SQL, \`sysinfo\` to inspect Java and Derby libraries, \`dblook\` to print schema DDL, and \`NetworkServerControl\` for server operations.\r
\r
### 101. Should I run a table consistency check after every query?\r
\r
No. It can take a long time on a large table. Use it when investigating a suspected storage issue or checking a backup copy.\r
\r
## 17. Performance and operating considerations\r
\r
### 102. What should I measure before adding an index?\r
\r
Record the slow query, its input values, representative table size, and runtime plan. Then test whether an index improves reads enough to justify its storage and write costs.\r
\r
### 103. Why does the order of columns matter in a composite index?\r
\r
The index stores its columns in a defined order. A query can make the best use of its leading columns, so choose the order to match the filters and sorting used by real queries.\r
\r
### 104. When should I refresh index statistics?\r
\r
Refresh them after a substantial change in the distribution or number of distinct values in indexed columns. Stale estimates can lead the optimizer to choose a less useful plan.\r
\r
### 105. What does \`SYSCS_UTIL.SYSCS_COMPRESS_TABLE\` do?\r
\r
It rebuilds a table and its indexes to reclaim unused allocated space. It takes an exclusive table lock, so schedule it when applications can wait.\r
\r
### 106. What does the sequential compression argument control?\r
\r
A non-zero value makes Derby compress the table and indexes one at a time. This reduces temporary memory and disk space but takes longer.\r
\r
### 107. Why should a transaction be short?\r
\r
Locks remain held until commit or rollback. Short transactions release locks sooner and reduce the chance that other work must wait.\r
\r
### 108. What should happen before a Derby database upgrade?\r
\r
Back up and verify a copy, check the loaded Derby jars, and test the upgrade before changing the only working database. A full upgrade can prevent older Derby versions from opening that database.\r
\r
### 109. Why is Derby's retired status relevant to new systems?\r
\r
The project no longer publishes releases or bug fixes. That affects maintenance, security response, and support expectations for a new production system.\r
\r
## Further reading\r
\r
- [Apache Derby manuals](https://db.apache.org/derby/manuals/)\r
- [Apache Derby current status](https://db.apache.org/derby/derby_downloads)\r
- [Notes index](../README.md)\r
\r
| [Previous: All code samples](98-all-code-samples.md) | [Notes index](../README.md) | [Next: Notes index](../README.md) |\r
| --- | --- | --- |\r
`})).map(([e,t])=>{let n=e.split(`/`).at(-1);return{content:t,fileName:n,number:Number(n.match(/^\d+/)?.[0]??0),slug:n.replace(/^\d+-/,``).replace(/\.md$/i,``),title:(t.match(/^#\s+(.+)$/m)?.[1]??n).replace(/^\d+\.\s*/,``)}}).sort((e,t)=>e.number-t.number),h=`/notes/apache-derby-notes`,g=new Map(m.map(e=>[e.fileName,e]));function _({href:e=``,children:t,...n}){let{node:r,...i}=n,[a,s]=e.split(`#`),c=a.split(`/`).at(-1),l=g.get(c),u=s?`#${s}`:``;if(/^README\.md$/i.test(c))return(0,p.createElement)(o,{to:`${h}${u}`,...i},t);if(l)return(0,p.createElement)(o,{to:`${h}/${l.slug}${u}`,...i},t);let d=/^(https?:|mailto:|tel:)/i.test(e);return(0,p.createElement)(`a`,{href:e,target:d?`_blank`:void 0,rel:d?`noopener noreferrer`:void 0,...i},t)}var v={a:_},y=`# Apache Derby Notes

A practical guide to relational database concepts and Apache Derby, from setup and SQL fundamentals through JDBC, transactions, security, recovery, testing, and operations.

> **Project status:** Apache Derby entered read-only retired status on October 10, 2025. Development and bug fixes have ended and no further releases are planned. These notes preserve learning material and can help maintain existing Derby systems; review the project status before choosing Derby for new production work. See the [official Apache Derby status](https://db.apache.org/derby/).

The examples target Apache Derby 10.17.1.0 and Java 21 or newer. The Apache downloads page lists 10.17.1.0 as its Java 21+ release. Derby is retired, so downloads are provided as-is.

## Chapters

1. [Relational databases and Derby architecture](chapters/01-relational-databases-and-derby.md)
2. [Java compatibility, setup, and tools](chapters/02-compatibility-setup-and-tools.md)
3. [Using ij and creating a database](chapters/03-ij-and-first-database.md)
4. [Schemas, tables, and data types](chapters/04-schemas-tables-and-data-types.md)
5. [Constraints and indexes](chapters/05-constraints-and-indexes.md)
6. [Inserting, updating, and deleting data](chapters/06-insert-update-delete.md)
7. [Selecting and filtering data](chapters/07-select-and-filter.md)
8. [Joins, subqueries, and views](chapters/08-joins-subqueries-and-views.md)
9. [Transactions and concurrency](chapters/09-transactions-and-concurrency.md)
10. [JDBC connections and prepared statements](chapters/10-jdbc-connections-and-statements.md)
11. [Embedded mode and database lifecycle](chapters/11-embedded-mode-and-lifecycle.md)
12. [Network Server and client connections](chapters/12-network-server-and-client.md)
13. [Metadata and schema changes](chapters/13-metadata-and-schema-changes.md)
14. [Import, export, backup, and recovery](chapters/14-import-export-backup-and-recovery.md)
15. [Authentication, authorization, and security](chapters/15-authentication-authorization-and-security.md)
16. [Testing and troubleshooting](chapters/16-testing-and-troubleshooting.md)
17. [Performance and operating considerations](chapters/17-performance-and-operations.md)
18. [All code samples](chapters/98-all-code-samples.md)
19. [Complete questions and answers](chapters/99-complete-q-and-a.md)

The chapter pages retain the source notes and their examples. Use the sidebar to move between chapters; the previous/next links also work as in-app navigation.

## Official references

- [Apache Derby manuals](https://db.apache.org/derby/manuals/)
- [Apache Derby downloads and Java compatibility](https://db.apache.org/derby/derby_downloads)
- [Apache Derby FAQ](https://db.apache.org/derby/faq.html)
- [Apache Derby 10.17 Reference Manual](https://db.apache.org/derby/docs/10.17/ref/)
- [Apache Derby 10.17 Developer's Guide](https://db.apache.org/derby/docs/10.17/devguide/)
- [Apache Derby 10.17 Server and Administration Guide](https://db.apache.org/derby/docs/10.17/adminguide/)\r
`,b={layout:`_layout_1slef_1`,projectHeader:`_projectHeader_1slef_10`,backLink:`_backLink_1slef_27`,projectIdentity:`_projectIdentity_1slef_41`,eyebrow:`_eyebrow_1slef_44`,chapterCount:`_chapterCount_1slef_71`,body:`_body_1slef_83`,sidebar:`_sidebar_1slef_94`,sidebarHeading:`_sidebarHeading_1slef_107`,navigation:`_navigation_1slef_126`,navLink:`_navLink_1slef_141`,active:`_active_1slef_164`,navNumber:`_navNumber_1slef_166`,content:`_content_1slef_177`,chapterHeading:`_chapterHeading_1slef_180`,markdown:`_markdown_1slef_203`,missingChapter:`_missingChapter_1slef_245`,chapterNavigation:`_chapterNavigation_1slef_256`,referenceLink:`_referenceLink_1slef_283`},x=s(),S=`/notes/apache-derby-notes`;function C(){let{chapterSlug:e}=l(),{pathname:s}=n(),u=(0,p.useRef)(null),h=m.findIndex(t=>t.slug===e),g=h>=0?m[h]:null,_=e?g?.content:y;return(0,p.useEffect)(()=>{u.current?.querySelector(`[aria-current="page"]`)?.scrollIntoView({behavior:`smooth`,block:`nearest`})},[s]),(0,x.jsxs)(`div`,{className:b.layout,children:[(0,x.jsxs)(`header`,{className:b.projectHeader,children:[(0,x.jsxs)(o,{className:b.backLink,to:`/notes`,children:[(0,x.jsx)(c,{"aria-hidden":`true`}),` All notes`]}),(0,x.jsxs)(`div`,{className:b.projectIdentity,children:[(0,x.jsxs)(`span`,{className:b.eyebrow,children:[(0,x.jsx)(i,{"aria-hidden":`true`}),` DATABASES AND SQL`]}),(0,x.jsx)(`h1`,{children:`Apache Derby Notes`}),(0,x.jsx)(`p`,{children:`Practical SQL, Java APIs, and operations notes for Apache Derby.`})]}),(0,x.jsxs)(`span`,{className:b.chapterCount,children:[m.length,` chapters`]})]}),(0,x.jsxs)(`div`,{className:b.body,children:[(0,x.jsxs)(`aside`,{className:b.sidebar,children:[(0,x.jsxs)(`div`,{className:b.sidebarHeading,children:[(0,x.jsx)(`span`,{children:`CONTENTS`}),(0,x.jsx)(`strong`,{children:`Apache Derby study guide`})]}),(0,x.jsxs)(`nav`,{ref:u,className:b.navigation,"aria-label":`Apache Derby notes chapters`,children:[(0,x.jsxs)(a,{to:S,end:!0,className:({isActive:e})=>`${b.navLink} ${e?b.active:``}`,children:[(0,x.jsx)(i,{"aria-hidden":`true`}),(0,x.jsx)(`span`,{children:`Overview`})]}),m.map(e=>(0,x.jsxs)(a,{to:`${S}/${e.slug}`,className:({isActive:e})=>`${b.navLink} ${e?b.active:``}`,children:[(0,x.jsx)(`span`,{className:b.navNumber,children:String(e.number).padStart(2,`0`)}),(0,x.jsx)(`span`,{children:e.title})]},e.slug))]})]}),(0,x.jsxs)(`main`,{className:b.content,children:[g&&(0,x.jsxs)(`div`,{className:b.chapterHeading,children:[(0,x.jsxs)(`span`,{children:[(0,x.jsx)(t,{"aria-hidden":`true`}),` CHAPTER `,String(g.number).padStart(2,`0`)]}),(0,x.jsx)(`h2`,{children:g.title})]}),_?(0,x.jsx)(`article`,{className:b.markdown,children:(0,x.jsx)(d,{remarkPlugins:[f],components:v,children:_})}):(0,x.jsxs)(`section`,{className:b.missingChapter,children:[(0,x.jsx)(`span`,{children:`CHAPTER NOT FOUND`}),(0,x.jsx)(`h2`,{children:`This Apache Derby notes chapter is unavailable.`}),(0,x.jsxs)(o,{to:S,children:[`Back to the Apache Derby notes index `,(0,x.jsx)(r,{"aria-hidden":`true`})]})]}),g&&(0,x.jsxs)(`nav`,{className:b.chapterNavigation,"aria-label":`Previous and next chapters`,children:[(0,x.jsxs)(o,{to:h===0?S:`${S}/${m[h-1].slug}`,children:[(0,x.jsx)(c,{"aria-hidden":`true`}),(0,x.jsx)(`span`,{children:h===0?`Notes index`:m[h-1].title})]}),h<m.length-1&&(0,x.jsxs)(o,{to:`${S}/${m[h+1].slug}`,children:[(0,x.jsx)(`span`,{children:m[h+1].title}),(0,x.jsx)(r,{"aria-hidden":`true`})]})]})]})]}),(0,x.jsxs)(`a`,{className:b.referenceLink,href:`https://db.apache.org/derby/manuals/`,target:`_blank`,rel:`noopener noreferrer`,children:[`Official Apache Derby Manuals `,(0,x.jsx)(r,{"aria-hidden":`true`})]})]})}export{C as default};