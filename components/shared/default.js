import React from 'react';
import PropTypes from 'prop-types';
import Header from "./header";
import Footer from "./footer";

const Default = ({children}) => {
    return (
        <div>
            <Header />
            <main className="Content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

Default.propTypes = {
    children: PropTypes.element
};

export default Default;
