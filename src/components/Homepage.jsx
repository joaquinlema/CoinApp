import { LoadingOutlined } from '@ant-design/icons/lib/icons';
import { Col, Row, Statistic, Typography } from 'antd';
import millify from 'millify';
import React from 'react';
import { Link } from 'react-router-dom';
import { Cryptocurrencies, News } from '.';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Title } = Typography;

const Homepage = () => {

    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;

    if (isFetching) {
        return <LoadingOutlined />
    }

    return (
        <>
            <Title level={2} className='heading'>Global Crypto Stats</Title>
            <Row>
                <Col span={12}> <Statistic title='Total Cryptocurrencies' value={globalStats.total} /></Col>
                <Col span={12}> <Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)} /></Col>
                <Col span={12}> <Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap)} /></Col>
                <Col span={12}> <Statistic title='Total 24h VOlume' value={millify(globalStats.total24hVolume)} /></Col>
                <Col span={12}> <Statistic title='Total Markets' value={millify(globalStats.totalMarkets)} /></Col>

                <Col span={24}>
                    <div className="home-heading-container">
                        <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
                        <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show more</Link></Title>
                    </div>
                    <Cryptocurrencies simplified />
                    <div className=" home-heading-container">
                        <Title level={2} className='home-title'>Latest Cryptocurrencies News</Title>
                        <Title level={3} className='show-more'><Link to='/news'>Show more</Link></Title>
                    </div>
                    <News simplified />
                </Col>
            </Row>
        </>
    )
}

export default Homepage;
