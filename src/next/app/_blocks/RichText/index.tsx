import React from 'react'

import serialize from './serialize'

import classes from './index.module.scss'

export const RichTextInner = ({content}) => {

  return serialize(content?.root?.children)
}

const RichText: React.FC<{ className?: string; block: any }> = ({ className, block }) => {

  const {
    content,
    blockName=''
  } = block

  return (
    <div id={blockName} className={[classes.richText, className].filter(Boolean).join(' ')}>
      <RichTextInner content={content} />
    </div>
  )
}

export default RichText
