import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { ListItem, Badge, Icon} from 'react-native-elements';

const ListCell = props => {
  const {
    title,
    num,
    showNav,
    border,
    leftIcon,
    ...rest
  } = props;

  const leftIconStyle = {
    type: 'font-awesome',
    color: '#1EA5FF',
    size: 22,
    containerStyle: {
      width: 25,
      flexDirection: 'row',
      justifyContent: 'flex-start'
    }
  };

  return (
    <ListItem
      containerStyle={styles.containerStyle}
      leftIcon={leftIcon && StyleSheet.flatten([leftIconStyle, leftIcon])}
      disabledStyle={styles.disabledStyle}
      titleStyle={styles.titleStyle}
      title={title}
      {...rest} chevron={{size: 20}} chevronColor="#333"/>
  );
};

ListCell.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string,
  showNav: PropTypes.any,
  border: PropTypes.any,
};

ListCell.defaultProps = {
  style: {},
  title: '标题',
  showNav: true,
  border: true
};

const styles = StyleSheet.create({
  containerStyle: {
    borderBottomColor: '#CACACA'
  },
  titleStyle: {
    fontFamily: 'sans-serif',
    fontSize: 16.5,
    color: '#353535',
    lineHeight: 25
  },
  disabledStyle: {
    backgroundColor: '#F7F7F7'
  }
});

export { ListCell };
