# 27 - Table headings, captions, and accessible structure: Questions and Answers

Practice questions for [Lesson 27 - Table headings, captions, and accessible structure](../lessons/27-accessible-tables.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. What is the purpose of a caption in a data table?

- A. To name the subject of the table.
- B. To create a column.
- C. To merge two cells.
- D. To style every row.

**Answer: A.** The caption identifies what the table contains so readers can decide whether to explore it.

### 2. Which element should mark a table heading cell?

- A. td
- B. th
- C. tr
- D. caption

**Answer: B.** Use th for a header cell and td for a data cell.

### 3. Which scope value describes a column header?

- A. row
- B. col
- C. table
- D. data

**Answer: B.** Use scope="col" to identify a header for a column.

### 4. Which scope value describes a row header?

- A. row
- B. col
- C. cell
- D. group

**Answer: A.** Use scope="row" to identify a header for a row.

### 5. What does the headers attribute contain?

- A. The visible caption of the table.
- B. Space-separated id values of associated header cells.
- C. The number of columns in the table.
- D. A list of all row values.

**Answer: B.** A data cell can use headers to list the ids of the th elements that provide its context.

### 6. Where should a headers value point?

- A. To any id on the page.
- B. To a class name on a table row.
- C. To ids of relevant th cells in the same table.
- D. To the table's caption text.

**Answer: C.** The references should identify the header cells associated with that cell in the same table.

### 7. Which attribute should each referenced header cell have?

- A. name
- B. id
- C. class
- D. value

**Answer: B.** The headers value refers to ids, so each header cell needs an id that can be referenced.

### 8. When should you consider using id and headers?

- A. For every two-column table.
- B. For a complex table where cells relate to multiple levels of headings.
- C. To add color to a row.
- D. To make a caption visible.

**Answer: B.** Most simple tables can use th and scope. Explicit ids and headers help describe complex header relationships.

### 9. What should you consider if a table has many merged cells and heading levels?

- A. Whether the data can be divided into simpler tables.
- B. Removing all the headings.
- C. Replacing every th with td.
- D. Adding more empty cells.

**Answer: A.** A simpler structure can be easier for everyone to understand and navigate.

### 10. What is the role of scope?

- A. It changes the visual appearance of a table.
- B. It describes which row or column a header applies to.
- C. It sets the width of a cell.
- D. It supplies alternative text for a table.

**Answer: B.** scope provides semantic information about a header's direction. It does not set the cell's visual style.

## True or false

### 1. A caption belongs inside its table.

**Answer: True.** Place the caption as a child of table, directly after the opening table tag.

### 2. Bold text in a td is a substitute for a th header cell.

**Answer: False.** Visual styling does not identify the cell as a header in the document structure.

### 3. scope="col" marks a header for the cells in a column.

**Answer: True.** It describes a column header relationship.

### 4. The scope attribute changes the table's visual style.

**Answer: False.** scope adds semantic information. Styling is handled separately.

### 5. A headers value may list several related header ids separated by spaces.

**Answer: True.** A complex data cell may refer to its row heading, group heading, and subheading.

### 6. Every simple table needs id and headers on all of its cells.

**Answer: False.** Use the simplest markup that describes the relationships. Straightforward tables commonly need th, td, and optionally scope.

### 7. Header cell ids referenced by headers should be unique and belong to th cells in the same table.

**Answer: True.** Unique, correct references help identify the intended headers.

### 8. The summary attribute is the recommended way to provide a table caption.

**Answer: False.** Use caption to name the table and regular nearby text for any longer explanation. The summary attribute on table is obsolete.

## Short-answer questions

### 1. What information should a useful caption provide?

**Answer:** It should concisely name the table's subject so readers can tell what its data is about.

### 2. How do th and td differ?

**Answer:** th marks a header cell that labels data. td marks a regular data cell.

### 3. What do scope="col" and scope="row" communicate?

**Answer:** scope="col" marks a column header, and scope="row" marks a row header.

### 4. What is the purpose of the headers attribute?

**Answer:** It explicitly associates a cell with one or more header cells by listing their ids.

### 5. How are multiple header ids written in a headers value?

**Answer:** Separate the ids with spaces, for example headers="region quarter sales".

### 6. When is scope usually enough, and when might headers be useful?

**Answer:** scope is usually enough when each header applies in a straightforward row or column direction. headers can help when a cell needs to be associated with several levels of headers in a complex table.

### 7. Why should a complex table be simplified when possible?

**Answer:** Many merged cells and header levels can be difficult to follow. Smaller, related tables can make the information easier to navigate and understand.

### 8. How is a heading before a table different from a caption?

**Answer:** A heading introduces a page section. A caption is part of the table and names that table's subject. Use both when both provide useful context.

## Practical questions

### 1. Add a caption and explicit column scopes to this table.

~~~html
<table>
  <tr>
    <th>Plant</th>
    <th>Location</th>
  </tr>
  <tr>
    <td>Basil</td>
    <td>Sunny window</td>
  </tr>
</table>
~~~

**Answer:**

~~~html
<table>
  <caption>Indoor plant locations</caption>
  <thead>
    <tr>
      <th scope="col">Plant</th>
      <th scope="col">Location</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Basil</td>
      <td>Sunny window</td>
    </tr>
  </tbody>
</table>
~~~

The caption names the table. The th elements and scope values identify the column headings.

### 2. Mark each plant name as a row header.

~~~html
<table>
  <tr>
    <th scope="col">Plant</th>
    <th scope="col">Watering</th>
  </tr>
  <tr>
    <td>Basil</td>
    <td>Every two days</td>
  </tr>
</table>
~~~

**Answer:**

~~~html
<table>
  <tr>
    <th scope="col">Plant</th>
    <th scope="col">Watering</th>
  </tr>
  <tr>
    <th scope="row">Basil</th>
    <td>Every two days</td>
  </tr>
</table>
~~~

Basil identifies the row, so it is a row header rather than an ordinary data cell.

### 3. Fix the scopes so the first heading applies to each column and the second heading applies to each row.

~~~html
<tr>
  <th scope="row">Day</th>
  <th scope="col">Monday</th>
</tr>
~~~

**Answer:**

~~~html
<tr>
  <th scope="col">Day</th>
  <th scope="row">Monday</th>
</tr>
~~~

Day labels the column, while Monday labels the row.

### 4. Add unique ids to the headers, then connect the score cell to both its row and column headers.

~~~html
<table>
  <tr>
    <th>Student</th>
    <th>Quiz</th>
  </tr>
  <tr>
    <th>Asha</th>
    <td>8</td>
  </tr>
</table>
~~~

**Answer:**

~~~html
<table>
  <tr>
    <th id="student-heading">Student</th>
    <th id="quiz-heading">Quiz</th>
  </tr>
  <tr>
    <th id="asha-heading" scope="row">Asha</th>
    <td headers="asha-heading quiz-heading">8</td>
  </tr>
</table>
~~~

The score cell references both the student row heading and the quiz column heading.

### 5. Connect the value to its group heading and subheading.

~~~html
<table>
  <tr>
    <th id="sales-group" colspan="2">Sales</th>
  </tr>
  <tr>
    <th id="quarter-one" headers="sales-group">Quarter one</th>
    <td headers="quarter-one">120</td>
  </tr>
</table>
~~~

**Answer:**

~~~html
<table>
  <tr>
    <th id="sales-group" colspan="2">Sales</th>
  </tr>
  <tr>
    <th id="quarter-one" headers="sales-group">Quarter one</th>
    <td headers="sales-group quarter-one">120</td>
  </tr>
</table>
~~~

The data cell's headers value names both the broader Sales heading and the Quarter one subheading.

### 6. Find and correct the duplicate id.

~~~html
<table>
  <tr>
    <th id="heading">Course</th>
    <th id="heading">Room</th>
  </tr>
  <tr>
    <td headers="heading">HTML</td>
    <td headers="heading">Room 2</td>
  </tr>
</table>
~~~

**Answer:**

~~~html
<table>
  <tr>
    <th id="course-heading">Course</th>
    <th id="room-heading">Room</th>
  </tr>
  <tr>
    <td headers="course-heading">HTML</td>
    <td headers="room-heading">Room 2</td>
  </tr>
</table>
~~~

Each header needs its own id, and each data cell should reference the header that describes it.

### 7. Identify the issue with this caption and fix it.

~~~html
<table>
  <tr>
    <td>Monday</td>
    <td>HTML workshop</td>
  </tr>
</table>
<p>Schedule</p>
~~~

**Answer:**

~~~html
<table>
  <caption>Workshop schedule</caption>
  <tr>
    <td>Monday</td>
    <td>HTML workshop</td>
  </tr>
</table>
~~~

The paragraph may be useful surrounding text, but it does not serve as the table's caption. Put the concise table name inside caption.

### 8. A table has many merged cells and is hard to follow. What should you consider before adding more headers attributes?

**Answer:** Consider whether the data can be divided into smaller, related tables with simpler row and column relationships. If the complex table is necessary, identify each header with a unique id and connect each data cell to its relevant headers.

## Related lesson

- [Lesson 27 - Table headings, captions, and accessible structure](../lessons/27-accessible-tables.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [26 - HTML tables: rows, columns, and cells](26-html-tables.md) | [Lesson](../lessons/27-accessible-tables.md) | [Example](../examples/27-accessible-tables.md) | [28 - Forms: the form element and submission flow](28-forms-overview.md) |
