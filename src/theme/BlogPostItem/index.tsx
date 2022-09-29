import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import type BlogPostItemType from '@theme/BlogPostItem';
import type {WrapperProps} from '@docusaurus/types';
import Giscus from '@giscus/react';

type Props = WrapperProps<typeof BlogPostItemType>;

export default function BlogPostItemWrapper(props: Props): JSX.Element {
  return (
    <>
      <BlogPostItem {...props} />
      <Giscus
        id="comments"
        repo="3Alan/site"
        repoId="R_kgDOH0FBrg"
        category="Announcements"
        categoryId="DIC_kwDOH0FBrs4CRscX"
        mapping="title"
        strict="1"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="dark_dimmed"
        lang="zh-CN"
        loading="lazy"
      />
    </>
  );
}
