import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import classes from './bestSellers.scss';
import axios from 'lib/axiosEnv';
import ImageProd from 'components/Shop/elements/imageProduct';

let _intervalIndex = 0;
let _boolDir = false;
const Seller = (props) => {
    let [count, setCount] = useState(_intervalIndex);
    useEffect(() => {
        if (props.playPause) {
            let id = setInterval(() => {
                if (!_boolDir) {
                    setCount(count += 1);
                    _intervalIndex = count;
                    if (count >= props.sellerCount - props.wrapCount) {
                        _boolDir = true
                    }
                } else {
                    setCount(count--);
                    _intervalIndex = count;
                    if (count <= 0) {
                        _boolDir = false
                    }
                }
                props.refParent.current.style.transform = 'translateY(' + -(count * props.allow / props.wrapCount) + 'px)'
            }, 3000);
            return () => clearInterval(id);
        }
    }, [props.playPause]);

    const _everySeller = props.products.map((item, index) => {
        return (
            <div className={classes['seller-item']} key={index} style={{ 'height': props.heightRef + 'px' }}>
                <ImageProd src={item.photo}/>
                <div className={classes['seller-item-info']}>
                    <a href={/product/ + item._id}>{item.name}</a>
                    {item.sale ? <del>{item.price.toFixed(2)} $</del> : ''}
                    {item.sale ? <span
                        className={classes['seller-item-info-sale-price']}>{(item.price - (Math.round((item.price * item.sale) / 100))).toFixed(2)} $</span> : ''}
                    {!item.sale ?
                        <span className={classes['seller-item-info-sale-price']}>{item.price.toFixed(2)} $</span> : ''}
                </div>
            </div>
        )
    });
    return _everySeller
};
Seller.propTypes = {
    products: PropTypes.array,
    actIndex: PropTypes.number,
    allow: PropTypes.number,
    sellerCount: PropTypes.number,
    wrapCount: PropTypes.number,
    heightRef: PropTypes.number,
    playPause: PropTypes.bool,
    refParent: PropTypes.any,
};

class BestSellers extends React.Component {
    constructor() {
        super();
        this.state = {
            playClass: true,
            activeIndex: 0,
            height: 0,
            sellerLength: 0,
            badgeHeight: 111,
            wrapCountSeller: 3,
            sellers: [],
        };
        this.bestSellerRef = React.createRef();
    }

    componentDidMount = async () => {
        //Get Best Sellers
        const { data } = await axios.get('/api/products/getBestSellers', {
            params: {
                count: 5
            }
        });
        if (data.error) console.error(data.error);
        else {
            this.setState({
                sellers: data.sellers
            })
        }

        if (this.bestSellerRef.current) {
            let _height = 0;
            new Array(this.state.sellers.length).fill('').forEach((_, index) => {
                if (index <= this.state.sellers.length - this.state.wrapCountSeller) {
                    _height += this.state.badgeHeight
                }
            });
            this.setState({
                height: _height,
                sellerLength: this.state.sellers.length
            })
        }
    };

    render() {
        return (
            <div className={classes['best-sellers-wrapper']}>
                <div className={classes['best-sellers-wrapper-head']}>
                    <h4>BestSeller</h4>
                    <p>
                        <span className={`lnr-play-pause ${this.state.playClass ? 'paused' : ''}`}
                              onClick={() => this.setState({ playClass: !this.state.playClass, direction: '' })}></span>
                    </p>
                </div>
                <div className={classes['best-sellers-wrapper-content']} style={{ height: this.state.height + 'px' }}>
                    <div ref={this.bestSellerRef} className={classes['parent-scrolling']}>
                        {this.state.height > 0 && <Seller
                            sellerCount={this.state.sellerLength}
                            wrapCount={this.state.wrapCountSeller}
                            products={this.state.sellers}
                            refParent={this.bestSellerRef}
                            actIndex={this.state.activeIndex}
                            direction={this.state.direction}
                            allow={this.state.height}
                            heightRef={this.state.badgeHeight}
                            playPause={this.state.playClass}/>}
                    </div>
                </div>
            </div>
        )
    }
}

export default BestSellers;
