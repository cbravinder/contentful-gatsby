// src/components/Whatwedo.js

import React, { useEffect, useState } from 'react'
import client from '../../../utils/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { Remarkable } from 'remarkable'

const Whatwedo = () => {
  const [whatwedo, setWhatwedo] = useState([])
  const [richText, setRichText] = useState(null)
  const [markdown, setMarkdown] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'homepageWhatWeDo', // Replace with your content type ID
        })
        setWhatwedo(response.items)
        const richTextData = response.items[0]?.fields.detailedContent // Replace 'detailedContent' with your rich text field ID
        setRichText(richTextData)
        
        const markdownData = response.items[0]?.fields.rightdata // Replace 'markdownContent' with your markdown field ID
        setMarkdown(markdownData)
        
        console.log('richText:::', richTextData)
        console.log('markdown:::', markdownData)
      } catch (error) {
        console.error('Error fetching data from Contentful:', error)
      }
    }

    fetchData()
  }, [])

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { file, title } = node.data.target.fields
        const url = file.url
        const alt = title || file.fileName

        return <img src={url} alt={alt} />
      },
      // Add more custom renderers if needed
    },
  }

  const md = new Remarkable()

  return (
    <>
      <section className='home-what__we_do'>
        <div className='container'>
          {whatwedo.map((filter, index) => {
            const { heading, image, shortDescription} = filter.fields
            return (
              <div className='home-what__we_left pd_right_40'>
                {heading && <h2 className='home-what__we_heading'>{heading}</h2>}
                {shortDescription && (
                  <p className='home-what__we_heading'>
                    {shortDescription} <span>#madebycueforgood</span>
                  </p>
                )}
                {image && <img src={image.fields.file.url} alt={image.fields.title} />}
              </div>     
            )
          })}
            <div className='home-what__we_right pd_left_40'>
              {markdown && <div dangerouslySetInnerHTML={{ __html: md.render(markdown) }} />}
            </div>
        </div>

       
        <h1 style={{ clear: 'both' }}>//// Rich text data ////</h1>
        {richText && documentToReactComponents(richText, options)}

        
      </section>
    </>
  )
}

export default Whatwedo
