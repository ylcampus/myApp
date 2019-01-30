import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollList from '../scrollList/scrollList';
import FacebookTabBar from "./FacebookTabBar";


class ScollTabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {rows} = this.props;
    const vals = rows.map((row) => {
      return row.rows.length
    }) || [];

    return (
      <ScrollableTabView initialPage={0} renderTabBar={() => <FacebookTabBar pixel={this.props.pixel} vals={vals}/>}>
        {
          this.props.rows.map((cell, key) => {
            return cell.rows.length > 0 ? (
              <ScrollList key={key} style={[{flex: 1}, this.props.style]} tabLabel={cell.label}>
                {
                  cell.rows.map(item => {
                    if (this.props.render) {
                      return this.props.render(item, cell.key)
                    }
                  })
                }
              </ScrollList>
            ) : (
              <View key={key} tabLabel={cell.label} style={styles.nodata}>
                <Image source={require('../../assets/img/libs/bkv.png')} style={styles.icon} />
              </View>
            )
          })
        }
      </ScrollableTabView>
    )
  }
}

ScollTabs.propTypes = {
  rows: PropTypes.array,
  pixel: PropTypes.string,
  style: PropTypes.object,
  render: PropTypes.func
};

ScollTabs.defaultProps = {
  rows: [],
  pixel: '237',
  style: { backgroundColor: '#FFF' },
  render: () => {}
};

const styles = StyleSheet.create({
  nodata: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255)'
  },
  icon: {
    width: 150,
    height: 150
  }
});

export default ScollTabs;
