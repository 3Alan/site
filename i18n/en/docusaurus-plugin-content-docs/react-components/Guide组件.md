---
slug: guide
title: Guide component for react
tags:
  - React
  - Component library
  - Guide
categories:
  - Front-end
  - React
date: 2021-09-16T13:15:29.000Z
keywords:
  - react guide component
  - react guide component
  - react novice guide component
description: React novice guide component
sidebar_label: Guide component
sidebar_position: 3
summary: >-
  The Guide component is a novice guide component that can attach popover to the
  target element and provide three buttons: previous step/next step/end. When
  the element is out of the visible area, it will automatically scroll to the
  position of the target element. When the screen size changes, popover can
  always be attached to the target element.

  The API of the component includes mask, steps and onClose. A selector
  parameter needs to be provided in steps, which is used to obtain the position
  of the target element.

  In order to achieve the hand-drawn effect and animation, the component uses
  the rough-notation library.

  In order to calculate the absolute positioning offset of popover relative to
  the parent, the component uses the computePopoverStyles function.

  The component also uses the debounce function to optimize the processing of
  window change events.
ai_translation: true
---

## Guide novice guide component

<!--truncate-->

> https://mp.weixin.qq.com/s/vrDQEGgOSnKBvHuwZV6vSA
>
> https://github.com/gilbarbara/react-joyride
>
> https://github.com/bytedance/guide

[Preview effect](https://alan-ui.alanwang.site/?path=/docs/components-guide--guide)

This article only introduces the general idea. For some details of the implementation, please refer to [Guide source code](https://github.com/3Alan/alan-ui/tree/main/src/components/guide)

## Functional requirements

- Attached to the target element in the form of `popover` to achieve the effect of explaining the target element.
- When there are multiple target elements, provide three buttons: previous step/next step/end.
- When the element is out of the visible area, automatically scroll to the position of the target element.
- When the screen size changes, `popover` can always be attached to the target element

## Confirm api

After confirming the functional requirements, we need to design the api. Since the functions of my components are relatively simple, the api design is also relatively simple.

```js
// Whether to display the mask layer
mask?: boolean;
steps: StepItem;
onClose?: (finished: boolean) => void;
```

These 3 apis are easy to understand. The following `steps` are mainly discussed.

Because `popover` needs to be attached to the target element, the position of the target element needs to be obtained. `document.querySelector()` can be used to achieve this. Then it can be明确`steps` need to provide a `selector` parameter.
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
  Returns a pointer to the nearest (in terms of containment hierarchy) positioned element that contains the element or the nearest table, td, th, body element. When the style.display of the element is set to "none", offsetParent returns null.
- HTMLElement.offsetXXX
  Relative to offsetParent
- Element.getBoundingClientRect()
  Returns the size of the element (including border+padding) and its position relative to the **viewport**

  https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetWidth

- clientWeight/clientHeight

  https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientWidth

I wrote [related api examples](https://stackblitz.com/edit/web-platform-5hqpo6) for easy understanding

## Start coding

The project uses the [rough-notation](https://github.com/rough-stuff/rough-notation) library, mainly to achieve some hand-drawn effects and animations. I will remove the relevant code to avoid affecting the main line of thought.

First, use two variables `currentIndex` and `currentContent` to control the current `step`

```jsx
useEffect(() => {
  handleStepChange();
}, [currentIndex]);
```

Analyze what `handleStepChange` wants to achieve

- Get the current target element and its `offsetParent` (hereinafter referred to as parent) through `props.steps[currentIndex].selector`
- Use `React.createPortal` to render `popover` into the parent node
- Since the parent node of `popover` is now the parent node of the target element (that is, it is a sibling node with the target node), you only need to adjust the position relative to the parent to adjust the position.
- Determine whether the target element is in the visible area. If not, scroll to the position of the target element

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

// <PopoverContent /> is the content of popover, understand it as a div, just add some styles
{createPortal(<PopoverContent />, parentEl)}
```

### popover content

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

### Listen for window changes

Here `computePopoverStyles` mainly calculates the absolute positioning offset relative to the parent.

```jsx
// Use debounce to optimize
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

### Calculate offset

![Offset calculation](https://raw.githubusercontent.com/3Alan/images/master/img/image-20210916145908255.png)
