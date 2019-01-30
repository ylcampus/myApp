// 商品搜索列表
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import ScrollList from '../../libs/scrollList/scrollList';


export default class TabsView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollableTabView
        style={{flex: 1}}
        scrollWithoutAnimation={true}
        renderTabBar={() => <DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.9)' style={{
          height: 40, borderWidth: 2 / 3}}/> }
        tabBarActiveTextColor='#111'
        // tabBarBackgroundColor='#FCFCFC'
        tabBarTextStyle={{fontFamily: 'Roboto', fontSize: 14}}
        tabBarUnderlineStyle={{backgroundColor:'#333', height:2}}
        initialPage={0}
        tabBarPosition='overlayTop'
        prerenderingSiblingsNumber={this.props.rows.length}>
        {
          this.props.rows.map((row, key) => {
            return row.rows.length > 0 ? (
              <ScrollList key={key} style={{flex: 1, paddingTop: 50, paddingBottom: 50}} tabLabel={row.label}>
                {
                  row.rows.map(item => {
                    if (this.props.randerCell) {
                      return this.props.randerCell(item)
                    }
                  })
                }
              </ScrollList>
            ) : (
              <View key={key} tabLabel={row.label} style={styles.nodataWarp}>
                <Image source={require('../../assets/img/libs/nodata.png')} style={styles.nodataIcon} />
              </View>
            )
          })
        }
      </ScrollableTabView>
    )
  }
}
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  nodataWarp: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nodataIcon: {
    width: 200,
    height: 200
  }
});
