import React, {createRef} from 'react'
import classes from './home-slider.scss'
export default class HomeSlider extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            timer: 0,
            activeIndex: 0,
            dotsCount: null
        };
        this.images = ['slider1', 'slider2', 'slider3'];
        this._slide = this._slide.bind(this);
        this.getSliderPosition = this.getSliderPosition.bind(this);
        this.styleWrapper = {};
        this.slider = React.createRef();
        this.autoPlayInterval = null;
    }
    UNSAFE_componentWillMount() {
        if (this.props.dots) {
            this.setState({
                dotsCount: this.images.length
            })
        }
        this.styleWrapper = {};
        Object.assign(this.styleWrapper, {
            'transform': 'translate3d(0px, 0px, 0px)'
        })

    }

    componentDidMount() {
        // AutoPlay
        if (this.props.autoplay) {
            let timer = this.props.timer || 3000;
            this.setState({
                timer: timer
            })
            this.AutoPlayWithTimer(timer);
        }
    }
    AutoPlayWithTimer (timer) {
        this.autoPlayInterval = setInterval(() => {
            let _activeIndex = this.state.activeIndex;
            if (_activeIndex === this.state.dotsCount - 1) _activeIndex = 0;
            else  _activeIndex++;
            this.setState({
                activeIndex: _activeIndex
            }, () => {
                this.getSliderPosition()
            });
        }, timer);
    }
    Slide (name, index) {
        return (
            <div key={index} className={classes['main-slider__slide']}>
                <img src={require('../assets/images/global/' + name + '.jpg')} alt=""/>
            </div>
        )
    }
    _slide (index) {
        clearInterval(this.autoPlayInterval);
        this.setState({
            activeIndex: index
        }, () => {
            this.props.autoplay && this.AutoPlayWithTimer(this.state.timer);
        })
    }
    getSliderPosition () {
        let widthSlider = this.slider.current && this.slider.current.getBoundingClientRect().width || 0;
        this.styleWrapper = {};
        Object.assign(this.styleWrapper, {
            'transform': 'translate3d(' + -(widthSlider * this.state.activeIndex) + 'px, 0px, 0px)'
        })
        return this.styleWrapper
    }
    render () {
        const Dots = () => {
            const dots = Array(this.state.dotsCount).fill('').map((_, index) => {
                return (
                    <span onClick={() => this._slide(index)} className={`${index === this.state.activeIndex ? 'active-bullet' : ''} bullet`} key={index}></span>
                )
            })
            return (
                <div className="slider-dots">
                    {dots}
                </div>
            )
        };

        return (
            <div className={classes['main-slider']} ref={this.slider}>
                <div className={classes['main-slider__container']}>
                    <div className={classes['main-slider__wrapper']} style={this.getSliderPosition()}>
                        {this.images.map(this.Slide)}
                    </div>
                </div>
                {(this.props.dots) && <Dots />}
            </div>
        )
    }
}