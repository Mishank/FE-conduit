import React from 'react'
import { Routes as Switch, Route } from 'react-router-dom'

import GlobalFeed from 'pages/globalFeed'
import Article from 'pages/article'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" element={<GlobalFeed />} />
      <Route path="/articles/:slug" element={<Article />} />
    </Switch>
  )
}
