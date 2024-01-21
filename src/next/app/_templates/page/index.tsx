import RichText from "@/_components/RichText"
import { PageType } from "@/types"

const PageTemplate = ({page}:{page:PageType}) => {

  const {
    title,
    content
  } = page

  console.log('content', content)

  return (
    <>
      <h1>{title}</h1>
      <RichText content={content} />
    </>
  )
}

export default PageTemplate