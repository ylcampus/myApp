// 收货地址选择 2019-01
import React,{ Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import SubHeader from '../../../../libs/subHeader/subHeader';
import ScrollList from '../../../../libs/scrollList/scrollList';
import {getAreaDataByParentId, message} from '../../../../libs/util';
type props = {}
export default class AddressSelect extends Component<props>{
  constructor(props){
    super(props);
    this.state = {
      rows: [], // 区域数据
      activeId: null // 活动的校区Id
    };
    this.map = {
      provinceId: '320000',
      cityId: null,
      schoolId: null,
      campusId: null
    }
  }

  componentDidMount() {
    this.refresh(this.map.provinceId); // 获取城市数据
  }

  // 刷新数据
  refresh (code) {
    const rows = getAreaDataByParentId(code);
    this.setState({rows: rows})
  }

  render(){
    return (
      <View style={styles.container}>
        <SubHeader
          onBack={() => {
            this.props.navigation.goBack()
          }}
          label = "选择"
          onEnter={() => {
            if (!this.map.provinceId || !this.map.cityId || !this.map.schoolId || !this.map.campusId) {
              message('请选择收货地址');
              return
            }
            this.props.navigation.navigate('Address', {...this.map});
          }}
          title="地址选择"/>
        <View style={styles.pageWarp}>
          <View style={styles.addressBox}>
            <ScrollList>
              {
                this.state.rows.map(row => {
                  return (
                    <TouchableOpacity onPress={() => {
                      const mirror = ['provinceId', 'cityId', 'schoolId', 'campusId'];
                      this.map[mirror[row.layer]] = row.code;
                      if (row.layer === 3) {
                        this.setState({activeId: row.code});
                        return
                      }
                      const rows = getAreaDataByParentId(row.code);
                      if (rows.length === 0) {
                        message('区域暂未开通');
                        return
                      }
                      this.setState({rows: rows});
                    }} key={row.code} style={styles.listRow}>
                      <Text style={[styles.rowKey,
                        row.layer === 3 && (this.state.activeId === row.code) && styles.active
                      ]}>{row.name}</Text>
                      {
                        row.layer === 3 && (this.state.activeId === row.code) && (
                          <Image source={require('../../../../assets/img/personal/selected.png')} style={styles.rowIcon}/>
                        )
                      }
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollList>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#E6E6E6'
  },
  pageWarp: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FFF'
  },
  addressBox: {
    flex: 1
  },
  listRow: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowKey: {
    fontSize: 14,
    color: '#606266'
  },
  active: {
    color: '#000'
  },
  rowIcon: {
    width: 20,
    height: 20,
    tintColor: '#000'
  }
});
