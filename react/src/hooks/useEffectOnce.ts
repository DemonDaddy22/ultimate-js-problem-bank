/**
 * Problem link - https://bigfrontend.dev/react/useEffectOnce
 */

import { EffectCallback, useEffect } from 'react';

export function useEffectOnce(effect: EffectCallback) {
  // your code here
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}
