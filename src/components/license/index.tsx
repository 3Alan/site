import React from 'react';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import './index.scss';

const cls = 'license';

export default function License() {
  return (
    <p className={cls}>
      <Translate
        id="component.license.text"
        values={{
          link: (
            <Link
              to="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              rel="external nofollow noopener noreferrer"
            >
              CC BY-NC-SA 4.0
            </Link>
          )
        }}
      >
        {'本文采用 {link} 许可协议，转载请注明出处。'}
      </Translate>
    </p>
  );
}
