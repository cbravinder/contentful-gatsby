import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Banner = (props) => {
  const [response,setResponse]=useState();
  const [loading,setLoading]=useState(true);

 useEffect(()=>{
    try{
      setResponse(props.bannerdata)
      setLoading(false)
      console.log('response:',response)
    }catch(error){
      console.log('error:',error)
      setLoading(true)
    }
    
 },[props])

  
  return (
        <section className='home-slider__row'>
        <div className='container'>
        <div className="line1 line"></div>
        <div className="line2 line"></div>
         {
          (!loading) ? 
          <>
          {response && response?.map((filterdata,index)=>{
            const{heading,info,infoRight,subHeading}=filterdata.fields
              return(
                <div className='homepage-title' key={index}>
                {subHeading  && <h4 className='homeslider-header'>{subHeading}</h4>}
                {heading  && <h1 >{heading}</h1>}
                <span className='home-title-text'>{info}  {infoRight}</span>
                
                </div>
              )
            })}
          </>
           : 
           'Loading...'
         }
            
            
        </div>

        </section>
  )
}

export default Banner
