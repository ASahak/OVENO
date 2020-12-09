import React, {useState, useEffect, useRef, useCallback} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {Col, Container, Row} from "reactstrap";
import {toast} from "react-toastify";
import UI_ELEMENTS from "../components/shared/UI";
import {
    EMAIL_VALIDATOR,
    FULL_NAME_VALIDATOR,
    PASSWORD_VALIDATOR
} from "utils";
import {useForm} from "react-hook-form";
import ImageProd from "components/Shop/elements/imageProduct";
const {
    getToken,
} = require('utils/auth');

const Account = (props) => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [avatar, setAvatar] = useState('');
    const [loadingRegister, setLoadingRegister] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);
    const { register, handleSubmit, watch, errors, setValue } = useForm({
        mode: 'onBlur',
    });

    const uploadImage = useCallback((e) => {
        if (e.target.files[0]) {
            setAvatar('');
            setUploadedFile(e.target.files[0]);
            const reader = new FileReader();

            reader.onload = function (e) {
                setAvatar(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }, []);

    useEffect(() => {
        (async () => {
            if (props.isUser) {
                setAvatar(props.isUser.avatar);
                const {name, email} = props.isUser;
                setValue('name', name);
                setValue('email', email);
            }
        })();
    }, [props.isUser]);

    const onSubmit = async (dataForm) => {
        setLoadingRegister(true);
        try {
            if (uploadedFile) {
                const formData = new FormData();
                formData.append('photo', uploadedFile);
                const dataImage = await axios.post('/api/product/upload', formData, {
                    headers: { Authorization: getToken('token')},
                    "Accept": "application/json"
                });
                if (dataImage.data.error) throw dataImage.data.error;
                dataForm.avatar = dataImage.data.file.path.replace(/public/g, '');
            } else {
                dataForm.avatar = props.isUser.avatar;
            }
            const {data} = await axios.put('/api/update/user', {
                _id: props.isUser._id,
                email: dataForm.email,
                ...(dataForm.password && {password: dataForm.password, password_repeat: dataForm.password}),
                name: dataForm.name,
                avatar: dataForm.avatar,
            });
            if(data.error) throw data.error;
            toast.dark('Account updated successfully!', {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false,
            });
        } catch (err) {
            toast.error(err.response ? err.response.data : err.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false,
            });
        } finally {
            setUploadedFile('');
            setLoadingRegister(false);
        }
    };
    const password = useRef({});
    password.current = watch("password", "");
    return (
        <Container>
            <Row>
                <Col sm={{size:12}} md={{size:10, offset: 1}} lg={{size:8, offset: 2}}>
                    <div className="contact-main-wrap">
                        <div className="avatar-wrap">
                            {props.isUser && <label htmlFor="imageAvatar" className="image-upload">
                                <input type="file" id="imageAvatar" hidden={true} onChange={uploadImage}/>
                                <span className="lnr lnr-camera"></span>
                            </label>}
                            <ImageProd src={avatar}/>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <UI_ELEMENTS.Input
                                type="text"
                                name="name"
                                refBind={register(FULL_NAME_VALIDATOR)}
                                errors={errors.name && errors.name.message}
                                fullWidth={true}
                                placeholder="Name"
                                size="md" />
                            <UI_ELEMENTS.Input
                                type="email"
                                name="email"
                                attr={[{name: 'disabled', value: true}]}
                                refBind={register(EMAIL_VALIDATOR)}
                                errors={errors.email && errors.email.message}
                                fullWidth={true}
                                placeholder="Email ID"
                                size="md" />
                            {updatePassword ? <>
                                <UI_ELEMENTS.Input
                                    refBind={register(PASSWORD_VALIDATOR)}
                                    errors={
                                        errors.password && errors.password.message ||
                                        errors.password && errors.password.type === 'containsDigit' && 'Use 1 ore more numbers' ||
                                        errors.password && errors.password.type === 'containsUppercase' && 'Use upper and lower case characters'
                                    }
                                    name="password"
                                    type="password"
                                    fullWidth={true}
                                    placeholder="New Password"
                                    size="md"/>
                                <UI_ELEMENTS.Input
                                    refBind={register({
                                        validate: value =>
                                            value === password.current || "The passwords do not match"
                                    })}
                                    errors={errors.password_repeat && errors.password_repeat.message}
                                    name="password_repeat"
                                    type="password"
                                    fullWidth={true}
                                    placeholder="Confirm Password"
                                    size="md"/>
                            </> : null}
                            <div className="button-wrap-account">
                                <a onClick={() => setUpdatePassword(prevState => !prevState)}>{!updatePassword ? 'Change password' : 'Unset password'}</a>
                                <UI_ELEMENTS.Button
                                    disabled={!props.isUser}
                                    margin={['0px', '0', '0', 'auto']}
                                    icon={loadingRegister ? {dir: 'right', element: 'loading'} : {}}
                                    type="submit"
                                    text="Save"
                                    width={150}
                                />
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

Account.getInitialProps = async (ctx) => {
    const { req, res } = ctx;
    const token = req.headers.cookie;
    if (!token) res.redirect('/');
    return {status: true}
};
const mapStateToProps = state => ({
    isUser: state.auth.user
});
const mapDispatchToProps = {
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account);
