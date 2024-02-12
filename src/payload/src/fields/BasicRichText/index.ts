import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Field } from 'payload/types'

const featureList = [
  'heading',
  'paragraph',
  'italic',
  'bold',
  'underline',
  'strikethrough',
  'align',
  'unorderedList',
  'orderedList',
  'link'
]

const BasicRichText = ({fieldName="content", features=featureList}:{fieldName:string, features?:string[]}) => {
  const BasicRichTextField: Field = {
    name: fieldName,
    type: 'richText',
    editor: lexicalEditor({
      features: ({ defaultFeatures }) => [
        ...defaultFeatures.filter((feature) => features.includes(feature.key))
      ]
    })
  }

  return BasicRichTextField
}

export default BasicRichText