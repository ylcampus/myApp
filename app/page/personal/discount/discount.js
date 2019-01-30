// 我的打折券 2018-10
import React,{ Component } from 'react';
import {
  View
} from 'react-native';
import SubHeader from '../../../libs/subHeader/subHeader';
import TabsView from '../../../libs/tabs/tabs';
import Cell from './cell/cell';
import {fetchTicketsListDataForApp} from '../proxy';
import {groupBy, message} from "../../../libs/util";
type props = {};

let rowsArr = [
  { label: '未使用(0)', rows: [] },
  { label: '已使用(0)', rows: [] }
];

export default class MyDiscount extends Component<props>{
  constructor(props){
    super(props);
    this.state = {
      rows: rowsArr
    }
  }

  async componentDidMount() {
    await this.loadData(true);
  }

  async loadData () {
    const {code, data} = await fetchTicketsListDataForApp();
    if (+code === 0) {
      const map = groupBy(data, 'status');
      if (map['label1']) {
        rowsArr[0].label = '未使用(' + map['label1'].length + ')';
        rowsArr[0].rows = map['label1'] || [];
      }
      if (map['label2']) {
        rowsArr[1].label = '已使用(' + map['label2'].length + ')';
        rowsArr[1].rows = map['label2'] || [];
      }
      this.setState({ rows: rowsArr })
    }
  }

  render(){
    return (
      <View style={{flex: 1, backgroundColor: '#F0F0F0'}}>
        <SubHeader
          style={{backgroundColor: '#FFF'}}
          title='我的打折券'
          label='刷新数据'
          onEnter={async () => {
            await this.loadData();
            message('数据已刷新')
          }}
          onBack={() => {
            alert('返回')
          }}/>
        <View style={{flex: 1}}>
          <TabsView randerCell = {(cell) => {
            return <Cell
              navigation={this.props.navigation}
              key={cell.ticketId}
              onPress={(row) => {
                message(`${row.shopName}.五折券`);
              }}
              info={cell}/>
          }} rows={this.state.rows}/>
        </View>
      </View>
    );
  }
}
