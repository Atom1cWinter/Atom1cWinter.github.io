import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { legacyPathToRoute } from "../routes";

const LEGACY_ROOT = "/legacy/itis3135";

function isExternalLink(value) {
  return (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("javascript:") ||
    value.startsWith("data:")
  );
}

function resolveLegacyPath(rawValue, baseUrl) {
  const resolved = new URL(rawValue, baseUrl);
  return `${resolved.pathname}${resolved.search}${resolved.hash}`;
}

function normalizeLegacyFile(pathname) {
  const clean = pathname
    .replace(/^\/legacy\/itis3135\//, "")
    .replace(/^\//, "");
  return clean.length === 0 ? "index.html" : clean;
}

function LegacyPage({ route }) {
  const navigate = useNavigate();
  const [contentHtml, setContentHtml] = useState(
    "<main><p>Loading page...</p></main>",
  );
  const [contentScripts, setContentScripts] = useState([]);

  const styleHrefs = useMemo(() => route.styles ?? [], [route.styles]);
  const externalScripts = useMemo(() => route.scripts ?? [], [route.scripts]);

  useEffect(() => {
    let isActive = true;

    const loadLegacyPage = async () => {
      const pageUrl = `${LEGACY_ROOT}/${route.legacyFile}`;
      const response = await fetch(pageUrl);
      if (!response.ok) {
        throw new Error(`Could not load ${route.legacyFile}`);
      }

      const markup = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(markup, "text/html");

      const activeBodyClasses = doc.body?.className
        ? doc.body.className.split(/\s+/).filter(Boolean)
        : [];

      const contentSource = doc.querySelector("main") ?? doc.body;
      const workingContent = contentSource.cloneNode(true);

      if (contentSource === doc.body) {
        workingContent
          .querySelectorAll("header, footer")
          .forEach((el) => el.remove());
      }

      const pageBase = new URL(pageUrl, window.location.origin);
      const scripts = [];

      workingContent.querySelectorAll("script").forEach((scriptTag) => {
        const src = scriptTag.getAttribute("src");
        if (src) {
          const resolvedSrc = resolveLegacyPath(src, pageBase);
          if (!resolvedSrc.endsWith("/scripts/HTMLInclude.min.js")) {
            scripts.push({ src: resolvedSrc });
          }
        } else if (scriptTag.textContent?.trim()) {
          scripts.push({ content: scriptTag.textContent });
        }
        scriptTag.remove();
      });

      workingContent
        .querySelectorAll("[href], [src], [action]")
        .forEach((node) => {
          ["href", "src", "action"].forEach((attr) => {
            const rawValue = node.getAttribute(attr);
            if (
              !rawValue ||
              rawValue.startsWith("#") ||
              isExternalLink(rawValue)
            ) {
              return;
            }

            const resolvedPath = resolveLegacyPath(rawValue, pageBase);

            if (attr === "href") {
              const pathOnly = resolvedPath.split("?")[0].split("#")[0];
              const normalized = normalizeLegacyFile(pathOnly);
              const appPath = legacyPathToRoute[normalized];
              if (appPath) {
                node.setAttribute("href", appPath);
              } else {
                node.setAttribute(attr, resolvedPath);
              }
              return;
            }

            node.setAttribute(attr, resolvedPath);
          });
        });

      if (!isActive) {
        return;
      }

      document.title = doc.title || route.title;

      document.body.dataset.reactLegacyClasses = activeBodyClasses.join(" ");
      activeBodyClasses.forEach((name) => document.body.classList.add(name));

      setContentScripts(scripts);
      setContentHtml(workingContent.innerHTML);
    };

    loadLegacyPage().catch(() => {
      if (!isActive) {
        return;
      }

      document.title = route.title;
      setContentScripts([]);
      setContentHtml(
        "<main><h2>Page could not be loaded.</h2><p>Check that the legacy file exists in public/legacy/itis3135.</p></main>",
      );
    });

    return () => {
      isActive = false;
      const classes = (document.body.dataset.reactLegacyClasses ?? "")
        .split(/\s+/)
        .filter(Boolean);
      classes.forEach((name) => document.body.classList.remove(name));
      document.body.dataset.reactLegacyClasses = "";
    };
  }, [route.legacyFile, route.title]);

  useEffect(() => {
    const added = [];
    styleHrefs.forEach((href) => {
      if (
        document.head.querySelector(`link[data-react-legacy-style="${href}"]`)
      ) {
        return;
      }

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.dataset.reactLegacyStyle = href;
      document.head.appendChild(link);
      added.push(link);
    });

    return () => {
      added.forEach((link) => link.remove());
    };
  }, [styleHrefs]);

  useEffect(() => {
    let cancelled = false;
    const mountedScripts = [];

    const runScripts = async () => {
      const scriptsToRun = [...externalScripts, ...contentScripts];
      for (const entry of scriptsToRun) {
        if (cancelled) {
          break;
        }

        if (typeof entry === "string") {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = entry;
            script.async = false;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
            mountedScripts.push(script);
          });
          continue;
        }

        if (entry.src) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = entry.src;
            script.async = false;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
            mountedScripts.push(script);
          });
          continue;
        }

        if (entry.content) {
          const script = document.createElement("script");
          script.textContent = entry.content;
          document.body.appendChild(script);
          mountedScripts.push(script);
        }
      }
    };

    runScripts().catch(() => {
      // Keep rendering content even if a script fails.
    });

    return () => {
      cancelled = true;
      mountedScripts.forEach((script) => script.remove());
    };
  }, [externalScripts, contentScripts, route.legacyFile]);

  const onContentClick = (event) => {
    const target = event.target.closest("a");
    if (!target) {
      return;
    }

    const href = target.getAttribute("href");
    if (!href || !href.startsWith("/")) {
      return;
    }

    const normalized = normalizeLegacyFile(href);
    const appPath = legacyPathToRoute[normalized];

    if (appPath) {
      event.preventDefault();
      navigate(appPath);
    }
  };

  return (
    <div
      className="legacy-content"
      onClick={onContentClick}
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}

export default LegacyPage;
