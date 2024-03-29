---
draft: true
summary: |-
  - React 新文档的重点是可变性和命名风格。
  - 可变性方面，只要将引用类型当作只读即可，可以使用 use-immer 来解决嵌套对象书写问题。
  - 命名风格方面，内部函数名以 handle 开头，props 函数名以 on 开头。
  - setState 命名风格可以使用首字母缩写或完整名称。
  - 可以通过改变 key 值来重新渲染。
---

## React 新文档的要点

- https://react.dev/learn/tutorial-tic-tac-toe#why-immutability-is-important
- Keeping Components Pure 章节重点阅读
- mutable
  - 只要将引用类型当作 readonly 就行
  - https://react.dev/learn/adding-interactivity#updating-arrays-in-state
  - https://react.dev/learn/updating-objects-in-state
  - 使用 use-immer 来解决嵌套对象书写问题
- 命名风格：内部函数名 handle 开头，props 函数名 on 开头

- hook 简单原理 https://react.dev/learn/state-a-components-memory#giving-a-component-multiple-state-variables

- setState 命名风格：`setLastName(ln => ln.reverse());` 使用首字母缩写 LastName -> ln，也可以使用 LastName -> LastName, LastName -> prevLastName

- https://react.dev/learn/queueing-a-series-of-state-updates 最后挑战的第二题讲解了原理

  ```jsx
  // 相当于setNumber原理
  export function getFinalState(baseState, queue) {
    let finalState = baseState;

    for (let update of queue) {
      if (typeof update === 'function') {
        // TODO: apply the updater function
        finalState = update(finalState);
      } else {
        finalState = update;
        // TODO: replace the state
      }
    }

    return finalState;
  }

  () => {
    setNumber(number + 5);
    setNumber(n => n + 1);
    setNumber(42);
  };
  ```

- 可以通过改变 key 值来 rerender
- https://react.dev/learn/reacting-to-input-with-state 讲的很好如何来设计声明式 UI 的 state

- https://react.dev/learn/choosing-the-state-structure#avoid-deeply-nested-state 避免深度嵌套状态
- DOM 树更新策略
