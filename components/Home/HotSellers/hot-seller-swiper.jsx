import React from 'react';
import Slider from "react-slick";
import PropTypes from 'prop-types';
import classes from './hot-seller.scss';

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <span className="lnr lnr-chevron-right" onClick={onClick}></span>
    );
}

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <span className="lnr lnr-chevron-left" onClick={onClick}></span>
    );
};
const SimpleSlide = (props) => {
    return (
        <div className={classes['slider_item']}>
            <div className={classes['slider_item-top']}>
                <img src={props.mainData.urlIMG} />
                {props.mainData.sale !== 0 && <span className={classes['slider_item-sale_badge']}>Sale</span>}
                <div className={classes['slider_item-top_actions-links']}>
                    <span className="lnr lnr-cart"></span>
                    <span className="lnr lnr-eye"></span>
                </div>
                <h4>{props.mainData.name}</h4>
            </div>
            <div className={classes['slider_item-bottom']}>
                <div className={classes['slider_item-bottom_price']}>
                    <span className={classes['slider_item-bottom_price_real']}>{props.mainData.price}$</span>
                    {props.mainData.sale !== 0 && <span className={classes['slider_item-bottom_price_del']}>${ props.mainData.price - (props.mainData.price * props.mainData.sale / 100 )}</span>}
                </div>
                <div className={classes['slider_item-bottom_stars']}>
                    {Array(5).fill('').map((_, index) => {
                        if (props.mainData.star >= index) {
                            return (<span className="lnr lnr-star" key={index}></span>)
                        } else {
                            return (<span className="lnr lnr-star half" key={index}></span>)
                        }

                    })}
                </div>
            </div>
        </div>
    )
};

SimpleSlide.propTypes = {
    mainData: PropTypes.object
};

class  HotSellers extends React.Component {
    constructor (props) {
        super(props);
        this._hotSeller = [
            {
                urlIMG: require('../../../assets/images/hotseller/seller1.jpg'),
                name: 'Seller 1',
                urlId: '1',
                price: 1230,
                sale: 10,
                star: 3
            }, {
                urlIMG: require('../../../assets/images/hotseller/seller2.jpg'),
                name: 'Seller 2',
                urlId: '2',
                price: 130,
                sale: 40,
                star: 5
            }, {
                urlIMG: require('../../../assets/images/hotseller/seller3.jpg'),
                name: 'Seller 3',
                urlId: '3',
                price: 3230,
                sale: 10,
                star: 4
            }, {
                urlIMG: require('../../../assets/images/hotseller/seller4.jpg'),
                name: 'Seller 4',
                urlId: '4',
                price: 330,
                sale: 0,
                star: 1
            }, {
                urlIMG: require('../../../assets/images/hotseller/seller5.jpg'),
                name: 'Seller 5',
                urlId: '5',
                price: 2230,
                sale: 4,
                star: 3
            }, {
                urlIMG: require('../../../assets/images/hotseller/seller6.jpg'),
                name: 'Seller 6',
                urlId: '6',
                price: 1390,
                sale: 0,
                star: 5
            }
        ];
        this.params = {
            speed: 500,
            autoplay: false,
            autoplaySpeed: 4000,
            pauseOnHover: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3
                    }
                },{
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 2
                    }
                },{
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        }
    }
    render () {
        return (
            <div className={classes['slider-container']}>
                <div className={classes['slider-container_title']}>
                    <h2>Hot Sale</h2>
                </div>
                <Slider {...this.params} className={classes['slick-slider-main']}>
                    {this._hotSeller.map(slide => <SimpleSlide mainData={slide} key={slide.urlId} />)}
                </Slider>
            </div>
        )
    }
}
export default HotSellers;
