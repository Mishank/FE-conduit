import ArticleForm from 'components/articleForm'
import useFetch from 'hooks/useFetch'
import { useEffect, useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { CurrentUserContext } from 'contexts/currentUser'

const CreateArticle = () => {
  const apiUrl = '/articles'
  const [{ response, error }, doFetch] = useFetch(apiUrl)
  const [currentUserState] = useContext(CurrentUserContext)
  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  }
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)
  const handleSubmit = (article) => {
    console.log({ article })
    doFetch({
      method: 'post',
      data: {
        article,
      },
    })
  }

  useEffect(() => {
    if (!response) {
      return
    }
    setIsSuccessfullSubmit(true)
  }, [response])

  if (currentUserState.isLoggedIn === false) {
    return <Navigate to="/" />
  }

  if (isSuccessfullSubmit) {
    return <Navigate to={`/articles/${response.article.slug}`} />
  }
  return (
    <div>
      <ArticleForm
        errors={(error && error.errors) || {}}
        initialValues={initialValues}
        onsubmit={handleSubmit}
      />
    </div>
  )
}

export default CreateArticle
