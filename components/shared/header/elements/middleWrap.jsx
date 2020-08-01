import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import classesMiddleWrap from './middleWrap.scss';
import Link from 'next/link';
import {ModalToggle} from "../../../../utils/common";
import {connect} from "react-redux";
import axios from "axios";
const {
    getToken
} = require('utils/auth');

class MiddleWrap extends React.Component {
    constructor (props) {
        super(props);
        this.cartRef = React.createRef();
        this._modal = new ModalToggle();
        this.state = {
            dataCart: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isUser !== this.props.isUser) {
            (async () => {
                const {data} = await axios.get('/api/cart/getCart', {
                    headers: { Authorization: getToken('token')},
                    params: {
                        ids: [...this.props.isUser.cart.map(id => id._id)],
                    }
                });
                if (data.error) {
                    console.error(data.error);
                    return;
                }
                this.setState({
                    dataCart: (() => {
                        const cart = [];
                        this.props.isUser.cart.forEach(item => {
                            const findMatched = data.products.find(el => el._id === item._id);
                            if (findMatched) {
                                cart.push({
                                    id: item._id,
                                    name: findMatched.name,
                                    count: item.count,
                                    imgPath: findMatched.photo,
                                })
                            } else { // Detect Already Removed Products
                                cart.push({
                                    removed: true,
                                })
                            }
                        });
                        return cart.slice(0, 2);
                    })()
                });
            })();
        }
    }

    __showLangModal (ref, hint) {
        return ref.current && this._modal.showModal(ref.current, false, hint)
    }
    __hideModal () {
        this._modal.customHideModal()
    }
    render() {
        return (
            <div className={classesMiddleWrap.middle_content_header}>
                <Container>
                    <Row className="align-items-center">
                        <Col sm="12" md="4" className={classesMiddleWrap.logo_content}>
                            <Link href="/">
                                <a className="d-inline-flex align-items-center justify-content-md-start justify-content-center">
                                    <img className="mr-2" src={require('../../../../assets/images/logo.png')} alt="" />
                                    VENO
                                </a>
                            </Link>
                        </Col>
                        <Col cols="7" sm="7" md="5" className={classesMiddleWrap.search_block}>
                            <form action="" id={classesMiddleWrap.main_search}>
                                <div className={classesMiddleWrap.search_wrap}>
                                    <input type="search" placeholder="Search entire store here..." />
                                    <button type="submit">
                                        <span className="lnr lnr-magnifier"></span>
                                    </button>
                                </div>
                            </form>
                        </Col>
                        {this.props.isUser ? <Col cols="5" sm="5" md="3" className={classesMiddleWrap.cart_item_parent}>
                            <a className={classesMiddleWrap.cart_wrap} onClick={this.__showLangModal.bind(this, this.cartRef, 'noClose')}>
                                <span className={`${classesMiddleWrap.lnr} lnr lnr-cart`}></span>
                                My cart: {this.props.isUser.cart.length} item
                                <i className={`${classesMiddleWrap.fas} fas fa-angle-down`}></i>
                            </a>
                            <ShopCart hideModal={this.__hideModal.bind(this)} ref={this.cartRef} data={this.state.dataCart} />
                        </Col> : ''}
                    </Row>
                </Container>
            </div>
        );
    }
}
const ShopCart = React.forwardRef(({data, noHide, hideModal}, ref) => {
    let _cart = data.map((item, index) => <li key={item.removed ? index : item.id} className={classesMiddleWrap['main-cart-modal-item']}>
        {item.removed ? <span>This Item removed</span> :
            <>
                <span>
                    <img src={item.imgPath} alt="no image"/>
                    <b>{item.name}</b>
                </span>
                <div>
                    <span>
                        x <br />
                        {item.count}
                    </span>
                </div>
            </>
        }
    </li>);
    return <div className={classesMiddleWrap['main-cart-modal']} ref={ref}>
        {data.length ?
            <>
                <ul>
                    {_cart}
                </ul>
                <a href="/cart" className={classesMiddleWrap['view-all-cart-btn']} onClick={hideModal}>View All</a>
            </>
            : 'You dont have any added product in your cart yet'}
    </div>
});

const mapStateToProps = state => ({
    isUser: state.auth.user
});
const mapDispatchToProps = {
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MiddleWrap);
