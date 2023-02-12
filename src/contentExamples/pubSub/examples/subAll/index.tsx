import React, { useRef, useState } from 'react';
import '../../index.scss';
import Xarrow from '../../xarrow';
import Node from '../../node';
import ControlMenu from '../../controlMenu';
import EventBus from '../../eventBus';
import { PubSubSteps } from './steps';
import ConsoleLogger from '../../consoleLogger';

const cls = 'pb-base-ex';

const PubSubAllExample = () => {
  const ARef = useRef();
  const BRef = useRef();
  const CRef = useRef();
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
        <div className={`${cls}-left`}>
          <Node ref={ARef} className={`${cls}-node`} active={currentArrowStatus.activeA}>
            A
          </Node>
          <Node ref={CRef} className={`${cls}-node`}>
            C
          </Node>
        </div>

        <EventBus ref={centerRef} option={currentArrowStatus.eventBus} />

        <Node ref={BRef} className={`${cls}-node`}>
          B
        </Node>
      </div>

      <Xarrow
        showXarrow={currentArrowStatus.AToCenter}
        start={ARef}
        end={centerRef}
        label="on('*', cbA)"
      />
      <Xarrow
        showXarrow={currentArrowStatus.BToCenter}
        start={BRef}
        end={centerRef}
        label="emit('foo', 'foo data')"
      />
      <Xarrow
        showXarrow={currentArrowStatus.CToCenter}
        start={CRef}
        end={centerRef}
        label="emit('bar', 'bar data')"
      />
      <Xarrow
        showXarrow={currentArrowStatus.CenterToA}
        start={centerRef}
        end={ARef}
        isLabelEnd
        label="notify A"
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

export default PubSubAllExample;
