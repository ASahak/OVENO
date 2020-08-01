import React, {useState, useEffect} from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Col, Container, Row} from "reactstrap";
const {
    getToken
} = require('utils/auth');
import ImageProd from "components/Shop/elements/imageProduct";
import {toast} from "react-toastify";
import {__SET_LOGGED} from "store/saga";

const EveryRow = (props) => {
    const [countProd, setCountProd] = useState(props.data.count);
    const countIncDec = async (type) => {
        if (type === 'dec' && countProd === 1) return;
        let count = type === 'inc' ? countProd + 1 : countProd - 1;
        try {
            const {data} = await axios.put('/api/cart/updateCount', {
                userId: props.userId,
                id: props.data._id,
                count,
            }, {
                headers: { Authorization: getToken('token')}
            });
            if(data.error) throw Error(data.error);
            setCountProd(count);

            props.incrementDecrement(props.data._id, count);
        } catch (err) {
            toast.error(err.response ? err.response.data : err.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false,
            });
        }
    };

    const deleteProduct = async () => {
        try {
            const {data} = await axios.delete('/api/cart/deleteProduct', {
                headers: { Authorization: getToken('token')},
                data: {
                    userId: props.userId,
                    id: props.data._id,
                }
            });
            if(data.error) throw Error(data.error);
            props.removeField(props.data._id);
            toast.dark('Product was removed successfully!', {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false,
            });
        } catch (err) {
            toast.error(err.response ? err.response.data : err.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false,
            });
        }
    };

    return (
        <div className={`single-row_cart ${props.data.removed ? 'cart-removed-wrap' : ''}`} >
            {!props.data.removed ? <>
                <div className="single-row_cart__photo">
                    <ImageProd src={props.data.photo}/>
                </div>
                <div className="single-row_cart__name">
                    <span>{props.data.name}</span>
                </div>
                <div className="single-row_cart__price">
                    <span>{(props.data.sale  > 0 ? Math.round(props.data.price - (props.data.price * props.data.sale / 100 )) : props.data.price ) * countProd}</span>
                </div>
                <div className="single-row_cart__count">
                    <div>
                        <span>{countProd}</span>
                        <p>
                            <span className="lnr lnr-chevron-up" onClick={() => countIncDec('inc')}></span>
                            <span className="lnr lnr-chevron-down" onClick={() => countIncDec('dec')}></span>
                        </p>
                    </div>
                    <span className="lnr lnr-trash" onClick={() => deleteProduct()}></span>
                </div>
            </> : <div className="single-row_cart__removed">This Product was removed <span className="lnr lnr-trash" onClick={() => deleteProduct()}></span></div>}
        </div>
    )
};
EveryRow.propTypes = {
    data: PropTypes.object,
    userId: PropTypes.string,
    removeField: PropTypes.func,
    incrementDecrement: PropTypes.func,
};

const Cart = (props) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        (async () => {
            if (props.isUser) {
                const {data} = await axios.get('/api/cart/getCart', {
                    headers: { Authorization: getToken('token')},
                    params: {
                        ids: [...props.isUser.cart.map(id => id._id)],
                    }
                });
                if (data.error) {
                    console.error(data.error);
                } else {
                    const newProds = [];
                    props.isUser.cart.map(el => {
                        const find = data.products.find(e => e._id === el._id);
                        if (find) {
                            newProds.push({...find, count: el.count});
                        } else newProds.push({_id: el._id, removed: true});
                    });
                    setProducts(newProds);
                }
            }
        })()
    }, [props.isUser]);

    const incrementDecrement = (id, count) => {
        const storeProds = [...props.isUser.cart];
        const storeIndex = storeProds.findIndex(el => el._id === id);
        if (storeIndex > -1) {
            storeProds[storeIndex].count = count;
        }
        props.isUser.cart = storeProds;
        __SET_LOGGED({user: props.isUser}).next();

    };
    const removeField = (id) => {
        const prods = [...products];
        const matchedProd = prods.findIndex(el => el._id === id);
        if (matchedProd > -1) {
            prods.splice(matchedProd, 1);
        }
        setProducts(prods);

        // Update Cart Modal on header
        const storeProds = [...props.isUser.cart];
        const storeIndex = storeProds.findIndex(el => el._id === id);
        if (storeIndex > -1) {
            storeProds.splice(storeIndex, 1);
        }
        props.isUser.cart = storeProds;
        __SET_LOGGED({user: props.isUser}).next();
    };

    return (
        <Container>
            <Row>
                <Col sm="12">
                    <div className="cart-main-wrap">
                        <div className="cart-header">
                            <span>Photo</span>
                            <span>Name</span>
                            <span>Price</span>
                            <span>Count</span>
                        </div>
                        <div className="cart-body">
                            {products.map(el => <EveryRow
                                key={el._id}
                                userId={props.isUser ? props.isUser._id : ''}
                                data={el}
                                removeField={(id) => removeField(id)}
                                incrementDecrement={(id, count) => incrementDecrement(id, count)}
                            />)}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

Cart.getInitialProps = async (ctx) => {
    const { req, res } = ctx;
    const token = req.headers.cookie;
    if (!token) res.redirect('/login');
    return {status: true}
};
const mapStateToProps = state => ({
    isUser: state.auth.user
});
const mapDispatchToProps = {
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
