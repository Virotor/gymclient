
import { Flex, Menu, MenuProps } from 'antd';
import React, { useState } from 'react';


import MenuItem from 'antd/es/menu/MenuItem';
import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOut } from '../../redux/reducers/UserSlice';
import { RootState } from '../../store';

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
    backgroundColor: 'black',
    color: 'white',
}

const imageStyle: React.CSSProperties = {
    width: 60, height: 60, position: 'absolute'
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

            <Flex gap={30} className='headerStyle' align={'flex-start'} justify={'flex-end'}>

                <NavLink to="/" style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white' })}>Home</NavLink>

                {user.user.jwtToken.length == 0 ?

                    <NavLink to="/login" style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white' })}>Login</NavLink>

                    :
                    <>
                    </>
                }
                {user.user.jwtToken.length != 0 ?

                    <NavLink to="/account" style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white' })}>Account</NavLink>

                    :
                    <>
                    </>
                }
                {user.user.jwtToken.length != 0 ?

                    <NavLink onClick={() => { dispatch(logOut()) }} to="/logOut" style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white' })}>LogOut</NavLink>

                    :
                    <>
                    </>
                }

            </Flex >
        </>
    )
};

export default NavMenu;