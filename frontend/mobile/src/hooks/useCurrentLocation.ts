import { useCallback, useState } from 'react';
import { CurrentLocation, getCurrentLocation } from '@/utils/location';

export default function useCurrentLocation() {
  const [current, setCurrent] = useState<CurrentLocation | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const loc = await getCurrentLocation();
      if (loc) setCurrent(loc);
      return loc;
    } finally {
      setLoading(false);
    }
  }, []);

  return { current, loading, refresh };
}
