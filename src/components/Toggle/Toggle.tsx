import React, { useEffect, useState } from 'react';
import { onClickToggle } from './event';
import { ToggleProps } from './types';

function Toggle(data: ToggleProps) {
  const [state, setState] = useState<string>('on');

  useEffect(() => {
    setState(data.state);
  }, [data.state]);

  return (
    <>
      <div
        className={'toggle ' + state}
        onClick={() => onClickToggle(state, setState)}
      >
        <div className="toggle__circle"></div>
      </div>
    </>
  );
}

Toggle.defaultProps = {
  state: 'on',
};

export default Toggle;
