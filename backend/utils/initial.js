//初始数据

const usersData = [
  {
    id: 1,
    type: 'admin',
    status: true,
    username: 'haovincent',
    password: '$2a$05$kaesAZ4tGEj4aMo/UIKSk.Xe78CnvUb0fN7dkeI9kVCU4FqE1jW5u',
    points: 233,
    nickname: '遨游',
    phone: '18639289962',
    description: '此人很懒，什么也没写'
  },
  {
    id: 2,
    type: 'user',
    status: false,
    username: 'hao',
    password: '$2a$05$kaesAZ4tGEj4aMo/UIKSk.Xe78CnvUb0fN7dkeI9kVCU4FqE1jW5u',
    points: 211,
    nickname: '小小遨游',
    phone: '18639289962',
    description: '此人勤快，但也什么也没写'
  }
]

const articleData = {
  id: 1,
  authorId: 1,
  title: '三千字说废就废',
  userId: 1,
  content: '我最近在靠写历史稿吃饭，昨天写了一篇三千字的，其实稿费只有三十五元，不过因我文笔一般，愣是写了一个多小时。当我把它发给老板之后，很快就被打回来了',
  picture: '/static/img/bg2.png',
  status: 3,
  view: 101,
  like: 3
}

const collectionsData = [{
  id: 1,
  title: '默认收藏',
  description: '暂无描述~',
  public: true,
  ownerId: 1
}, 
{
  id: 2,
  title: '我的收藏',
  description: '主要关于英语学习类文章',
  public: true,
  ownerId: 1
}]

const tasksData = [{
  id: 1,
  finishWrite: true,
  finishVideo: false,
  taskImages: 'file-1611795545829.png',
  userId: 1
}, 
{
  id: 2,
  finishWrite: false,
  finishVideo: false,
  taskImages: 'file-1611795545829.png',
  userId: 1
}]

module.exports = {
  usersData,
  articleData,
  collectionsData,
  tasksData
}