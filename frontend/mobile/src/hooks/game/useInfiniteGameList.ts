import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchGameList } from '@/hooks/game/useGameList';
import { QUERY_KEY } from '@/constants/keys';
import type { GameStatus, GameSummary } from '@/hooks/game/useGameList';

type Options = {
  status?: GameStatus; // WAITING | ONGOING | ENDED
  size?: number; // page size, default 10
};

// Helper: safely extract contents array from AxiosResponse
const getContents = (res: any): GameSummary[] =>
  (res?.data?.dataBody?.contents ?? []) as GameSummary[];

export const useInfiniteGameList = ({ status, size = 10 }: Options) => {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEY.GAME.GAME_LIST_INFO, 'infinite', status ?? 'ALL', size],
    // pageParam: lastTripGameId (cursor)
    queryFn: ({ pageParam }) => fetchGameList({ status, lastTripGameId: pageParam, size } as any),
    // API 문서상 초기 cursor 는 0
    initialPageParam: '0' as string,
    getNextPageParam: (lastPage) => {
      const items = getContents(lastPage);
      // Stop if server returned fewer than requested size
      if (items.length < size) return undefined;
      // Use last item's id as next cursor
      return items[items.length - 1]?.tripGameId ?? undefined;
    },
    select: (data) => {
      // Flatten pages into a single list for easy consumption
      const pages = data.pages as any[];
      const items = pages.flatMap((p) => getContents(p));
      return {
        pages: data.pages,
        pageParams: data.pageParams,
        items,
      };
    },
  });

  return {
    // flattened items
    items: (query.data as any)?.items as GameSummary[] | undefined,
    // raw query data if needed
    data: query.data,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    refetch: query.refetch,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export default useInfiniteGameList;
