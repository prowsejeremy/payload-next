import { RichTextInner } from "@/_blocks/RichText"
import {CMSLink} from "@/_components/Link"

import classes from "./index.module.scss"

const CallToAction = ({block}) => {

  const {
    content,
    blockName:id='',
    link
  } = block

  return (
    <div id={id} className={classes.ctablock}>
      <RichTextInner content={content} />
      <CMSLink {...link} />
    </div>
  )
}

export default CallToAction