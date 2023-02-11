export const PubSubSteps = [
  {
    AToCenter: false,
    BToCenter: false,
    CToCenter: false,
    CenterToA: false,
    CenterToC: false,
    activeA: false,
    activeC: false,
    eventBus: null,
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
    eventBus: { foo: [{ content: 'A: fooCbA', active: false }] },
    log: 'A 订阅了 foo 事件，添加到事件中心，运行代码 all.set("foo", [fooCbA])'
  },
  {
    AToCenter: false,
    BToCenter: false,
    CToCenter: true,
    CenterToA: false,
    CenterToC: false,
    activeA: false,
    activeC: false,
    eventBus: {
      foo: [
        { content: 'A: fooCbA', active: false },
        { content: 'C: fooCbC', active: false }
      ]
    },
    log: 'C 订阅了 foo 事件，添加到事件中心，运行代码 all.get("foo").push(fooCbC)'
  },
  {
    AToCenter: false,
    BToCenter: true,
    CToCenter: false,
    CenterToA: false,
    CenterToC: false,
    activeA: false,
    activeC: false,
    eventBus: {
      foo: [
        { content: 'A: fooCbA', active: false },
        { content: 'C: fooCbC', active: false }
      ]
    },
    log: 'B 派发了 foo 事件，Center 处理 foo 事件，运行代码 all.get("foo")'
  },
  {
    AToCenter: false,
    BToCenter: false,
    CToCenter: false,
    CenterToA: true,
    CenterToC: true,
    activeA: true,
    activeC: true,
    eventBus: {
      foo: [
        { content: 'A: fooCbA', active: true, delay: 0 },
        { content: 'C: fooCbC', active: true, delay: 0 }
      ]
    },
    log: 'Center 通知订阅了 foo 事件的组件，代码实现中并没有通知这一步而是直接执行 foo 事件队列中的所有函数 all.get("foo").slice().map(handler => handler("emit data"))'
  }
];
