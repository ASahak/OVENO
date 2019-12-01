import TopPanel from './top-panel'
import MiddleWrap from './middleWrap'
import NavBar from './navBar'
import React from 'react'

export default class IndexHeader extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="header_ovo">
                <TopPanel />
                <MiddleWrap />
                <NavBar />
            </div>
        )
    }
}