import { getArticles } from "@/lib/content";

const BASE_URL = "https://joinnexiva.com";

export async function GET() {
  const articles = getArticles().filter(
    (article) => !article.frontmatter.draft
  );

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>JoinNexiva Resources</title>
    <link>${BASE_URL}</link>
    <description>
      Career advice, internship guides, graduate programmes and interview resources from JoinNexiva.
    </description>

${articles
  .map(
    (article) => `
    <item>
      <title><![CDATA[${article.frontmatter.title}]]></title>
      <description><![CDATA[${article.frontmatter.description}]]></description>
      <link>${BASE_URL}/resources/${article.frontmatter.category}/${article.frontmatter.slug}</link>
      <guid>${BASE_URL}/resources/${article.frontmatter.category}/${article.frontmatter.slug}</guid>
      <pubDate>${new Date(
        article.frontmatter.published
      ).toUTCString()}</pubDate>
    </item>`
  )
  .join("\n")}

  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}