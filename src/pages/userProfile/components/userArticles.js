import queryString from 'query-string'

import useFetch from 'hooks/useFetch'
import { useEffect } from 'react'
import Loading from 'components/loading'
import Pagination from 'components/pagination'
import { getPaginator, limit } from 'utils'
import ErrorMessage from 'components/errorMessage'
import Feed from 'components/feed'

const getApiUrl = ({ username, offset, isFavorites }) => {
  const params = isFavorites
    ? { limit, offset, favorited: username }
    : { limit, offset, author: username }

  return `/articles?${queryString.stringify(params)}`
}

const UserArticles = ({ username, location, isFavorites, url }) => {
  const { offset, currentPage } = getPaginator(location.search)
  const apiUrl = getApiUrl({ username, offset, isFavorites })
  console.log({ apiUrl })
  // /articles?params=%5Bobject%20Object%5D
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)

  console.log({ response })

  useEffect(() => {
    doFetch()
  }, [doFetch, isFavorites])

  return (
    <div>
      {isLoading && <Loading />}
      {error && <ErrorMessage />}
      {!isLoading && response && (
        <>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount}
            limit={limit}
            url={url}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  )
}

export default UserArticles
