import styles from "./badge.scss";
import React from "react";
import PropTypes from "prop-types";
import Icon from "components/Icons/icon";
import Link from 'next/link';
import ImageProd from "components/Shop/elements/imageProduct";
import {connect} from "react-redux";

const Badge = (props) => {
    const star = Math.round(props.mainData.rating.reduce((acc, item) => {
        acc += item;
        return acc
    }, 0) / props.mainData.rating.length);

    return (
        <div className={styles['slider_item']}>
            <div className={styles['slider_item-top']}>
                <ImageProd src={props.mainData.photo}/>
                {props.mainData.sale !== 0 && <span className={styles['slider_item-sale_badge']}>Sale -{props.mainData.sale}%</span>}
                <div className={styles['slider_item-top_actions-links']}>
                    <span className="lnr lnr-cart"></span>
                    <Link href={"/product/" + props.mainData._id}><a><span className="lnr lnr-eye"></span></a></Link>
                </div>
                <h4>{props.mainData.name}</h4>
            </div>
            <div className={styles['slider_item-bottom']}>
                <div className={styles['slider_item-bottom_price']}>
                    {props.mainData.sale !== 0 ? <>
                        <span className={styles['slider_item-bottom_price_real']}>{Math.round(props.mainData.price - (props.mainData.price * props.mainData.sale / 100 ))}$</span>
                        <span className={styles['slider_item-bottom_price_del']}>{props.mainData.price}$</span>
                    </> : <span className={styles['slider_item-bottom_price_real']}>{props.mainData.price}$</span>}
                </div>
                <div className={styles['slider_item-bottom_stars']}>
                    {Array(5).fill('').map((_, index) => {
                        if (star >= index) {
                            return (<span className="lnr lnr-star" key={index}></span>)
                        } else {
                            return (<span className="lnr lnr-star half" key={index}></span>)
                        }

                    })}
                </div>
            </div>
            {props.isAdmin || (props.loggedUser && props.loggedUser._id && props.mainData.owner) ?
                <div className={styles['user-options']}>
                <span onClick={() => props.editProduct(props.mainData)}>
                    <Icon name="pencil"/>
                </span>
                    <span onClick={() => props.removeProduct(props.mainData._id)}>
                    <Icon name="delete"/>
                </span>
                </div>
            : ''}
        </div>
    )
};

Badge.propTypes = {
    mainData: PropTypes.object,
    editProduct: PropTypes.func,
    removeProduct: PropTypes.func,
    isAdmin: PropTypes.bool,
    isUser: PropTypes.bool,
};
const mapStateToProps = state => ({
    loggedUser: state.auth.user
});
const mapDispatchToProps = {
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Badge);
