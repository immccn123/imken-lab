import Editor from "@monaco-editor/react";
import {
  Button,
  ControlGroup,
  InputGroup,
  Label,
  Section,
  SectionCard,
} from "@blueprintjs/core";
import { useEffect, useRef, useState } from "react";
import { encode as encodeHTML } from "he";

const defaultHTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="//fastly.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css">
  <title>Autoloader Plus Playground</title>
</head>
<body>
<pre><code class="language-{language}">{code}</code></pre>
  <script src="//fastly.jsdelivr.net/npm/prismjs@1.29.0/components/prism-core.min.js"></script>
  <script src="//fastly.jsdelivr.net/npm/@immccn123/prism-autoloader-plus@0.1.1/prism-autoloader-plus.min.js"></script>
  <script>
    {autoloaderConfig}
  </script>
</body>
</html>`;

const defaultAutoloaderConfig = `// config
Prism.plugins.autoloader.languages_path =
  "//fastly.jsdelivr.net/npm/prismjs@1.29.0/components/"; // trailing slash is required
// Addtional
Prism.plugins.autoloader.lang_dependencies = {
  doxycpp: "cpp",
};
// Addtional
Prism.plugins.autoloader.lang_urls = {
  doxycpp:
    "//fastly.jsdelivr.net/npm/prism-cpp-doxygen/prism-cpp-doxygen.min.js",
};
`;

const defaultCode = `/**
 *  @brief  Return the maximum element in a range.
 *  @ingroup sorting_algorithms
 *  @param  __first  Start of range.
 *  @param  __last   End of range.
 *  @return  Iterator referencing the first instance of the largest value.
 */
template<typename _ForwardIterator>
_GLIBCXX14_CONSTEXPR
inline _ForwardIterator
max_element(_ForwardIterator __first, _ForwardIterator __last)
{
  // concept requirements
  __glibcxx_function_requires(_ForwardIteratorConcept<_ForwardIterator>)
  __glibcxx_function_requires(_LessThanComparableConcept<
        typename iterator_traits<_ForwardIterator>::value_type>)
  __glibcxx_requires_valid_range(__first, __last);
  __glibcxx_requires_irreflexive(__first, __last);

  return _GLIBCXX_STD_A::__max_element(__first, __last,
                            __gnu_cxx::__ops::__iter_less_iter());
}
`;

export default function PrismJS_AutoloaderPlus() {
  document.title = "Prism Autoloader Plus Playground";

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [code, setCode] = useState(defaultCode);
  const [lang, setLang] = useState("doxycpp");
  const [editorLang, setEditorLang] = useState("cpp");

  const [frameHTML, setFrameHTML] = useState(
    defaultHTML
      .replace("{code}", defaultCode)
      .replace("{autoloaderConfig}", defaultAutoloaderConfig)
      .replace("{language}", lang)
  );
  const [autoloaderConfig, setAutoloaderConfig] = useState(
    defaultAutoloaderConfig
  );

  useEffect(
    () =>
      setFrameHTML(
        defaultHTML
          .replace("{code}", encodeHTML(code))
          .replace("{autoloaderConfig}", autoloaderConfig)
          .replace("{language}", lang)
      ),
    [code, autoloaderConfig, lang]
  );

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = frameHTML;
    }
  }, [frameHTML]);

  return (
    <>
      <h1>Prism Autoloader Plus Playground</h1>
      <div style={{ paddingBottom: "20px", fontSize: "1rem" }}>
        <a href="https://github.com/immccn123/prism-autoloader-plus">
          <Button>GitHub</Button>
        </a>{" "}
        <a href="https://npmjs.com/package/@immccn123/prism-autoloader-plus">
          <Button>npm</Button>
        </a>
      </div>
      <Section title="Autoloader Configuration" collapsible>
        <SectionCard>
          <Editor
            height="35vh"
            defaultLanguage="javascript"
            value={autoloaderConfig}
            onChange={(value, _) => setAutoloaderConfig(value ?? "")}
          />
        </SectionCard>
      </Section>
      <Section
        title="Code to be Highlighted"
        collapsible
        collapseProps={{ defaultIsOpen: false }}
      >
        <SectionCard>
          <ControlGroup>
            <Label>Highlight Language</Label>
            <InputGroup
              placeholder="language..."
              value={lang}
              onChange={(e) => setLang(e.target.value ?? "")}
            />
            <Label>Editor Language</Label>
            <InputGroup
              placeholder="language..."
              value={editorLang}
              onChange={(e) => setEditorLang(e.target.value ?? "")}
            />
          </ControlGroup>
          <Editor
            height="50vh"
            language={editorLang}
            defaultValue={defaultCode}
            onChange={(value, _) => setCode(value ?? "")}
          />
        </SectionCard>
      </Section>
      <Section title="Preview">
        <SectionCard style={{ height: "500px" }}>
          <iframe
            ref={iframeRef}
            style={{ border: "none", width: "100%", height: "100%" }}
          ></iframe>
        </SectionCard>
      </Section>
    </>
  );
}
