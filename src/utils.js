import queryString from 'query-string'

export const range = (start, end) => {
  return [...Array(end).keys()].map((el) => el + start)
}

export const limit = 2

export const getPaginator = (search) => {
  const parsedSearch = queryString.parse(search)
  const currentPage = parsedSearch.page ? Number(parsedSearch.page) : 1
  const offset = currentPage * limit - limit
  return { currentPage, offset }
}
