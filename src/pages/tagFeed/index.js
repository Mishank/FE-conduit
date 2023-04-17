import React, { useEffect, Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import Feed from 'components/feed'
import useFetch from 'hooks/useFetch'
import Pagination from 'components/pagination'
import { getPaginator, limit } from 'utils'
import PopularTags from 'components/popularTags'
import Loading from 'components/loading'
import ErrorMessage from 'components/errorMessage'
import FeedToggler from 'components/feedToggler'

const TagFeed = (props) => {
  const location = useLocation()
  const tagName = location.pathname

  const { offset, currentPage } = getPaginator(location.search)

  const stringifieldParams = queryString.stringify({
    limit,
    offset,
    tag: tagName,
  })
  const apiUrl = `/articles?${stringifieldParams}`
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl)
  const url = location.pathname

  useEffect(() => {
    doFetch()
  }, [doFetch, currentPage, tagName])

  return (
    <div className="home-page">
      <div className="banner">
        <h1>Medium Clone</h1>
        <p>A place to share knowledge</p>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler tagName={tagName} />
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
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagFeed
