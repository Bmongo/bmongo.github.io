import type { MDXComponents } from "mdx/types";
import { Code } from "./components/Code";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => <h1 className="my-4 text-3xl font-black" {...props} />,
    h2: (props) => (
      <h2
        className="my-4 text-2xl font-black not-first-of-type:mt-8"
        {...props}
      />
    ),
    h3: (props) => <h3 className="my-4 text-xl font-black" {...props} />,
    p: (props) => <p className="my-5" {...props} />,
    ul: (props) => <ul className="my-4 list-disc pl-6" {...props} />,
    ol: (props) => <ol className="list-decimal pb-4 pl-6" {...props} />,
    li: (props) => <li {...props} />,
    hr: (props) => <hr className="my-4" {...props} />,
    blockquote: (props) => (
      <blockquote
        style={{ paddingBottom: 0 }}
        className="border-theme-600 my-4 border-l-4 pl-4 [&>p]:my-1 [&>p]:italic"
        {...props}
      />
    ),
    pre: async (props) => {
      const childrenProps = props.children?.props ?? {};
      const className = childrenProps.className || "";
      const code = String(childrenProps?.children || "").trim();
      const lang = className.replace("language-", "") || "text";
      return <Code code={code} lang={lang} />;
    },
  };
}
