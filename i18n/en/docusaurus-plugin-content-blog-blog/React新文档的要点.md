---
draft: true
summary: >-
  - React new docs focus on mutability and naming conventions.

  - For mutability, treat reference types as readonly, use-immer for nested
  object writing issues.

  - For naming conventions, internal function names start with handle, props
  function names start with on.

  - setState naming conventions can use either abbreviation or full name.

  - Re-render can be done by changing the key.
ai_translation: true
---

## Key points from React new docs

- https://react.dev/learn/tutorial-tic-tac-toe#why-immutability-is-important
- Focus on the Keeping Components Pure section
- mutable
  - Treat reference types as readonly
  - https://react.dev/learn/adding-interactivity#updating-arrays-in-state
  - https://react.dev/learn/updating-objects-in-state
  - use use-immer for nested object writing issues
- Naming conventions: internal function names start with handle, props function names start with on

- Simple principle of hook https://react.dev/learn/state-a-components-memory#giving-a-component-multiple-state-variables

- setState naming conventions: `setLastName(ln => ln.reverse());` use abbreviation LastName -> ln, or can also use LastName -> LastName, LastName -> prevLastName

- https://react.dev/learn/queueing-a-series-of-state-updates the explanation for the second question in the final challenge

  ```jsx
  // similar to the principle of setNumber
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

- Re-render can be done by changing the key
- https://react.dev/learn/reacting-to-input-with-state has a good explanation of how to design state for declarative UI

- https://react.dev/learn/choosing-the-state-structure#avoid-deeply-nested-state avoid deeply nested state
- DOM tree update strategy
