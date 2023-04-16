import React, { useEffect, Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import Feed from 'components/feed'
import useFetch from 'hooks/useFetch'
import Pagination from 'components/pagination'
import { getPaginator, limit } from 'utils'

const GlobalFeed = (props, match) => {
  const location = useLocation()
  const { offset, currentPage } = getPaginator(location.search)

  const stringifieldParams = queryString.stringify({
    limit,
    offset,
  })
  const apiUrl = `/articles?${stringifieldParams}`
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl)
  console.log({ match })
  const url = match.url

  useEffect(() => {
    doFetch()
  }, [doFetch, currentPage])

  return (
    <div className="home-page">
      <div className="banner">
        <h1>Medium Clone</h1>
        <p>A place to share knowledge</p>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {isLoading && <div>Loading...</div>}
            {error && <div>Some error happened</div>}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url="/"
                  currentPage={currentPage}
                />
              </>
            )}
          </div>
          <div className="col-md-3">Popular tags</div>
        </div>
      </div>
    </div>
  )
}

export default GlobalFeed
