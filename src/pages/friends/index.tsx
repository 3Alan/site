import React from 'react';
import Layout from '@theme/Layout';
import Comment from '../../components/comment';

function ShowcaseHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <h1>友情链接</h1>
      <p>欢迎互换友链</p>
      <button className="button button--primary">添加你的链接</button>
    </section>
  );
}

const Friends = () => {
  return (
    <Layout description="友情链接">
      <main>
        <ShowcaseHeader />
      </main>
      <div className="container">
        Friends
        <Comment />
      </div>
    </Layout>
  );
};

export default Friends;
