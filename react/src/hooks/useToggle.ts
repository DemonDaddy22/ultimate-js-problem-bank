/**
 * Problem link - https://bigfrontend.dev/react/useToggle
 */

import { useState } from 'react';

const useToggle = (on: boolean = false): [boolean, () => void] => {
  const [toggle, setToggle] = useState<boolean>(on);

  const handleToggle = () => {
    setToggle(prevToggle => !prevToggle);
  };

  return [toggle, handleToggle];
};

export default useToggle;
