import Image from "next/image";
import { createElement } from "react";

import { cn, getDimensionsFromUrl } from "@/lib/common";
import { StoryblokRichtext } from "@/storyblok";
import { asTag, ComponentBlok, storyblokEditable, StoryblokRichText } from "@storyblok/react";
import { StoryblokServerComponent } from "@storyblok/react/rsc";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import ImageExtension from "@tiptap/extension-image";
import TipTapLink from "@tiptap/extension-link";
import { BulletList, ListItem, OrderedList } from "@tiptap/extension-list";
import Paragraph from "@tiptap/extension-paragraph";

type RichTextProps = {
  richText?: StoryblokRichtext;
  id?: string;
  sectionTheme?: string;
  headingColor?: string;
  className?: string;
  sectionLevel?: number;
  isInGrid?: boolean;
  headlineIndex?: number;
};

type RichTextNode = {
  type?: string;
  text?: string;
  attrs?: Record<string, unknown>;
  content?: Array<RichTextNode>;
  [key: string]: unknown;
};

function isParagraphNodeEmpty(node: RichTextNode): boolean {
  const content = node.content ?? [];
  if (content.length === 0) return true;

  return !content.some((child) => {
    if (child.type === "text") return (child.text ?? "").trim() !== "";

    // Keep explicit soft line breaks treated as visual spacing (empty paragraph).
    if (child.type === "hard_break") return false;

    return true;
  });
}

function markEmptyParagraphs(node: RichTextNode): RichTextNode {
  const nextContent = node.content?.map(markEmptyParagraphs);
  const nextNode: RichTextNode = {
    ...node,
    ...(nextContent ? { content: nextContent } : {}),
  };

  if (nextNode.type === "paragraph" && isParagraphNodeEmpty(nextNode))
    nextNode.attrs = {
      ...(nextNode.attrs ?? {}),
      "data-empty-paragraph": "true",
    };

  return nextNode;
}

export default function RichText({
  richText,
  id,
  sectionTheme,
  className,
  sectionLevel = 1,
  isInGrid,
  headlineIndex,
  ...rest
}: RichTextProps) {
  if (!richText) return null;

  const normalizedRichText = markEmptyParagraphs(richText as RichTextNode) as StoryblokRichtext;

  const headingClassNameMapping: Record<number, string> = {
    1: cn("text-4xl"),
    2: cn("text-3xl"),
    3: cn("text-base"),
    4: cn("text-base"),
    5: cn("text-base"),
    6: cn("text-base"),
  };

  const CustomBlok = ComponentBlok.configure({
    renderComponent: (renderBlok: Record<string, unknown>, nodeId?: string) =>
      createElement(StoryblokServerComponent, {
        blok: renderBlok as any,
        key: `${nodeId ?? "blok"}-${(renderBlok as any)?._uid ?? "0"}`,
      }),
  });

  const CustomHeading = Heading.extend({
    renderHTML({ node }: { node: { attrs?: { level?: number } } }) {
      const level = node.attrs?.level ?? 1;
      const safeLevel = Math.min(6, Math.max(1, level));

      return [
        `h${safeLevel}`,
        {
          className: headingClassNameMapping[safeLevel],
        },
        0,
      ];
    },
  });

  const CustomImage = ImageExtension.extend({
    renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, string> }) {
      const src = HTMLAttributes?.src;
      const alt = HTMLAttributes?.alt;
      const dimensions = getDimensionsFromUrl(src ?? "");

      return [
        asTag(Image),
        {
          src,
          alt,
          width: dimensions?.width ?? 1600,
          height: dimensions?.height ?? 600,
          className: "w-max h-auto max-h-[600px] object-left object-cover my-6",
          loading: "lazy",
        },
      ];
    },
  });

  const CustomListItem = ListItem.extend({
    name: "list_item",
    renderHTML() {
      return [
        "li",
        {
          className: "not-first:mt-3",
        },
        0,
      ];
    },
  });

  const CustomOrderedList = OrderedList.extend({
    name: "ordered_list",
    renderHTML() {
      return [
        "ol",
        {
          className: "list-decimal list-inside ml-2",
        },
        0,
      ];
    },
  });

  const CustomBulletList = BulletList.extend({
    name: "bullet_list",
    renderHTML() {
      return [
        "ul",
        {
          className: "list-disc list-inside ml-2",
        },
        0,
      ];
    },
  });

  const CustomHorizontalRule = HorizontalRule.extend({
    name: "horizontal_rule",
    renderHTML() {
      return [
        "hr",
        {
          className: cn("my-0.5 border border-black"),
        },
      ];
    },
  });

  const CustomParagraph = Paragraph.extend({
    name: "paragraph",
    renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, unknown> }) {
      const isEmpty = HTMLAttributes["data-empty-paragraph"] === "true";

      // Preserve editor-intended spacing for empty paragraphs by rendering a line break.
      if (isEmpty) return ["br"];

      return ["p", {}, 0];
    },
  });

  const CustomLink = TipTapLink.extend({
    name: "link",
    renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, string> }) {
      let href = HTMLAttributes?.linktype === "email" ? `mailto:${HTMLAttributes?.href}` : HTMLAttributes?.href;

      if (href && !href.startsWith("http") && !href.startsWith("/") && HTMLAttributes?.linktype !== "email") {
        href = `/${href}`;
      }

      return [
        "a",
        {
          href,
          target: HTMLAttributes?.target,
          className: "border-inherit border-b-1 hover:border-b-2 transition-colors ease-linear duration-150",
        },
        0,
      ];
    },
  });

  const tiptapExtensions = {
    blok: CustomBlok,
    heading: CustomHeading,
    image: CustomImage,
    list_item: CustomListItem,
    ordered_list: CustomOrderedList,
    bullet_list: CustomBulletList,
    horizontal_rule: CustomHorizontalRule,
    paragraph: CustomParagraph,
    link: CustomLink,
  };

  return (
    <div
      id={id}
      className={cn("relative text-base richtext", (rest as any)["data-observe-visibility"] && "opacity-0", className)}
      data-visibility-translate
      {...rest}
    >
      <StoryblokRichText doc={normalizedRichText as any} tiptapExtensions={tiptapExtensions} />
    </div>
  );
}
