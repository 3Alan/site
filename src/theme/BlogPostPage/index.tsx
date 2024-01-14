---
summary: >-
  博文页面组件，用于显示博文内容、侧边栏、评论等信息。它使用了 `useBlogPost`
  获取博文元数据，并根据博文前缀设置显示或隐藏评论、目录、过期等信息。还集成了捐赠、许可证和过时组件。
---
import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { HtmlClassNameProvider, ThemeClassNames } from '@docusaurus/theme-common';

import {
  BlogPostProvider,
  useBlogPost
  // @ts-ignore
} from '@docusaurus/theme-common/internal';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import TOC from '@theme/TOC';
import type { Props } from '@theme/BlogPostPage';
import type { BlogSidebar } from '@docusaurus/plugin-content-blog';
import Comment from '../../components/comment';
import Donate from '../../components/donate';
import License from '../../components/license';
import { OutDated } from '../../components/outdated';
import getFormatDate from '../../utils/getFormatDate';
import { Wip } from '@site/src/components/wip';
import { AiSummary } from '@site/src/components/aiSummary';

function BlogPostPageContent({
  children
}: {
  sidebar: BlogSidebar;
  children: ReactNode;
}): JSX.Element {
  const { metadata, toc } = useBlogPost();
  const { nextItem, prevItem, frontMatter } = metadata;
  const {
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
    hide_comment: hideComment,
    out_dated: outDated,
    summary,
    wip,
    date,
    updated
  } = frontMatter;
  return (
    <BlogLayout
      toc={
        !hideTableOfContents && toc.length > 0 ? (
          <TOC
            toc={toc}
            minHeadingLevel={tocMinHeadingLevel}
            maxHeadingLevel={tocMaxHeadingLevel}
          />
        ) : undefined
      }
    >
      <BlogPostItem>
        {summary && <AiSummary content={summary} />}
        {outDated && <OutDated date={getFormatDate(updated || date)} />}
        {wip && <Wip />}
        {children}
      </BlogPostItem>
      <Donate />
      <License />
      {(nextItem || prevItem) && <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />}
      {!hideComment && <Comment />}
    </BlogLayout>
  );
}

export default function BlogPostPage(props: Props): JSX.Element {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogPostPage)}
      >
        <BlogPostPageMetadata />
        <BlogPostPageContent sidebar={props.sidebar}>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
