import CallToAction from "@/_blocks/CallToAction"
import RichText from "@/_blocks/RichText"
import ImageBlock from "@/_blocks/ImageBlock"

const BlocksLoader = ({blocks}) => {

  const BlockLoader = (block, key) => {

    if (!block?.blockType) return

    switch(block?.blockType) {
      case 'CallToAction':
        return <CallToAction key={key} block={block} />
      case 'RichText':
        return <RichText key={key} block={block} />
      case 'ImageBlock':
        return <ImageBlock key={key} block={block} />
    }
  }

  return blocks?.map((block, key) => {
    return BlockLoader(block, key)
  })
}

export default BlocksLoader
