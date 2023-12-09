import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './Navbar/NavMenur';
import { YoutubeOutlined } from '@ant-design/icons'
import './layout.css'
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Footer, Content } = Layout;





const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};


const containerStyle: React.CSSProperties = {
  backgroundColor: 'black',
  color: 'white',
}

const FooterContainer: React.FC = () => {
  return (
    <Link to=' https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley'>
      <YoutubeOutlined />
    </Link>
  )
}




export default (props: { children?: React.ReactNode }) => (
  <>
    <Layout className='layout'>
      <Header className='headerStyle' >
        <NavMenu />
      </Header>
      {/* <Sider style={siderStyle}/> */}
      <Content className='content'>
        <Container className='content' >
          {props.children}
        </Container>
      </Content>
      <Footer className='footer'>
        <>
          <FooterContainer />
        </>
      </Footer>
      {/* <Footer style={footerStyle} /> */}
    </Layout>
  </>
);