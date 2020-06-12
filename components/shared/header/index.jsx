import TopPanel from './elements/top-panel'
import MiddleWrap from './elements/middleWrap'
import NavBar from './elements/navBar'
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
