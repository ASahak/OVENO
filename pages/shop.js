import React, {useState} from 'react';
import Head from 'next/head';
import {Container, Row, Col, ModalHeader, ModalBody, Modal} from 'reactstrap';
import Categories from 'components/Home/Categories/categories';
import RangeSlider from 'components/Shop/RangeSlider';
import Products from 'components/Shop/Products';
import Icon from 'components/Icons/icon';
import FormAdd from 'components/Shop/AddProductForm';
import axios from "axios";
import Router from "next/router";
import {connect} from "react-redux";
import { Bus } from 'lib/EventEmitter';

const ShopPage = (props) => {
    const [categories, setCategories] = useState({});
    const [editData, setEditData] = useState(null);
    const [modal, setModal] = useState(false);
    const [resetRangeSlider, setResetRangeSlider] = useState(true);
    const [updatedData, setUpdatedData] = useState({});
    const [filterByRangeSlider, setFilterByRangeSlider] = useState([]);
    const modalOpen = async (dataEdit) => {
        if (dataEdit) {
            setEditData(dataEdit)
        }
        const {data} = await axios.get('/api/get/categories');
        if (data.error) throw Error(data.error);
        const dataCategory = {};
        data.category.forEach(cat => {
            dataCategory[cat.name] = data.subCategory.filter(f => f.category === cat.name).map(a => a.name);
        });
        setCategories(dataCategory);
        setModal(!modal)
    };

    const isAdmin = () => {
        return props.isUser && props.isUser.roleType === 'admin'
    };
    const isUser = () => {
        return props.isUser && props.isUser.roleType === 'user'
    };

    const resetFilters = () => {
        Router.push({
            pathname: '/shop',
            query: {}
        }).then(() => Bus.dispatch('filterByCategory', {searchReset: true}))
    };

    const resetRange = () => {
        setResetRangeSlider(false);
        setResetRangeSlider(true);
    };

    return (
        <div>
            <Head>
                <title>Shop</title>
            </Head>
            <Container>
                <Row>
                    <Col sm="12" md="3">
                        <div style={{position: 'sticky', top: '10px'}}>
                            <Categories />
                            <div style={{height: "40px"}}>
                                {resetRangeSlider ? <RangeSlider
                                    min={0}
                                    step={10}
                                    max={10000}
                                    resetRange={() => resetRange()}
                                    onChange={(data) => setFilterByRangeSlider(data)}
                                />: '' }
                            </div>
                            <button className="reset-btn" onClick={() => resetFilters()}>Reset Filters</button>
                        </div>
                    </Col>
                    <Col sm="12" md="9">
                        <Products
                            openEditModal={(data) => modalOpen(data)}
                            isAdmin={isAdmin()}
                            isUser={isUser()}
                            updatedProduct={updatedData}
                            filterByRange={filterByRangeSlider}
                        />
                    </Col>
                </Row>
                {isAdmin() || isUser() ? <>
                    <span className={"add-product-btn"} onClick={modalOpen}>
                        <Icon name="add"/>
                    </span>
                    <Modal isOpen={modal} toggle={modalOpen}>
                        <ModalHeader toggle={modalOpen} >{editData && editData._id ? 'Edit Product' : 'Add Product'}</ModalHeader>
                        <ModalBody>
                            <FormAdd owner={props.isUser._id} isEdit={editData} categories={categories} onClose={() => setModal(!modal)} updatedProd={(data, type) => setUpdatedData({...data, type})}/>
                        </ModalBody>
                    </Modal>
                </> : ''}
            </Container>
            <style jsx>{`
                .add-product-btn {
                    position:fixed;
                    top: 50%;
                    z-index: 222;
                    width: 30px;
                    right: 0;
                    cursor: pointer;
                }
                .reset-btn {
                    margin-bottom: 20px;
                    border: 1px solid transparent;
                    color: #fff;
                    background-color: #191919;
                    width: 100%;
                    margin-top: 10px;
                    padding: 4px;
                    border-radius: 3px;
                    font-size: 14px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    )
};

const mapStateToProps = state => ({
    isUser: state.auth.user
});
const mapDispatchToProps = {
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopPage);
