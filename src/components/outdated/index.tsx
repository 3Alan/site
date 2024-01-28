import React from 'react';
import Admonition from '@theme/Admonition';
import Translate, { translate } from '@docusaurus/Translate';

export function OutDated({ date }) {
  return (
    <Admonition
      type="warning"
      title={translate({
        id: 'component.outdated.label',
        message: '提示'
      })}
      icon="🚧 🚧"
    >
      <Translate
        id="component.outdated.content"
        values={{
          date
        }}
      >
        {'本文最后于 {date} 更新，部分内容可能已经过时，请在阅读本文时注意参考最新的信息。'}
      </Translate>
    </Admonition>
  );
}
