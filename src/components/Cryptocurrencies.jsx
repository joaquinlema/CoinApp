import { LoadingOutlined } from '@ant-design/icons/lib/icons';
import { Input, Card, Col, Row } from 'antd';
import millify from 'millify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Search } = Input;

const Cryptocurrencies = ({ simplified }) => {
    const count = (simplified) ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {

        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCryptos(filteredData);

    }, [searchTerm, cryptosList]);

    if (isFetching) { return <LoadingOutlined /> }

    return (
        <>
            {!simplified &&
                <div className="search-crypto">
                    <Search placeholder="Search for crypto" onSearch={(value) => { console.log(value); setSearchTerm(value); }} enterButton />
                </div>
            }
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((crypto, index) => (
                    <Col key={index} xs={12} sm={12} lg={6} className="crypto-card" >
                        <Link to={`/crypto/${crypto.id}`}>
                            <Card
                                title={`${crypto.rank}. ${crypto.name}`}
                                extra={<img className="crypto-image" src={crypto.iconUrl} />}
                                hoverable
                            >
                                <p>Price: {millify(crypto.price)}</p>
                                <p>Market Cap: {millify(crypto.marketCap)}</p>
                                <p>Daily change: {millify(crypto.change)}</p>

                            </Card>
                        </Link>
                    </Col>
                ))
                }
            </Row>
        </>
    )
}

export default Cryptocurrencies;
