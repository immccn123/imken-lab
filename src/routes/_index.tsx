import { Card } from "@blueprintjs/core";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "@blueprintjs/icons";

const tools = [
  {
    link: "/prismjs/autoloader-plus",
    name: "PrismJS Autoloader Plus Plugin Playground",
    description:
      "Yet another enhanced version of prismjs/plugins/prism-autoloader",
  },
  {
    link: "/prismjs/doxycpp",
    name: "Doxygen-docsed C++ PrismJS Highlight Plugin",
    description: "A highlight plugin for C++ with Doxygen",
  },
  {
    link: "/fingerprint",
    name: "Fingerprint",
    description: "Get unique id from each browser.",
  },
];

export default function Index() {
  document.title = "Imken Lab";

  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const searchListener = (event: KeyboardEvent) => {
    const keydown = event.key;
    const keyCombination = event.ctrlKey;
    if (keyCombination && (keydown == "k" || keydown == "K")) {
      event.preventDefault();
      searchRef.current?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", searchListener);
    return () => document.removeEventListener("keydown", searchListener);
  });

  const base = window.location.origin;

  return (
    <>
      <div style={{ paddingTop: "10px" }}>
        <div id="search-box">
          <div className="bp5-input-group bp5-large">
            <Search />
            <input
              type="text"
              placeholder="Search... (Ctrl + K)"
              className="bp5-input"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              ref={searchRef}
            />
          </div>
        </div>
        <div id="tool-list" style={{ paddingTop: "10px" }}>
          {tools
            .filter(
              (tool) =>
                tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tool.description
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
            )
            .map((tool) => {
              return (
                <Card
                  compact
                  key={tool.link}
                  className="home-card"
                  elevation={1}
                >
                  <Link to={tool.link} key={tool.link}>
                    <h3 className="card-title">{tool.name}</h3>
                  </Link>
                  <p className="card-description">{tool.description}</p>
                  <p className="card-details">
                    {new URL(tool.link, base).toString()}
                  </p>
                </Card>
              );
            })}
        </div>
      </div>
    </>
  );
}
