import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icons/icon';

const Button = (props) => {
    const width = {
        background: props.background,
        border: props.border,
        color: props.color,
        fontSize: props.fontSize + 'px',
        margin: props.margin[0] + ' ' + props.margin[1] + ' ' + props.margin[2] + ' ' + props.margin[3],
        ...((!props.fullWidth && props.width) && {width: props.width + 'px'}),
        ...(props.fullWidth && {width: '100%', display: 'flex'})
    };
    return (
        <button className={`btn-global btn-${props.size} ${props.hover}`} style={width} onClick={props.onClick} disabled={props.disabled}>
            {props.icon.dir && props.icon.dir === 'left' ? <Icon name={props.icon.element} /> : null}
            {props.text}
            {props.icon.dir && props.icon.dir === 'right' ? <Icon name={props.icon.element} /> : null}
            <style global jsx>{`
                button.btn-global svg{ 
                    height: 30px;
                    fill: #fff;
                    margin:0 10px;
                }
                button.btn-global {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    outline: none;
                    text-transform: uppercase;
                    color: #ebe6e6;
                    border: none;
                    border-radius: 8px;
                    justify-content: center;
                    margin: auto;
                    padding: 0px 15px;
                    height: 30px;
                }
                button.btn-md {
                    padding: 0px 15px;
                    height: 40px;
                }
                button.btn-sm {
                    padding: 0px 10px;
                    height: 30px;
                }
                .hover-from-transparent:hover {
                    background-color: #37415c !important;
                    color: #fff !important; 
                }
                button:disabled {
                    pointer-events: none;
                    opacity: 0.6;
                }
            `}</style>
        </button>
    )
};
Button.defaultProps = {
    size: 'md',
    icon: {},
    type: 'button',
    fullWidth: false,
    background: '#37415c',
    fontSize: 13,
    border: '1px solid #37415c',
    margin: 'auto',
    disabled: false,
};
Button.propTypes = {
    disabled: PropTypes.bool,
    background: PropTypes.string,
    border: PropTypes.string,
    hover: PropTypes.string,
    fullWidth: PropTypes.bool,
    size: PropTypes.string,
    icon: PropTypes.object,
    type: PropTypes.string,
    width: PropTypes.number,
    fontSize: PropTypes.number,
    margin: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    text: PropTypes.string,
    onClick: PropTypes.func
};
export default Button;