export interface FriendItem {
  title: string;
  url: string;
  avatar?: string;
  description?: string;
  tags?: string[];
}

const friendList: FriendItem[] = [
  {
    title: "Alan",
    avatar: "/img/github_avatar.jpeg",
    url: "https://www.alanwang.site/",
    description: "此刻想举重若轻，之前必要负重前行",
    tags: ["前端开发"],
  },
  {
    title: "Kuizuo",
    avatar: "/img/friends/kuizuo.png",
    url: "https://kuizuo.cn",
    description: "记录所学知识，领略编程之美",
    tags: ["前端开发", "ts全栈"],
  },
  {
    title: "太空编程",
    avatar: "/img/friends/spacexcode.png",
    url: "https://spacexcode.com",
    description: "分享硬核的前端编程知识",
    tags: ["前端开发"],
  },
  {
    title: "Castamere",
    avatar: "/img/friends/castamerego.jpeg",
    url: "https://www.castamerego.com/",
    description: "代码美学",
    tags: ["全栈开发", "python开发"],
  },
];

export default friendList;
