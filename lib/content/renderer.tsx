import { MDXRemote } from "next-mdx-remote/rsc";
import GithubSlugger from "github-slugger";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/mdx";
import ArticleContent from "@/components/mdx/ArticleContent";

type Props = {
  source: string;
};

export default function MDXRenderer({
  source,
}: Props) {
  const slugger = new GithubSlugger();

  return (
    <ArticleContent>
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
        components={{
          ...mdxComponents,

          h2: ({ children }) => {
            const text = String(children);

            return (
              <h2 id={slugger.slug(text)}>
                {children}
              </h2>
            );
          },

          h3: ({ children }) => {
            const text = String(children);

            return (
              <h3 id={slugger.slug(text)}>
                {children}
              </h3>
            );
          },
        }}
      />
    </ArticleContent>
  );
}