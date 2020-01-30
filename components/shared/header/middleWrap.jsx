import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import classesMiddleWrap from './middleWrap.scss';
import Link from 'next/link';
import {ModalToggle} from "../../../assets/helpers/js/common";
export default class MiddleWrap extends React.Component {
    constructor (props) {
        super(props);
        this.cartRef = React.createRef();
        this._modal = new ModalToggle();
        this.state = {
            dataCart: [
                {name: 'Shose 1', price: 400, count: 1, imgPath: require('../../../assets/images/phones/phone1.1.png')},
                {name: 'Shose 2', price: 167, count: 3, imgPath: require('../../../assets/images/phones/phone2.1.jpg')},
            ]
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
                            <Link href="/about">
                                <a className="d-inline-flex align-items-center justify-content-md-start justify-content-center">
                                    <img className="mr-2" src={require('../../../assets/images/logo.png')} alt="" />
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
                        <Col cols="5" sm="5" md="3" className={classesMiddleWrap.cart_item_parent}>
                            <a className={classesMiddleWrap.cart_wrap} onClick={this.__showLangModal.bind(this, this.cartRef, 'noClose')}>
                                <span className={`${classesMiddleWrap.lnr} lnr lnr-cart`}></span>
                                My cart: {this.state.dataCart.length} item
                                <i className={`${classesMiddleWrap.fas} fas fa-angle-down`}></i>
                            </a>
                            <ShopCart hideModal={this.__hideModal.bind(this)} ref={this.cartRef} data={this.state.dataCart} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
const ShopCart = React.forwardRef(({data, noHide, hideModal}, ref) => {
    let _cart = data.map((item) => <li key={item.count} className={classesMiddleWrap['main-cart-modal-item']}>
        <span>
            <img src={item.imgPath} alt="no image"/>
            <b>{item.name}</b>
        </span>
        <div>
            <span>
                x <br />
                {item.count}
            </span>
            <span className="lnr lnr-trash"></span>
        </div>
    </li>)
    return <div className={classesMiddleWrap['main-cart-modal']} ref={ref}>
        <ul>
            {_cart}
        </ul>
        <Link href="/cart"><a className={classesMiddleWrap['view-all-cart-btn']} onClick={hideModal}>View All</a></Link>
    </div>
})