import React from 'react'
// import axios from 'axios'
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { getPageMovies } from "../api/tmdb-api";

const queryClient = new QueryClient()

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Pagination />
//     </QueryClientProvider>
//   )
// }

// async function fetchProjects(page = 0) {
//   const { data } = await axios.get('/api/pageMovies?page=' + page)
//   return data
// }

const usePagination = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = React.useState(1)

  const { status, data, error, isFetching, isPreviousData } = useQuery({
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

 
  // return (
    // <div>
    //   <h1>Hello World</h1>
    //   <p>
    //     In this example, each page of data remains visible as the next page is
    //     fetched. The buttons and capability to proceed to the next page are also
    //     supressed until the next page cursor is known. Each page is cached as a
    //     normal query too, so when going to previous pages, you'll see them
    //     instantaneously while they are also refetched invisibly in the
    //     background.
    //   </p>
    //   {status === 'loading' ? (
    //     <div>Loading...</div>
    //   ) : status === 'error' ? (
    //     <div>Error: {error.message}</div>
    //   ) : (
    //     // `data` will either resolve to the latest page's data
    //     // or if fetching a new page, the last successful page's data
    //     <div>
    //       {data.results.map((movie) => (
    //         <p key={movie.id}>{movie.title}</p>
    //       ))}
    //     </div>
    //   )}
    //   <div>Current Page: {page + 1}</div>
    //   <button
    //     onClick={() => setPage((old) => Math.max(old - 1, 0))}
    //     disabled={page === 0}
    //   >
    //     Previous Page
    //   </button>{' '}
    //   <button
    //     onClick={() => {
    //       setPage((old) => (data?.hasMore ? old + 1 : old))
    //     }}
    //     disabled={isPreviousData || !data?.hasMore}
    //   >
    //     Next Page
    //   </button>
    //   {
    //     // Since the last page's data potentially sticks around between page requests,
    //     // we can use `isFetching` to show a background loading
    //     // indicator since our `status === 'loading'` state won't be triggered
    //     isFetching ? <span> Loading...</span> : null
    //   }{' '}
    //   <ReactQueryDevtools initialIsOpen />
    // </div>
  // )
};

export default usePagination;