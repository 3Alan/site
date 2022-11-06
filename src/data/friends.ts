export interface FriendItem {
  title: string;
  url: string;
  description?: string;
  tags?: string[];
}

const friendList: FriendItem[] = [
  {
    title: 'Alan Wang',
    url: 'https://www.alanwang.site/',
    description: '此刻想举重若轻，之前必要负重前行',
    tags: ['前端开发']
  }
];

export default friendList;
