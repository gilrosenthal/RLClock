import React from 'react';
import Svg, { Text } from 'react-native-svg';
export default function MaterialLetter({ darkMode, letter }) {
  return (
    <Svg width={40} height={40} viewBox="0 0 512 512">
      <Text
        x={255}
        y={255}
        alignmentBaseline="central"
        textAnchor="middle"
        fill={darkMode ? "#fff" : "#000"}
        fontSize={290}
        fontWeight={400}
        fontFamily="Roboto"
      >
        {letter}
      </Text>
    </Svg>
  )
}