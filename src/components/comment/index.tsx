import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Giscus, { GiscusProps } from '@giscus/react';
import { useThemeConfig, ThemeConfig } from '@docusaurus/theme-common';

interface CustomThemeConfig extends ThemeConfig {
  giscus: GiscusProps;
}

export const Comment = () => {
  const { giscus } = useThemeConfig() as CustomThemeConfig;

  return (
    <BrowserOnly fallback={<div>Loading Comments...</div>}>
      {() => (
        <div style={{ paddingTop: 50 }}>
          <Giscus
            id="comments"
            mapping="title"
            strict="1"
            term="Welcome to @giscus/react component!"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme="dark_dimmed"
            lang="zh-CN"
            loading="lazy"
            {...giscus}
          />
        </div>
      )}
    </BrowserOnly>
  );
};

export default Comment;
