export interface Article {
  id: string;
  type: string;
  date: string;
  title: string;
  lead: string;
  body: string;
  image: string;
  source: string;
}

export const articles: Article[] = [
  {
    id: "J-01", type: "Project story", date: "Jul 2026",
    title: "How the Mirror House was carried up a Coorg hillside in pieces.",
    lead: "No road for a concrete truck, a monsoon closing in, and trees that could not be touched — the full account of a sixty-two-day build.",
    body: "A project story about logistics, panelisation and the decisions that turn a difficult site into a finished home. From the first site walk to the last panel, the useful details are the story.",
    image: "/assets/journal/publications/IMG_20260813_132709.jpg", source: "Project archive"
  },
  {
    id: "J-02", type: "Building knowledge", date: "Jun 2026",
    title: "Prefab vs RCC in India: a cost comparison with receipts.",
    lead: "Numbers from delivered projects — where the money actually goes, and where the eighteen months hide.",
    body: "A practical comparison of factory-made systems and conventional construction: time, labour, waste, site conditions and the hidden cost of waiting.",
    image: "/assets/journal/publications/IMG_20260813_132728.jpg", source: "Building knowledge"
  },
  {
    id: "J-03", type: "Land & legal", date: "May 2026",
    title: "Will a bank finance a panelised home? Yes — here's the paperwork.",
    lead: "The documentation lenders ask for, the approvals your plot needs, and the order to do it in.",
    body: "A field guide to the paperwork around land, approvals and financing, written to make the first conversation with an architect, lender or local authority much easier.",
    image: "/assets/journal/publications/IMG_20260813_132746.jpg", source: "Land & legal"
  },
  {
    id: "J-04", type: "Hospitality", date: "Apr 2026",
    title: "A small resort, designed around the rhythm of the site.",
    lead: "Why repeating a precise module can make a hospitality project feel less repetitive, not more.",
    body: "Hospitality is a different operating problem: guest experience, maintenance, construction speed and revenue all have to meet in one design.",
    image: "/assets/journal/publications/IMG_20260813_132813.jpg", source: "Hospitality"
  },
  {
    id: "J-05", type: "Project story", date: "Mar 2026",
    title: "The first home delivered: what changed after the drawings met the site.",
    lead: "A field note on the details that only become visible once a home is being assembled.",
    body: "The gap between a drawing and a real site is where the best lessons live. This story collects those lessons without hiding the awkward bits.",
    image: "/assets/journal/publications/IMG_20260813_132830.jpg", source: "Project archive"
  },
  {
    id: "J-06", type: "Building knowledge", date: "Feb 2026",
    title: "What a 90-day move-in promise really requires.",
    lead: "Factory planning, procurement and site preparation have to move together.",
    body: "A faster build is not one trick. It is a chain of decisions that starts before fabrication and ends only when the home is ready to live in.",
    image: "/assets/journal/publications/IMG_20260813_132852.jpg", source: "Building knowledge"
  },
  {
    id: "J-07", type: "Materials", date: "Jan 2026",
    title: "The envelope: why windows, roof and insulation decide comfort.",
    lead: "The quiet systems are doing most of the work long after the handover.",
    body: "A closer look at the building envelope and the components that shape daylight, thermal comfort, weather resistance and long-term maintenance.",
    image: "/assets/journal/publications/IMG_20260813_132957.jpg", source: "Materials"
  },
  {
    id: "J-08", type: "Land & legal", date: "Dec 2025",
    title: "Still looking for land? Start with the constraints, not the view.",
    lead: "Access, slope, services and approvals can decide a project before aesthetics enter the room.",
    body: "A checklist for evaluating land before falling in love with it: access, terrain, utilities, planning rules and the practical route from road to foundation.",
    image: "/assets/journal/publications/IMG_20260813_133017.jpg", source: "Land & legal"
  },
  {
    id: "J-09", type: "Journal", date: "Nov 2025",
    title: "What we learned from building, breaking and building again.",
    lead: "The practice improves when the difficult lessons are documented.",
    body: "A collection of decisions that changed the way the team thinks about design, fabrication and delivery.",
    image: "/assets/journal/awards/Screenshot_2026-08-13-13-32-35-22_e2d5b3f32b79de1d45acd1fad96fbb0f.jpg", source: "Journal"
  },
  {
    id: "J-10", type: "Building knowledge", date: "Oct 2025",
    title: "Panelised does not mean generic.",
    lead: "Precision is what creates freedom: repeat the parts, not the experience.",
    body: "How a controlled manufacturing system can still leave room for site-specific design, finishes, layouts and architectural intent.",
    image: "/assets/journal/awards/award-feature.jpeg", source: "Building knowledge"
  }
];
