import React, {useEffect} from 'react';
import { createPortal } from 'react-dom';
import usePortal from 'hooks/use-portal';


let refModal = null;
export const Modal = ({show, beforeClose, close, children}) => {

    const target = usePortal('modal-root');

    const targetHandler = (e) => {
        if (!e.target.closest('.not-clickable-area')) {
            refModal?.classList.add('trigger-closing');
            setTimeout(() => {
                refModal?.classList.remove('trigger-closing');
            }, 70)
        }
    };

    useEffect(() => {
        setTimeout(() => {
            refModal?.classList.add('appear-modal');
        }, 0);
        show && globalThis.addEventListener('click', targetHandler);
        return () => {
            refModal?.classList.remove('appear-modal');
            globalThis.removeEventListener('click', targetHandler);
        }
    }, [show]);

    useEffect(() => {
        if (beforeClose) {
            refModal?.classList.remove('appear-modal');
            setTimeout(() => {
                close()
            }, 300)
        }
    }, [beforeClose]);

    return show && createPortal(
        (<div ref={(el) => refModal = el} className="modal-parent">
            <div className="not-clickable-area">
                {children}
            </div>
            <style jsx global>{`
                .modal-parent {
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    height: -webkit-fit-content;
                    height: -moz-fit-content;
                    height: fit-content;
                    left: 0;
                    right: 0;
                    width: 90vw;
                    max-width: 500px;
                    background: #fff;
                    display: block;
                }
                .not-clickable-area {
                    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                    transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                    padding: 10px 16px;
                    opacity: 0;
                    transform: scale(0.7);
                }
                .appear-modal:before {
                    opacity: 1 !important;
                    transform: scale(1) !important;
                }
                .appear-modal .not-clickable-area {
                    transform: scale(1);
                    opacity: 1;
                }
                .not-clickable-area > h2{
                    margin: 0;
                    position:relative;
                    padding: 0 0 10px;
                    font-size: 20px;
                }
                .not-clickable-area > h2:after{ 
                    background: #efefef;
                    content: '';
                    left: -16px;
                    top: -10px;
                    width: calc(100% + 32px);
                    height: calc(100% + 10px);
                    position: absolute;
                    z-index: -1;
                }
                .modal-parent:after {
                    content: "";
                    position: fixed;
                    left: 0;
                    top: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: -1;
                    backdrop-filter: blur(4px);
                }
                .modal-parent:before {
                    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                    transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                    content: "";
                    transform: scale(0.7);
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 100%;
                    box-shadow: 0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12);
                    z-index: 0;
                    opacity: 0;
                }
                .modal-parent > * {
                    z-index: 22;
                    position: relative;
                }
                .trigger-closing .not-clickable-area, .trigger-closing:before {
                    animation-duration: 0.15s;
                    -webkit-animation-name: animate-dialog;
                    animation-name: animate-dialog;
                    -webkit-animation-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
                    animation-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
                }   
                
                @keyframes animate-dialog {
                    0% {
                        transform: scale(1);
                    }
                    
                    50% {
                        transform: scale(1.03);
                    }
                    100% {
                        transform: scale(1);
                    }
                }             

            `}</style>
        </div>),
        target,
    )
};