import React, { useEffect, useState } from 'react';
import client from '../utils/contentful';
import Banner from './components/homepage/Banner';
import Whatwedo from './components/homepage/Whatwedo';

const HomePage = () => {
  const [banners, setBanners] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [whatWeDos, setWhatWeDos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bannerResponse = await client.getEntries({
          content_type: 'cueforgoodHomeBanner',
        });
        console.log('client.getEntries:', bannerResponse.items)
        setBanners(bannerResponse.items);

        const sliderResponse = await client.getEntries({
          content_type: 'cueforgoodHomeCultureSlider',
        });
        setSliders(sliderResponse.items);

        const whatWeDoResponse = await client.getEntries({
          content_type: 'homepageWhatWeDo',
        });
        setWhatWeDos(whatWeDoResponse.items);
      } catch (error) {
        console.error("Error fetching data from Contentful:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
     <Banner bannerdata={banners}/>
     <Whatwedo />

      <section>
        <h2>Culture Sliders</h2>
        {sliders.map((slider, index) => (
          <div key={index}>
            <img src={slider.fields.sliderImage.fields.file.url} alt={`Slider ${index}`} />
            <p>{slider.fields.sliderDescription}</p>
          </div>
        ))}
      </section>


    </div>
  );
};

export default HomePage;
