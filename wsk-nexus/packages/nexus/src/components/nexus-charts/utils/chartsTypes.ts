export type orientationProp = 'horizontal' | 'vertical';

export type colorSchemeProp =
  | 'category10'
  | 'accent'
  | 'dark2'
  | 'paired'
  | 'pastel1'
  | 'pastel2'
  | 'set1'
  | 'set2'
  | 'set3'
  | 'tableau10'
  | 'black'
  | 'gray';

export type interpolationProp = 'linear' | 'basic' | 'monotone' | 'step-before' | 'step-after';

export type strokeProp = 'transparent' | 'white' | 'black' | 'gray';

export type axisTickFontFamilyProp = 'interstate' | 'sans' | 'serif' | 'monospace';

export type axisTickFontSizeProp = 8 | 9 | 10 | 12;

export type strokeWidthProp = 1 | 2 | 5;

export type legendFontSizeProp = 10 | 12 | 14;

export type TickFormatProp =
  | 'USD'
  | 'localestring'
  | 'localestring1d'
  | 'localestring2d'
  | 'percent'
  | 'percent1d'
  | 'percent2d'
  | 'YYYY'
  | 'M/D/YYYY'
  | 'M/D/YY'
  | 'MM/DD/YYYY'
  | 'MM YYYY'
  | 'MMM D, YYYY'
  | 'ISODATE'
  | 'raw';
