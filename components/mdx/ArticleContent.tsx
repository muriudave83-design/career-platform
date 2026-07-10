import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ArticleContent({
  children,
}: Props) {
  return (
    <article
      className="
        max-w-none
        text-[18px]
        leading-8
        text-gray-700

        [&_h1]:text-5xl
        [&_h1]:font-black
        [&_h1]:tracking-tight
        [&_h1]:text-gray-900
        [&_h1]:mt-12
        [&_h1]:mb-8

        [&_h2]:text-4xl
        [&_h2]:font-extrabold
        [&_h2]:text-gray-900
        [&_h2]:mt-16
        [&_h2]:mb-6
        [&_h2]:scroll-mt-28

        [&_h3]:text-2xl
        [&_h3]:font-bold
        [&_h3]:text-gray-900
        [&_h3]:mt-12
        [&_h3]:mb-4
        [&_h3]:scroll-mt-28

        [&_h4]:text-xl
        [&_h4]:font-semibold
        [&_h4]:text-gray-900
        [&_h4]:mt-8
        [&_h4]:mb-3

        [&_p]:my-6

        [&_ul]:my-6
        [&_ul]:ml-7
        [&_ul]:list-disc

        [&_ol]:my-6
        [&_ol]:ml-7
        [&_ol]:list-decimal

        [&_li]:my-2
        [&_li]:pl-1

        [&_ul_li::marker]:text-[#00C853]
        [&_ol_li::marker]:font-semibold
        [&_ol_li::marker]:text-[#00C853]

        [&_strong]:font-semibold
        [&_strong]:text-gray-900

        [&_em]:italic

        [&_a]:font-medium
        [&_a]:text-[#00A63E]
        [&_a]:underline
        [&_a]:underline-offset-4
        hover:[&_a]:text-[#008A38]

        [&_blockquote]:my-8
        [&_blockquote]:rounded-r-2xl
        [&_blockquote]:border-l-4
        [&_blockquote]:border-[#00C853]
        [&_blockquote]:bg-green-50
        [&_blockquote]:px-6
        [&_blockquote]:py-5
        [&_blockquote]:italic

        [&_hr]:my-12
        [&_hr]:border-green-100

        [&_table]:my-10
        [&_table]:w-full
        [&_table]:border-collapse
        [&_table]:overflow-hidden
        [&_table]:rounded-xl

        [&_thead]:bg-green-50

        [&_th]:border
        [&_th]:border-green-100
        [&_th]:p-4
        [&_th]:text-left
        [&_th]:font-bold
        [&_th]:text-gray-900

        [&_td]:border
        [&_td]:border-gray-200
        [&_td]:p-4

        [&_img]:my-10
        [&_img]:rounded-2xl
        [&_img]:shadow-lg

        [&_code]:rounded
        [&_code]:bg-gray-100
        [&_code]:px-1.5
        [&_code]:py-0.5
        [&_code]:font-mono
        [&_code]:text-[0.9em]

        [&_pre]:my-8
        [&_pre]:overflow-x-auto
        [&_pre]:rounded-2xl
      "
    >
      {children}
    </article>
  );
}