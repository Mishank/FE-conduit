import ArticleForm from 'components/articleForm'
import useFetch from 'hooks/useFetch'
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { CurrentUserContext } from 'contexts/currentUser'
const EditArticle = (props) => {
  const params = useParams()
  const slug = params.slug
  const [currentUserState] = useContext(CurrentUserContext)
  const apiUrl = `/articles/${slug}`
  const [{ response: fetchAricleResponse }, doFetchArticle] = useFetch(apiUrl)
  const [
    { response: updateArticleResponse, error: updateArticlError },
    doUpdateArticle,
  ] = useFetch(apiUrl)
  const [initialValues, setInitialValues] = useState(null)
  const [isSuccessfullSubmit, setIsSuccessfulSubmit] = useState(false)

  const handleSubmit = (article) => {
    console.log({ article })
    doUpdateArticle({
      method: 'put',
      data: {
        article,
      },
    })
  }

  useEffect(() => {
    doFetchArticle()
  }, [doFetchArticle])

  useEffect(() => {
    if (!fetchAricleResponse) {
      return
    }

    setInitialValues({
      title: fetchAricleResponse.article.title,
      description: fetchAricleResponse.article.description,
      body: fetchAricleResponse.article.body,
      tagList: fetchAricleResponse.article.tagList,
    })
  }, [fetchAricleResponse])

  useEffect(() => {
    if (!updateArticleResponse) {
      return
    }
    setIsSuccessfulSubmit(true)
  }, [updateArticleResponse])

  if (currentUserState.isLoggedIn === false) {
    return <Navigate to="/" />
  }

  if (isSuccessfullSubmit) {
    return <Navigate to={`/articles/${slug}`} />
  }

  return (
    <ArticleForm
      onsubmit={handleSubmit}
      errors={(updateArticlError && updateArticlError.errors) || {}}
      initialValues={initialValues}
    />
  )
}

export default EditArticle
