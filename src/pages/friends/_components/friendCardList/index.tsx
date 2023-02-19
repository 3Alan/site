import React, { FC } from 'react';
import friendList, { FriendItem } from '@site/src/data/friends';
import './index.scss';
import Card from '../../../../components/card';
import Link from '@docusaurus/Link';

const cls = 'fc-list';

const FriendCard: FC<FriendItem> = ({ title, description, url, tags, avatar }) => {
  const onCardClick = () => {
    window.open(url);
  };

  return (
    <Card onClick={onCardClick}>
      <img src={avatar} alt={title} />
      <div className={`${cls}-c-content`}>
        <Link to={url}>
          <strong>{title}</strong>
        </Link>
        <p title={description}>{description}</p>
        {tags &&
          tags.map(tag => (
            <span key={tag} className={`${cls}-tag`}>
              # {tag}
            </span>
          ))}
      </div>
    </Card>
  );
};

const FriendCardList = () => {
  return (
    <div className={cls}>
      {friendList.map(item => (
        <FriendCard key={item.title} {...item} />
      ))}
    </div>
  );
};

export default FriendCardList;
