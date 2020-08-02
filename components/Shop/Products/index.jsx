import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';
import Badge from 'components/Home/HotSellers/elements/Badge';
import {Row, Col} from 'reactstrap'
import axios from "axios";
import {toast} from "react-toastify";
import {
    RANGE_SLIDER
} from 'utils'
const {
    getToken
} = require('utils/auth');
import Router from 'next/router'
import {Bus} from "lib/EventEmitter";

export default class Products extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            productsData: null,
            pageSize: 5,
            activePage: 1,
            productAllCount: null,
            categorySlug: null,
            subCategorySlug: null,
        };
        this.removeProduct = this.removeProduct.bind(this);
        this.filterByPage  = this.filterByPage.bind(this);
        this.getItems      = this.getItems.bind(this);
        this.returnParams  = this.returnParams.bind(this);

        Bus.subscribe('filterByCategory', async () => { // Detect changes of category and Subcategory router params
            try {
                const data = await this.getItems();
                if (data.error) throw Error(data.error);

                const dataCount = await axios.get('/api/products/getCount', {
                    params: this.returnParams(),
                });
                if (dataCount.data.error) throw Error(dataCount.data.error.message);
                this.setState({
                    productAllCount: dataCount.data.count,
                    activePage: 1,
                    productsData: data.products
                });
            } catch (err) {
                toast.error(err.response ? err.response.data : err.message, {
                    position: "top-right",
                    autoClose: 3000,
                    pauseOnHover: false
                });
            }
        })
    }

    componentDidMount = async () => {
        // Get All products
        try {
            const data = await this.getItems();

            if (!data.status || data.error) throw Error(data.error);

            const dataCount = await axios.get('/api/products/getCount', {
                params: this.returnParams(),
            });
            if (dataCount.data.error) throw Error(dataCount.data.error);
            this.setState({
                productAllCount: dataCount.data.count,
                productsData: data.products
            })

        } catch (err) {
            this.setState({
                productsData: [],
            });
            toast.error(err.response ? err.response.data : err.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false
            });
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.filterByRange !== this.props.filterByRange) { // Detecting changes of Range Slider
            const [min, max] = this.props.filterByRange;
            Router.push({
                pathname: Router.pathname,
                query: { ...Router.query, page: 1, minPrice: min, maxPrice: max}
            }).then(async () => {
                const dataCount = await axios.get('/api/products/getCount', {
                    params: this.returnParams(),
                });
                if (dataCount.data.error) throw Error(dataCount.data.error);
                const data = await this.getItems();

                this.setState({
                    activePage: 1,
                    productAllCount: dataCount.data.count,
                    productsData: data.products
                })
            });
        }

        if (prevProps.updatedProduct !== this.props.updatedProduct) { // Detecting changes of add or edit product
            const prevDataProds = [...this.state.productsData];
            if (this.props.updatedProduct.type === 'edit') {
                const updatedIndex = prevDataProds.findIndex(e => e._id === this.props.updatedProduct._id);
                if (updatedIndex > -1) {
                    prevDataProds[updatedIndex] = this.props.updatedProduct;
                    this.setState({
                        productsData: prevDataProds
                    });
                }
            } else if (this.props.updatedProduct.type === 'add') {
                prevDataProds.push(this.props.updatedProduct);
                this.setState({
                    productsData: prevDataProds
                });
            }
        }
    }

    componentWillUnmount() {
        Bus.unsubscribe('filterByCategory');
    }

    returnParams () {
        const params = new URLSearchParams(window.location.search);
        const page = params.get('page') || 1;
        const limit = this.state.pageSize;
        const category = params.get('category');
        const name = params.get('name');
        const subCategory = params.get('subCategory');
        const filterMin = params.get('minPrice') || RANGE_SLIDER[0];
        const filterMax = params.get('maxPrice') || RANGE_SLIDER[1];
        return {
            name,
            limit,
            page,
            category,
            subCategory,
            filterMin,
            filterMax,
        }
    }
    async getItems () {
        const params = new URLSearchParams(window.location.search);
        let page = params.get('page');
        if (page) {
            this.setState({
                activePage: +page
            })
        } else page = 1;
        const {data} = await axios.get('/api/products/get', {
            params: {
                ...this.returnParams(),
                page,
            }
        });
        return data
    }

    filterByPage (page) {
        Router.push({
            pathname: Router.pathname,
            query: { ...Router.query, page: page }
        }).then(async () => {
            const data = await this.getItems();
            this.setState({
                activePage: +page,
                productsData: data.products
            });
        });
    }

    async removeProduct (dataId) {
        try {
            const {data} = await axios.delete('/api/product/delete', {
                headers: { Authorization: getToken('token')},
                data:{
                    id: dataId
                }
            });
            if (data.error) throw Error(data.error);

            const dataProds = await this.getItems();

            if (!dataProds.status || dataProds.error) throw Error(dataProds.error);

            const dataCount = await axios.get('/api/products/getCount', {
                params: this.returnParams(),
            });
            if (dataCount.data.error) throw Error(dataCount.data.error);
            this.setState({
                productAllCount: dataCount.data.count,
                productsData: dataProds.products
            });


            toast.dark(data.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false
            });
        } catch (err) {
            toast.error(err.response ? err.response.data : err.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false
            });
        }
    }
    render () {
        return (
            <>
                <Row className={styles['main-shop_content']}>
                    {!this.state.productsData ? <img className={styles['main-shop_content_loading_gif']} src={require('../../../assets/images/loading.gif')} alt=""/> : this.state.productsData.length ? this.state.productsData.map(slide => <Col md={4} sm={6} lg={3} key={slide._id}> <Badge
                        isAdmin={this.props.isAdmin}
                        isUser={this.props.isUser}
                        removeProduct={this.removeProduct}
                        editProduct={this.props.openEditModal}
                        mainData={slide} /></Col>) : <Col sm={12}><p className={styles['main-shop_content_no-result']}>No result!</p></Col>}
                </Row>
                <div className={styles['pagination-wrap']}>
                    {new Array(Math.ceil(this.state.productAllCount / this.state.pageSize)).fill('').map((_el, index) => (
                        <span key={index} className={this.state.activePage === index + 1 ? 'activeBtn' : ''} onClick={() => this.filterByPage(index + 1)}>{index + 1}</span>
                    ))}
                </div>
            </>
        )
    }
}

Products.defaultProps = {
    isAdmin: false,
    isUser: false,
    filterByRange: RANGE_SLIDER,
};
Products.propTypes = {
    filterByRange: PropTypes.array,
    openEditModal: PropTypes.func,
    isAdmin: PropTypes.bool,
    isUser: PropTypes.bool,
    updatedProduct: PropTypes.object,
};


