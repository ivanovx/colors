import React from 'react';

import './Adjuster.css';

export default function Adjuster({
    enabled,
    max,
    min,
    name,
    onChange,
    value
}) {
    return (
        <div className='adjuster'>
            <label className='adjusterLabel' htmlFor={`adjuster${name}`}>
                <input 
                    className='adjusterValCheckbox'
                    id={`adjuster${name}`}
                    type='checkbox'
                    name={name}
                    checked={enabled}
                    onChange={onChange} 
                />
                <span className='checkboxCustom'></span> {name}
            </label>
            <div className={`adjusterValue ${enabled ? '' : 'adjusterValueDisabled'}`}>
                <div className='adjusterRangeContainer'>
                    <input 
                        className='adjusterValRange'
                        aria-label={`${name} value`}
                        type='range'
                        name={`${name}Value`}
                        min={min}
                        max={max}
                        value={value}
                        onChange={onChange} 
                    />
                </div>
                <div className='adjusterInputContainer'>
                    <input 
                        className='adjusterValInput'
                        aria-label={`${name} value`}
                        type='number'
                        name={`${name}Value`}
                        min={min}
                        max={max}
                        value={`${value}`}
                        onChange={onChange} 
                    />
                </div>
            </div>
        </div>
    );
}

Adjuster.defaultProps = {
    enabled: false,
    max: 100,
    min: 0,
    onChange: () => {},
    unit: ''
}

/*
 static propTypes = {
    enabled: PropTypes.bool.isRequired,
    max: PropTypes.number,
    min: PropTypes.number,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    unit: PropTypes.string,
    value: PropTypes.number.isRequired
  }

*/