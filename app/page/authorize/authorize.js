// 客服中心 2018-10
import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SectionList
} from 'react-native';
import MainHeader from '../../libs/mainHeader/mainHeader';
import {ListCell} from '../../libs/listCell/listCell';
import ListItemGroup from '../../libs/listItemGroup/listItemGroup';
import { Button, Avatar, Badge, Divider, ListItem, Header, Icon, Input, Overlay, Tooltip} from 'react-native-elements';
import theme from "react-native-elements/src/config/theme";
type props = {}

class Authority extends Component<props>{
  constructor(props){
    super(props);
  }

  async componentDidMount() {
    // 考虑一下应该怎样来设计
    // 然后继续啊向下考虑设计方案
    // {
    //   source: require('../../assets/img/discount/asics_logo.jpg'),
    //     rounded: false,
    //   size: 40
    // }
  }

  render(){
    return (
      <View style={styles.container}>
        <MainHeader title='品牌授权'/>
        <View style={styles.listWarp}>
          <SectionList
            showsVerticalScrollIndicator={false}
            initialNumToRender={100}
            renderItem={({ item, index, section }) => {
              return (
                <ListCell leftAvatar={() => {
                  return <Avatar
                    size="small"
                    rounded
                    source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                  />
                }} title="阿迪达斯" bottomDivider={section.data.length - 1 !== index}/>
              )
            }}
            SectionSeparatorComponent={() => <View style={{height: 1/3, backgroundColor: '#CACACA'}}>

            </View>}
            renderSectionHeader={({ section: { title } }) => {
              return title && (
                <View style={{
                  height: 36,
                  backgroundColor: '#EDEDED',
                  paddingHorizontal: 16,
                  flexDirection:'row',
                  alignItems: 'center',
                }}>
                  <Text style={{
                    fontSize: 13,
                    color: '#000'
                  }}>{title}</Text>
                </View>
              )
            }}
            sections={[
              { data: ["item1", "item2"] },
              { title: "A", data: ["item3", "item4", "item6", "item6"] },
              { title: "B", data: ["item5", "item6", "item6", "item6", "item6"] },
              { title: "C", data: ["item7", "item8"] },
              { title: "D", data: ["item9", "item10"] }
            ]}
            keyExtractor={(item, index) => item + index}
          />
          <View style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 26,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.1)'
          }}>
            <Text>dsd</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  listWarp: {
    flex: 1,
    position: 'relative'
  },
  cell: {

  }
});

export default Authority;
