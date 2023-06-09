import React from 'react'
import { Routes as Switch, Route } from 'react-router-dom'

import GlobalFeed from 'pages/globalFeed'
import Article from 'pages/article'
import Authentication from 'pages/authentication'
import TagFeed from 'pages/tagFeed'
import YourFeed from 'pages/yourFeed'
import CreateArticle from 'pages/createArticle'
import EditArticle from 'pages/editArticle'
import Settings from 'pages/settings'
import UserProfile from 'pages/userProfile'

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<GlobalFeed />} exact />
      <Route path="/profiles/:slug" element={<UserProfile />} />
      <Route path="/profiles/:slug/favorites" element={<UserProfile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/articles/new" element={<CreateArticle />} />
      <Route path="/articles/:slug/edit" element={<EditArticle />} />
      <Route path="/feed" element={<YourFeed />} />
      <Route path="/tags/:slug" element={<TagFeed />} />
      <Route path="/login" element={<Authentication />} />
      <Route path="/register" element={<Authentication />} />
      <Route path="/articles/:slug" element={<Article />} />
    </Switch>
  )
}

export default Routes
