import React, { useRef, useState } from 'react';
import '../../index.scss';
import Xarrow from '../../xarrow';
import Node from '../../node';
import ControlMenu from '../../controlMenu';
import EventBus from '../../eventBus';
import { PubSubSteps } from './steps';
import ConsoleLogger from '../../consoleLogger';

const cls = 'pb-base-ex';

const ObserverExample = () => {
  const ARef = useRef();
  const centerRef = useRef();
  const [currentArrowStatus, setCurrentArrowStatus] = useState(PubSubSteps[0]);

  const onStepChange = currentStep => {
    setCurrentArrowStatus(PubSubSteps[currentStep]);
  };

  const onStepReset = () => {
    setCurrentArrowStatus(PubSubSteps[0]);
  };

  return (
    <div className={cls}>
      <div className={`${cls}-content`}>
        <Node ref={ARef} className={`${cls}-node`} active={currentArrowStatus.activeA}>
          小明
        </Node>

        <EventBus
          title="老板"
          ref={centerRef}
          option={currentArrowStatus.eventBus}
          active={currentArrowStatus.activeCenter}
        />
      </div>

      <Xarrow
        showXarrow={currentArrowStatus.AToCenter}
        start={ARef}
        end={centerRef}
        label="买酸奶"
      />
      <Xarrow
        showXarrow={currentArrowStatus.CenterToA}
        start={centerRef}
        end={ARef}
        isLabelEnd
        label="打电话通知小明"
      />

      <ConsoleLogger>{currentArrowStatus.log}</ConsoleLogger>
      <ControlMenu
        onChange={onStepChange}
        onReset={onStepReset}
        totalStep={PubSubSteps.length - 1}
      />
    </div>
  );
};

export default ObserverExample;
