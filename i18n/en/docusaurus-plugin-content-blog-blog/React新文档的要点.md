---
draft: true
summary: >-
  - The focus of the new React documentation is on mutability and naming
  conventions.

  - For mutability, reference types should be treated as read-only. The
  use-immer library can be used to address the issue of writing nested objects.

  - Regarding naming conventions, internal function names should start with
  "handle", and props function names should start with "on".

  - The naming convention for setState can use either abbreviation or the full
  name.

  - Rerendering can be achieved by changing the key value.
ai_translation: true
---

## Key points in the new React documentation

- [Why Immutability Is Important](https://react.dev/learn/tutorial-tic-tac-toe#why-immutability-is-important)
- Focus on the "Keeping Components Pure" section
- mutable
  - Reference types should be treated as readonly
  - [Updating Arrays in State](https://react.dev/learn/adding-interactivity#updating-arrays-in-state)
  - [Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
  - Use the use-immer library to address the issue of writing nested objects
- Naming conventions: internal function names start with "handle", props function names start with "on"

- Simple principle of hooks: [Giving a Component Multiple State Variables](https://react.dev/learn/state-a-components-memory#giving-a-component-multiple-state-variables)

- Naming convention for setState: `setLastName(ln => ln.reverse());` Use abbreviation (LastName -> ln) or use the full name (LastName -> LastName, LastName -> prevLastName)

- [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates) The explanation of the second challenge discusses the principle

  ```jsx
  // Equivalent to setNumber principle
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

- Rerendering can be achieved by changing the key value
- [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state) explains how to design declarative UI state

- [Avoid Deeply Nested State](https://react.dev/learn/choosing-the-state-structure#avoid-deeply-nested-state) recommends avoiding deeply nested state
- DOM tree update strategy
