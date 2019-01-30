// 订单列表 2018-10
import React,{ Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import SubHeader from '../../libs/subHeader/subHeader';
import TabsView from '../../libs/tabs/tabs';
import Cell from './cell/cell';
import {fetchOrderListDataForApp} from './proxy';
import {groupBy, message} from '../../libs/util';
type props = {};
let rowsArr = [
  { label: '待付款(0)', rows: [] },
  { label: '待收货(0)', rows: [] },
  { label: '已完成(0)', rows: [] },
  { label: '已取消(0)', rows: [] }
];

export default class OrderList extends Component<props>{
  constructor(props){
    super(props);
    this.state = {
      rows: rowsArr
    }
  }

  componentDidMount() {
    this.loadData()
  }

  async loadData () {
    const {code, data} = await fetchOrderListDataForApp();
    if (+code === 0) {
      const map = groupBy(data, 'status');
      if (map['label1']) {
        rowsArr[0].label = '待付款(' + map['label1'].length + ')';
        rowsArr[0].rows = map['label1'] || [];
      }
      if (map['label2']) {
        rowsArr[1].label = '待收货(' + map['label2'].length + ')';
        rowsArr[1].rows = map['label2'] || [];
      }
      if (map['label3']) {
        rowsArr[2].label = '已完成(' + map['label3'].length + ')';
        rowsArr[2].rows = map['label3'] || [];
      }
      if (map['label4']) {
        rowsArr[3].label = '已取消(' + map['label4'].length + ')';
        rowsArr[3].rows = map['label4'] || [];
      }
      this.setState({
        rows: rowsArr
      })
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <SubHeader
          style={{backgroundColor: '#FFF'}}
          title='我的订单'
          label='刷新数据'
          onEnter={async () => {
            await this.loadData();
            message('数据已刷新')
          }}
          onBack={() => {
            alert('返回')
          }}/>
        <TabsView randerCell = {(cell) => {
          return <Cell
            navigation={this.props.navigation}
            key={cell.orderId}
            onPress={(row) => {
              this.props.navigation.navigate('OrderDetail', {
                ticketId: '123456'
              });
            }}
            onRefresh={async () => {
              await this.loadData();
            }}
            info={cell}/>
        }} rows={this.state.rows}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F0F0F0'
  }
});
