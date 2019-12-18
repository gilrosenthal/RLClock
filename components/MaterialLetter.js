import React from 'react';
import Svg, { Circle, Text } from 'react-native-svg';
export default function MaterialLetter(props) {
  return (
    <Svg width={40} height={40} viewBox="0 0 512 512">
      <Circle cx={255} cy={255} r={230} fill="#000" />
      <Text
        x={255}
        y={255}
        alignmentBaseline="central"
        textAnchor="middle"
        fill="#fff"
        fontSize={290}
        fontWeight={400}
        fontFamily="Roboto"
      >
        {props.letter}
      </Text>
    </Svg>
  )
}