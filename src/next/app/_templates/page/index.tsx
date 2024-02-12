import { fetchNav } from "@/_api/fetchGlobals"
import { Nav as NavType, Page as PageType } from "@/payload-types"

// Components
import NavBar from "@/_components/NavBar"
import PreviewBar from "@/_components/PreviewBar"
import { Gutter } from "@/_components/Gutter"

// Blocks
import BlocksLoader from '@/_blocks/BlocksLoader'
import { RichTextInner } from "@/_blocks/RichText"

const PageTemplate = async ({page}:{page:PageType}) => {

  let navData: NavType | null = null
  
  try {
    navData = await fetchNav()
  } catch (error) {
    console.log('FETCH error', error)
  }

  const {
    title,
    content,
    layout
  } = page

  return (
    <>
      <PreviewBar />
      { navData?.items && <NavBar nav={navData} /> }
      <Gutter>
        <h1>{title}</h1>
        {content && <RichTextInner content={content} />}
        {layout && <BlocksLoader blocks={layout} />}
      </Gutter>
    </>
  )
}

export default PageTemplate