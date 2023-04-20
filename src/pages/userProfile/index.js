import { NavLink, useLocation, useParams } from 'react-router-dom'

import useFetch from 'hooks/useFetch'
import { useEffect } from 'react'

const UserProfile = (props) => {
  const location = useParams()
  const pathname = useLocation()
  const slug = location.slug
  const isFavorites = pathname.search.includes('favorites')
  const apiUrl = `/profiles/${slug}`
  const [{ response }, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [doFetch])

  if (!response) {
    return null
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img className="user-img" alt="" src="{response.profile.image}" />
              <h4>{response.profile.username}</h4>
              <p>{response.profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="article-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink
                    to={`/profiles/${response.profile.username}`}
                    className="nav-link"
                    // exact не работает разделение постов в профиле
                  >
                    My post
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/profiles/${response.profile.username}/favorites`}
                    className="nav-link"
                  >
                    Favorites Post
                  </NavLink>
                </li>
              </ul>
            </div>
            User Articles
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
