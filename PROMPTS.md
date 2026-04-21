# Prompting Log — ITDEV-164

## Activity 1: The AI-Native Launchpad

### Prompt 1
**What I asked:**
Look at the existing src/app/page.tsx and src/app/layout.tsx in this project.
Replace the current homepage content with a "Developer Profile" page for me.
It should include:
- My name: Alex
- A short bio (1-2 sentences about being a web development student)
- A "Skills" section that displays at least 6 skills in a responsive
  Tailwind CSS grid (use cards with icons from lucide-react)

Keep the existing Header component and layout structure intact.
If you need to create new components, go ahead and create them in
the src/components/ folder.

**What happened:**
It showed me good suggestions and everything it did worked. It didn't create a new component.

### Prompt 2
**What I asked:**
The skills grid should use sm:grid-cols-2 lg:grid-cols-3 for responsive
breakpoints. Can you update that?

**What happened:**
It did exactly what I wanted and fixed the column breakpoints.

### Reflection
It actually saves a lot of time if you know exactly what you want to accomplish. I feel it might not be perfect for making big changes at once because if there were to be an error it makes, it could be hard to find. Overall, I like it and think it is going to be a very useful tool.

## Activity 2: Building the Dashboard Shell

### Prompt 1

**What I asked:**
Using the shadcn sidebar components that are now in my src/components/ui/ folder,
create a professional, collapsible dashboard layout. It should include:

1. A sidebar (src/components/app-sidebar.tsx) with navigation links for:
   - Overview (use the Home icon from lucide-react)
   - Projects (use the FolderOpen icon)
   - Settings (use the Settings icon)

2. A top navigation area with breadcrumbs showing the current page.

3. A main content area that wraps the existing page content.

4. Update src/app/layout.tsx to use the new SidebarProvider and sidebar layout.

Important: Preserve the Developer Profile content from Activity 1 in
src/app/page.tsx — it should appear in the main content area of the new layout.
Keep the dark mode toggle working.

**What happened:**
It created a sidebar with a layout that would open and close, navigate to other pages but not change the screen, and there was an error that was left where my layout.tsx couldn't find the globals.css

### Prompt 2

**What I asked:**
can you create a fix for the import of global.css not working in layout.tsx
**What happened:**
this created a folder in src called types, and a globals.d.ts file that fixes the import the the css.

### Prompt 3

**What I asked:**
there are still some responsive issues with the sidebar. It should also be closing when you click a page to navigate to.

**What happened:**
It made the mobile side bar function exactly how it should be functioning.

### Prompt 4
**What I asked:**
Can you make the sidebar close when you select a link on desktop too. I also want a page not found screen as placeholders for the settings and projects content.

**What happened:**
The sidebar is clearly changing pages and loading the different content it created for the pages. It also closed like I wanted it to. I now want it to organize the files better and update the breadcrumbs. 

### Prompt 5
**What I asked:**
can you change the breadcrumbs to display the correct screen it's on. I also want to you organize the pages into a folder for the overview content, projects content, and settings content.
**What happened:**
It organized the page.tsx files for the different screens into folders that corespond with their page name. The Overview is the default nav with just a / as it's link. The other two pages load when going to /projects and /settings. The breadcrumbs are now generated based on the url in a new component breadcrumbs.txt which it good.

### Reflection
The agent didn't break any features that were working in activity 1, so that's great. This is probably due to the fact we propted it with an important message to maintain that code. Sometimes you need multiple prompts to get the agent to fix errors it left. My layout.tsx wasn't importing the css file so I needed to tell the agent to fix it.

## Activity 3: Server-Side Data with Supabase

### Prompt 1
**What I asked:**
Using the Supabase client at src/lib/supabase.ts, create a new Server Component
at src/app/projects/page.tsx that:

1. Fetches all records from the "projects" table in Supabase
2. Displays them in a professional layout using shadcn/ui Card components
   (run `npx shadcn@latest add card` if needed)
3. Each card should show the project title, description, and a status badge
4. The status badge should be color-coded:
   - "active" = green
   - "completed" = blue
   - "archived" = gray

Use @workspace context to match the styling of our existing Dashboard.
This must be a React Server Component (async function, no "use client").
Do NOT use useEffect or useState for data fetching.

**What happened:**
It successfully created the compnent for the projects page, got everything from supabase, and kept it server side. It even added a badge component to use.

### Prompt 2
**What I asked:**
Can you edit the layout.tsx to layout all the pages and make them fill up the whole screen regardless of the amount of content on the page. Give me options.

**What happened:**
I selected a choice to add w-full class to the outer div and I tested it and every page now fills up the screen.

### Reflection
I added the breadcrumbs last week, but this week I found that options are very useful when finding fixes or changes to specific things.