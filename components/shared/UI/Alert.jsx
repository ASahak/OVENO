import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import Icon from 'components/Icons/icon';
import PropTypes from 'prop-types';

function Alert (props) {
    const alertRef = useRef();
    const [alertShow, setAlertShow] = useState(false);
    const domElement = document.getElementById('portal');

    const showTimeout = setTimeout(() => {
        setAlertShow(false);
        if (alertRef.current && domElement.contains(alertRef.current)) {
            alertRef.current.remove();
        }
    }, props.timeout);

    useEffect(() => {
        setTimeout(() => {
            !alertShow && setAlertShow(true);
        }, 0);
        return () => {
            clearTimeout(showTimeout);
        }
    });

    return ReactDOM.createPortal(
        <div ref={alertRef} className={`${props.type}-container main-alert-container ${alertShow ? 'active-alert' : ''}`}>
            <Icon name={props.type}/>
            <p>{props.message}</p>
            <style global jsx>{`
                .main-alert-container svg {
                    min-width: 20px;
                    height: 20px;
                }
                .main-alert-container p {
                    margin: 0;
                    margin-left: 15px;
                }
                .main-alert-container {
                    display: flex;
                    border: 1px solid #403f3f54;
                    padding: 15px;
                    background-color: #0000007a;
                    backdrop-filter: blur(7px);
                    margin-top: 15px;
                    border-top-left-radius: 8px;
                    border-bottom-left-radius: 8px;
                    position: relative;
                    right: -100%;
                    transition: all 400ms cubic-bezier(0.175, 0.885, 0.32, 1);
                    color: #fff;        
                }
                .active-alert {
                    right: 0%;
                }
            `}</style>
        </div>,
        domElement
    )
}
Alert.defaultProps = {
  timeout: 4000,
};
Alert.propTypes = {
  type: PropTypes.string,
  timeout: PropTypes.number,
  icon: PropTypes.object,
  message: PropTypes.string
};
export default React.memo(Alert);