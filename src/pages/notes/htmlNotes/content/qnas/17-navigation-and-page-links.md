# 17 - Navigation and linking between pages: Questions and Answers

Practice questions for [Lesson 17 - Navigation and linking between pages](../lessons/17-navigation-and-page-links.md). Each question is followed by its answer and an explanation or worked example where useful. Other navigation structures can also be correct when their purpose is clear.

## Multiple-choice questions

### 1. What is the main purpose of the nav element?

- A. To identify a major group of navigation links.
- B. To make all links blue.
- C. To submit a form.
- D. To create a heading.

**Answer: A.** Nav identifies a section of links that helps people move around a website or page.

### 2. Does every group of links need to be inside nav?

- A. Yes, every link must be inside nav.
- B. No, nav is mainly for important navigation groups.
- C. Yes, but only in the footer.
- D. No, because nav is obsolete.

**Answer: B.** A short related group of footer links does not always need its own navigation region.

### 3. What does aria-label="Main" do on a nav element?

- A. Gives the navigation region a descriptive name.
- B. Creates a link destination.
- C. Adds a visual menu.
- D. Marks the current page.

**Answer: A.** The label helps distinguish this navigation region from other nav regions.

### 4. Which list is usually a good fit for breadcrumb navigation?

- A. An ordered list.
- B. A description list.
- C. A form.
- D. A table.

**Answer: A.** Breadcrumbs show a sequence from a parent location to the current page, so an ordered list communicates that order.

### 5. What does aria-current="page" communicate?

- A. The link opens in a new tab.
- B. The item represents the current page.
- C. The item is disabled.
- D. The item is the first page in a site.

**Answer: B.** It marks the current page in a navigation set for assistive technology.

### 6. Does nav automatically style links as a menu?

- A. Yes, it adds a complete menu design.
- B. No, styling is handled separately, commonly with CSS.
- C. Yes, but only when it contains a list.
- D. No, nav makes links non-interactive.

**Answer: B.** Nav supplies meaning and a navigation landmark. It does not prescribe visual layout.

### 7. What should the breadcrumb trail usually represent?

- A. The visitor's exact click history.
- B. The page's place in the site's hierarchy.
- C. A list of all links on the page.
- D. The page's query string.

**Answer: B.** Breadcrumbs help people understand where the current page sits in the site's structure.

### 8. If a page has main site navigation and chapter navigation, what should you do?

- A. Put both in one unlabeled nav element.
- B. Use separate nav regions with names that distinguish their purposes.
- C. Remove one navigation region.
- D. Use buttons for every item.

**Answer: B.** Distinct labels help people tell the navigation regions apart.

### 9. What should a first page in a sequence do if there is no previous page?

- A. Include a fake previous link with href="#".
- B. Include only the navigation links that exist.
- C. Link to an unrelated page.
- D. Hide its next link too.

**Answer: B.** Do not create fake destinations. The first page can have a next link without a previous link.

### 10. Where can nav links point?

- A. Only to other websites.
- B. To other pages or to parts within a page.
- C. Only to files.
- D. Only to the page itself.

**Answer: B.** Navigation links can take users to another page or to a location within a page.

## True or false

### 1. The nav element identifies a section of navigation links.

**Answer: True.** It marks an important group of links for moving through a site or page.

### 2. Every footer link must be wrapped in a nav element.

**Answer: False.** A short set of footer links can remain in the footer without an extra nav region.

### 3. A nav element can contain a list of links.

**Answer: True.** An unordered or ordered list is a common way to organize navigation links.

### 4. A nav element must contain a list.

**Answer: False.** A list is common, but nav can contain other suitable content as well.

### 5. Two different navigation regions on a page should have names that help distinguish them.

**Answer: True.** For example, label one “Main” and another “On this page”.

### 6. The nav element automatically creates a horizontal menu.

**Answer: False.** It gives the content navigation meaning. Visual layout requires presentation styling.

### 7. A breadcrumb normally shows the site's hierarchy.

**Answer: True.** It indicates the current page's position in that hierarchy.

### 8. aria-current="page" can mark the current page in a navigation group.

**Answer: True.** It communicates the current item to assistive technology.

### 9. The first page in a lesson sequence must include a nonfunctional previous link.

**Answer: False.** Include only links to real pages in the sequence.

### 10. Previous and next links can be grouped in a nav region.

**Answer: True.** A clearly named navigation region can group the links for moving through a sequence.

## Fill in the blanks

### 1. The ______ element marks a major section of navigation links.

**Answer: nav.** It provides a semantic navigation region.

### 2. Use the ______ attribute to give a simple accessible name to a navigation region.

**Answer: aria-label.** For example, aria-label="Main".

### 3. Breadcrumb items are commonly arranged in an ______ list.

**Answer: ordered.** Their sequence communicates the hierarchy from the home page to the current page.

### 4. The attribute ______ can identify an item as the current page.

**Answer: aria-current.** The page value indicates the current page.

### 5. Breadcrumb navigation should usually show the site's ______.

**Answer: hierarchy.** It helps users understand how a page fits into the site's structure.

### 6. A short group of links in a footer does not always need its own ______ element.

**Answer: nav.** Use nav for important navigation sections, not every link group.

### 7. CSS is responsible for a menu's visual ______.

**Answer: layout.** Nav provides semantics, while CSS controls how links look and are arranged.

### 8. If no previous page exists in a sequence, omit the fake ______ link.

**Answer: previous.** Do not use an empty or made-up destination.

## Short-answer questions

### 1. What makes a group of links suitable for nav?

**Answer:** It is an important navigation section that helps people move to other pages or parts of the current page, such as a main site menu or a page table of contents.

### 2. Why should distinct nav regions have clear names?

**Answer:** Clear names let people distinguish their purposes, such as the main site navigation, breadcrumbs, and links within the current page.

### 3. Why is a list commonly used inside nav?

**Answer:** A list communicates that the links are a related set of items. An ordered list can also communicate a meaningful sequence, as in breadcrumbs.

### 4. What information does a breadcrumb provide?

**Answer:** It shows the hierarchy from a broader location, such as Home, toward the current page. This helps users understand where they are within a site.

### 5. How do you mark the current page in navigation?

**Answer:** Put aria-current="page" on the item that represents the current page. It communicates current state to assistive technology.

### 6. Why might a footer's short legal link list not need nav?

**Answer:** Nav is intended for major navigation blocks. A short list of related footer links can be understood within the footer without introducing another navigation landmark.

### 7. What should previous and next navigation do at the start or end of a sequence?

**Answer:** Show only links that have real destinations. The first item has no previous link, and the last item has no next link.

### 8. Does the nav element control whether links appear horizontally or vertically?

**Answer:** No. Nav identifies the navigation region. CSS can arrange links horizontally, vertically, or in another visual layout.

## Practical and coding questions

### 1. Create a main navigation region with Home and Lessons links.

**Answer:**

~~~html
<nav aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/lessons/">Lessons</a></li>
  </ul>
</nav>
~~~

The nav element identifies the important link group. The list organizes its items.

### 2. Add a second navigation region with in-page links to Overview and Examples, and give it a distinct label.

**Answer:**

~~~html
<nav aria-label="On this page">
  <ul>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#examples">Examples</a></li>
  </ul>
</nav>
~~~

The label distinguishes these links from the main site navigation.

### 3. Create a breadcrumb for Home, Courses, HTML, and the current page Navigation.

**Answer:**

~~~html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/courses/">Courses</a></li>
    <li><a href="/courses/html/">HTML</a></li>
    <li><a href="/courses/html/navigation.html" aria-current="page">Navigation</a></li>
  </ol>
</nav>
~~~

The ordered list expresses the hierarchy, and aria-current marks the current page.

### 4. Add previous and next chapter links in a named navigation region.

**Answer:**

~~~html
<nav aria-label="Chapter navigation">
  <ul>
    <li><a href="16-urls.html">Previous chapter: URLs and paths</a></li>
    <li><a href="18-lists.html">Next chapter: HTML lists</a></li>
  </ul>
</nav>
~~~

The label explains the region's purpose, and each link describes its destination.

### 5. Mark the current page in a main menu that has Home, Lessons, and Navigation.

**Answer:**

~~~html
<nav aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/lessons/">Lessons</a></li>
    <li><a href="/lessons/navigation.html" aria-current="page">Navigation</a></li>
  </ul>
</nav>
~~~

Aria-current="page" identifies the current item. It does not apply visual styling by itself.

### 6. A page has main navigation, a breadcrumb, and chapter links. Give each region a descriptive label.

**Answer:**

~~~html
<nav aria-label="Main">
  ...
</nav>

<nav aria-label="Breadcrumb">
  ...
</nav>

<nav aria-label="Chapter navigation">
  ...
</nav>
~~~

The labels name each region's distinct purpose. Replace the ellipses with the appropriate links.

### 7. This is the first chapter. Remove the fake previous link and keep the next link.

~~~html
<nav aria-label="Chapter navigation">
  <ul>
    <li><a href="#">Previous chapter</a></li>
    <li><a href="18-lists.html">Next chapter: HTML lists</a></li>
  </ul>
</nav>
~~~

**Answer:**

~~~html
<nav aria-label="Chapter navigation">
  <ul>
    <li><a href="18-lists.html">Next chapter: HTML lists</a></li>
  </ul>
</nav>
~~~

There is no previous page, so the fake link should be removed.

### 8. Decide whether each group needs nav: main site menu, breadcrumb trail, and a short list of legal links in the footer.

**Answer:** The main site menu and breadcrumb trail are major navigation regions, so nav is suitable for both. A short group of legal links can remain inside the footer without another nav element.

## Related lesson

- [Lesson 17 - Navigation and linking between pages](../lessons/17-navigation-and-page-links.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [16 - URLs, file paths, and page fragments](16-urls-paths-and-fragments.md) | [Lesson](../lessons/17-navigation-and-page-links.md) | [Example](../examples/17-navigation-and-page-links.md) | [18 - Unordered, ordered, and description lists](18-lists.md) |
