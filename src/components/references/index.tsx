import React, { FC } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import Link from '@docusaurus/Link';
import './index.scss';
import Translate from '@docusaurus/Translate';

interface ReferencesProps {
  options: { name: string; url: string }[];
}

const cls = 'c-references';

const References: FC<ReferencesProps> = ({ options }) => {
  return (
    <div className={cls}>
      <div className={`${cls}-header`}>
        <FaQuoteLeft /> <Translate id="component.references.label">参考资料</Translate>
      </div>
      <ul className={`${cls}-list`}>
        {options.map(item => (
          <li key={item.name}>
            <Link to={item.url} rel="external nofollow noopener noreferrer">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default References;
