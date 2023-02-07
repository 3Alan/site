export const PubSubSteps = [
  {
    AToCenter: false,
    BToCenter: false,
    CToCenter: false,
    CenterToA: false,
    CenterToC: false,
    activeA: false,
    activeC: false,
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
    activeC: false,
    eventCenter: { foo: [{ content: 'A: fooCbA', active: false }] },
    log: 'A 订阅了 foo 事件，添加到事件中心'
  },
  {
    AToCenter: false,
    BToCenter: false,
    CToCenter: true,
    CenterToA: false,
    CenterToC: false,
    activeA: false,
    activeC: false,
    eventCenter: {
      foo: [
        { content: 'A: fooCbA', active: false },
        { content: 'C: fooCbC', active: false }
      ]
    },
    log: 'C 订阅了 foo 事件，添加到事件中心'
  },
  {
    AToCenter: false,
    BToCenter: true,
    CToCenter: false,
    CenterToA: false,
    CenterToC: false,
    activeA: false,
    activeC: false,
    eventCenter: {
      foo: [
        { content: 'A: fooCbA', active: false },
        { content: 'C: fooCbC', active: false }
      ]
    },
    log: 'B 派发了 foo 事件，Center 处理 foo 事件'
  },
  {
    AToCenter: false,
    BToCenter: false,
    CToCenter: false,
    CenterToA: true,
    CenterToC: true,
    activeA: true,
    activeC: true,
    eventCenter: {
      foo: [
        { content: 'A: fooCbA', active: true, delay: 0 },
        { content: 'C: fooCbC', active: true, delay: 0 }
      ]
    },
    log: 'Center 通知订阅了 foo 事件的组件'
  }
];
