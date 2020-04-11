import { useState } from 'react';

export const useSwitch = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(false),
    bind: {
      value,
      onChange: () => {
        setValue(!value);
      },
    },
  };
};
