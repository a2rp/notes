# 08. File Systems

How files, directories, metadata, and storage are organized.

File systems

A file system is the method an Operating System (OS) uses to store, organize, find, and protect files on a storage device like HDD or SSD. It decides how files are named, where bytes live on disk, and how fast reads and writes happen.

Directories Files and metadata Blocks and allocation Fast lookup Permissions

File systems

Click to collapse with clear terms and real examples

### What a file system solves

Disks store raw bytes. A file system adds a structure so you can say "give me photos/cat.png" instead of manually searching billions of bytes.

Without a file system

Data is just a big empty space of bytes. You would not know where one file ends and another begins.

With a file system

The OS maintains a map: names, folders, permissions, and where each file's blocks are stored.

### Core terms

File sequence of bytes

A file is data stored on disk, plus metadata like name, size, and time.

Directory folder

A directory maps names to files or other directories.

Block storage unit

A block is the fixed size chunk used by the file system to store data. Example sizes: 4 KB or 8 KB.

Metadata info about file

Metadata means file information like size, owner, permissions, timestamps, and where data blocks are located.

### How reading a file works (simple view)

When you open a file, the OS asks the file system: "where are the blocks for this file". Then it reads those blocks from disk and returns bytes to your program.

Step 1

Find file entry using path: /docs/a.txt

Step 2

Read metadata and block pointers

Step 3

Fetch blocks from disk into memory cache

Step 4

Return bytes to the program

Small example (what you feel)



```text
Open a small file the first time -> may feel slightly slower
Open it again soon -> faster because data is in cache

Cache means the OS keeps recently used disk data in RAM.
```



### Allocation and fragmentation

A file system must decide where to place new file data blocks on disk. Over time, files can become scattered, which is called fragmentation.

Fragmentation

File blocks are not together. Disk head (on HDD) may move more, slowing reads.

Why SSD feels different

SSD has no moving head, so scatter hurts less. Still, more random reads can reduce performance.

Beginner intuition

Sequential reads are faster than many random reads. File systems try to keep blocks together when possible.

### Permissions and protection

File systems enforce access rules. This stops a random app from reading private files or overwriting system files.

Read

Can view file contents

Write

Can modify file contents

Execute

Can run the file as a program

Example (Linux style)



```text
rwxr-x--- 
Owner: read write execute
Group: read execute
Others: no access
```



### Journaling (why crashes do not destroy everything)

Some file systems use journaling. Before changing important structures, they write an "intent log" so after a crash, they can recover quickly.

Simple journaling idea



```text
Before update:
Write to journal: "I will create file X and update directory Y"
Do the real changes
Mark journal entry as complete

After crash:
Replay incomplete journal entries to restore consistency
```



Why it matters

Without journaling, a crash in the middle of an update can leave the disk structure inconsistent.

### Full forms and key terms

OS - Operating System

HDD - Hard Disk Drive

SSD - Solid State Drive

RAM - Random Access Memory

KB - Kilobyte

4 KB - 4 Kilobytes (common block size)

A file system is not just folders. It is a performance and safety layer that decides how your bytes live on disk.

### Mini practice

Q Why does opening a file again feel faster?

A Because the OS caches recently read disk blocks in RAM, so the second read avoids disk access.

Q What is fragmentation in simple words?

A A file is stored in scattered pieces across disk, so reading it may require more jumps.
