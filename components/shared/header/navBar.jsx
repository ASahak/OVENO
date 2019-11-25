import React from 'react'
import {Container, Row, Col} from 'reactstrap'
// import './navBar.scss'
import { NavLink, withRouter } from 'react-router-dom'
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
                {text: 'Aboutt Us', link: {pathname: '/about', state: {id: 4, title: 'Aboutt Us'}}},
                {text: 'Our Partners', link: {pathname: '/partners', state: {id: 5, title: 'Our Partners'}}},
                {text: 'Our Branches', link: {pathname: '/branches', state: {id: 6, title: 'Our Branches'}}}
            ],
            _bindWavePosition: undefined
        }
        props.history.listen((location) => {
            document.title = (location.state && location.state.title) || 'Not Found'
            this.setState({
                activeRouteIndex: location.state && location.state.id || 1
            }, () => {
                this._getPositionOfWave()
            })
        })
    }
    __goToRoute () {}

    componentDidMount() {
        document.title = this.props.history.location.state ? this.props.history.location.state.title : ''
        this.setState({
            activeRouteIndex: this.props.history.location.state ? this.props.history.location.state.id : 1
        }, () => {
            this._getPositionOfWave()
        })
    }
    _getPositionOfWave() {
        this.setState({
            _bindWavePosition: {
                top: 0,
                width: this._navBarRef.current.querySelectorAll('a')[this.state.activeRouteIndex - 1].getBoundingClientRect().width + 'px',
                left: this._navBarRef.current.querySelectorAll('a')[this.state.activeRouteIndex - 1].offsetLeft + 'px'
            }
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
    }
    render() {
        const item = this.state.items.map(_ => <NavLink activeClassName="activeRoute" key={_.link.state.id} to={_.link} >{_.text}</NavLink>)
        return <div className="nav-bar-ln">
            <Container>
                <Row>
                    <Col xs="9">
                        <nav ref={this._navBarRef} onMouseMove={this.__goToRoute.bind(this, this.activeRouteIndex)}>
                            <span className="wave_active" style={this.state._bindWavePosition}></span>
                            {item}
                        </nav>
                    </Col>
                    <Col xs="3">
                        <div className="call-us-wrap">
                            <a href="#" onClick={e => e.preventDefault()}> Call Us +374 990 0909000</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    }
}
export default withRouter(NavBar)