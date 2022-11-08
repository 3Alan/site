import React from 'react';

export default function FriendHeader() {
  const onAddClick = () => {
    const commentTarget = document.querySelector('#comment-anchor');
    commentTarget.scrollIntoView({ behavior: 'smooth' });
    window.gtag?.('event', 'add_friend_click');
  };

  return (
    <section className="text--center">
      <h1>友情链接 🔗</h1>
      <p>请通过评论留下你的信息，符合条件的将在3天内完成添加！</p>
      <button className="button button--primary" onClick={onAddClick}>
        🙏 添加你的网站
      </button>
    </section>
  );
}
