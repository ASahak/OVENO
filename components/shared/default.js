import React from 'react';
import PropTypes from 'prop-types';
import Header from "./header";

const Default = ({children}) => {
    return (
        <div>
            <Header />
            <main className="Content">
                {children}
            </main>
        </div>
    );
};

Default.propTypes = {
    children: PropTypes.element
};

export default Default;
