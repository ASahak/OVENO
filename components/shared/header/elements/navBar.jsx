import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import classes from './navBar.scss'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'

const NavBarWithRouter = (props) => {
    const router = useRouter()
    return <NavBar {...props} router={router} />
}

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this._navBarRef = React.createRef()
        this.state = {
            activeRouteIndex: 1,
            items: [
                {text: 'Home', link: {pathname: '/', state: {id: 1, title: 'Home'}}},
                {text: 'Sale Products', link: {pathname: '/products', state: {id: 2, title: 'Products'}}},
                {text: 'Contact Us', link: {pathname: '/contact', state: {id: 3, title: 'Contact Us'}}},
                {text: 'About Us', link: {pathname: '/about', state: {id: 4, title: 'About Us'}}},
                {text: 'Our Partners', link: {pathname: '/partners', state: {id: 5, title: 'Our Partners'}}},
                {text: 'Our Branches', link: {pathname: '/branches', state: {id: 6, title: 'Our Branches'}}}
            ],
            _bindWavePosition: undefined
        }
        this.__goToRoute = this.__goToRoute.bind(this)
        Router.events.on('routeChangeComplete', (url) => {
            this.setState({
                activeRouteIndex: this.props.router.query ? this.props.router.query.indexPage || this.__getDefaultIndexRouter(): 1
            }, () => {
                this._getPositionOfWave(this.state.activeRouteIndex)
            })
        });
    }
    __goToRoute (leave) {
        this._getPositionOfWave(leave === 'leave' ? this.state.activeRouteIndex : leave)
    }
    __getDefaultIndexRouter () {
        let index = null
        this.state.items.map((_, _ind) => {
            if (_.link.pathname === this.props.router.route) {
                index = _ind + 1
            }
        })
        return index
    }
    componentDidMount() {
        this.setState({
            activeRouteIndex: this.props.router.query ? this.props.router.query.indexPage || this.__getDefaultIndexRouter(): 1
        }, () => {
            this._getPositionOfWave(this.state.activeRouteIndex)
        })
    }
    _getPositionOfWave(index) {
        this.setState({
            _bindWavePosition: {
                top: 0,
                width: this._navBarRef.current.querySelectorAll('a')[index - 1].getBoundingClientRect().width + 'px',
                left: this._navBarRef.current.querySelectorAll('a')[index - 1].offsetLeft + 'px'
            }
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
    }
    render() {
        const item = this.state.items.map(_ => <Link
            href={{ pathname: _.link.pathname, query: { indexPage: _.link.state.id } }}
            as={_.link.pathname}
            key={_.link.state.id} ><a onMouseEnter={() => this.__goToRoute(_.link.state.id)} data-index={_.link.state.id}>{_.text}</a></Link>)
        return <div className={classes['nav-bar-ln']}>
            <Container>
                <Row>
                    <Col xs="9">
                        <nav ref={this._navBarRef} onMouseLeave={() => this.__goToRoute('leave')}>
                            <span className={classes['wave_active']} style={this.state._bindWavePosition}></span>
                            {item}
                        </nav>
                    </Col>
                    <Col xs="3">
                        <div className={classes['call-us-wrap']}>
                            <a href="#" onClick={e => e.preventDefault()}> Call Us +374 990 0909000</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    }
}
export default NavBarWithRouter