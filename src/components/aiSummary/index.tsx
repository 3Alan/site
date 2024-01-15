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
          data-umami-event="ai-summary"
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
