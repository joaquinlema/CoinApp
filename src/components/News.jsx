import { LoadingOutlined } from '@ant-design/icons/lib/icons';
import { Avatar, Card, Col, Row, Select, Typography } from 'antd';
import { Option } from 'antd/lib/mentions';
import Text from 'antd/lib/typography/Text';
import moment from 'moment';
import React, { useState } from 'react';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi';

const { Title } = Typography;

const News = ({ simplified }) => {

    const [newsCategory, setnewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews } = useGetCryptosNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
    const { data } = useGetCryptosQuery(100);

    if (!cryptoNews?.value) return <LoadingOutlined />

    return (
        <Row gutter={[32, 32]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder='Select crypto category'
                        optionFilterProp="children"
                        onChange={(value) => { setnewsCategory(value); }}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())} >
                        <Option value={'Cryptocurrencies'}>Cryptocurrencies</Option>
                        {
                            data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)
                        }
                    </Select>
                </Col>
            )}
            {
                cryptoNews?.value?.map((news, index) => (
                    <Col xs={24} sm={12} lg={8} key={index} >
                        <Card hoverable className="news-card">
                            <a href={news.url} target='_blank' rel='norefeerer'>
                                <div className="news-image-container">
                                    <Title className='news-title' level={4}>{news.name}</Title>
                                    <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl} alt={news} />
                                </div>
                                <p>
                                    {
                                        news.description > 100
                                            ? `${news.description.substring(0, 100)} ....`
                                            : news.description
                                    }
                                </p>
                                <div className="provider-container">
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl} />
                                        <Text className="provider-name">{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))
            }
        </Row >
    )
}

export default News;
