import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View
} from 'react-native';

const ListItemGroup = props => {
  const {
    children,
    style,
    marginBottom,
    borderStyle
  } = props;

  return (
    <View style={StyleSheet.flatten([
      style,
      borderStyle,
      {marginBottom: marginBottom}
      ])}>
      {children}
    </View>
  );
};

ListItemGroup.propTypes = {
  style: PropTypes.object,
  marginBottom: PropTypes.number,
  borderStyle: PropTypes.object,
};

ListItemGroup.defaultProps = {
  style: {},
  marginBottom: 10,
  borderStyle: {
    borderWidth: 1 / 3,
    borderColor: '#CACACA',
    borderLeftWidth: 0,
    borderRightWidth: 0,
  }
};

export default ListItemGroup
