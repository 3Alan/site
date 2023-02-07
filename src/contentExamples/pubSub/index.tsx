import React, { useRef, useState } from 'react';
import './index.scss';
import Xarrow from './xarrow';
import Node from './node';
import Stack from './stack';
import ControlMenu from './controlMenu';
import EventCenter from './center';

const cls = 'a-content-wrap';

const PubSub = () => {
  const ARef = useRef();
  const BRef = useRef();
  const CRef = useRef();
  const [showA, setShowA] = useState(false);
  const [AList, setAList] = useState([]);
  const [log, setLog] = useState('A B 为不同组件');
  const [currentArrowStatus, setCurrentArrowStatus] = useState({
    AToCenter: false,
    BToCenter: false,
    CenterToA: false,
    activeA: false,
  });

  const onStepChange = currentStep => {
    switch (currentStep) {
      case 0:
        setCurrentArrowStatus({
          AToCenter: false,
          BToCenter: false,
          CenterToA: false,
          activeA: false,
        });
        setShowA(false);
        setLog('A B 为不同组件');
        break;
      case 1:
        setCurrentArrowStatus({
          AToCenter: true,
          BToCenter: false,
          CenterToA: false,
          activeA: false,
        });
        setLog('A 订阅了 foo 事件，添加到中心');
        setShowA(true);
        setAList(['A: fooCbA'])
        break;
      case 2:
        setCurrentArrowStatus({
          AToCenter: false,
          BToCenter: true,
          CenterToA: false,
          activeA: false,
        });
        setAList(['A: fooCbA', 'C'])
        setLog('B 派发了 foo 事件，Center 处理 foo 事件');
        break;
      case 3:
        setCurrentArrowStatus({
          AToCenter: false,
          BToCenter: true,
          CenterToA: true,
          activeA: true,
        });
        setAList(['A: fooCbA', 'C'])
        setLog('Center 通知订阅了 foo 事件的组件');
        break;

      default:
        break;
    }
  };

  const onStepReset = () => {
    setCurrentArrowStatus({
      AToCenter: false,
      BToCenter: false,
      CenterToA: false,
      activeA: false,
    });
    setShowA(false);
  };

  return (
    <div className={cls}>
      <div className={`${cls}-content`}>
        <Node ref={ARef} className={`${cls}-node`} active={currentArrowStatus.activeA}>A</Node>

        <EventCenter ref={CRef} option={{'foo': ['A', 'B']}} />

        <Node ref={BRef} className={`${cls}-node`}>B</Node>
      </div>

      <Xarrow
        showXarrow={currentArrowStatus.AToCenter}
        start={ARef}
        end={CRef}
        label="on('foo', fooCbA)"
      />
      <Xarrow
        showXarrow={currentArrowStatus.BToCenter}
        start={BRef}
        end={CRef}
        label="emit('foo', 'emit data')"
      />
      <Xarrow
        showXarrow={currentArrowStatus.CenterToA}
        start={CRef}
        end={ARef}
        label="notify A"
      />

      <div className={`${cls}-log`}>{log}</div>
      <ControlMenu onChange={onStepChange} onReset={onStepReset} totalStep={3} />
    </div>
  );
};

export default PubSub;
