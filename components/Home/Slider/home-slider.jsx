import React from 'react'
import classes from './home-slider.scss'

export default class HomeSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 0,
            activeIndex: 0,
            dotsCount: null,
            styleWrapper: {}
        };
        this.images = ['slider1', 'slider2', 'slider3'];
        this._slide = this._slide.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.getSliderPosition = this.getSliderPosition.bind(this);
        this.slider = React.createRef();
        this.svg = React.createRef();
        this.autoPlayInterval = null;
        this.progressSpinner = null;
        this.touchX = 0;
    }

    UNSAFE_componentWillMount() {
        if (this.props.dots) {
            this.setState({
                dotsCount: this.images.length
            })
        }
        this.setState({
            styleWrapper: { 'transform': 'translate3d(0px, 0px, 0px)' }
        })
    }

    handleVisibilityChange(hidden) {
        if (document[hidden]) {
            clearInterval(this.progressSpinner);
            clearInterval(this.autoPlayInterval);
        } else {
            clearInterval(this.progressSpinner);
            clearInterval(this.autoPlayInterval);
            this.IntervalProgress();
            this.AutoPlayWithTimer(this.state.timer);
        }
    }

    componentDidMount() {
        let hidden, visibilityChange;
        if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
            hidden = 'hidden';
            visibilityChange = 'visibilitychange';
        } else if (typeof document.msHidden !== 'undefined') {
            hidden = 'msHidden';
            visibilityChange = 'msvisibilitychange';
        } else if (typeof document.webkitHidden !== 'undefined') {
            hidden = 'webkitHidden';
            visibilityChange = 'webkitvisibilitychange';
        }

        if (typeof document.addEventListener === 'undefined' || hidden === undefined) {
            console.log('This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.');
        } else {
            // Handle page visibility change
            document.addEventListener(visibilityChange, this.handleVisibilityChange.bind(this, hidden), false);
        }

        // AutoPlay
        if (this.props.autoplay) {
            let timer = this.props.timer || 3000;
            this.setState({
                timer: timer
            }, () => {
                this.IntervalProgress();
                this.AutoPlayWithTimer(timer);
            })
        }
    }

    componentWillUnmount() {
        clearInterval(this.autoPlayInterval);
        clearInterval(this.progressSpinner);
    }

    touchStart(event) {
        this.touchX = event.touches[0].pageX;
    }

    touchMove(event) {
        clearInterval(this.progressSpinner);
        clearInterval(this.autoPlayInterval);
        this.getSliderPosition('touchMove', event.touches[0].pageX)
    }

    touchEnd(event) {
        clearInterval(this.progressSpinner);
        clearInterval(this.autoPlayInterval);
        this.getSliderPosition('touchEnd', event.changedTouches[0].pageX)
    }

    IntervalProgress() {
        let percentage = 0;
        clearInterval(this.progressSpinner);
        this.progressSpinner = setInterval(() => {
            if (this.svg.current && percentage < 100) {
                percentage += 1;
                this.svg.current.style.background = 'conic-gradient(#f01b48 ' + percentage + '%, 0, #f4f4f4 66%)';
            }
        }, this.state.timer / 100)
    }

    AutoPlayWithTimer(timer) {
        this.autoPlayInterval = setInterval(() => {
            this.IntervalProgress();
            let _activeIndex = this.state.activeIndex;
            if (_activeIndex === this.state.dotsCount - 1) _activeIndex = 0;
            else _activeIndex++;
            this.setState({
                activeIndex: _activeIndex
            }, () => {
                this.getSliderPosition()
            });
        }, timer);
    }

    Slide(name, index) {
        return (
            <div key={index} className={classes['main-slider__slide']}>
                <img src={require('../../../assets/images/global/' + name + '.jpg')} alt=""/>
            </div>
        )
    }

    _slide(index) {
        if (index !== this.state.activeIndex) {
            clearInterval(this.progressSpinner);
            this.IntervalProgress();
            clearInterval(this.autoPlayInterval);
            this.setState({
                activeIndex: index
            }, () => {
                this.getSliderPosition();
                this.IntervalProgress();
                this.props.autoplay && this.AutoPlayWithTimer(this.state.timer);
            })
        }
    }

    getSliderPosition(type, touchX) {
        let widthSlider = this.slider.current && this.slider.current.getBoundingClientRect().width || 0;
        if (type === 'touchMove') {
            this.setState({
                styleWrapper: {
                    'transition': '0s',
                    'transform': 'translate3d(' + -(this.touchX - touchX + (widthSlider * this.state.activeIndex)) + 'px, 0px, 0px)'
                }
            })
        } else if (type === 'touchEnd') {
            if (this.touchX > touchX) {
                let ind = this.state.activeIndex;
                if (ind === this.state.dotsCount - 1) ind = this.state.dotsCount - 1;
                else ind++;
                this.setState({
                    activeIndex: ind
                }, () => {
                    this.getSliderPosition();
                    this.IntervalProgress();
                    this.AutoPlayWithTimer(this.state.timer);
                });
            } else {
                let ind = this.state.activeIndex;
                if (ind === 0) ind = 0;
                else ind--;
                this.setState({
                    activeIndex: ind
                }, () => {
                    this.getSliderPosition();
                    this.IntervalProgress();
                    this.AutoPlayWithTimer(this.state.timer);
                });
            }
        } else {
            this.setState({
                styleWrapper: { 'transform': 'translate3d(' + -(widthSlider * this.state.activeIndex) + 'px, 0px, 0px)' }
            })
        }
    }

    render() {
        const Dots = () => {
            const dots = Array(this.state.dotsCount).fill('').map((_, index) => {
                return (
                    <span onClick={() => this._slide(index)}
                          className={`${index === this.state.activeIndex ? 'active-bullet' : ''} bullet`}
                          key={index}></span>
                )
            });
            return (
                <div className="slider-dots">
                    {dots}
                </div>
            )
        };
        const Spinner = () => {
            return (
                <div className="spinner_wrapper">
                    <div className="circle" ref={this.svg}></div>
                </div>
            )
        };
        return (
            <div className={classes['main-slider']} ref={this.slider}>
                <div className={classes['main-slider__container']} onTouchStart={this.touchStart}
                     onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}>
                    {(this.props.autoplay) && <Spinner/>}
                    <div className={classes['main-slider__wrapper']} style={this.state.styleWrapper}>
                        {this.images.map(this.Slide)}
                    </div>
                </div>
                {(this.props.dots) && <Dots/>}
            </div>
        )
    }
}
