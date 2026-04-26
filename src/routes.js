const defaultStyles = ["/legacy/itis3135/styles/default.css"];
export const allRoutes = [
  {
    path: "/",
    title: "Cameron Dingle's Owlish Owl | ITIS3135 Home",
    legacyFile: "index.html",
    styles: defaultStyles,
  },
  {
    path: "/contract",
    title: "Cameron Dingle's Owlish Owl | Contract",
    legacyFile: "contract.html",
    styles: defaultStyles,
  },
  {
    path: "/gallery",
    title: "Cameron Dingle's Owlish Owl | Gallery",
    legacyFile: "gallery.html",
    styles: defaultStyles,
  },
  {
    path: "/highlight",
    title: "Cameron Dingle's Owlish Owl | Highlight",
    legacyFile: "highlight.html",
    styles: defaultStyles,
  },
  {
    path: "/instructions",
    title: "Cameron Dingle's Owlish Owl | Instructions",
    legacyFile: "instructions.html",
    styles: defaultStyles,
  },
  {
    path: "/website-evaluations",
    title: "Cameron Dingle's Owlish Owl | Website Evaluations",
    legacyFile: "website_evaluations.html",
    styles: defaultStyles,
  },
  {
    path: "/survey",
    title: "Cameron Dingle's Owlish Owl | Survey",
    legacyFile: "survey.html",
    styles: defaultStyles,
  },
  {
    path: "/intro-form",
    title: "Cameron Dingle's Owlish Owl | Intro Form",
    legacyFile: "intro_form.html",
    styles: [
      ...defaultStyles,
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/default.min.css",
    ],
    scripts: [
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js",
      "/legacy/itis3135/scripts/introduction.js",
      "/legacy/itis3135/scripts/generate_json.js",
      "/legacy/itis3135/scripts/generate_html.js",
    ],
  },
  {
    path: "/cards",
    title: "Cameron Dingle's Owlish Owl | Cards",
    legacyFile: "cards.html",
    styles: defaultStyles,
  },
  {
    path: "/inventory",
    title: "Cameron Dingle's Owlish Owl | Inventory",
    legacyFile: "inventory.html",
    styles: defaultStyles,
  },
  {
    path: "/documentation",
    title: "Cameron Dingle's Owlish Owl | Technical Documentation",
    legacyFile: "documentation.html",
    styles: defaultStyles,
  },
  {
    path: "/product",
    title: "Cameron Dingle's Owlish Owl | Product",
    legacyFile: "product.html",
    styles: defaultStyles,
  },
  {
    path: "/review1",
    title: "Cameron Dingle's Owlish Owl | FCC Responsive Web Design",
    legacyFile: "review1.html",
    styles: defaultStyles,
  },
  {
    path: "/review2",
    title: "Cameron Dingle's Owlish Owl | FCC JavaScript Certification",
    legacyFile: "review2.html",
    styles: defaultStyles,
  },
];

export const mainNavLinks = [
  { label: "Home", to: "/" },
  { label: "Contract", to: "/contract" },
  { label: "Gallery", to: "/gallery" },
  { label: "Highlight", to: "/highlight" },
  { label: "Instructions", to: "/instructions" },
];

export const secondaryNavLinks = [
  { label: "Website Evaluations", to: "/website-evaluations" },
  { label: "Survey", to: "/survey" },
  { label: "Introduction Form", to: "/intro-form" },
  { label: "Cards", to: "/cards" },
  { label: "Inventory", to: "/inventory" },
  { label: "Technical Documentation", to: "/documentation" },
  { label: "Product", to: "/product" },
  { label: "FCC Responsive Cert", to: "/review1" },
  { label: "FCC JavaScript Cert", to: "/review2" },
];

export const legacyPathToRoute = Object.fromEntries(
  allRoutes.map((route) => [route.legacyFile, route.path]),
);
