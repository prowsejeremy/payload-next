import React from 'react'

import classes from './index.module.scss'

const ImageBlock: React.FC<{ className?: string; block: any }> = ({ className, block }) => {

  const {
    image,
    blockName=''
  } = block

  if (!image) return null

  let srcset = ""
  let sizes = ""

  Object.values(image?.sizes)?.map((size:{width:string, url:string}) => {
    if(!size) return
    srcset += `${size.url} ${size.width}w,`
    sizes += `(max-width: ${size.width}px) ${size.width}px,`
  })

  return !image?.url ? null : (
    <div id={blockName} className={[classes.imageBlock, className].filter(Boolean).join(' ')}>
      <img src={image?.url} srcSet={srcset} sizes={sizes} alt={image?.alt} />
    </div>
  )
}

export default ImageBlock
