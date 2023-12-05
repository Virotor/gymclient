
import { Menu, Flex, Segmented, MenuProps, Image } from 'antd';
import React, { useState } from 'react';
import type { FlexProps } from 'antd';
import type { SegmentedProps } from 'antd/es/segmented';


import { NavItem, NavLink } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import MenuItem from 'antd/es/menu/MenuItem';
import { logOut } from '../../redux/reducers/UserSlice';

const boxStyle: React.CSSProperties = {
    width: '100%',
    height: 60,
    border: 'none',
};

const menuStyle: React.CSSProperties = {
    display: 'flex',
    minWidth: '20%',
    height: 60,
    border: 'none',
    backgroundColor : 'black',
    color : 'white',
}

const imageStyle : React.CSSProperties ={
    width : 60, height : 60, position : 'absolute'
}


const NavMenu: React.FC = () => {


    const [current, setCurrent] = useState('home')

    const dispatch = useAppDispatch()
    const user = useAppSelector((state: RootState) => state.user)


    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };


    return (
        <>
        <img style = {imageStyle}
               alt=""
               src="/static/image/4fcf0b33-4fb6-46e8-8b09-f7c4769c89b4_1701716323410448138.png"
            />

        <Flex  align={'flex-start'} justify={'flex-end'}>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" style={menuStyle} >
                <MenuItem key={'home'}>
                    <Link className="text-dark" to="/">Home</Link>
                </MenuItem>
                {user.user.jwtToken.length == 0 ?
                    <MenuItem key={'login'}>
                        <Link className="text-dark" to="/login">Login</Link>
                    </MenuItem>
                    :
                    <>
                    </>
                }
                {user.user.jwtToken.length != 0 ?
                    <MenuItem key={'account'}>
                        <Link className="text-dark" to="/account">Account</Link>
                    </MenuItem>
                    :
                    <>
                    </>
                }
                {user.user.jwtToken.length != 0 ?
                    < MenuItem key={'logOut'}>
                        <Link onClick={() => { dispatch(logOut()) }} className="text-dark" to="/">LogOut</Link>
                    </MenuItem>
                    :
                    <>
                    </>
                }
            </Menu>
        </Flex >
        </>
    )
};

export default NavMenu;