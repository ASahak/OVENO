import React from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import classes from './hot-seller.scss';
import Badge from './elements/Badge';
import axios from 'lib/axiosEnv';

const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <span className="lnr lnr-chevron-right" onClick={onClick}></span>
    );
};

const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <span className="lnr lnr-chevron-left" onClick={onClick}></span>
    );
};

class HotSellers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotSeller: [],
        };
        this.params = {
            speed: 500,
            autoplay: false,
            autoplaySpeed: 4000,
            pauseOnHover: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow/>,
            prevArrow: <SamplePrevArrow/>,
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
                }, {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 2
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        };
        this.isAdmin = this.isAdmin.bind(this);
        this.isUser = this.isUser.bind(this);
    }

    componentDidMount = async () => {
        const { data } = await axios.get('/api/products/getRandom', {
            params: {
                count: 6
            }
        });
        if (data.error) console.error(data.error);
        else {
            this.setState({
                hotSeller: data.products
            })
        }
    };

    isAdmin() {
        return this.props.isUser && this.props.isUser.roleType === 'admin'
    };

    isUser() {
        return this.props.isUser && this.props.isUser.roleType === 'user'
    };

    render() {
        return (
            <div className={classes['slider-container']}>
                <div className={classes['slider-container_title']}>
                    <h2>Hot Sale</h2>
                </div>
                <Slider {...this.params} className={classes['slick-slider-main']}>
                    {this.state.hotSeller.map(slide => <Badge
                        isAdmin={this.isAdmin()}
                        isUser={this.isUser()}
                        noAccessAdmin={true}
                        mainData={slide}
                        key={slide._id}/>)}
                </Slider>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isUser: state.auth.user
});
const mapDispatchToProps = {};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HotSellers);
