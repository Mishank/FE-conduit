import ArticleForm from 'components/articleForm'

const CreateArticle = () => {
  const errors = {}
  const initialValues = {}
  const handleSubmit = (data) => {
    console.log({ data })
  }
  return (
    <div>
      <ArticleForm
        errors={errors}
        initialValues={initialValues}
        onsubmit={handleSubmit}
      />
    </div>
  )
}

export default CreateArticle
