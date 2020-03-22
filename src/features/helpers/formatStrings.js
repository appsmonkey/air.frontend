import React from 'react';

export const FormatPM = (val, preText = "", postText = "") => {
  const splitString = val.split(" ");
  return <span>{preText + splitString[0]}<sub>{splitString[1]}</sub>{postText}</span>;
}