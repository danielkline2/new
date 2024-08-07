import './App.css';

import { useEffect , useState } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Switch from './Switch.js';

import {images , resizedImages} from './pics.js'

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  const [useFullImage , setUseFullImage] = useState(false);




  const isMobile = width <= 768;
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);


  const PicComponent = (pic, species) => {
    return(
      <div key={species}>
        <img src={pic} width={"80vw"} alt={species}/>
        {!isMobile && <p className="legend">{species}</p>}
      </div>)
    
  }

  const CarouselComponent = (obj) => { 

    return (
      <div style={{key:Object.keys(obj)[0], padding:'4vw'}}>

        <Carousel
          emulateTouch={!!isMobile}
          showIndicators={!isMobile}
          showThumbs={!!isMobile}
          >

          {obj[Object.keys(obj)[0]].length >0
            && obj[Object.keys(obj)[0]].map((pic) =>{
              // console.log(obj)
              return (PicComponent(pic, Object.keys(obj)[0].replaceAll('-',' ')))
          })}
        </Carousel>
      
    </div>)
  }





  if(!!useFullImage){
    return (
      <div id='CarouselParentComponent'>
        <div className="app">
        <h2>Click here to render partial images.</h2>
        <p>Loading speeds will be be quicker</p>
        
          <Switch
            isOn={useFullImage}
            onColor="#EF476F"
            handleToggle={() => {setUseFullImage(!useFullImage);}}
          />
        </div>
        {images
          &&
          images.length > 0 
          &&
            images.slice(0, !!isMobile ? 6 : -1).map((obj) =>{
            return (CarouselComponent(obj))
          })}
      </div>  
      );
  }else {
    return (
      <div id='CarouselParentComponent'>
        <div className="app">
        <h2>Click here to render full HD images.</h2>
        <p> Loading speeds will take longer</p>
        <p> Not recommended on mobile or for
          people using data plans</p>
        
          <Switch
            isOn={useFullImage}
            onColor="#EF476F"
            handleToggle={() => setUseFullImage(!useFullImage)}
          />
        </div>
        {resizedImages
              &&
              resizedImages.length > 0 
              &&
              resizedImages.map((obj) =>{
                return (CarouselComponent(obj))
              })}
      </div>  
      );

  }

}

export default App;
