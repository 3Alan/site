import React from 'react';
import Giscus from '@giscus/react';

//  TODO: 配置提取到 docusaurus.config.js 文件中
// 服务端不加载，相关api browserOnly useThemeConfig

export const Comment = () => {
  return (
    <div style={{ paddingTop: 50 }}>
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
    </div>
  );
};

export default Comment;
