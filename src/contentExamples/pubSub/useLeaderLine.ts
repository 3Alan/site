import LeaderLine from 'react-leader-line';
import { useRef, useEffect } from 'react';

export default function useLeaderLine(start, end, options?) {
  const leaderLine = useRef();

  useEffect(() => {
    if (start && end) {
      leaderLine.current = new LeaderLine(start, end, { startPlug: 'disc', ...options });
    }
  }, [start, end, options]);

  console.log(leaderLine.current);

  return leaderLine.current;
}
