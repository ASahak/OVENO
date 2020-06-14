import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
    constructor (props) {
        super(props);
        this.selectChange = this.selectChange.bind(this);
    }

    selectChange (event) {
        this.props.selectEncrypt(event.target.value)
    }

    render () {
        const option = this.props.dataOptions.map(option => (<option key={option.value} value={option.value}>{option.name}</option>));
        return (
            <>
                <select defaultValue={'rsa'} required style={this.props.style} onChange={this.selectChange}>
                    {option}
                </select>
                <style jsx>{`
                    select {
                        cursor: pointer;
                        outline: none;
                    }
                    option[value="default"][disabled] {
                      display: none;
                    }
                    option {
                      color: black;
                    }
                `}</style>
            </>
        )
    }
}

Select.defaultProps = {
    dataOptions: []
};

Select.propTypes = {
    styleSelect: PropTypes.object,
    placeholder: PropTypes.string,
    dataOptions: PropTypes.array
};

export default Select;