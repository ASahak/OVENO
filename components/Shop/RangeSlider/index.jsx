import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Range } from 'rc-slider';
import styles from './style.scss';
import {Bus} from "../../../lib/EventEmitter";

const RangeSlider = (props) => {
    const {min, max, step} = props;
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(max);
    const [defaultValues, setDefaultValues] = useState([0, 0]);
    const [gettingDefaultValue, setGettingDefaultValue] = useState(false);

    const change = (data) => {
        setMinValue(data[0]);
        setMaxValue(data[1]);
        props.onChange(data);
        setDefaultValues([0, 0]);
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let minPrice = params.get('minPrice');
        let maxPrice = params.get('maxPrice');
        setDefaultValues([+minPrice, +maxPrice]);
        setGettingDefaultValue(true);
        Bus.subscribe('filterByCategory', (reset) => {
            if (reset && reset.searchReset) {
                props.resetRange()
            }
        });
        return () => {
            setDefaultValues([0, 0]);
            setGettingDefaultValue(false);
        }
    }, []);

    return (
        <div className={styles.rangeSlide}>
            {gettingDefaultValue ? <>
                <Range
                    max={max}
                    min={min}
                    defaultValue={[defaultValues[0] || min, defaultValues[1] || max]}
                    step={step}
                    onAfterChange={change}
                />
                <div className={styles['min-max_wrap']}>
                    <span><b>Min-</b> {defaultValues[0] || minValue}</span>
                    <span><b>Max-</b> {defaultValues[1] || maxValue}</span>
                </div>
            </>: ''}
        </div>
    )
};

RangeSlider.defaultProps = {
    min: 0,
    max: BigInt,
    step: 100,
};
RangeSlider.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func,
    resetRange: PropTypes.func,
};

export default React.memo(RangeSlider);

