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
    ul: (props) => (
      <ul
        className="[&>li::marker]:text-theme-700 my-4 list-disc pl-6"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="[&>li::marker]:text-theme-700 list-decimal pb-4 pl-6"
        {...props}
      />
    ),
    hr: (props) => <hr className="my-4" {...props} />,
    a: (props) => (
      <a
        className="hover:text-theme-600 underline underline-offset-6"
        target="_blank"
        {...props}
      />
    ),
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
