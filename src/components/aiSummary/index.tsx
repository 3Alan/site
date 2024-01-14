---
summary: >-
  本段代码实现了人工智能自动摘要功能。它使用 React 框架和 Typed.js 库来实现动画效果。用户点击“AI
  总结”按钮后，摘要内容将通过打字机效果逐字逐句地显示出来。摘要内容由 content 参数提供。
---
import React, { useEffect, useState } from 'react';
import { FaMagic } from 'react-icons/fa';
import './index.scss';
import Typed from 'typed.js';

const cls = 'ai-summary';

export function AiSummary({ content }) {
  const [show, setShow] = useState(false);
  const el = React.useRef(null);

  useEffect(() => {
    if (!show) {
      return;
    }

    const typed = new Typed(el.current, {
      strings: [content],
      startDelay: 300,
      typeSpeed: 15,
      showCursor: false
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, [show]);

  return (
    <div className={cls}>
      {!show && (
        <button
          className={`${cls}-button`}
          onClick={() => {
            setShow(true);
          }}
        >
          <FaMagic color="#66adff" />
          <span>AI 总结</span>
        </button>
      )}

      {show && (
        <div className={`${cls}-content`}>
          <div className={`${cls}-title`}>
            <FaMagic style={{ marginRight: 5 }} color="#66adff" /> AI 总结
          </div>

          <span ref={el}></span>
        </div>
      )}
    </div>
  );
}
