import { NavLink } from "react-router-dom";
import { mainNavLinks, secondaryNavLinks } from "../routes";

function LinkRow({ links }) {
  return (
    <>
      {links.map((link, index) => (
        <span key={link.to}>
          <NavLink to={link.to}>{link.label}</NavLink>
          {index < links.length - 1 ? " \u00a0 | \u00a0" : ""}
        </span>
      ))}
    </>
  );
}

function SiteHeader() {
  return (
    <header>
      <h1>Cameron Dingle&apos;s Owlish Owl ~ ITIS 3135</h1>
      <nav>
        <LinkRow links={mainNavLinks} />
      </nav>
      <hr />
      <nav>
        <a href="/legacy/itis3135/stuff/trash.htm">CRAPpy Page</a>
        {" \u00a0 | \u00a0"}
        <LinkRow links={secondaryNavLinks} />
        {" \u00a0 | \u00a0"}
        <a href="/legacy/itis3135/hobby/index.html">Hobby</a>
        {" \u00a0 | \u00a0"}
        <a href="/legacy/itis3135/projects/amanda_client_project/index.html">
          Client Project
        </a>
      </nav>
    </header>
  );
}

export default SiteHeader;
