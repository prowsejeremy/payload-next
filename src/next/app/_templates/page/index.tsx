import { fetchNav } from "@/_api/fetchGlobals"
import { Nav as NavType, Page as PageType } from "@/payload-types"

// Components
import NavBar from "@/_components/NavBar"
import RichText from "@/_components/RichText"
import PreviewBar from "@/_components/PreviewBar"
import { Gutter } from "@/_components/Gutter"

const PageTemplate = async ({page}:{page:PageType}) => {

  let navData: NavType | null = null
  
  try {
    navData = await fetchNav()
  } catch (error) {
    console.log('FETCH error', error)
  }

  const {
    title,
    content
  } = page

  return (
    <>
      <PreviewBar />
      { navData?.items && <NavBar nav={navData} /> }
      <Gutter>
        <h1>{title}</h1>
        <RichText content={content?.root} />
      </Gutter>
    </>
  )
}

export default PageTemplate