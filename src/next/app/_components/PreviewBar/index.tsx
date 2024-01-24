import { draftMode } from "next/headers"

import classes from "./index.module.scss"
import { Gutter } from "@/_components/Gutter"

const PreviewBar:React.FC = () => {
  const {isEnabled} = draftMode()

  return !isEnabled ? null : (
    <div className={classes.previewBar}>
      <Gutter>
        <p>
          Preview mode is currently enabled, you are viewing draft versions of pages.
          {` `}<a href="/api/exit-preview">Click here</a>{` `}
          to exit Preview mode.
        </p>
      </Gutter>
    </div>
  )
}

export default PreviewBar