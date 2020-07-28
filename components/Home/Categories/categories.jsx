import React, {Fragment, useState, useEffect, useCallback} from 'react'
import classes from './categories.scss'
import {
    Modal,
    ModalHeader,
    ModalBody,
    Tooltip
} from 'reactstrap';
import Icon from 'components/Icons/icon';
import {
    ONLY_ENGLISH_LETTERS_WITH_DIGIT_PATTERN
} from "utils";
import UI_ELEMENTS from "components/shared/UI";
import {useForm} from "react-hook-form";
import PropTypes from 'prop-types'
import axios from "axios";
import {toast} from "react-toastify";
import {
    __SET_CATEGORY_LIST,
} from 'store/actions';
import {connect} from "react-redux";
import Router from "next/router";
const {
    getToken
} = require('utils/auth');
import { Bus } from 'lib/EventEmiiter';

const CRUDCategoryForm = (props) => {
    const {
        register,
        handleSubmit,
        errors,
        reset,
        setValue
    } = useForm({
        mode: 'onBlur',
    });

    const [loadingCategory, setLoadingCategory] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [typeCRUD, setTypeCRUD] = useState('');
    const [subCategoryContent, setSubCategoryContent] = useState([]);
    const [categoryContent, setCategoryContent] = useState('');
    const [deepCategoryContent, setDeepCategoryContent] = useState(null);

    const toastOpt = {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: false,
    };

    const toggle = () => setTooltipOpen(!tooltipOpen);

    // Generate new ParamName
    const generateName = (begin, state) => {
        if (state.some(s => s.name === 'subCategory' + begin)){
            return generateName(begin + 1, state);
        } else return 'subCategory' + begin
    };


    const addSubCategoryField = () => {
        setSubCategoryContent(prevState => [...prevState, {value: '', name: generateName(0, subCategoryContent)}])
    };

    const saveChanges = (data) => {
        const fakeCategories = [...subCategoryContent];
        const index = fakeCategories.findIndex(item => item.name === data.name);
        if (index > -1) {
            fakeCategories[index].value = data.value;
        }
    };

    const removeCategory = useCallback((name, state) => {
        if (name === 'name') {
            setCategoryContent('removed');
            setSubCategoryContent([]);
            return
        }
        const prevState = [...state];
        const indexRem = prevState.findIndex(obj => (obj.name === name));
        if (indexRem > -1) {
            prevState.splice(indexRem, 1);
        }
        setSubCategoryContent(prevState);
    }, [categoryContent, subCategoryContent]);

    useEffect(() => {
        if (Object.keys(props.editCategoryData).length) {
            // Saving Cloned Data before editing
            setDeepCategoryContent(JSON.parse(JSON.stringify(props.editCategoryData)));

            setValue('name', props.editCategoryData.text);
            setCategoryContent(props.editCategoryData.text);
            props.editCategoryData.dataSub.forEach(el => {
                setSubCategoryContent(prevState => [...prevState, {value: el.text, name: el.id}])
            });
        }
    }, [props.editCategoryData]);


    useEffect(() => {
        setTypeCRUD(props.crudType);
    }, [props.crudType]);

    useEffect(() => {
        subCategoryContent.forEach(e => {
            if (props.crudType === 'edit') {
                setValue(e.name, e.value);
            }
        })
    }, [subCategoryContent]);


    const reflect = (promise) => {
        return promise.then(function(v){ return {v:v, status: "fulfilled" }},
            function(e){ return {e:e, status: "rejected" }});
    };

    const onSubmit = async dataCategory => {
        try {
            if (typeCRUD === 'edit') {
                let editedObj = {};
                let parentSlug = deepCategoryContent.link.pathname.split('/').pop();
                const getSubCategories = Object.keys(dataCategory).reduce((acc,sub) => {
                    if (sub !== 'name') {
                        if (!deepCategoryContent.dataSub.find(obj => obj.id === sub)) {
                            acc[sub] = dataCategory[sub];
                        } else {
                            acc[sub] = {
                                name: deepCategoryContent.dataSub.find(obj => obj.id === sub).text,
                                newName: dataCategory[sub],
                                category: deepCategoryContent.text
                            };
                        }
                    }
                    return acc
                }, {});
                if (!dataCategory.hasOwnProperty('name')) {
                    const {data} = await axios.delete('/api/remove/category', {
                        headers: { Authorization: getToken('token')},
                        data:{
                            name: deepCategoryContent.text
                        }
                    });
                    if (data.error) throw Error(data.error);
                    toast.dark(data.message, toastOpt);
                    props.handlerForm(typeCRUD, {name: deepCategoryContent.text, removed: true});
                    return
                }

                const [added, removed, updated] = [[], [], []];

                if (dataCategory.name && dataCategory.name !== deepCategoryContent.text) {
                    updated.push({name: deepCategoryContent.text, text: dataCategory.name })
                }

                // Added
                Object.keys(getSubCategories).forEach(obj => {
                    if (obj.indexOf('subCategory') > -1) {
                        added.push({[obj]: getSubCategories[obj]})
                    }
                });
                // Removed
                deepCategoryContent.dataSub.forEach(rem => {
                    if (!getSubCategories.hasOwnProperty(rem.id)) {
                        removed.push({name: rem.text, category: deepCategoryContent.text})
                    }
                });
                // Updated
                deepCategoryContent.dataSub.forEach(rem => {
                    if (getSubCategories.hasOwnProperty(rem.id) && getSubCategories[rem.id].newName !== rem.text) {
                        const obj = getSubCategories[rem.id];
                        updated.push({subName: obj.name, text: obj.newName, category: obj.category})
                    }
                });

                const [addPromise, updatePromise, removePromise] = [[], [], []];
                for (const add of added) {
                    addPromise.push(
                        new Promise((resolve, reject) => {
                            axios.post('/api/add/subCategory', {
                                name: Object.values(add)[0],
                                category: dataCategory.name
                            }, {
                                headers: { Authorization: getToken('token')},
                            }).then(res => resolve(res)).catch(err => reject(err))
                        })
                    )
                }

                for (const rem of removed) {
                    removePromise.push(
                        new Promise((resolve, reject) => {
                            axios.delete('/api/delete/subCategory', {
                                headers: { Authorization: getToken('token')},
                                data:{
                                    name: rem.name,
                                    category: rem.category
                                }
                            }).then(res => resolve(res)).catch(err => reject(err))
                        })
                    )
                }

                for (const up of updated) {
                    if (up.subName) { // For sub Categories
                        updatePromise.push(
                            new Promise((resolve, reject) => {
                                axios.put('/api/update/subCategory', {
                                    name: up.subName,
                                    newName: up.text,
                                    category: up.category,
                                }, {
                                    headers: { Authorization: getToken('token')}
                                }).then(res => resolve(res)).catch(err => reject(err))
                            })
                        )
                    } else { // For Categories
                        updatePromise.push(
                            new Promise((resolve, reject) => {
                                axios.put('/api/update/category', {
                                    name: up.name,
                                    text: up.text
                                }, {
                                    headers: { Authorization: getToken('token')}
                                }).then(res => resolve(res)).catch(err => reject(err))
                            })
                        )
                    }
                }

                const promiseAllArr = [...updatePromise, ...addPromise, ...removePromise];
                const results = await Promise.all(promiseAllArr.map(reflect));
                const success = results.filter(x => x.status === "fulfilled");
                if (success.length !== promiseAllArr.length) {
                    toast.error('Some request went wrong!', toastOpt);
                } else {
                    toast.dark('Requests was gone successfully!', toastOpt);
                    const updatedCategory = success.filter(x => x.v.data.updatedCategory);
                    const updatedSubCategory = success.filter(x => x.v.data.updatedSubCategory);
                    const addedSubCategory = success.filter(x => x.v.data.subCategory);
                    const removedSubCategory = success.filter(x => x.v.data.removedSubCategory);
                    editedObj.dataSub = deepCategoryContent.dataSub;
                    editedObj.data = {
                        name: deepCategoryContent.text,
                        edited: true,
                    };

                    if(updatedCategory.length) {
                        editedObj.data.newName = updatedCategory[0].v.data.updatedCategory.name;
                        parentSlug = editedObj.data.newSlug = updatedCategory[0].v.data.updatedCategory.slug;
                        editedObj.dataSub.forEach(el => {
                            const linkSub = el.link.pathname.split('/').pop();
                            el.link.pathname = '/shop/' + parentSlug + '/' + linkSub
                        });
                    }
                    if (updatedSubCategory.length) {
                        updatedSubCategory.forEach(el => {
                            const findOldSub = editedObj.dataSub.findIndex(i => i.text === el.v.data.updatedSubCategory.oldName);
                            if (findOldSub > -1) {
                                editedObj.dataSub[findOldSub].text = el.v.data.updatedSubCategory.name;
                                editedObj.dataSub[findOldSub].link.pathname = '/shop/' + parentSlug + '/' + el.v.data.updatedSubCategory.slug;
                            }
                        })
                    }
                    if (removedSubCategory.length) {
                        removedSubCategory.forEach(el => {
                            const findRemSub = editedObj.dataSub.findIndex(i => i.text === el.v.data.removedSubCategory.name);
                            if (findRemSub > -1) {
                                editedObj.dataSub.splice(findRemSub, 1);
                            }
                        })
                    }
                    if (addedSubCategory.length) {
                        addedSubCategory.forEach(el => {
                            const added = el.v.data.subCategory;
                            if (added) {
                                editedObj.dataSub.push({
                                    id: added._id,
                                    text: added.name,
                                    link: {pathname: '/shop/' + parentSlug + '/' + added.slug}
                                });
                            }
                        })
                    }
                    props.handlerForm(typeCRUD, editedObj.data, editedObj.dataSub);
                }

            } else {
                const getSubCategories = Object.keys(dataCategory).reduce((acc,sub) => {
                    if (sub !== 'name') acc[sub] = dataCategory[sub];
                    return acc
                }, {});

                // Remove all Sub category fields before creating
                if (Object.keys(getSubCategories).length) {
                    Object.keys(getSubCategories).forEach(remSub => delete dataCategory[remSub])
                }

                const {data} = await axios.post('/api/add/category', dataCategory, {
                    headers: { Authorization: getToken('token')}
                });
                if (data.error) {
                    throw Error(data.error.message || data.error)
                }

                // If there are SubCategories
                const promisesSub = [];
                const subData = [];
                let subCategoriesFail = false;
                await (() => {
                    if (Object.keys(getSubCategories).length) {
                        for (let i = 0, p = Promise.resolve(); i < Object.keys(getSubCategories).length; i++) {
                            p = p.then(_ => new Promise(async resolve => {
                                    const dataSub = await axios.post('/api/add/subCategory', {
                                        name: getSubCategories[Object.keys(getSubCategories)[i]],
                                        category: data.category.name
                                    }, {
                                        headers: { Authorization: getToken('token')}
                                    });
                                if (dataSub.data.error) subCategoriesFail = true;
                                    else {
                                        subData.push(dataSub.data.subCategory);
                                    }
                                    resolve();
                                }
                            ));
                            promisesSub.push(p);
                        }
                    }
                    return Promise.all(promisesSub);
                })();

                if (subCategoriesFail) {
                    throw Error('Something went wrong with Sub Categories!');
                } else {
                    toast.dark(data.message, toastOpt);
                    props.handlerForm(typeCRUD, data, subData);
                }
            }
        } catch (err) {
            toast.error(err.response ? err.response.data : err.message, toastOpt);
        } finally {
            props.closeModal();
            reset()
        }
    };

    return (
        <>
            <form id="category-form"  onSubmit={handleSubmit(onSubmit)}>
                {categoryContent !== 'removed' ? <div className={classes['parentUI-input']}>
                    <UI_ELEMENTS.Input
                        type="text"
                        name="name"
                        refBind={categoryContent ? React.createRef() : register(ONLY_ENGLISH_LETTERS_WITH_DIGIT_PATTERN)}
                        errors={errors.name && errors.name.message}
                        fullWidth={true}
                        placeholder="Name"
                        size="sm" />
                    <span className={classes['remove-icon']} onClick={() => removeCategory('name', categoryContent)}>
                        <Icon name="close" />
                    </span>
                </div> : ''}
                {subCategoryContent.length ?
                    <div className={classes.subCategoryContent}> {subCategoryContent.map((_, index) => (
                        <div key={_.category + _.name} className={classes['parentUI-input']}>
                            <UI_ELEMENTS.Input
                                type="text"
                                events={['change']}
                                onChange={(e) => saveChanges({value: e.target.value, name: _.name})}
                                name={_.name}
                                refBind={register(ONLY_ENGLISH_LETTERS_WITH_DIGIT_PATTERN)}
                                errors={errors[_.name] && errors[_.name].message}
                                fullWidth={true}
                                placeholder="Sub category name"
                                size="sm" />
                            <span className={classes['remove-icon']} onClick={() => removeCategory(_.name, subCategoryContent)}>
                                <Icon name="close" />
                            </span>
                        </div>
                    ))}</div> : ''}
                <div className={classes.addCategory}>
                    <UI_ELEMENTS.Button
                        icon={loadingCategory ? {dir: 'right', element: 'loading'} : {}}
                        type="submit"
                        text="Save"
                        width={100}
                        margin={['0px', '0', '0', 'auto']}
                        attr={[
                            {id: 'saveBtn'}
                        ]}
                        size="sm"/>
                    {categoryContent !== 'removed' ?
                    <a id="add-category-sub" onClick={addSubCategoryField}>+</a> : ''}
                </div>
                <Tooltip placement="right" isOpen={tooltipOpen} target="add-category-sub" toggle={toggle}>
                    Add Sub Category
                </Tooltip>
            </form>
        </>
    )
};

CRUDCategoryForm.propTypes = {
    crudType: PropTypes.string,
    editCategoryData: PropTypes.object,
    handlerForm: PropTypes.func,
    closeModal: PropTypes.func,
};

const Li = function (props) {
    const {data, parent} = props;
    let [open, setOpen] = useState(false);
    let [height, setHeight] = useState(0);
    const openSubMenu = (evt, index) => {
        setHeight(height = 0);
        evt.stopPropagation();
        evt.preventDefault();
        setOpen(open = parent.current.children[index] && parent.current.children[index].classList.contains('openItemDropdown'));
        parent.current.children[index].classList[!open ? 'add' : 'remove']('openItemDropdown');
        !open ?
            parent.current.children[index].querySelectorAll('.' + classes["submenu_dropdown"] + ' > li').forEach(_ => setHeight(height+=_.getBoundingClientRect().height))
            : setHeight(height = 0);
        parent.current.children[index].querySelector('.' + classes["submenu_dropdown"]).style.maxHeight = height + 'px'
    };
    const goToShop = (path) => {
        Object.keys(Router.query).forEach(qu => { // Remove unnecessary query params
            if (qu !== 'category' && qu !== 'subCategory' && qu !== 'page' && qu !== 'maxPrice' && qu !== 'minPrice') delete Router.query[qu]
        });

        const query = {...Router.query};
        if (path.hasOwnProperty('querySubCategory')) {
            query.category = path.queryCategory;
            query.subCategory = path.querySubCategory
        } else if (path.hasOwnProperty('queryCategory')) {
            query.category = path.queryCategory;
            delete query.subCategory;
        }
        query.page = 1;
        Router.push({
            pathname: '/shop',
            query: { ...query}
        }).then(() => Bus.dispatch('filterByCategory'))
    };
    const openModal = (el, index) => {
        setHeight(0);
        setOpen(true);
        parent.current.children[index].classList.remove('openItemDropdown');
        if (!open && parent.current.children[index].querySelector('.' + classes["submenu_dropdown"])){
            parent.current.children[index].querySelector('.' + classes["submenu_dropdown"]).style.maxHeight = '0px';
        }
        props.openPropModal(el)
    };

    if (data instanceof Object) {
        const _li = Object.keys(data).map((_el, index) => {
            const display = (data[_el].link.pathname
                    ? <a onClick={() => goToShop(data[_el])}>{data[_el].text} {(data[_el].hasOwnProperty('dataSub') && Object.keys(data[_el].dataSub).length > 0) ?
                        <span className={classes["dropdown_arrow"]} onClick={e => openSubMenu(e, index)}></span> : ''}</a>
                    : <span>{data[_el].text}</span>
            );
            let subMenu;
            if (data[_el].hasOwnProperty('dataSub') && Object.keys(data[_el].dataSub).length > 0) {
                subMenu = <Li data={data[_el].dataSub} isAdmin={props.isAdmin}/>
            }
            return (
                <li key={ index } className={props.isAdmin ? 'admin-icon-relative' : ''}>
                    { display }
                    {props.isAdmin &&
                    <span className="admin-icon" onClick={() => openModal(data[_el], index)}>
                        <Icon name="pencil" />
                    </span>}
                    {subMenu ? <ul className={classes["submenu_dropdown"]}>{subMenu}</ul> : ''}
                </li>
            )
        });
        return (<Fragment>{_li}</Fragment>)
    }
};

Li.propTypes = {
    openPropModal: PropTypes.func,
    parent: PropTypes.object,
    isAdmin: PropTypes.bool,
};

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            crudType: '',
            categoryList: {},
            editCategoryData: {},
        };
        this.openModal          = this.openModal.bind(this);
        this.routerQueries      = this.routerQueries.bind(this);
        this.handlerChangesCRUD = this.handlerChangesCRUD.bind(this);
        this.categoryRef = React.createRef();
    }
    async componentDidMount () {
        try {
            const {data} = await axios.get('/api/get/categories');
            if (data.error) throw Error(data.error);

            this.setState({
                categoryList: (() => {
                    const list = {};
                    for (let i = 0; i < data.category.length; i++) {
                        list[data.category[i].name] = {
                            text: data.category[i].name,
                            queryCategory: data.category[i].slug,
                            link: {pathname: '/shop?category=' + data.category[i].slug + this.routerQueries(['category'])},
                            dataSub: data.subCategory.reduce((acc, sub) => {
                                if (sub.category === data.category[i].name) {
                                    acc.push ({
                                        queryCategory: data.category[i].slug,
                                        querySubCategory: sub.slug,
                                        text: sub.name,
                                        id: sub._id,
                                        link: {pathname: '/shop?category=' + data.category[i].slug + '&subCategory=' + sub.slug + this.routerQueries(['category', 'subCategory'])}
                                    })
                                }
                                return acc
                            }, [])
                        }
                    }
                    return list
                })()
            }, () => {
                this.props.__SET_CATEGORY_LIST(this.state.categoryList)
            })
        } catch (err) {
            toast.error(err.response ? err.response.data : err.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false,
            });
        }
    }

    routerQueries (besides) {
        let queries = '';
        Object.keys(Router.query).forEach(query => {
            if (besides.indexOf(query) === -1) {
                queries += ('&' + query + '=' + Router.query[query]);
            }
        });
        return queries
    }

    openModal (type = 'add', dataEdit = {}) {
        this.setState({
            editCategoryData: dataEdit,
            crudType: (typeof type === 'string') ? type : '',
            modal: !this.state.modal
        })
    }

    handlerChangesCRUD (type, data, subData = []) {
        if (type === 'edit' && data.edited) {
            const nameCategory = data.newName || data.name;
            let prevStateCategory = this.state.categoryList;
            if (data.newName) {
                const nameCategorySlug = (() => {
                    const arr = prevStateCategory[data.name].link.pathname.split('/');
                    arr.pop();
                    arr.push(data.newSlug);
                    return arr.join('/');
                })();
                prevStateCategory[data.newName] = prevStateCategory[data.name];
                delete prevStateCategory[data.name];
                prevStateCategory[data.newName].text = nameCategory;
                prevStateCategory[data.newName].link.pathname = nameCategorySlug
            }
            const updatedCategoryList = JSON.parse(JSON.stringify(prevStateCategory[nameCategory]));
            updatedCategoryList.dataSub = subData;
            prevStateCategory[nameCategory] = updatedCategoryList;

            const orderedPrevStateCategory = {};
            Object.keys(prevStateCategory).sort().forEach(function(key) {
                orderedPrevStateCategory[key] = prevStateCategory[key];
            });
            this.setState({
                categoryList: {
                    ...orderedPrevStateCategory,
                }
            })
        } else if (type === 'edit' && data.removed) {
            Object.filter = (obj, predicate) =>
                Object.fromEntries(Object.entries(obj).filter(predicate));

            const removedCategory = Object.filter(this.state.categoryList, ([name, list]) => list.text !== data.name);
            this.setState({
                categoryList: removedCategory
            })
        } else {
            this.setState(prevState => ({
                categoryList: {
                    ...prevState.categoryList,
                    [data.category.name]: {
                        text: data.category.name,
                        link: {pathname: '/shop/' + data.category.slug},
                        dataSub: subData.map(sub => {
                            return {
                                id: sub._id,
                                text: sub.name,
                                link: {pathname: '/shop/' + data.category.slug + '/' + sub.slug}
                            }
                        })
                    }
                }
            }))
        }
    }
    isAdmin () {
        return this.props.isAdmin && this.props.isAdmin.roleType === 'admin'
    }

    render () {
        return <div className={classes["categories-container"]}>
            <Modal isOpen={this.state.modal} toggle={this.openModal}>
                <ModalHeader toggle={this.openModal} >Add Category</ModalHeader>
                <ModalBody>
                    <CRUDCategoryForm
                        closeModal={this.openModal}
                        handlerForm={this.handlerChangesCRUD}
                        crudType={this.state.crudType}
                        editCategoryData={this.state.editCategoryData}/>
                </ModalBody>
            </Modal>
            <div className={`${classes["categories-container-header"]} ${this.isAdmin() ? 'admin-icon-relative' : ''}`}>
                <h4>
                    Categories
                </h4>
                {this.isAdmin() && <span className="admin-icon" onClick={() => this.openModal('add')}>
                    <Icon name="plus" />
                </span>}
            </div>
            <div className={classes["categories-container-body"]}>
                <ul type="none" ref={this.categoryRef}>
                    <Li
                        data={this.state.categoryList}
                        parent={this.categoryRef}
                        isAdmin={this.isAdmin()}
                        openPropModal={(data) => this.openModal('edit', data)}/>
                </ul>
            </div>
        </div>
    }
}

const mapStateToProps = state => ({
    isAdmin: state.auth.user
});
const mapDispatchToProps = {
    __SET_CATEGORY_LIST,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Categories);
