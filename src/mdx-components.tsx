import type { MDXComponents } from "mdx/types";
import { Code } from "./components/Code";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => <h1 className="text-4xl font-black my-4" {...props} />,
    h2: (props) => <h2 className="text-3xl font-black my-4" {...props} />,
    h3: (props) => <h3 className="text-2xl font-black my-4" {...props} />,
    h4: (props) => <h4 className="text-xl font-black my-4" {...props} />,
    h5: (props) => <h5 className="font-black my-4" {...props} />,
    p: (props) => <p className="text-lg my-4" {...props} />,
    ul: (props) => <ul className="list-disc pl-6 my-4" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 pb-4" {...props} />,
    li: (props) => <li className="text-lg" {...props} />,
    hr: (props) => <hr className="my-4" {...props} />,
    blockquote: (props) => (
      <blockquote
        style={{ paddingBottom: 0 }}
        className="border-l-4 pl-4 my-4"
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
