import React from 'react'
import Head from "next/head";
import {Col, Container, Row} from "reactstrap";
import {useForm} from "react-hook-form";
import UI_ELEMENTS from "components/shared/UI";
import {
    EMAIL_VALIDATOR,
    FULL_NAME_VALIDATOR
} from "utils";
import {toast} from "react-toastify";

const Contact = (() => {
    const {
        register,
        handleSubmit,
        errors,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = () => {
        toast.dark('Your mail sent successfully!', {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: false
        });
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
                                    type="submit"
                                    text="Save"
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
