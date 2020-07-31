import React from 'react';
import Slider from "react-slick";
import classes from './hot-seller.scss';
import Badge from './elements/Badge';
const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <span className="lnr lnr-chevron-right" onClick={onClick}></span>
    );
}

const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <span className="lnr lnr-chevron-left" onClick={onClick}></span>
    );
};

class  HotSellers extends React.Component {
    constructor (props) {
        super(props);
        this._hotSeller = [
            {
                photo: require('../../../assets/images/hotseller/seller1.jpg'),
                name: 'Seller 1',
                _id: '1',
                price: 1230,
                sale: 10,
                rating: [3, 2, 3, 2]
            }, {
                urlIMG: require('../../../assets/images/hotseller/seller2.jpg'),
                name: 'Seller 2',
                _id: '2',
                price: 130,
                sale: 40,
                rating: [5, 2, 3, 2]
            }, {
                photo: require('../../../assets/images/hotseller/seller3.jpg'),
                name: 'Seller 3',
                _id: '3',
                price: 3230,
                sale: 10,
                rating: [4, 2, 3, 2]
            }, {
                photo: require('../../../assets/images/hotseller/seller4.jpg'),
                name: 'Seller 4',
                _id: '4',
                price: 330,
                sale: 0,
                rating: [1, 2, 3, 2]
            }, {
                photo: require('../../../assets/images/hotseller/seller5.jpg'),
                name: 'Seller 5',
                _id: '5',
                price: 2230,
                sale: 4,
                rating: [3, 2, 3, 2]
            }, {
                photo: require('../../../assets/images/hotseller/seller6.jpg'),
                name: 'Seller 6',
                _id: '6',
                price: 1390,
                sale: 0,
                rating: [5, 2, 3, 2]
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
                    {this._hotSeller.map(slide => <Badge mainData={slide} key={slide._id} />)}
                </Slider>
            </div>
        )
    }
}

export default HotSellers;
