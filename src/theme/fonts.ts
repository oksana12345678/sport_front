import { fontsMap } from './types';

const createFontStyle = (
  fontFamily: string,
  fontWeight: string,
  fontSize: string,
  lineHeight: string,
): {
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
} => {
  return { fontFamily, fontWeight, fontSize, lineHeight };
};

export const fonts: fontsMap = {
  mainTitle: createFontStyle("'Manrope', sans-serif", '800', '24px', '21px'),
  mainManrope: createFontStyle("'Manrope', sans-serif", '600', '16px', '22px'),
  secondManrope: createFontStyle(
    "'Manrope', sans-serif",
    '500',
    '16px',
    '22px',
  ),
  secondTitle: createFontStyle("'Manrope', sans-serif", '800', '16px', '16px'),
  lightManrope: createFontStyle("'Manrope', sans-serif", '300', '12px', '16px'),
  mainButton: createFontStyle("'Manrope', sans-serif", '400', '14px', '20px'),
  names: createFontStyle("'Manrope', sans-serif", '600', '20px', '24px'),
  descriptionCard: createFontStyle(
    "'Manrope', sans-serif",
    '400',
    '12px',
    '21px',
  ),
  smallText: createFontStyle("'Manrope', sans-serif", '500', '10px', '10px'),
  aboutText: createFontStyle("'Manrope', sans-serif", '400', '16px', '22px'),
  popUp: createFontStyle("'Manrope', sans-serif", '400', '12px', '14px'),

  // Стилі додані тимчасово для сторінки DETEILS!!!
  // НЕ ВИКОРИСТОВУВАТИ НА ІНШИХ СТОРІНКАХ

  nameDetails: createFontStyle("'Manrope', sans-serif", '700', '18px', '15px'),

  modalTitle: createFontStyle("'Manrope', sans-serif", '700', '16px', '16px'),

  editButton: createFontStyle("'Manrope', sans-serif", '500', '16px', '22px'),

  spanDetails: createFontStyle("'Manrope', sans-serif", '500', '16px', '16px'),

  addressDetails: createFontStyle(
    "'Manrope', sans-serif",
    '500',
    '16px',
    '15px',
  ),

  priceName: createFontStyle("'Manrope', sans-serif", '400', '16px', '24px'),

  priceAmount: createFontStyle("'Manrope', sans-serif", '400', '16px', '15px'),

  descriptionWorkIn: createFontStyle(
    "'Manrope', sans-serif",
    '400',
    '12px',
    '21px',
  ),

  spanWorkIn: createFontStyle("'Manrope', sans-serif", '300', '12px', '21px'),

  modalInput: createFontStyle("'Manrope', sans-serif", '300', '12px', '12px'),
  modalSpan: createFontStyle("'Manrope', sans-serif", '400', '12px', '14px'),

  // Як тільки на макеті стилі змінять, одразу видалю
};
