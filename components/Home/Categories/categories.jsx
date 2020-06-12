import React, {Fragment, useState} from 'react'
import classes from './categories.scss'
import Link from 'next/link'
export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.categoryRef = React.createRef();
        this._categoriesList = {
            women: {
                isOpen: false,
                text: 'Women',
                link: {pathname: '/products', state: {id: 2, title: 'Products'}},
                data: {
                    dresses: {
                        text: 'Dresses',
                        link: {pathname: '/products', state: {id: 2, title: 'Products'}}
                    }, shoes: {
                        text: 'Shoes',
                        link: {pathname: '/products', state: {id: 2, title: 'Products'}}
                    }, handbags: {
                        text: 'HandBags',
                        link: {pathname: '/products', state: {id: 2, title: 'Products'}}
                    }, clothing: {
                        text: 'Clothing',
                        link: {pathname: '/products', state: {id: 2, title: 'Products'}}
                    }
                }
            }, men: {
                isOpen: false,
                text: 'Men',
                link: {pathname: '/products', state: {id: 2, title: 'Products'}},
                data: {
                    bags: {
                        text: 'Bags',
                        link: {pathname: '/products', state: {id: 2, title: 'Products'}}
                    }, shoes: {
                        text: 'Shoes',
                        link: {pathname: '/products', state: {id: 2, title: 'Products'}}
                    }, clothing: {
                        text: 'Clothing',
                        link: {pathname: '/products', state: {id: 2, title: 'Products'}}
                    }
                }
            }, jewellery: {
                isOpen: false,
                text: 'Jewellery',
                link: {pathname: '/products', state: {id: 2, title: 'Products'}},
                data: {
                    rings: {
                        text: 'Rings',
                        link: {pathname: '/products', state: {id: 2, title: 'Products'}}
                    }, necklace: {
                        text: 'Necklace',
                        link: {pathname: '/products', state: {id: 2, title: 'Products'}}
                    }
                }
            }, computer: {
                isOpen: false,
                text: 'Computer',
                link: {pathname: '/products', state: {id: 2, title: 'Products'}},
                data: {
                    iPod: {
                        text: 'iPod',
                        link: {pathname: '/products', state: {id: 2, title: 'Products'}}
                    }, iPad: {
                        text: 'iPad',
                        link: {pathname: '/products', state: {id: 2, title: 'Products'}}
                    }, notebook: {
                        text: 'Notebook',
                        link: {pathname: '/products', state: {id: 2, title: 'Products'}}
                    }, computer: {
                        text: 'Computer',
                        link: {pathname: '/products', state: {id: 2, title: 'Products'}}
                    }
                }
            }, camera: {
                isOpen: false,
                text: 'Camera',
                link: {pathname: '/products', state: {id: 2, title: 'Products'}},
                data: {
                    securityCamera: {
                        text: 'Security Camera',
                        link: {pathname: '/products', state: {id: 2, title: 'Products'}}
                    }, videoCamera: {
                        text: 'Video Camera',
                        link: {pathname: '/products', state: {id: 2, title: 'Products'}}
                    }, digitalCamera: {
                        text: 'Digital Camera',
                        link: {pathname: '/products', state: {id: 2, title: 'Products'}}
                    }
                }
            }, smartPhone: {
                isOpen: false,
                text: 'SmartPhone',
                link: {pathname: '/products', state: {id: 2, title: 'Products'}}
            }
        }
    }
    render () {
        return <div className={classes["categories-container"]}>
            <div className={classes["categories-container-header"]}>
                <h4>Categories</h4>
            </div>
            <div className={classes["categories-container-body"]}>
                <ul type="none" ref={this.categoryRef}>
                    <Li data={this._categoriesList} parent={this.categoryRef}/>
                </ul>
            </div>
        </div>
    }
}
const Li = function ({data, parent}) {
    let [open, setOpen] = useState(false)
    let [height, setHeight] = useState(0)
    const openSubMenu = (evt, index) => {
        setHeight(height = 0)
        evt.preventDefault()
        setOpen(open = parent.current.children[index] && parent.current.children[index].classList.contains('openItemDropdown'))
        parent.current.children[index].classList[!open ? 'add' : 'remove']('openItemDropdown')
        !open ?
            parent.current.children[index].querySelectorAll('.' + classes["submenu_dropdown"] + ' > li').forEach(_ => setHeight(height+=_.getBoundingClientRect().height))
            : setHeight(height = 0)
        parent.current.children[index].querySelector('.' + classes["submenu_dropdown"]).style.maxHeight = height + 'px'
    }
    if (data instanceof Object) {
        const _li = Object.keys(data).map((_el, index) => {
            const display = (data[_el].link.pathname
                    ? <Link href={data[_el].link.pathname}><a>{data[_el].text} {(data[_el].hasOwnProperty('data') && Object.keys(data[_el].data).length > 0) ?
                        <span className={classes["dropdown_arrow"]} onClick={e => openSubMenu(e, index)}></span> : ''}</a></Link>
                    : <span>{data[_el].text}</span>
            )
            let subMenu;
            if (data[_el].hasOwnProperty('data') && Object.keys(data[_el].data).length > 0) {
                subMenu = <Li data={data[_el].data}/>
            }
            return (
                <li key={ index }>
                    { display }
                    {subMenu ? <ul className={classes["submenu_dropdown"]}>{subMenu}</ul> : ''}
                </li>
            )
        })
        return (<Fragment>{_li}</Fragment>)
    }
}