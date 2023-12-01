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



export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <Layout>
            <Header >
            <NavMenu />
            </Header>
            {/* <Sider style={siderStyle}/> */}
            <Content>
                <Container>
                        {props.children}
                </Container>
            </Content>
            <Footer style={footerStyle} />
        </Layout>
    </React.Fragment>
);