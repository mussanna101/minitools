// Conversion factors relative to base unit
export const unitGroups = {
  length: {
    name: 'Length',
    base: 'meter',
    units: {
      'millimeter': { factor: 0.001, symbol: 'mm' },
      'centimeter': { factor: 0.01, symbol: 'cm' },
      'meter': { factor: 1, symbol: 'm' },
      'kilometer': { factor: 1000, symbol: 'km' },
      'inch': { factor: 0.0254, symbol: 'in' },
      'foot': { factor: 0.3048, symbol: 'ft' },
      'yard': { factor: 0.9144, symbol: 'yd' },
      'mile': { factor: 1609.344, symbol: 'mi' },
      'nautical mile': { factor: 1852, symbol: 'nmi' },
    }
  },
  weight: {
    name: 'Weight',
    base: 'kilogram',
    units: {
      'milligram': { factor: 0.000001, symbol: 'mg' },
      'gram': { factor: 0.001, symbol: 'g' },
      'kilogram': { factor: 1, symbol: 'kg' },
      'tonne': { factor: 1000, symbol: 't' },
      'ounce': { factor: 0.0283495, symbol: 'oz' },
      'pound': { factor: 0.453592, symbol: 'lb' },
      'stone': { factor: 6.35029, symbol: 'st' },
      'carat': { factor: 0.0002, symbol: 'ct' },
    }
  },
  temperature: {
    name: 'Temperature',
    base: 'celsius',
    special: true,
    units: {
      'celsius': { symbol: '°C' },
      'fahrenheit': { symbol: '°F' },
      'kelvin': { symbol: 'K' },
    }
  },
  speed: {
    name: 'Speed',
    base: 'meter per second',
    units: {
      'meter per second': { factor: 1, symbol: 'm/s' },
      'kilometer per hour': { factor: 0.277778, symbol: 'km/h' },
      'mile per hour': { factor: 0.44704, symbol: 'mph' },
      'foot per second': { factor: 0.3048, symbol: 'ft/s' },
      'knot': { factor: 0.514444, symbol: 'kn' },
      'mach': { factor: 340.29, symbol: 'Mach' },
      'speed of light': { factor: 299792458, symbol: 'c' },
    }
  },
  area: {
    name: 'Area',
    base: 'square meter',
    units: {
      'square millimeter': { factor: 0.000001, symbol: 'mm²' },
      'square centimeter': { factor: 0.0001, symbol: 'cm²' },
      'square meter': { factor: 1, symbol: 'm²' },
      'hectare': { factor: 10000, symbol: 'ha' },
      'square kilometer': { factor: 1000000, symbol: 'km²' },
      'square inch': { factor: 0.00064516, symbol: 'in²' },
      'square foot': { factor: 0.092903, symbol: 'ft²' },
      'square yard': { factor: 0.836127, symbol: 'yd²' },
      'acre': { factor: 4046.86, symbol: 'acre' },
      'square mile': { factor: 2589988.11, symbol: 'mi²' },
    }
  },
  volume: {
    name: 'Volume',
    base: 'liter',
    units: {
      'milliliter': { factor: 0.001, symbol: 'mL' },
      'liter': { factor: 1, symbol: 'L' },
      'cubic meter': { factor: 1000, symbol: 'm³' },
      'cubic centimeter': { factor: 0.001, symbol: 'cm³' },
      'teaspoon': { factor: 0.00492892, symbol: 'tsp' },
      'tablespoon': { factor: 0.0147868, symbol: 'tbsp' },
      'fluid ounce': { factor: 0.0295735, symbol: 'fl oz' },
      'cup': { factor: 0.236588, symbol: 'cup' },
      'pint': { factor: 0.473176, symbol: 'pt' },
      'quart': { factor: 0.946353, symbol: 'qt' },
      'gallon': { factor: 3.78541, symbol: 'gal' },
    }
  },
  time: {
    name: 'Time',
    base: 'second',
    units: {
      'millisecond': { factor: 0.001, symbol: 'ms' },
      'second': { factor: 1, symbol: 's' },
      'minute': { factor: 60, symbol: 'min' },
      'hour': { factor: 3600, symbol: 'hr' },
      'day': { factor: 86400, symbol: 'day' },
      'week': { factor: 604800, symbol: 'wk' },
      'month': { factor: 2629746, symbol: 'mo' },
      'year': { factor: 31556952, symbol: 'yr' },
    }
  },
  data: {
    name: 'Data Storage',
    base: 'byte',
    units: {
      'bit': { factor: 0.125, symbol: 'b' },
      'byte': { factor: 1, symbol: 'B' },
      'kilobyte': { factor: 1024, symbol: 'KB' },
      'megabyte': { factor: 1048576, symbol: 'MB' },
      'gigabyte': { factor: 1073741824, symbol: 'GB' },
      'terabyte': { factor: 1099511627776, symbol: 'TB' },
      'petabyte': { factor: 1125899906842624, symbol: 'PB' },
    }
  },
};

export const convertUnit = (value, fromUnit, toUnit, group) => {
  if (!value || isNaN(value)) return '';
  const config = unitGroups[group];
  if (config.special) {
    // Special conversions for temperature
    const v = parseFloat(value);
    if (group === 'temperature') {
      // Convert to celsius first
      let celsius;
      if (fromUnit === 'celsius') celsius = v;
      else if (fromUnit === 'fahrenheit') celsius = (v - 32) * 5 / 9;
      else if (fromUnit === 'kelvin') celsius = v - 273.15;
      
      // Convert from celsius to target
      if (toUnit === 'celsius') return celsius;
      if (toUnit === 'fahrenheit') return celsius * 9 / 5 + 32;
      if (toUnit === 'kelvin') return celsius + 273.15;
    }
    return '';
  }
  const fromFactor = config.units[fromUnit].factor;
  const toFactor = config.units[toUnit].factor;
  const baseValue = parseFloat(value) * fromFactor;
  return baseValue / toFactor;
};