// 客服中心 2018-10
import React,{ Component } from 'react';
import {View} from 'react-native';
import MainHeader from '../../libs/mainHeader/mainHeader';
import {ListCell} from '../../libs/listCell/listCell';
import ListItemGroup from '../../libs/listItemGroup/listItemGroup';
type props = {}

class Discover extends Component<props>{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={{flex: 1,backgroundColor: '#EDEDED'}}>
        <MainHeader title='发现'/>
        <ListItemGroup marginBottom={10}>
          <ListCell leftIcon={{name: 'shopping-cart', color: '#47B34F'}} title="购物" onPress={() => {
            this.props.navigation.navigate('Buy')
          }}/>
        </ListItemGroup>
        <ListItemGroup marginBottom={10}>
          <ListCell leftIcon={{name: 'anchor'}} title="积分" onPress={() => {
            this.props.navigation.navigate('Demo2')
          }} bottomDivider/>
          <ListCell leftIcon={{name: 'behance-square'}} title="周边" border={false} onPress={this.onPress(3)}/>
        </ListItemGroup>
        <ListItemGroup marginBottom={10}>
          <ListCell leftIcon={{name: 'bookmark'}} title="券市场" onPress={this.onPress(4)} bottomDivider/>
          <ListCell leftIcon={{name: 'sign-language'}} title="资讯" border={false} onPress={this.onPress(4)}/>
        </ListItemGroup>
      </View>
    );
  }
}

Discover.prototype.onPress = (flag) => {
  return () => {
    if (flag === 1) {
      this.props.navigation.navigate('Buy');
    }
  }
};

export default Discover;
