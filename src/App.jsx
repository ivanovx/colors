import {
  DEFAULT_BASE_COLOR,
  SHORT_NAMES_KEY,
} from './constants';

import React from 'react';

import {findIndex, propEq} from 'ramda';

import {
  getColorFromQueryVal,
  getColorObj,
} from './utils/color';

import Banner from './components/Banner';
import Colors from './components/Colors';
import Controls from './components/Controls';

export default function App() {
  const {
    localStorage,
    location: {
      search
    }
  } = window;

  let baseColorInput = DEFAULT_BASE_COLOR;
  const useShortNames = JSON.parse(
    localStorage.getItem(SHORT_NAMES_KEY)) || false;

  if (search.indexOf('color') > -1) {
    const [,queryVal] = search.replace('?', '').split('=');
    // getColorFromQueryVal will return `null` if it can't figure out how to
    // parse the provided queryVal color string.
    baseColorInput = getColorFromQueryVal(queryVal) || DEFAULT_BASE_COLOR;
  }

  const colorObj = getColorObj(baseColorInput);

  const {
    adjusters,
    baseColor,
    baseColor: {
      format: baseFormat,
      original
    },
    baseContrastColor,
    colorFuncStr,
    outputColor,
    outputContrastColor
  } = colorObj;


  /*

   this.state = {
      adjusters,
      baseColor,
      baseColorDisplay: ,
      baseContrastColor,
      colorFuncStr,
      colorObj,
      outputColor,
      outputContrastColor,
      outputColorDisplay: outputColor.formats[baseFormat],
      selectedFormat: baseFormat,
      useShortNames
    };

  */

    const [state, setState] = React.useState({
      adjusters,
      baseColor,
      baseColorDisplay: original,
      baseContrastColor,
      colorFuncStr,
      colorObj,
      outputColor,
      outputContrastColor,
      outputColorDisplay: outputColor.formats[baseFormat],
      selectedFormat: baseFormat,
      useShortNames
    });

    const baseColorOnChange = (event) => {
      const {
        selectedFormat,
        useShortNames
      } = state;
  
      const nextBaseColor = event.target.value;
      const colorObj = getColorObj(nextBaseColor);
  
      if (colorObj.isValid) {
        const {
          adjusters,
          baseColor,
          baseColor: {
            format: baseFormat,
            original
          },
          baseContrastColor,
          colorFuncStr,
          colorFuncStrShortNames,
          outputColor,
          outputContrastColor
        } = colorObj;
  
        const nextColorFuncStr = useShortNames ? colorFuncStrShortNames : colorFuncStr;
  
        // Check to see if the new outputColor has the previously selected format.
        // If so, hold on to that selection.
        const nextSelectedFormat = outputColor.formats[selectedFormat] ? selectedFormat : baseFormat;
  
        setState(oldState => ({
          ...oldState,
          adjusters,
          baseColor,
          baseColorDisplay: original,
          baseContrastColor,
          colorFuncStr: nextColorFuncStr,
          colorObj,
          outputColor,
          outputColorDisplay: outputColor.formats[nextSelectedFormat],
          outputContrastColor,
          selectedFormat: nextSelectedFormat
        }));
      } else {
        setState(oldState => ({
          ...oldState,
          baseColorDisplay: nextBaseColor
        }));
      }
    }
  
    const adjusterOnChange = (event) => {
      const {
        adjusters,
        baseColor: prevBaseColor,
        selectedFormat,
        useShortNames
      } = state;

      const isToggle = event.target.type === 'checkbox';
      const adjusterName = event.target.name.replace('Value', '');
      const nextAdjusters = [...adjusters];
      const index = findIndex(propEq('name', adjusterName))(nextAdjusters); // todo
      let adjuster = nextAdjusters[index];
  
      if (isToggle) {
        adjuster.enabled = !nextAdjusters[index].enabled;
      } else {
        console.log(event.target.value)
        adjuster.value = parseInt(event.target.value, 10);
  
        // If the user changes an adjuster value, enable the adjuster.
        if (!adjuster.enabled) {
          adjuster.enabled = true;
        }
      }
  
      const colorObj = getColorObj(prevBaseColor.original, nextAdjusters);
  
      const {
        baseColor: {
          format: baseFormat
        },
        colorFuncStr,
        colorFuncStrShortNames,
        outputColor,
        outputColor: {
          formats: outputFormats
        },
        outputContrastColor
      } = colorObj;
  
      const nextColorFuncStr = useShortNames ? colorFuncStrShortNames : colorFuncStr;
  
      // Check to see if the new outputColor has the previously selected format.
      // If so, hold on to that selection.
      let nextSelectedFormat = 'rgb';
      if (outputFormats[selectedFormat]) {
        nextSelectedFormat = selectedFormat;
      } else if (outputFormats[baseFormat]) {
        nextSelectedFormat = baseFormat;
      }
  
      setState(oldState => ({
        ...oldState,
        adjusters: nextAdjusters,
        colorFuncStr: nextColorFuncStr,
        colorObj,
        outputColor,
        outputColorDisplay: outputFormats[nextSelectedFormat],
        outputContrastColor,
        selectedFormat: nextSelectedFormat
      }));
    }
  
    const selectedFormatOnChange = (event) => {
      const {
        outputColor: {
          formats
        }
      } = state;
  
      if (event && event.preventDefault) {
        event.preventDefault();
      }
  
      const format = event.target.value;
  
      setState(oldState => ({
        ...oldState,
        outputColorDisplay: formats[format],
        selectedFormat: format
      }));
    }
  
    const storeShortNamesOption = (event) => {
      if (event && event.preventDefault) {
        event.preventDefault();
      }
  
      const {
        colorObj: {
          colorFuncStr,
          colorFuncStrShortNames
        },
        useShortNames
      } = state;
  
      const {
        localStorage
      } = window;
  
      const nextUseShortNames = !useShortNames;
      const nextColorFuncStr = nextUseShortNames ? colorFuncStrShortNames :
        colorFuncStr;
  
      localStorage.setItem(SHORT_NAMES_KEY, nextUseShortNames);
  
      setState(oldState => ({
        ...oldState,
        colorFuncStr: nextColorFuncStr,
        useShortNames: nextUseShortNames
      }));
    }

    const {
      baseColorDisplay,
      outputColorDisplay,
      selectedFormat,
    } = state;

    const colorsProps = {
      baseColor,
      baseColorDisplay,
      baseColorOnChange: baseColorOnChange,
      baseContrastColor,
      outputColor,
      outputColorDisplay,
      outputContrastColor,
      selectedFormat,
      selectedFormatOnChange: selectedFormatOnChange
    };

    const controlsProps = {
      adjusters,
      adjusterOnChange: adjusterOnChange,
      colorFuncStr,
      shortNamesOnClick: storeShortNamesOption,
      useShortNames
    };

    return (
      <main>
        <Banner />
        <Colors {...colorsProps} />
        <Controls {...controlsProps} />
      </main>
    );

}