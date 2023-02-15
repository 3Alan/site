export const PubSubSteps = [
  {
    AToCenter: false,
    AToCenterLabel: '',
    BToCenter: false,
    CToCenter: false,
    CenterToA: false,
    CenterToC: false,
    activeA: false,
    activeC: false,
    activeBus: false,
    eventBus: null,
    log: 'A,B,C 为不同组件'
  },
  {
    AToCenter: true,
    AToCenterLabel: "on('foo', fooCbA)",
    BToCenter: false,
    CToCenter: false,
    CenterToA: false,
    CenterToC: false,
    activeA: false,
    activeC: false,
    activeBus: false,
    eventBus: { foo: [{ content: 'A: fooCbA', active: false }] },
    log: 'A 订阅了 foo 事件，添加到事件中心，运行代码 <code>all.set("foo", [fooCbA])</code>'
  },
  {
    AToCenter: false,
    AToCenterLabel: '',
    BToCenter: false,
    CToCenter: true,
    CenterToA: false,
    CenterToC: false,
    activeA: false,
    activeC: false,
    activeBus: false,
    eventBus: {
      foo: [
        { content: 'A: fooCbA', active: false },
        { content: 'C: fooCbC', active: false }
      ]
    },
    log: 'C 订阅了 foo 事件，添加到事件中心，运行代码 <code>all.get("foo").push(fooCbC)</code>'
  },
  {
    AToCenter: false,
    AToCenterLabel: '',
    BToCenter: true,
    CToCenter: false,
    CenterToA: false,
    CenterToC: false,
    activeA: false,
    activeC: false,
    activeBus: false,
    eventBus: {
      foo: [
        { content: 'A: fooCbA', active: false },
        { content: 'C: fooCbC', active: false }
      ]
    },
    log: 'B 派发了 foo 事件，Center 处理 foo 事件，运行代码 <code>all.get("foo")</code>'
  },
  {
    AToCenter: false,
    AToCenterLabel: '',
    BToCenter: false,
    CToCenter: false,
    CenterToA: true,
    CenterToC: true,
    activeA: true,
    activeC: true,
    activeBus: false,
    eventBus: {
      foo: [
        { content: 'A: fooCbA', active: true, delay: 0 },
        { content: 'C: fooCbC', active: true, delay: 0 }
      ]
    },
    log: 'Center 通知订阅了 foo 事件的组件，代码实现中并没有通知这一步而是直接执行 foo 事件队列中的所有函数 <code>all.get("foo").slice().map(handler => handler("emit data"))</code>'
  },
  {
    AToCenter: true,
    AToCenterLabel: "off('foo', fooCbA)",
    BToCenter: false,
    CToCenter: false,
    CenterToA: false,
    CenterToC: false,
    activeA: false,
    activeC: false,
    activeBus: false,
    eventBus: {
      foo: [
        { content: 'A: fooCbA', active: true, delay: 0 },
        { content: 'C: fooCbC', active: true, delay: 0 }
      ]
    },
    log: 'A 取消订阅了 foo 事件'
  },
  {
    AToCenter: true,
    AToCenterLabel: "off('foo', fooCbA)",
    BToCenter: false,
    CToCenter: false,
    CenterToA: false,
    CenterToC: false,
    activeA: false,
    activeC: false,
    activeBus: false,
    eventBus: {
      foo: [{ content: 'C: fooCbC', active: true, delay: 0 }]
    },
    log: '将 foo 事件队列中的 A 删除'
  },
  {
    AToCenter: false,
    AToCenterLabel: '',
    BToCenter: true,
    CToCenter: false,
    CenterToA: false,
    CenterToC: false,
    activeA: false,
    activeC: false,
    activeBus: false,
    eventBus: {
      foo: [{ content: 'C: fooCbC', active: false }]
    },
    log: 'B 派发了 foo 事件，Center 处理 foo 事件，运行代码 <code>all.get("foo")</code>'
  },
  {
    AToCenter: false,
    AToCenterLabel: '',
    BToCenter: false,
    CToCenter: false,
    CenterToA: false,
    CenterToC: true,
    activeA: false,
    activeC: true,
    activeBus: false,
    eventBus: {
      foo: [{ content: 'C: fooCbC', active: true, delay: 0 }]
    },
    log: 'Center 通知订阅了 foo 事件的组件，此时将不再通知A'
  },
  {
    AToCenter: false,
    AToCenterLabel: '',
    BToCenter: false,
    CToCenter: false,
    CenterToA: false,
    CenterToC: false,
    activeA: false,
    activeC: false,
    activeBus: true,
    eventBus: null,
    log: '清除所有订阅事件，调用 <code>all.clear()</code>'
  }
];
