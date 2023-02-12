import React, { useRef, useState } from 'react';
import '../../index.scss';
import Xarrow from '../../xarrow';
import Node from '../../node';
import ControlMenu from '../../controlMenu';
import EventBus from '../../eventBus';
import { PubSubSteps } from './steps';
import ConsoleLogger from '../../consoleLogger';

const cls = 'pb-base-ex';

const PubSubScreenExample = () => {
  const ARef = useRef();
  const BRef = useRef();
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

        <EventBus ref={centerRef} title="APP" option={currentArrowStatus.eventBus} />

        <Node ref={BRef} className={`${cls}-node`}>
          小红
        </Node>
      </div>

      <Xarrow
        showXarrow={currentArrowStatus.AToCenter}
        start={ARef}
        end={centerRef}
        label="小明求购屏幕"
      />
      <Xarrow
        showXarrow={currentArrowStatus.BToCenter}
        start={BRef}
        end={centerRef}
        label="小红出售屏幕"
      />
      <Xarrow
        showXarrow={currentArrowStatus.CenterToA}
        start={centerRef}
        end={ARef}
        isLabelEnd
        label="通知小明有人出售屏幕"
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

export default PubSubScreenExample;
