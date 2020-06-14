import React from 'react';
import PropTypes from 'prop-types';

const Dump = ({children}) => {
    return (
        <main>
            {children}
        </main>
    );
};

Dump.propTypes = {
    children: PropTypes.element
};

export default React.memo(Dump);
