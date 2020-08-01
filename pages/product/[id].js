import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import {Container, Row, Col} from 'reactstrap';
import axios from "axios";
import Router from "next/router";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import styles from "components/Home/HotSellers/elements/badge.scss";
import UI_ELEMENTS from "../../components/shared/UI";
const {
    getToken
} = require('utils/auth');
import Magnifier from "react-magnifier";
import {__SET_LOGGED} from "store/saga";

const ProductPage = (props) => {
    const { query } = useRouter();
    const [dataProd, setDataProd] = useState({});
    const [star, setStar] = useState(0);
    const [loadingCategory, setLoadingCategory] = useState(false);
    const [addToCart, setAddToCart] = useState(true);

    useEffect(() => {
        try {
            (async () => {
                if (Router.query.id) {
                    const {data} = await axios.get('/api/product/' + Router.query.id);
                    if (data.error) throw Error(data.error.message);
                    setDataProd(data.product);
                    if (data.product.rating.length) {
                        setStar(Math.round(data.product.rating.reduce((acc, item) => {
                            acc += item.value;
                            return acc
                        }, 0) / data.product.rating.length));
                    }
                }
            })()
        } catch (err) {
            toast.error(err.response ? err.response.data : err.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false,
            });
        }
    }, [query]);

    useEffect(() => { // Check if you have an product like active product
        if ((props.isUser && dataProd) && props.isUser.cart.some(el => el._id === dataProd._id)) {
            setAddToCart(false);
        }
    }, [props.isUser, dataProd]);

    const appreciate = async (val) => {
        try {
            if (!props.isUser) throw Error('Please login before appreciation!');
            if (dataProd.rating.some(el => el.id === props.isUser._id)) throw Error("You can't appreciate second time");

            const {data} = await axios.post('/api/product/appreciate', {
                    userId: props.isUser._id,
                    id: dataProd._id,
                    value: val,
                }, {
                headers: { Authorization: getToken('token')},
            });
            if (data.error) throw Error(data.error.message);
            dataProd.rating = [...dataProd.rating, {id: data.appreciate.id, value: data.appreciate.value}];

            setDataProd(dataProd); // Set new rated Product
            setStar(Math.round(dataProd.rating.reduce((acc, item) => {
                acc += item.value;
                return acc
            }, 0) / dataProd.rating.length));

            toast.dark('The product is rated!', {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false
            });
        } catch(err) {
            toast.error(err.response ? err.response.data : err.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false,
            });
        }
    };

    const addToCartProd = async () => {
        try {
            setLoadingCategory(true);
            if (!props.isUser) throw Error('Please login before add product!');
            if ((props.isUser && dataProd) && props.isUser.cart.some(el => el._id === dataProd._id)) {
                throw Error("You have this product in your cart already!");
            }

            const {data} = await axios.post('/api/cart/addToCart', {
                userId: props.isUser._id,
                id: dataProd._id,
                count: 1,
            }, {
                headers: { Authorization: getToken('token')},
            });
            if (data.error) throw Error(data.error);

            props.isUser.cart.push({
                _id: dataProd._id,
                count: 1,
            });
            __SET_LOGGED({user: props.isUser}).next();

            setAddToCart(false);
            toast.dark(data.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false
            });
        } catch (err) {
            toast.error(err.response ? err.response.data : err.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false,
            });
        } finally {
            setLoadingCategory(false);
        }
    };

    return (
        <div>
            <Head>
                <title>Product</title>
            </Head>
            <Container>
                <Row>
                    <Col sm="12" md="6">
                        <div className="product-image_wrap">
                            {dataProd._id ?
                                <Magnifier src={dataProd.photo.replace(/\\/g, "/")} mgWidth={200} mgHeight={200} zoomFactor={2.5} width={'100%'} />
                                : <div className="product-image_wrap_loading">
                                    <img src={require('../../assets/images/loading.gif')}/>
                                </div>}

                        </div>
                    </Col>
                    {dataProd._id &&
                        <>
                            <Col sm="12" md="6">
                                <div className="product-details-wrap">
                                    <div className="product-details-wrap__highway">
                                        <span className={`highway_category ${!dataProd.subCategory ? 'highway_no_subCategory' : ''}`}>{dataProd.category}</span>
                                        {dataProd.subCategory && <span className="highway_subCategory">{dataProd.subCategory}</span>}
                                    </div>
                                    <h4>{dataProd.name}</h4>
                                    <div className="product-details-wrap__price">
                                        {dataProd.sale !== 0 ? <>
                                            <span className={styles['slider_item-bottom_price_real']}>{Math.round(dataProd.price - (dataProd.price * dataProd.sale / 100 ))}$</span>
                                            <span className={styles['slider_item-bottom_price_del']}>{dataProd.price}$</span>
                                        </> : <span className={styles['slider_item-bottom_price_real']}>{dataProd.price}$</span>}
                                    </div>
                                    <div className="product-details-wrap_stars">
                                        {Array(5).fill('').map((_, index) => {
                                            if (star > index) {
                                                return (<span className="lnr lnr-star" key={index} onClick={() => appreciate(index + 1)}></span>)
                                            } else {
                                                return (<span className="lnr lnr-star half" key={index} onClick={() => appreciate(index + 1)}></span>)
                                            }
                                        })}
                                    </div>
                                    <UI_ELEMENTS.Button
                                        icon={loadingCategory ? {dir: 'right', element: 'loading'} : {}}
                                        type="submit"
                                        disabled={!addToCart}
                                        text={addToCart ? "Add to cart" : 'Already in your cart'}
                                        width={addToCart ? 170 : 200}
                                        onClick={() => addToCartProd()}
                                        margin={['20px', '0', '0', '0']}
                                        attr={[
                                            {id: 'addBtn'}
                                        ]}
                                        size="sm"/>
                                </div>
                            </Col>
                            <Col sm="12">
                                <div className="product-description">
                                    <h4>Description</h4>
                                    <p>{dataProd.description || 'No description'}</p>
                                </div>
                            </Col>
                        </>}
                </Row>
            </Container>
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
)(ProductPage);
