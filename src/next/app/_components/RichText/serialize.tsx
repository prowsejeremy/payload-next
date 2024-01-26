import React, { Fragment } from 'react'
import escapeHTML from 'escape-html'
import Link from 'next/link'
import { Text } from 'slate'

// eslint-disable-next-line no-use-before-define
type Children = Leaf[]

type Leaf = {
  children?: Children,
  direction: string,
  format: number,
  tag: string,
  indent: number,
  type: string
}

const serialize = (children?: Children): React.ReactNode[] => {

  return children?.map((node, i) => {

    if (Text.isText(node)) {
      let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />

      switch(node.format) {
        // Bold
        case 1:
          text = <strong key={i}>{text}</strong>
          break;
        
        // Italic
        case 2:
          text = <em key={i}>{text}</em>
          break;
        
        // Underline
        case 8:
          text = (
            <span style={{ textDecoration: 'underline' }} key={i}>
              {text}
            </span>
          )
          break;

        // Strikethrough
        case 8:
          text = (
            <span style={{ textDecoration: 'line-through' }} key={i}>
              {text}
            </span>
          )
          break;

        // Code
        case 16:
          text = <code key={i}>{text}</code>
          break;
      }

      return <Fragment key={i}>{text}</Fragment>
    }

    if (!node) {
      return null
    }

    switch (node.tag) {
      case 'h1':
        return <h1 key={i}>{serialize(node?.children)}</h1>
      case 'h2':
        return <h2 key={i}>{serialize(node?.children)}</h2>
      case 'h3':
        return <h3 key={i}>{serialize(node?.children)}</h3>
      case 'h4':
        return <h4 key={i}>{serialize(node?.children)}</h4>
      case 'h5':
        return <h5 key={i}>{serialize(node?.children)}</h5>
      case 'h6':
        return <h6 key={i}>{serialize(node?.children)}</h6>
      case 'quote':
        return <blockquote key={i}>{serialize(node?.children)}</blockquote>
      case 'ul':
        return <ul key={i}>{serialize(node?.children)}</ul>
      case 'ol':
        return <ol key={i}>{serialize(node.children)}</ol>
      case 'li':
        return <li key={i}>{serialize(node.children)}</li>
      case 'link':
        return ''
        // return (
        //   <CMSLink
        //     key={i}
        //     type={node.linkType === 'internal' ? 'reference' : 'custom'}
        //     url={node.url}
        //     reference={node.doc as any}
        //     newTab={Boolean(node?.newTab)}
        //   >
        //     {serialize(node?.children)}
        //   </CMSLink>
        // )

      default:
        return <p key={i}>{serialize(node?.children)}</p>
    }
  }) || []

}

export default serialize
