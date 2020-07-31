import React, {useState, useEffect} from 'react';
import useImage from "hooks/use-image";

const ImageProd = ({ src, alt = "" }) => {
    const { loaded } = useImage({ src });
    const [srcAvatar, setSrcAvatar] = useState(null);

    useEffect(() => {
        if (loaded) setSrcAvatar(src);
    }, [loaded, src]);

    return (
        <img src={srcAvatar || require('../../../assets/images/loading.gif')} alt={alt} />
    )
};

export default ImageProd;
