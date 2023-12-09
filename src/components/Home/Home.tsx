
import { hover } from "@testing-library/user-event/dist/hover";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";

import { Button, Carousel, Col, Flex, Row, Image, FloatButton } from "antd";

import './home.css'
import { useNavigate } from "react-router";



const styleButton: React.CSSProperties = {
   backgroundColor: 'white',
   color: 'black',
   width: 200,
   height: 60,
   borderRadius: 20,
}




const Home: React.FC = () => {

   const user = useAppSelector((state: RootState) => state.user)

   const navigate = useNavigate()
   function handleClick() {
      navigate('/login')
   }

   const handleMouseEnter = () =>{

   }



   return (
      <>
         <Row className="row">
            <Col xs={20} sm={16} md={12} lg={6} xl={8} className="column">
               <>
                  <p style={{ fontSize: 60, color: 'white', margin: 0 }}>make your</p>
                  <p style={{ fontSize: 60, color: 'white', margin: 0, fontWeight: "bold" }}>BODY SHAPE</p>
                  <p style={{ fontSize: 22, color: 'white' }}>Being physically active can improve your brain health,
                     help manage weight, reduce the risk of disease, strengthen bones and muscles,
                     and improve your ability to do everyday activities. Adults who si</p>
                  <Button className="button" onClick={handleClick}>Get Started</Button>
               </>
            </Col>
            <Col xs={2} sm={4} md={10} lg={16} xl={14} className="column">
               <>
                  <Image preview={false}
                     src='/static/image/v1_96.png'
                  >

                  </Image>
               </>
            </Col>
         </Row>
         <div style={{ fontSize: 60, color: 'white', margin: '0px 0px 0px 7%' }}>
            Free Workout Programs
         </div>
         <Row className="row"  >
            <Col className="columnVertical" xs={{ span: 5 }} lg={{ span: 5 }} >
               <div onMouseEnter={()=>console.log(1)}>
                  <Image
                     preview={false}
                     src='/static/image/v1_152.png'
                     onMouseEnter={handleMouseEnter}
                  ></Image>
                  <Button className="button" onClick={handleClick} >Get Started</Button>
               </div>
            </Col>
            <Col className="columnVertical" xs={{ span: 5 }} lg={{ span: 5 }} >
               <div>
                  <Image
                     preview={false}
                     src='/static/image/v1_152.png'
                  ></Image>
                  <Button className="button" onClick={handleClick} >Get Started</Button>
               </div>
            </Col>
            <Col className="columnVertical" xs={{ span: 5 }} lg={{ span: 5 }} >
               <div>
                  <Image
                     preview={false}
                     src='/static/image/v1_152.png'
                  ></Image>
                  <Button className="button" onClick={handleClick}>Get Started</Button>
               </div>
            </Col>
            <Col className="columnVertical" xs={{ span: 5 }} lg={{ span: 5 }} >
               <div>
                  <Image
                     preview={false}
                     src='/static/image/v1_152.png'
                  ></Image>
                  <Button className="button" onClick={handleClick}>Get Started</Button>
               </div>
            </Col>
         </Row>
         <div style={{ fontSize: 60, color: 'white', margin: '0px 0px 0px 7%' }}>
            Gallery
         </div>
         <div className="gallery">  
            <Carousel autoplay className="carusel">
               <img
                  src='/static/image/v1_173.png'
               ></img>
               <img
                  src='/static/image/v1_173.png'
               ></img>
               <img
                  src='/static/image/v1_173.png'
               ></img>
               <img
                  src='/static/image/v1_173.png'
               ></img>
            </Carousel>
         </div>
         <p className="fotter">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt utfsfbhsrherfhsbfshb.  
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
             sed do eiusmod tempor incididunt ut labore et
         </p>
         <FloatButton.BackTop />
      </>
     
   );

}

export default Home;