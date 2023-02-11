export const PubSubSteps = [
  {
    AToCenter: false,
    CenterToA: false,
    activeA: false,
    activeCenter: false,
    eventBus: null,
    log: '小明去便利店买酸奶'
  },
  {
    AToCenter: true,
    CenterToA: false,
    activeA: false,
    activeCenter: false,
    eventBus: { 记事本: [{ content: '小明电话', active: false }] },
    log: '酸奶卖完了，小明留下了电话'
  },
  {
    AToCenter: false,
    CenterToA: false,
    activeA: false,
    activeCenter: true,
    eventBus: {
      记事本: [{ content: '小明电话', active: false }]
    },
    log: '店铺开门了'
  },
  {
    AToCenter: false,
    CenterToA: true,
    activeA: true,
    activeCenter: false,
    eventBus: {
      记事本: [{ content: '小明电话', active: true, delay: 0 }]
    },
    log: '老板打电话通知小明'
  }
];
