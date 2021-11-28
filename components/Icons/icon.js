import React from 'react';
import PropTypes from 'prop-types';
import {
    User,
    Exit,
    Loading,
    Success,
    Error,
    Logout,
    Modal,
    Unlocked,
    Locked,
    Plus,
    Pencil,
    Close,
    Add,
    Upload,
    Delete,
} from 'components/Icons';

const iconTypes = {
    pencil: Pencil,
    plus: Plus,
    exit: Exit,
    user: User,
    loading: Loading,
    error: Error,
    success: Success,
    logout: Logout,
    modal: Modal,
    unlocked: Unlocked,
    locked: Locked,
    close: Close,
    add: Add,
    upload: Upload,
    delete: Delete,
};

const IconComponent = ({ name, ...props }) => {
    let Icon = iconTypes[name];
    return <Icon {...props} />;
};
IconComponent.propTypes = {
    name: PropTypes.string
};

export default IconComponent;
