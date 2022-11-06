import React, { FC } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Giscus, { GiscusProps } from '@giscus/react';
import {
  useThemeConfig,
  useColorMode,
  ThemeConfig
} from '@docusaurus/theme-common';

interface CustomThemeConfig extends ThemeConfig {
  giscus: GiscusProps;
}

interface CommentProps {
  theme?: string;
  darkTheme?: string;
}

export const Comment: FC<CommentProps> = ({ theme, darkTheme }) => {
  const { giscus } = useThemeConfig() as CustomThemeConfig;
  const { colorMode } = useColorMode();
  const giscusTheme = colorMode === 'dark' ? darkTheme : theme;

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
            theme={giscusTheme}
            lang="zh-CN"
            loading="lazy"
            {...giscus}
          />
        </div>
      )}
    </BrowserOnly>
  );
};

Comment.defaultProps = {
  theme: 'light',
  darkTheme: 'dark_dimmed'
};

export default Comment;
