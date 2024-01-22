---
slug: guide
title: Guide Component for React
tags:
  - React
  - Component Library
  - Guide
categories:
  - Front-end
  - React
date: 2021-09-16T13:15:29.000Z
keywords:
  - react guide component
  - react onboarding component
  - react tooltip component
description: >-
  A react component for onboarding users with tooltips attached to target
  elements and previous, next, and finish buttons.
sidebar_label: Guide Component
sidebar_position: 3
summary: >-
  The Guide component is an onboarding component that attaches a popover to a
  target element and provides previous, next, and finish buttons. It
  automatically scrolls to the target element if it's out of the viewport. The
  popover stays attached to the target element when the screen size changes.

  The component's API includes mask, steps, and onClose. The steps require a
  selector parameter to get the position of the target element.

  The component uses the rough-notation library to achieve the hand-drawn effect
  and animations.

  It uses the computePopoverStyles function to calculate the absolute
  positioning offset of the popover relative to its parent.

  The component also uses a debounce function to optimize the handling of window
  resize events.
ai_translation: true
---

## Guide Onboarding Component

<!--truncate-->

> https://mp.weixin.qq.com/s/vrDQEGgOSnKBvHuwZV6vSA
>
> https://github.com/gilbarbara/react-joyride
>
> https://github.com/bytedance/guide

[Live Demo](https://alan-ui.alanwang.site/?path=/docs/components-guide--guide)

This article only introduces the general idea. For details on the implementation, please refer to the [Guide source code](https://github.com/3Alan/alan-ui/tree/main/src/components/guide).

## Functional Requirements

- Attach to the target element in the form of a `popover` to explain the target element.
- When there are multiple target elements, provide previous, next, and finish buttons.
- When the element is out of the viewport, automatically scroll to the target element.
- When the screen size changes, the `popover` can always be attached to the target element.

## Confirming the API

After confirming the functional requirements, we need to design the API. Since the functions of my component are relatively simple, the API design is also relatively simple.

```js
// Whether to show the mask layer
mask?: boolean;
steps: StepItem;
onClose?: (finished: boolean) => void;
```

These three APIs are relatively easy to understand. The following mainly explains `steps`.

Because the `popover` needs to be attached to the target element, we need to get the position of the target element. We can use `document.querySelector()` to achieve this. Then we can clearly confirm that `steps` needs to provide a `selector` parameter.
So we can basically confirm the content of `StepItem`.

```js
/**
 * Target element selector
 */
selector: string;
/**
 * popover content
 */
content: ReactNode;
```

## Prerequisites

- React.createPortal
- HTMLElement.offsetParent
  Returns a reference to the nearest (in the containment hierarchy) positioned container element or the nearest table, td, th, or body element. If the element is not displayed (e.g. display: none), offsetParent returns null.
- HTMLElement.offsetXXX
  Relative to offsetParent
- Element.getBoundingClientRect()
  Returns the size of an element (including border+padding) and its position relative to the **viewport**

  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth

- clientWeight/clientHeight

  https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth

I wrote a [related API example](https://stackblitz.com/edit/web-platform-5hqpo6) for easy understanding.

## Start Coding

The project uses the [rough-notation](https://github.com/rough-stuff/rough-notation) library, mainly to achieve some hand-drawn effects and animations. I will remove the relevant code to avoid affecting the main idea.

First, use two variables `currentIndex` and `currentContent` to control the current `step`.

```jsx
useEffect(() => {
  handleStepChange();
}, [currentIndex]);
```

Analyze what `handleStepChange` needs to achieve:

- Get the current target element and its `offsetParent` (referred to as parent later) through `props.steps[currentIndex].selector`.
- Use `React.createPortal` to render the `popover` into the parent node.
- Since the parent node of the `popover` is now the parent node of the target element (that is, it is a sibling node of the target node), we only need to adjust the position absolutely relative to the parent.
- Determine whether the target element is in the viewport. If not, scroll to the position of the target element.

```js
const handleStepChange = () => {
  const { selector, content } = steps[currentIndex];
  const e = document.querySelector(selector) as HTMLElement;
  const parent = (e.offsetParent || document.body) as HTMLElement;
  setParentEl(parent);

  // Determine whether it is in the visible area
  const isVisible = isElementVisible(selector);
  if (!isVisible) {
    e.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Calculate the offset of popover relative to parent
  computePopoverStyles();
  setCurrentContent(content);
};

// <PopoverContent /> is the popover content, just think of it as a div, just add some styles
{createPortal(<PopoverContent />, parentEl)}
```

### popover Content

```jsx
<div className={`${cls}-inner`}>
  <div className={`${cls}-content`}>{currentContent}</div>
  <div className={`${cls}-footer`}>
    <span>
      {currentIndex + 1}/{steps.length}
    </span>

    {currentIndex !== 0 && (
      <Button type="standard" size="small" onClick={() => setCurrentIndex(currentIndex - 1)}>
        Prev
      </Button>
    )}

    {currentIndex !== steps.length - 1 && (
      <Button type="standard" size="small" onClick={() => setCurrentIndex(currentIndex + 1)}>
        Next
      </Button>
    )}
    {currentIndex === steps.length - 1 && (
      <Button size="small" onClick={handleClose}>
        finish
      </Button>
    )}
  </div>
</div>
```

### Listen for Window Changes

Here, `computePopoverStyles` mainly calculates the absolute positioning offset relative to the parent.

```jsx
// Use debounce, optimization method
const { run: handleResize } = useDebounceFn(computePopoverStyles, {
  wait: 200
});

useEffect(() => {
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

### Calculate Offset

![Offset Calculation](https://raw.githubusercontent.com/3Alan/images/master/img/image-20210916145908255.png)
