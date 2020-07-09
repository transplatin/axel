import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

export default function Icon(props) {
  return (
    <Ionicons
      name={props.name}
      size={props.size}
      color={props.color}
    />
  );
}
