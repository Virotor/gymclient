
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";

import { Button, Carousel, Col, Flex, Row, Image } from "antd";


const styleCol: React.CSSProperties = { background: 'black', margin: '16px 16px', padding: '16px 16px', minWidth: 100 };
const rowStyle: React.CSSProperties = { background: 'black', padding: '8px 0px', margin: '5%' }
const imageStyle: React.CSSProperties = { maxHeight: 400, maxWidth: 600, imageRendering: 'auto' }


const contentStyle: React.CSSProperties = {
   height: '160px',
   color: '#fff',
   lineHeight: '160px',
   textAlign: 'center',
   background: '#364d79',
};


const Home: React.FC = () => {

   const user = useAppSelector((state: RootState) => state.user)
   return (
      <>
         <Row style={rowStyle}>
            <Col xs={20} sm={16} md={12} lg={6} xl={8} style={styleCol}>
               <>
                  <p style={{ fontSize: 60, color: 'white', margin: 0 }}>make your</p>
                  <p style={{ fontSize: 90, color: 'white', margin: 0 }}>BODY SHAPE</p>
                  <p style={{ color: 'white' }}>Being physically active can improve your brain health,
                     help manage weight, reduce the risk of disease, strengthen bones and muscles,
                     and improve your ability to do everyday activities. Adults who si</p>
                  <Button type="primary" style={{ backgroundColor: 'white', color: 'black', width: 200, height: 52, borderRadius: 20 }}>Get Started</Button>
               </>
            </Col>
            <Col xs={2} sm={4} md={10} lg={16} xl={14} style={styleCol}>
               <>
                  <Image preview={false}
                     src='/static/image/09e221bf-87c2-4915-b3da-444673e02f74_1701716323409524291.png'>
                     {/* style = {imageStyle} */}
                  </Image>
               </>
            </Col>
         </Row>
         <Row style={rowStyle} gutter={40} >
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5}} >
               Col
            </Col>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5}}>
               Col
            </Col>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5}}>
               Col
            </Col>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5}}>
               Col
            </Col>
         </Row>
      </>
      /* <div className={styles.freeWorkout}>
         <div className={styles.getStartedParent}>
            <div className={styles.getStarted2}>
               <div className={styles.getStartedInner}>
                  <div className={styles.getStartedItem} />
                  <div className={styles.startToday}>Start Today</div>
               </div>
            </div>
            <img className={styles.yogaIcon} alt="" src="/yoga@2x.png" />
            <div className={styles.groupChild8} />
            <b className={styles.beginnerFriendly}>Beginner Friendly</b>
            <b className={styles.freeWorkoutPrograms}>Free Workout Programs</b>
         </div>
         <div className={styles.modToAd}>
            <div className={styles.getStartedWrapper}>
               <div className={styles.getStartedInner}>
                  <div className={styles.getStartedInner}>
                     <div className={styles.getStartedInner}>
                        <div className={styles.groupChild} />
                        <div className={styles.startToday}>Start Today</div>
                     </div>
                  </div>
               </div>
            </div>
            <img
               className={styles.modToAdChild}
               alt=""
               src="/group-156@2x.png"
            />
            <div className={styles.modToAdItem} />
            <b className={styles.moderateToAdvanced}>Moderate to Advanced</b>
         </div>
         <div className={styles.weightloss}>
            <img className={styles.cardioIcon} alt="" src="/cardio@2x.png" />
            <div className={styles.getStarted4}>
               <div className={styles.getStarted4}>
                  <div className={styles.rectangleParent4}>
                     <div className={styles.getStartedItem} />
                     <div className={styles.startToday}>Start Today</div>
                  </div>
                  <div className={styles.rectangleParent5}>
                     <div className={styles.noEqChild} />
                     <b className={styles.weightLoss}>Weight Loss</b>
                  </div>
               </div>
            </div>
         </div>
         <div className={styles.noEq}>
            <img className={styles.cardioIcon} alt="" src="/cardio@2x.png" />
            <div className={styles.rectangleParent4}>
               <div className={styles.getStartedItem} />
               <div className={styles.startToday}>Start Today</div>
            </div>
            <div className={styles.noEqChild} />
            <b className={styles.noEquipment}>No Equipment</b>
         </div>
         <div className={styles.strength}>
            <img className={styles.cardioIcon} alt="" src="/cardio@2x.png" />
            <div className={styles.rectangleParent4}>
               <div className={styles.getStartedItem} />
               <div className={styles.startToday}>Start Today</div>
            </div>
            <div className={styles.noEqChild} />
            <b className={styles.noEquipment}>Strength Training</b>
         </div>
      </div>
      <div className={styles.groupParent4}>
         <div className={styles.rectangleParent6}>
            <div className={styles.getStartedItem} />
            <div className={styles.viewAllProducts}>View All Products</div>
         </div>
         <div className={styles.getOurMerch}>/// GET OUR MERCH</div>
      </div>
      <div className={styles.groupParent5}>
         <div className={styles.groupParent6}>
            <div className={styles.rectangleParent7}>
               <div className={styles.groupChild13} />
               <div className={styles.bag}>Bag</div>
            </div>
            <img
               className={styles.reusableBagTopViewMockupRIcon}
               alt=""
               src="/reusablebagtopviewmockupremovebgpreview-1@2x.png"
            />
         </div>
         <div className={styles.groupParent7}>
            <div className={styles.rectangleParent8}>
               <div className={styles.groupChild13} />
               <div className={styles.shirt}>Shirt</div>
            </div>
            <img
               className={styles.simpleTShirtMockupRemovebgIcon}
               alt=""
               src="/simpletshirtmockupremovebgpreview-1@2x.png"
            />
         </div>
         <div className={styles.groupParent8}>
            <div className={styles.rectangleParent8}>
               <div className={styles.groupChild13} />
               <div className={styles.shirt}>Shirt</div>
            </div>
            <img
               className={styles.simpleTShirtMockupRemovebgIcon}
               alt=""
               src="/simpletshirtmockupremovebgpreview-1@2x.png"
            />
         </div>
         <div className={styles.groupParent9}>
            <div className={styles.rectangleParent8}>
               <div className={styles.groupChild13} />
               <div className={styles.bottle}>Bottle</div>
            </div>
            <img
               className={styles.screenshot102RemovebgPrevIcon}
               alt=""
               src="/screenshot--102-removebgpreview-1@2x.png"
            />
         </div>
      </div>
      <div className={styles.galleryParent}>
         <div className={styles.gallery}>///Gallery</div>
         <img className={styles.picsIcon} alt="" src="/pics@2x.png" />
      </div>
      <div className={styles.homePageChild} />
      <div className={styles.groupParent10}>
         <div className={styles.groupParent11}>
            <div className={styles.rectangleParent11}>
               <div className={styles.getStartedItem} />
               <div className={styles.viewMoreRecipes}>View More Recipes</div>
            </div>
            <div className={styles.recipes1}>///Recipes</div>
         </div>
         <div className={styles.groupParent12}>
            <div className={styles.groupParent13}>
               <div className={styles.highProteinRecipesParent}>
                  <div className={styles.highProteinRecipes}>
                     High Protein Recipes
                  </div>
                  <div className={styles.lowCarbRecipes}>Low Carb Recipes</div>
                  <div className={styles.dairyFreeRecipes}>
                     Dairy Free Recipes
                  </div>
                  <div className={styles.vegetarianRecipes}>
                     Vegetarian Recipes
                  </div>
               </div>
               <img
                  className={styles.groupChild18}
                  alt=""
                  src="/group-191@2x.png"
               />
            </div>
            <div className={styles.maskGroupParent}>
               <img
                  className={styles.maskGroupIcon1}
                  alt=""
                  src="/mask-group1@2x.png"
               />
               <div className={styles.proteinPackedPowerBowlParent}>
                  <b className={styles.signUp}>Protein-packed power bowl</b>
                  <div className={styles.aColorfulProteinPacked}>
                     A colorful protein-packed power bowl filled with flavorful,
                     meaty grilled satay tofu and an array of vibrant veggies on a
                     bed of fluffy quinoa. Completed with a healthy and delicious
                     satay dipping sauce and crushed roasted peanuts. Delicious!
                  </div>
                  <div className={styles.groupParent14}>
                     <div className={styles.rectangleWrapper}>
                        <div className={styles.groupChild19} />
                     </div>
                     <div className={styles.viewFullRecipeParent}>
                        <div className={styles.viewFullRecipe}>
                           View Full Recipe
                        </div>
                        <img className={styles.icon} alt="" src="/2883409-1.svg" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div className={styles.groupParent15}>
         <div className={styles.loremIpsumDolorSitAmetCoParent}>
            <div className={styles.loremIpsumDolor}>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
               eiusmod tempor incididunt utfsfbhsrherfhsbfshb. Lorem ipsum dolor
               sit amet, consectetur adipiscing elit, sed do eiusmod tempor
               incididunt ut labore et
            </div>
            <img
               className={styles.goldSGym2008Logo5b7a8ecb4Icon}
               alt=""
               src="/gold-s-gym-2008logo5b7a8ecb44seeklogo-12@2x.png"
            />
         </div>
         <div className={styles.loremIpsumDolorSitAmetCoGroup}>
            <div className={styles.loremIpsumDolor1}>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
               eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
               enim ad minim veniam
            </div>
            <div className={styles.contactUs}>///Contact Us</div>
         </div>
         <div className={styles.groupParent1}>
            <div className={styles.enterYourNameParent}>
               <div className={styles.enterYourName}>Enter your name</div>
               <div className={styles.groupChild3} />
               <div className={styles.xyzgmailcomParent}>
                  <div className={styles.xyzgmailcom}>xyz@gmail.com</div>
                  <div className={styles.groupChild4} />
               </div>
               <div className={styles.enterYourMessageParent}>
                  <div className={styles.xyzgmailcom}>Enter your message...</div>
                  <div className={styles.groupChild5} />
               </div>
            </div>
            <img
               className={styles.maskGroupIcon}
               alt=""
               src="/mask-group2@2x.png"
            />
         </div>
      </div>
      <div className={styles.homePageItem} /> */
   );

}

export default Home;