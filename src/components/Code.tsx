import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import React, { Fragment } from "react";
import { codeToHast } from "shiki";
import { JSX, jsx, jsxs } from "react/jsx-runtime";

interface IProps {
  lang: string;
  code: string;
}

export const Code = async ({ code, lang }: IProps) => {
  const out = await codeToHast(code, {
    lang: lang.toLowerCase(),
    // theme: "dracula-soft",
    theme: "everforest-dark",
    // theme: "one-dark-pro",
    // theme: "vitesse-dark",
  });

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
    components: {
      pre: (props) => (
        <pre
          {...props}
          className={`mb-4 py-4 rounded-md overflow-auto ${props.className}`}
        />
      ),
    },
  }) as JSX.Element;
};
