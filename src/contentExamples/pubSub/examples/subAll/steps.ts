export const PubSubSteps = [
  {
    AToCenter: false,
    BToCenter: false,
    CToCenter: false,
    CenterToA: false,
    CenterToC: false,
    activeA: false,
    eventCenter: null,
    log: 'A,B,C 为不同组件'
  },
  {
    AToCenter: true,
    BToCenter: false,
    CToCenter: false,
    CenterToA: false,
    CenterToC: false,
    activeA: false,
    eventCenter: { '*': [{ content: 'A: cbA', active: false }] },
    log: 'A 订阅了所有事件，添加到事件中心'
  },
  {
    AToCenter: false,
    BToCenter: false,
    CToCenter: true,
    CenterToA: false,
    CenterToC: false,
    activeA: false,
    eventCenter: {
      '*': [{ content: 'A: cbA', active: false }]
    },
    log: 'C 派发了 bar 事件，Center 处理 bar 事件'
  },
  {
    AToCenter: false,
    BToCenter: false,
    CToCenter: true,
    CenterToA: true,
    CenterToC: false,
    activeA: true,
    eventCenter: {
      '*': [{ content: 'A: cbA', active: true, delay: 0 }]
    },
    log: 'Center 通知订阅了 bar 事件的组件，由于事件中心中没有 bar，所以处理 * 下的所有组件，在 * 下找到了 A 组件并通知'
  },
  {
    AToCenter: false,
    BToCenter: true,
    CToCenter: false,
    CenterToA: false,
    CenterToC: false,
    activeA: false,
    eventCenter: {
      '*': [{ content: 'A: cbA', active: false }]
    },
    log: 'B 派发了 foo 事件，Center 处理 foo 事件'
  },
  {
    AToCenter: false,
    BToCenter: true,
    CToCenter: false,
    CenterToA: true,
    CenterToC: false,
    activeA: true,
    eventCenter: {
      '*': [{ content: 'A: cbA', active: true, delay: 0 }]
    },
    log: 'Center 通知订阅了 foo 事件的组件，由于事件中心中没有 foo，所以处理 * 下的所有组件，在 * 下找到了 A 组件并通知'
  }
];
