import Editor from "@monaco-editor/react";
import { Button, Section, SectionCard } from "@blueprintjs/core";
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
  <pre><code class="language-doxycpp">{code}</code></pre>
  <script src="//fastly.jsdelivr.net/npm/prismjs@1.29.0/components/prism-core.min.js"></script>
  <script src="//fastly.jsdelivr.net/npm/prismjs@1.29.0/components/prism-clike.min.js"></script>
  <script src="//fastly.jsdelivr.net/npm/prismjs@1.29.0/components/prism-c.min.js"></script>
  <script src="//fastly.jsdelivr.net/npm/prismjs@1.29.0/components/prism-cpp.min.js"></script>
  <script src="//fastly.jsdelivr.net/npm/prism-cpp-doxygen/prism-cpp-doxygen.min.js"></script>
</html>`;

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

export default function PrismJS_Doxycpp() {
  document.title = "Doxygen-docsed C++ PrismJS Highlight Plugin";

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [code, setCode] = useState(defaultCode);

  const [frameHTML, setFrameHTML] = useState(
    defaultHTML.replace("{code}", defaultCode)
  );

  useEffect(
    () => setFrameHTML(defaultHTML.replace("{code}", encodeHTML(code))),
    [code]
  );

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = frameHTML;
    }
  }, [frameHTML]);

  return (
    <>
      <h1>Doxygen-docsed C++ PrismJS Highlight Plugin</h1>
      <div style={{ paddingBottom: "20px", fontSize: "1rem" }}>
        <a href="https://github.com/immccn123/prism-doxygen-cpp">
          <Button>GitHub</Button>
        </a>
      </div>
      <Section
        title="Code to be Highlighted"
        collapsible
        collapseProps={{ defaultIsOpen: false }}
      >
        <SectionCard>
          <Editor
            height="50vh"
            language="cpp"
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
