export type QueryParamValue = string | number | undefined;

export type QueryNavigationSource = "external" | "internal";

export const createQuerySyncTracker = (initialQuery = "") => {
  let currentQuery = initialQuery;
  const pendingQueries = new Set<string>();

  return {
    getCurrentQuery: () => currentQuery,
    request: (query: string) => {
      if (query === currentQuery) {
        return false;
      }

      pendingQueries.add(query);
      currentQuery = query;
      return true;
    },
    observe: (query: string): QueryNavigationSource => {
      if (pendingQueries.delete(query)) {
        return "internal";
      }

      pendingQueries.clear();
      currentQuery = query;
      return "external";
    },
  };
};

export const updateQueryParams = (
  current: URLSearchParams,
  values: Record<string, QueryParamValue>,
): URLSearchParams => {
  const next = new URLSearchParams(current);

  for (const [key, value] of Object.entries(values)) {
    if (value === undefined || value === "") {
      next.delete(key);
      continue;
    }

    next.set(key, String(value));
  }

  return next;
};

export const getQueryParamNumber = (
  params: URLSearchParams,
  key: string,
): number | undefined => {
  const value = params.get(key);

  if (!value) {
    return undefined;
  }

  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) && Number.isInteger(parsedValue)
    ? parsedValue
    : undefined;
};
