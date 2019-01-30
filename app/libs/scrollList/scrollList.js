// 普通滚动列表视图 2018-09
import React, {PureComponent} from 'react'
import {View, ScrollView, RefreshControl } from 'react-native';
import {SmartRefreshControl,AnyHeader,DefaultHeader,ClassicsHeader,StoreHouseHeader} from 'react-native-smartrefreshlayout';

export default class ScrollList extends PureComponent<Props, State> {
  constructor(props){
    super(props);
  }

  render(){
    let {...rest} = this.props;
    return (
      <View style={{flex: 1}}>
        <ScrollView
          refreshControl={<SmartRefreshControl
            ref={ref => this.rc = ref}
            renderHeader={<ClassicsHeader/>}
            onRefresh={() => {
              setTimeout(() => {
                this.rc && this.rc.finishRefresh();
              }, 1000)
            }}
          />}
          showsVerticalScrollIndicator={false}
          style={[{flex: 1}, this.props.style]}
          // refreshControl={
          //   this.props.onRefresh ? <RefreshControl
          //     refreshing={this.props.isRefreshing }
          //     onRefresh={this.props.onRefresh}
          //   /> : null
          // }
          {...rest}>
          {this.props.children}
        </ScrollView>
      </View>
    );
  }
}
