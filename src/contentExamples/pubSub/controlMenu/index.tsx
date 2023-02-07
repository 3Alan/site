import React, { FC, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaUndo } from 'react-icons/fa';
import IconButton from '../../../components/iconButton';
import './index.scss';

const cls = 'pb-control';

interface ControlMenuProps {
  onChange?: (currentStep: number) => void;
  onReset?: () => void;
  totalStep: number;
}

const ControlMenu: FC<ControlMenuProps> = props => {
  const { onChange, onReset, totalStep } = props;
  const [currentStep, setCurrentStep] = useState(0);

  const onInnerChange = currentStep => {
    setCurrentStep(currentStep);
    onChange?.(currentStep);
  };

  const onInnerReset = () => {
    setCurrentStep(0);
    onReset?.();
  };

  return (
    <div className={cls}>
      <div className={`${cls}-left`}>
        <IconButton disabled={currentStep === 0} onClick={() => onInnerChange(currentStep - 1)}>
          <FaArrowLeft />
        </IconButton>
        <IconButton
          disabled={currentStep === totalStep}
          onClick={() => onInnerChange(currentStep + 1)}
        >
          <FaArrowRight />
        </IconButton>

        <span className={`${cls}-count`}>{currentStep} / {totalStep}</span>
      </div>

      <IconButton onClick={onInnerReset}>
        <FaUndo />
      </IconButton>
    </div>
  );
};

export default ControlMenu;
