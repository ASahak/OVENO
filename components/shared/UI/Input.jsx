import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
    const parentRef = React.createRef();

    const styleDiv = {
        ...(props.label && {
            display: props.fullWidth ? 'flex' : 'inline-flex',
            flexDirection: 'column'
        }),
        ...(!props.label && {
            display: props.fullWidth ? 'block' : 'inline-block'
        })
    };


    useEffect(() => {
        if (parentRef.current && !!props.value) {
            parentRef.current.querySelector('input').value = props.value
        }
    }, [props.value]);

    useEffect(() => {
        if (parentRef.current) {
            if (props.attr.length) {
                props.attr.map(attr => {
                    parentRef.current.querySelector('input').setAttribute(attr.name, attr.value)
                })
            }
        }
    }, [props.attr]);

    useEffect(() => {
        if (parentRef.current) {
            if (props.attr.length) {
                props.attr.map(attr => {
                    parentRef.current.querySelector('input').setAttribute(attr.name, attr.value)
                })
            }
            for (let event = 0; event< props.events.length; event++) {
                parentRef.current.querySelector('input').addEventListener(
                    props.events[event],
                    props['on' + props.events[event].replace(props.events[event].charAt(0), props.events[event].charAt(0).toUpperCase())]);
            }
        }
        return () => {
            if (parentRef.current) {
                for (let event = 0; event< props.events.length; event++) {
                    parentRef.current.querySelector('input').removeEventListener(
                        props.events[event],
                        props['on' + props.events[event].replace(props.events[event].charAt(0), props.events[event].charAt(0).toUpperCase())]);
                }
            }
        }
    }, []);
    return (
        <div style={styleDiv} className={`input-wrap ${props.errors ? 'error-field' : ''}`} ref={parentRef}>
            {props.label ? <label>{props.label}</label> : null}
            <input
                name={props.name}
                className={'input-' + props.size}
                ref={props.refBind}
                type={props.type}
                id={props.id}
                disabled={props.disabled}
                placeholder={props.placeholder || ''} />
            {props.errors && <span className="error-line">{props.errors}</span>}
            <style jsx>{`
                .input-wrap label {
                    font-weight: 600;
                    margin-bottom: 5px;
                    color: #37415c;
                }
                .input-wrap {
                    position: relative;
                }
                .input-wrap input {
                    width: 100%;
                    background: #E5E6E8;
                    margin-bottom: 20px;
                    transition: all 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    position: relative;
                    z-index: 2;
                }
                .input-wrap input:disabled {
                    background-color: #e7e7e7;
                }
                .input-wrap .error-line {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    display: inline-block;
                    margin-bottom: 10px;
                    transition: all 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    font-size: 14px;
                    color: red;
                }
                .input-wrap input[type=color]{
                    height: 46px;
                    padding: 6px 15px 6px 85%!important;
                }
                .input-wrap input.input-md{
                    padding: 15px;
                    border: none;
                }
                .input-wrap input.input-sm{
                    padding: 10px;
                    border: none;
                }
                .error-field input {
                }
                .error-field input {
                    margin-bottom: 30px;
                }
            `}</style>
        </div>
    )
};

Input.defaultProps = {
    size: 'md',
    type: 'text',
    fullWidth: false,
    events: [],
    attr: [],
};
Input.propTypes = {
  fullWidth: PropTypes.bool,
  size: PropTypes.string,
  id: PropTypes.string,
  refBind: PropTypes.any,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  errors: PropTypes.string,
  disabled: PropTypes.bool,
  events: PropTypes.array,
  attr: PropTypes.array,
  value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
  ]),
  placeholder: PropTypes.string,
};
export default Input;
