import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageIntro from "@/components/university/PageIntro";
import { NewsCard, formatDate } from "@/components/university/Cards";
import { NEWS, getArticle } from "@/data/university";
import ui from "@/components/university/ui.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return NEWS.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `/news/${article.slug}`,
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = NEWS.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <>
      <PageIntro
        breadcrumbs={[{ label: "News and events", href: "/news" }, { label: article.category }]}
        eyebrow={article.category}
        title={article.title}
        lead={article.excerpt}
        media={{ src: article.image, alt: "", width: 800, height: 450 }}
      />

      <article className={`${ui.section} ${ui.sectionFlush}`}>
        <div className={ui.container}>
          <div className={ui.narrow}>
            <p className={ui.metaRow}>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </p>

            <div className={ui.prose}>
              {article.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className={ui.actions}>
              <Link href="/news" className={ui.linkRow}>
                <span aria-hidden="true">←</span> All news and events
              </Link>
            </div>
          </div>
        </div>
      </article>

      <section className={`${ui.section} ${ui.sectionAlt}`} aria-labelledby="more-heading">
        <div className={ui.container}>
          <div className={ui.head}>
            <span className={ui.eyebrow}>More</span>
            <h2 id="more-heading" className={ui.title}>Also from the university</h2>
          </div>
          <div className={`${ui.gridGap} ${ui.cols3}`}>
            {related.map((item) => (
              <NewsCard key={item.slug} article={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
