import { BulbOutlined, FundOutlined, HomeOutlined, MoneyCollectOutlined } from '@ant-design/icons/lib/icons';
import { Avatar, Menu, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../images/crypto.png';

const Navbar = () => {
    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Avatar src={icon} size='large' />
                <Typography.Title level={2} className='logo'>
                    <Link to='/'>Cryptoverse</Link>
                </Typography.Title>
            </div>

            <Menu theme='dark'>
                <Menu.Item key={1} icon={<HomeOutlined />} >
                    <Link to='/'>Home</Link>
                </Menu.Item>
                <Menu.Item key={2} icon={<FundOutlined />} >
                    <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item key={3} icon={<MoneyCollectOutlined />} >
                    <Link to='/exchanges'>Exchanges</Link>
                </Menu.Item>
                <Menu.Item key={4} icon={<BulbOutlined />} >
                    <Link to='/news'>News</Link>
                </Menu.Item>
            </Menu>
            
        </div>
    )
}

export default Navbar;