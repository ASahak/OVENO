import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import UI_ELEMENTS from "components/shared/UI";
import {
    ONLY_DIGITS,
    PRODUCT_NAME,
    SELECT_OPTION
} from "utils";
import Icon from "components/Icons/icon";
import styles from './style.scss';
import { useForm } from "react-hook-form";
import axios from "axios";
import {toast} from "react-toastify";
const {
    getToken
} = require('utils/auth');

const FormAdd = (props) => {
    const [loadingCategory, setLoadingCategory] = useState(false);
    const [uploadedImg, setUploadedImg] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [hiddenImgValue, setHiddenImgValue] = useState('');
    const [options, setOptions] = useState([]);
    const [subOptions, setSubOptions] = useState([]);
    const {
        register,
        handleSubmit,
        errors,
        reset,
        setValue
    } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = async dataCategory => {
        setLoadingCategory(true);
        try {
            if (uploadedFile) {
                const dataForm = new FormData();
                dataForm.append('photo', uploadedFile);
                const {data} = await axios.post('/api/product/upload', dataForm, {
                    headers: { Authorization: getToken('token')},
                    "Accept": "application/json"
                });
                if (data.error) throw Error(data.error);
                dataCategory.photo = data.file.path.replace(/public/g, '');
            } else {
                dataCategory.photo = 'default-placeholder.png';
            }

            if (props.isEdit._id) {
                if (!uploadedFile) {
                    dataCategory.photo = uploadedImg || 'default-placeholder.png';
                }
                dataCategory.rating = props.isEdit.rating;
                dataCategory.owner = props.isEdit.owner;
                const dataProd = await axios.put('/api/product/update/' + props.isEdit._id, dataCategory, {
                    headers: { Authorization: getToken('token')},
                });
                if (dataProd.data.error) throw Error(dataProd.data.error);

                props.updatedProd(dataProd.data.updatedProduct, 'edit');

                toast.dark(dataProd.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    pauseOnHover: false
                });
            } else {
                dataCategory.rating = [];
                dataCategory.owner = props.owner;
                const dataProd = await axios.post('/api/product/add', dataCategory, {
                    headers: { Authorization: getToken('token')}
                });
                if (dataProd.data.error) throw Error(dataProd.data.error.message);
                props.updatedProd(dataProd.data.product, 'add');
                toast.dark(dataProd.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    pauseOnHover: false
                });
            }
        } catch (err) {
            toast.error(err.response ? err.response.data : err.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false
            });
        } finally {
            setLoadingCategory(false);
            setUploadedImg('');
            setUploadedFile(null);
            reset();
            props.onClose();
        }
    };

    const triggerUploading = () => {
        if(hiddenImgValue) {
            hiddenImgValue.dispatchEvent(new Event("change", {
                bubbles: true
            }));
        }
    };

    const uploadImg = (event) => {
        if (event.target.files[0]) {
            setUploadedFile(event.target.files[0]);
            const reader = new FileReader();

            reader.onload = function (e) {
                setUploadedImg(e.target.result);
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const resetImg = () => {
        setUploadedImg('');
        setUploadedFile(null);
    };
    const selectChangeCategory = (e) => {
        setSubOptions(props.categories[e.target.value].map(opt => (
            <option key={opt} value={opt}>{opt}</option>
        )))
    };

    useEffect(() => {
        setOptions(Object.keys(props.categories).map(opt => (
            <option key={opt} value={opt}>{opt}</option>
        )))
    }, [props.categories]);

    useEffect(() => {
        if (props.isEdit._id && props.isEdit.subCategory) {
            setValue('subCategory', props.isEdit.subCategory);
        }
        setValue('category', props.isEdit.category);
    }, [subOptions]);

    useEffect(() => {
        if (props.isEdit._id) {
            setValue('name', props.isEdit.name);
            setValue('price', props.isEdit.price);
            setValue('sale', props.isEdit.sale);
            setValue('description', props.isEdit.description);
            if (props.isEdit.subCategory) {
                setSubOptions(props.categories[props.isEdit.category].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                )));
            }
            setUploadedImg(props.isEdit.photo);
        }
    }, [props.isEdit]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <UI_ELEMENTS.Input
                type="text"
                name="name"
                refBind={register(PRODUCT_NAME)}
                errors={
                    errors.name && errors.name.message ||
                    errors.name && errors.name.type === 'containChars' && 'Please include some characters'
                }
                fullWidth={true}
                placeholder="Name"
                size="sm" />
            <UI_ELEMENTS.Input
                type="number"
                name="price"
                attr={[{name: 'min', value: 0}, {name: 'max', value: 10000}]}
                refBind={register(ONLY_DIGITS)}
                errors={errors.price && errors.price.message}
                fullWidth={true}
                placeholder="Price"
                size="sm" />
            <UI_ELEMENTS.Input
                type="number"
                name="sale"
                attr={[{name: 'min', value: 0}, {name: 'max', value: 100}]}
                refBind={register(ONLY_DIGITS)}
                errors={errors.sale && errors.sale.message}
                fullWidth={true}
                placeholder="Sale"
                size="sm" />
            <div className={styles['select-wrap']}>
                <div className={`${styles['single-select-wrap']} ${errors.category && errors.category.message ||
                errors.category && errors.category.type === 'selectValue' ? styles['error-field'] : ''}`}>
                    <select name="category" defaultValue={'Select a category'} ref={register(SELECT_OPTION)} onChange={(e) => selectChangeCategory(e)}>
                        <option disabled value="Select a category">Select a category</option>
                        {options}
                    </select>
                    <span className={styles['error-line']}>
                        {errors.category && errors.category.message ||
                        errors.category && errors.category.type === 'selectValue' && 'Please select a value'}
                    </span>
                </div>
                {subOptions.length ? <select defaultValue={''} name="subCategory" ref={register}>
                    <option value="" disabled>Select a sub category</option>
                    {subOptions}
                </select> : ''}
            </div>
            <textarea name="description" placeholder="Add Description" ref={register}></textarea>
            <div className={styles['upload-image-wrap']}>
                {!uploadedImg ? <label>
                    <Icon name="upload"/>
                    <span onClick={triggerUploading}>Choose a file…</span>
                    <input name="photo" type="file" onChange={(e) => uploadImg(e)} ref={input => setHiddenImgValue(input)} accept="image/*"/>
                </label> : <div className={styles['upload-image-wrap_close']}>
                        <span onClick={() => resetImg()}>
                            <Icon name="close" />
                        </span>
                        <img src={uploadedImg} alt="product image" />
                </div>}
            </div>
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
        </form>
    )
};

FormAdd.defaultProps = {
    categories: {},
};
FormAdd.propTypes = {
    categories: PropTypes.object,
    owner: PropTypes.string,
    isEdit: PropTypes.object,
    onClose: PropTypes.func,
    updatedProd: PropTypes.func,
};

export default FormAdd;
