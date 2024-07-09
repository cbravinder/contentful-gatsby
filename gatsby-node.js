// export  const createSchemaCustomization = ({ actions }) => {
//     const { createTypes } = actions
  
//     createTypes(`
//       type ContentfulCueforgoodHomeBanner implements Node {
//         heading: Heading
//         info: String
//         infoRight: String
//         subHeading: SubHeading
//       }
  
//       type Heading {
//         heading: Text
//       }
  
//       type SubHeading {
//         subHeading: [String!]!
//       }
  
//       type ContentfulCueforgoodHomeCultureSlider implements Node {
//         sliderImage: SliderImage
//         sliderDescription: String
//       }
  
//       type SliderImage {
//         url: String
//       }
  
//       type ContentfulHomepageWhatWeDo implements Node {
//         image: Image
//         heading: Heading
//         shortDescription: ShortDescription
//       }
  
//       type Image {
//         url: String
//       }
  
//       type ShortDescription {
//         shortDescription: String
//       }
//     `)
//   }