import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './Navbar/NavMenur';

import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;


  

  
  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
  };

const headerStyle : React.CSSProperties = {
    borderBlock : 'none',
    color : 'white',
    backgroundColor : 'black',
    height : 60
}

const containerStyle : React.CSSProperties ={
  backgroundColor : 'black',
  color : 'white',
}


export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <Layout>
            <Header style = {headerStyle} >
            <NavMenu />
            </Header>
            {/* <Sider style={siderStyle}/> */}
            <Content style = {containerStyle}>
                <Container >
                        {props.children}
                </Container>
            </Content>
            {/* <Footer style={footerStyle} /> */}
        </Layout>
    </React.Fragment>
);