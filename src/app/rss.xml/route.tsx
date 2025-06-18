import Rss from "rss";
import { getPostInfos } from "@/utils/post";
import { SITE_DESC, SITE_TITLE, SITE_URL } from "@/consts";
import { getPathWithBasePath } from "@/utils/path";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getPostInfos();
  const feed = new Rss({
    title: SITE_TITLE,
    description: SITE_DESC,
    site_url: SITE_URL,
    feed_url: `${SITE_URL}${getPathWithBasePath("/rss.xml")}`,
  });
  posts.forEach((post) => {
    feed.item({
      title: post.fontmatter.title || post.id,
      description: post.fontmatter.desc,
      url: `${SITE_URL}${getPathWithBasePath(`/posts/${post.id}`)}`,
      date: post.fontmatter.date,
    });
  });
  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
