import { getPage, getPages } from "@/app/source";
import type { Metadata } from "next";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const page = getPage(params.slug);

  if (page == null) {
    notFound();
  }

  const MDX = page.data.exports.default;

  return (
    <DocsPage toc={page.data.exports.toc}>
      <DocsBody>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{page.data.title}</h1>
        {page.data.description ? <p className="mb-8 text-base text-muted-foreground">{page.data.description}</p> : null}
        <MDX />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = getPage(params.slug);

  if (page == null) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
}
