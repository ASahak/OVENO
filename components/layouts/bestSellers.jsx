import React, {createRef, useState, useEffect} from 'react';
import classes from './bestSellers.scss';
import Link from 'next/link';
import PropTypes from 'prop-types'

let _intervalIndex = 0;
let _boolDir = false;
const Seller = (props) => {
    let [count, setCount] = useState(_intervalIndex);
    useEffect(() => {
        if(props.playPause) {
            let id = setInterval(() => {
                if (!_boolDir) {
                    setCount(count+=1);
                    _intervalIndex = count;
                    if (count >= props.sellerCount - props.wrapCount) {
                        _boolDir = true
                    }
                } else {
                    setCount(count--);
                    _intervalIndex = count
                    if (count <= 0) {
                        _boolDir = false
                    }
                }
                props.refParent.current.style.transform = 'translateY('+ -(count * props.allow / props.wrapCount) + 'px)'
            }, 3000);
            return () => clearInterval(id);
        }
    }, [props.playPause]);

    const _everySeller = props.products.map((item, index) => {
        return (
           <div className={classes['seller-item']} key={index} style={{'height': props.heightRef + 'px'}}>
               <img src={item.imgUrl} alt="seller"/>
               <div className={classes['seller-item-info']}>
                   <Link href="#">
                        <a>{item.name}</a>
                   </Link>
                   {item.sale && <del>{item.price.toFixed(2)} $</del>}
                   {item.sale && <span className={classes['seller-item-info-sale-price']}>{(item.price - (Math.round((item.price * item.sale) / 100))).toFixed(2)} $</span>}
                   {!item.sale && <span className={classes['seller-item-info-sale-price']}>{item.price.toFixed(2)} $</span>}
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
    constructor () {
        super();
        this.state = {
            playClass: true,
            activeIndex: 0,
            height: 0,
            sellerLength: 0,
            badgeHeight: 111,
            wrapCountSeller: 3
        };
        this.bestSellerRef = React.createRef();
        this._sellers = [
            {
                imgUrl: require('../../assets/images/bestseller/seller1.jpg'),
                name: 'Samsung GT 320',
                price: 140,
                sale: 5
            }, {
                imgUrl: require('../../assets/images/bestseller/seller2.jpg'),
                name: 'Toshiba 4500',
                price: 540,
                sale: 12
            }, {
                imgUrl: require('../../assets/images/bestseller/seller3.jpg'),
                name: 'iPhone XS max',
                price: 780
            }, {
                imgUrl: require('../../assets/images/bestseller/seller4.jpg'),
                name: 'Asus Vivobook',
                price: 1280
            }, {
                imgUrl: require('../../assets/images/bestseller/seller5.jpg'),
                name: 'Dell Max',
                price: 700,
                sale: 9
            }
        ];
    }
    componentDidMount() {
        if (this.bestSellerRef.current) {
            let _height = 0;
            new Array(this._sellers.length).fill('').forEach((_, index) => {
                if (index <= this._sellers.length - this.state.wrapCountSeller) {
                    _height+=this.state.badgeHeight
                }
            });
            this.setState({
                height:_height,
                sellerLength: this._sellers.length
            })
        }
    }

    render () {
        return (
            <div className={classes['best-sellers-wrapper']}>
               <div className={classes['best-sellers-wrapper-head']}>
                   <h4>BestSeller</h4>
                   <p>
                       <span className={`lnr-play-pause ${this.state.playClass ? 'paused' : ''}`} onClick={() => this.setState({playClass: !this.state.playClass, direction: ''})}></span>
                   </p>
               </div>
                <div className={classes['best-sellers-wrapper-content']} style={{height: this.state.height + 'px'}}>
                    <div ref={this.bestSellerRef} className={classes['parent-scrolling']}>
                        {this.state.height > 0 && <Seller
                            sellerCount={this.state.sellerLength}
                            wrapCount={this.state.wrapCountSeller}
                            products={this._sellers}
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
