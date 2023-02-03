import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaUndo } from 'react-icons/fa';
import IconButton from '../../components/iconButton';
import LeaderLine from 'react-leader-line';

import './index.scss';
import useLeaderLine from './useLeaderLine';

const cls = 'a-content-wrap';

const PubSub = () => {
  const ARef = useRef();
  const BRef = useRef();
  const CRef = useRef();
  const [currentStep, setCurrentStep] = useState(0);
  const [showA, setShowA] = useState(false);
  const [log, setLog] = useState('A B 为不同组件');
  // const leaderLine = useLeaderLine(ARef.current, BRef.current);
  const AToCenterRef = useRef();
  const BToCenterRef = useRef();

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    AToCenterRef.current = new LeaderLine(ARef.current, CRef.current, {
      hide: true,
      startPlug: 'disc',
      startLabel: LeaderLine.captionLabel("on('foo', fooCallbackFromA)", {
        color: '#e3e3e3',
        outlineColor: '',
        fontSize: 14
      })
    });
    BToCenterRef.current = new LeaderLine(BRef.current, CRef.current, {
      hide: true,
      startPlug: 'disc',
      startLabel: LeaderLine.captionLabel("emit('foo', 'emit data')", {
        color: '#e3e3e3',
        outlineColor: '',
        fontSize: 14
      })
    });
  };

  const onStepChange = currentStep => {
    setCurrentStep(currentStep);

    switch (currentStep) {
      case 0:
        AToCenterRef.current.hide();
        setShowA(false);
        setLog('A B 为不同组件');
        break;
      case 1:
        AToCenterRef.current.show();
        setLog('A 订阅了 foo 事件，添加到中心');
        setShowA(true);
        break;
      case 2:
        AToCenterRef.current.hide();
        BToCenterRef.current.show();
        setLog('B 派发了 foo 事件，查找到有订阅了foo事件的组件，通知相关组件');
        // A高亮一下
        break;

      default:
        break;
    }
  };

  const onReset = () => {
    setCurrentStep(0);
    AToCenterRef.current.remove();
    BToCenterRef.current.remove();
    setShowA(false);
    init();
  };

  return (
    <div className={cls}>
      <div className={`${cls}-content`}>
        <div ref={ARef} className={`${cls}-pub`}>
          A
        </div>

        <div ref={CRef} className={`${cls}-center`}>
          <div>Center</div>
          {showA && <div className={`${cls}-pub`}>foo</div>}
        </div>

        {/* TODO: Node组件提取 */}
        <div ref={BRef} className={`${cls}-pub`}>
          B
        </div>
      </div>
      <div className={`${cls}-log`}>{log}</div>
      <div className={`${cls}-menu`}>
        <div className={`${cls}-left-wrap`}>
          <IconButton disabled={currentStep === 0} onClick={() => onStepChange(currentStep - 1)}>
            <FaArrowLeft />
          </IconButton>
          <IconButton disabled={currentStep === 2} onClick={() => onStepChange(currentStep + 1)}>
            <FaArrowRight />
          </IconButton>
          {currentStep} / {2}
        </div>

        <IconButton onClick={onReset}>
          <FaUndo />
        </IconButton>
      </div>
    </div>
  );
};

export default PubSub;
