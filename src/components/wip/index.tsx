import React from 'react';
import Admonition from '@theme/Admonition';
import Translate, { translate } from '@docusaurus/Translate';

export function Wip() {
  return (
    <Admonition
      type="warning"
      title={translate({
        id: 'component.wip.label',
        message: '更新中'
      })}
      icon="🚧 🚧"
    >
      <Translate id="component.wip.content">本文还在不断完善更新中...</Translate>
    </Admonition>
  );
}
