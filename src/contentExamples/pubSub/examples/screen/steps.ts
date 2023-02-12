export const PubSubSteps = [
  {
    AToCenter: false,
    BToCenter: false,
    CenterToA: false,
    activeA: false,
    eventBus: null,
    log: ''
  },
  {
    AToCenter: true,
    BToCenter: false,
    CenterToA: false,
    activeA: false,
    eventBus: { '屏幕': [{ content: '小明', active: false }] },
    log: '小明求购屏幕的需求被记录在系统中'
  },
  {
    AToCenter: false,
    BToCenter: true,
    CenterToA: false,
    activeA: false,
    eventBus: { '屏幕': [{ content: '小明', active: false }] },
    log: '系统匹配是否有求购屏幕的需求'
  },
  {
    AToCenter: false,
    BToCenter: false,
    CenterToA: true,
    activeA: true,
    eventBus: { '屏幕': [{ content: '小明', active: true, delay: 0 }] },
    log: '匹配到了小明有求购屏幕需求，通知小明'
  }
];
