import {
    useQuery,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function Todos() {
    const [page, setPage] = React.useState(0)
  
    const fetchProjects = (page = 0) => fetch('/api/projects?page=' + page).then((res) => res.json())
  
    const {
      isLoading,
      isError,
      error,
      data,
      isFetching,
      isPreviousData,
    } = useQuery(['projects', page], () => fetchProjects(page), { keepPreviousData : true })
  
    return (
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>
            {data.projects.map(project => (
              <p key={project.id}>{project.name}</p>
            ))}
          </div>
        )}
        <span>Current Page: {page + 1}</span>
        <button
          onClick={() => setPage(old => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          Previous Page
        </button>{' '}
        <button
          onClick={() => {
            if (!isPreviousData && data.hasMore) {
              setPage(old => old + 1)
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={isPreviousData || !data?.hasMore}
        >
          Next Page
        </button>
        {isFetching ? <span> Loading...</span> : null}{' '}
      </div>
    )
  }



  
const useFiltering = (data, filters) => {
    const [filterValues, setFilterValues] = useState(() => {
      const filterInitialValues = filters.map((f) => ({
        name: f.name,
        value: f.value,
      }));
      return filterInitialValues;
    });
  
    const filteringConditions = filters.map((f) => f.condition);
    const filterFunction = (collection) =>
      filteringConditions.reduce((data, conditionFn, index) => {
        return data.filter((item) => {
            return conditionFn(item, filterValues[index].value);
        });
      }, collection);
  
    return {
      filterValues,
      setFilterValues,
      filterFunction,
    };
  };
  
  export default useFiltering;