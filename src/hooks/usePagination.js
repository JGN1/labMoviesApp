import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { getPageMovies } from "../api/tmdb-api";

const usePagination = () => {

  return useQuery({
    queryKey: ['pageMovies', page],
    queryFn: getPageMovies,
    keepPreviousData: true,
    staleTime: 5000,
  })

  // Prefetch the next page!
  React.useEffect(() => {
    if (!isPreviousData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['pageMovies', page + 1],
        queryFn: getPageMovies,
      })
    }
  }, [data, isPreviousData, page, queryClient])

}

export default usePagination;