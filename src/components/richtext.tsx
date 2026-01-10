import Image from "next/image";
import Link from "next/link";
import { createElement, ReactElement, useId } from "react";

import { cn, getDimensionsFromUrl } from "@/lib/common";
import { StoryblokRichtext } from "@/storyblok";
import { BlockTypes, MarkTypes, StoryblokRichText, StoryblokRichTextNode } from "@storyblok/react";
import { StoryblokServerComponent } from "@storyblok/react/rsc";

type RichTextProps = {
  id?: string;
  richText?: StoryblokRichtext;
  className?: string;
};

export default function RichText({ id, richText, className, ...rest }: RichTextProps) {
  const generatedId = useId();

  if (!richText) return null;

  const headingClassNameMapping: Record<number, string> = {
    1: cn("text-4xl"),
    2: cn("text-3xl"),
    3: cn("text-base"),
    4: cn("text-base"),
    5: cn("text-base"),
    6: cn("text-base"),
  };

  // Process document to merge inline components with adjacent paragraphs
  const processDoc = (doc: any) => {
    if (!doc?.content) return doc;

    const processed = { ...doc };
    processed.content = mergeInlineComponents(doc.content);
    return processed;
  };

  const mergeInlineComponents = (content: any[]) => {
    const merged: any[] = [];
    let i = 0;

    while (i < content.length) {
      const current = content[i];

      // If current is paragraph, look ahead for components and following paragraphs
      if (current.type === "paragraph") {
        const paragraphContent = [...(current.content || [])];
        let j = i + 1;

        // Collect consecutive components and paragraphs
        while (j < content.length && (content[j].type === "blok" || content[j].type === "paragraph")) {
          if (content[j].type === "blok") {
            // Add component as inline content
            paragraphContent.push(content[j]);
          } else if (content[j].type === "paragraph") {
            // Merge paragraph content
            paragraphContent.push(...(content[j].content || []));
          }
          j++;
        }

        // Create merged paragraph
        merged.push({
          ...current,
          content: paragraphContent,
        });

        i = j;
      } else {
        merged.push(current);
        i++;
      }
    }

    return merged;
  };

  return (
    <div id={id} className={cn("relative text-base richtext", className)} {...rest}>
      <StoryblokRichText
        doc={processDoc(richText) as any}
        resolvers={{
          [BlockTypes.COMPONENT]: (node) => {
            const body = node?.attrs?.body;
            const blok = Array.isArray(body) ? body[0] : undefined;
            return <StoryblokServerComponent key={`${generatedId}-${blok?._uid}`} blok={blok} />;
          },
          [BlockTypes.HEADING]: (node: StoryblokRichTextNode<any>) => {
            const level = node.attrs?.level ?? 0;
            const child = (node.children as unknown as Array<ReactElement>)[0];

            return createElement(
              `h${level}`,
              {
                key: child.key,
                className: headingClassNameMapping[level],
              },
              node.children,
            );
          },
          [BlockTypes.PARAGRAPH]: (node: StoryblokRichTextNode<any>) => {
            if (!node.children) return <br key={`${generatedId}-${Math.random()}`} />;

            return (
              <p
                key={
                  node.children[0]?.key ? `${generatedId}-${node.children[0]?.key}` : `${generatedId}-${Math.random()}`
                }
              >
                {node.children}
              </p>
            );
          },
          [BlockTypes.IMAGE]: (node: StoryblokRichTextNode<ReactElement>) => {
            const src = node.attrs?.src;
            const alt = node.attrs?.alt;

            const dimensions = getDimensionsFromUrl(src ?? "");

            return (
              <Image
                src={src}
                alt={alt}
                width={dimensions?.width ?? 1600}
                height={dimensions?.height ?? 600}
                className="w-max h-auto max-h-150 object-left object-cover my-6"
                loading="lazy"
              />
            );
          },
          [BlockTypes.LIST_ITEM]: (node: StoryblokRichTextNode<ReactElement>) => {
            const key = (node.children as unknown as Array<ReactElement>)[0].key;
            return (
              <li key={key} className="not-first:mt-3">
                {node.children}
              </li>
            );
          },
          [BlockTypes.OL_LIST]: (node: StoryblokRichTextNode<ReactElement>) => {
            const child = (node.children as unknown as Array<ReactElement>)[0];
            return (
              <ol key={child.key} className="list-decimal list-inside ml-2">
                {node.children}
              </ol>
            );
          },
          [BlockTypes.UL_LIST]: (node: StoryblokRichTextNode<ReactElement>) => {
            const child = (node.children as unknown as Array<ReactElement>)[0];
            return (
              <ul key={child.key} className="list-disc list-inside ml-2">
                {node.children}
              </ul>
            );
          },
          [BlockTypes.HR]: () => {
            return <hr className={cn("my-0.5 border border-black")} />;
          },
          [MarkTypes.LINK]: (node: StoryblokRichTextNode<ReactElement>) => {
            let href = node.attrs?.linktype === "email" ? `mailto:${node.attrs?.href}` : node.attrs?.href;
            const target = node.attrs?.target;

            if (!href.startsWith("http") && !href.startsWith("/") && node.attrs?.linktype !== "email")
              href = `/${href}`;

            return (
              <Link
                key={href}
                href={href}
                target={target}
                className={cn("border-inherit border-b hover:border-b-2 transition-colors ease-linear duration-150")}
              >
                {(node as any).text.props.children}
              </Link>
            );
          },
        }}
      />
    </div>
  );
}
