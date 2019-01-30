// 子页头 2018-11
import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import {encodeAddressData} from '../../../../libs/util';

export default class Address extends Component<props>{
  constructor(props){
    super(props);
    this.state = {
      linkman: '--',
      telephone: '--',
      address: '--'
    }
  };

  // 默认属性
  static defaultProps = {
    data: {},
  };

  componentWillReceiveProps (nextProps) {
    const {data} = nextProps;
    if (JSON.stringify(nextProps) == JSON.stringify(this.props)) {
      return
    }
    const codeMap = {
      provinceId: data.provinceId,
      cityId: data.cityId,
      schoolId: data.schoolId,
      campusId: data.campusId
    };
    const result = encodeAddressData(codeMap);
    this.setState({
      linkman: data.linkman,
      telephone: data.telephone,
      address: result.detail
    }, () => {
      const address = [data.linkman, data.telephone, result.detail].join()
      this.props.onAddress && this.props.onAddress(address)
    })
  }

  render(){
    return (
      <View style={styles.addressBox}>
        {
          this.props.hasAddress ? (
            <View>
              <View style={styles.mainRow}>
                <View style={styles.basicWarp}>
                  <Text style={styles.name}>{this.state.linkman}</Text>
                  <Text style={styles.tel}>{this.state.telephone}</Text>
                </View>
                <View>
                  <Text style={styles.tag}>收货信息</Text>
                </View>
              </View>
              <Text style={styles.addressTxt}>{this.state.address}</Text>
            </View>
          ) : (
            <TouchableOpacity onPress = {() => {
              this.props.navigation.navigate('Address');
            }} style={styles.addWarp}>
              <Text style={styles.noAddressMsg}>您还没有添加收货地址信息，您可以</Text>
              <View style={styles.boxBtn}>
                <Image source={require('../../../../assets/img/order/add.png')} style={styles.tagIcon}/>
                <Text style={styles.tagTxt}>添加地址</Text>
              </View>
            </TouchableOpacity>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addressBox: {
    paddingHorizontal: 15,
    backgroundColor: '#FCFCFC',
    paddingTop: 10,
    paddingBottom: 25
  },
  mainRow: {
    height: 30,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  basicWarp: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  name: {
    color: '#303133',
    fontSize: 15,
    fontWeight: '500'
  },
  tel: {
    color: '#262626',
    fontSize: 15,
    marginHorizontal: 10,
    fontWeight: '500'
  },
  tag: {
    color: '#b4282d',
    fontSize: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: '#E6E6E6',
    borderRadius: 3,
  },
  addressTxt: {
    fontSize: 12,
    color: '#606266'
  },
  addWarp: {
    marginBottom: 10,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  noAddressMsg: {
    fontSize: 12,
    color: '#909399'
  },
  boxBtn: {
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 6,
    backgroundColor: '#E6E6E6',
    borderRadius: 20,
  },
  tagTxt: {
    fontSize: 13,
    color: '#b4282d'
  },
  tagIcon: {
    width: 16,
    height: 16,
    tintColor: '#b4282d',
    marginRight: 3
  }
});
