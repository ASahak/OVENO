import React, {useState} from 'react'
import Head from "next/head";
import {Col, Container, Row} from "reactstrap";
import {useForm} from "react-hook-form";
import UI_ELEMENTS from "components/shared/UI";
import {
    EMAIL_VALIDATOR,
    FULL_NAME_VALIDATOR
} from "utils";
import axios from "lib/axiosEnv";
import {toast} from "react-toastify";

const Contact = (() => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        errors,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = async (dataForm) => {
        try {
            setLoading(true);
            const {data} = await axios.post('/api/sendMail', dataForm);
            if (data.error) throw Error(data.error);
            toast.dark(data.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false
            });
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false
            });
        } finally {
            setLoading(false);
        }
        reset();
    };
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>
            <Container>
                <Row>
                    <Col sm={{size:12}} md={{size:10, offset: 1}} lg={{size:8, offset: 2}}>
                        <div className="contact-main-wrap">
                            <h2>Get In Touch</h2>
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
                                    name="email"
                                    type="email"
                                    refBind={register(EMAIL_VALIDATOR)}
                                    fullWidth={true}
                                    errors={errors.email && errors.email.message}
                                    placeholder="Email ID"
                                    size="md"/>
                                <div className={`textarea-field ${errors.description ? 'error-field-contact' : ''}`}>
                                    <textarea name="description" placeholder="Add Description" ref={register({
                                        required: true,
                                    })} rows="4"></textarea>
                                    {errors.description && <span className="error-line">This field is required</span>}
                                </div>
                                <UI_ELEMENTS.Button
                                    icon={loading ? {dir: 'right', element: 'loading'} : {}}
                                    type="submit"
                                    text="Send"
                                    width={100}
                                    margin={['0px', '0', '0', 'auto']}
                                    attr={[
                                        {id: 'saveBtn'}
                                    ]}
                                    size="sm"/>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
});
export default Contact
