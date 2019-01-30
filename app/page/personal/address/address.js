// 客服中心 2018-10
import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import InputBox from '../../../libs/inputBox/inputBox';
import SubHeader from '../../../libs/subHeader/subHeader';
import {fetchAddressData, submitAddressData} from '../proxy'
import {encodeAddressData, validatePhone, checkSpecialChar, message} from '../../../libs/util';
type props = {}

export default class Address extends Component<props>{
  constructor(props){
    super(props);
    this.state = {
      linkman: null, // 联系人
      telephone: null, // 联系电话
      address: null, // 收货地址
      detail: null, // 详细收货地址
      provinceId: null, // 省
      cityId: null, // 市
      schoolId: null, // 学校
      campusId: null // 校区
    }
  }

  componentWillReceiveProps (nextProps) {
    let {params} = nextProps.navigation.state;
    const result = encodeAddressData(params);
    this.setState({
      address: result.address,
      detail: result.detail,
      provinceId: params.provinceId || null,
      cityId: params.cityId || null,
      schoolId: params.schoolId || null,
      campusId: params.campusId || null,
    });
  }

  componentDidMount() {
    fetchAddressData().then(res => {
      if (+res.code === 0 && res.data) {
        const codeMap = {
          provinceId: res.data.provinceId,
          cityId: res.data.cityId,
          schoolId: res.data.schoolId,
          campusId: res.data.campusId
        };
        const result = encodeAddressData(codeMap);
        this.setState({
          linkman: res.data.linkman || null,
          telephone: res.data.telephone || null,
          address: result.address,
          detail: result.detail,
          provinceId: res.data.provinceId || null,
          cityId: res.data.cityId || null,
          schoolId: res.data.schoolId || null,
          campusId: res.data.campusId || null,
        });
      }
    })
  }


  render(){
    return (
      <View style={styles.container}>
        <SubHeader
          style={{backgroundColor: '#FFF'}}
          onBack={() => {
            this.props.navigation.goBack();
          }}
          onEnter={() => {
            const {telephone, linkman, provinceId, cityId, schoolId, campusId} = this.state;
            if (!linkman) {
              message('联系人不能为空');
              return
            }
            if (!telephone) {
              message('联系电话不能为空');
              return
            }
            if (validatePhone(telephone)) {
              message('请输入正确的手机号');
              return
            }
            if (!provinceId || !cityId || !schoolId || !campusId) {
              message('请选择收货地址');
              return
            }
            let params = JSON.parse(JSON.stringify(this.state));
            delete params.address;
            delete params.detail;
            submitAddressData(params).then(res => {
              if (+res.code === 0) {
                message('数据保存成功');
              }
            });
          }}
          label="保存"
          title="收货地址"/>
        <View style={styles.pageWarp}>
          <View style={styles.cellBox}>
            <Text style={styles.cellKey}>联系人</Text>
            <View style={styles.cellVal}>
              <InputBox
                onChangeText={text => {
                  if (checkSpecialChar(text)) { // 对特殊字符的处理
                    return
                  }
                  this.setState({linkman: text})
                }}
                maxLength={8}
                keyboardType='default'
                placeholder="请输入联系人姓名"
                value={this.state.linkman}/>
            </View>
          </View>
          <View style={styles.cellBox}>
            <Text style={styles.cellKey}>联系电话</Text>
            <View style={styles.cellVal}>
              <InputBox
                onChangeText={text => {
                  if (checkSpecialChar(text)) { // 对特殊字符的处理
                    return
                  }
                  this.setState({telephone: text});
                }}
                maxLength={11}
                keyboardType='numeric'
                placeholder="请输入联系电话"
                value={this.state.telephone}/>
            </View>
          </View>
          <View style={styles.cellBox}>
            <Text style={styles.cellKey}>收货地址</Text>
            <TouchableOpacity onPress = {() => {
              this.props.navigation.navigate('AddressSelect', {radom: 1});
            }} style={styles.cellVal}>
              <Text numberOfLines={1} style={styles.valTxt}>{this.state.address || '-请选择-'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailWarp}>
            <Text style={styles.detailTitle}>详细地址</Text>
            <Text style={styles.detailTxt}>{this.state.detail || '--'}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F0F0F0'
  },
  lastBox: {
    borderBottomWidth: 0,
  },
  pageWarp: {
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    paddingTop: 10,
    borderTopWidth: 1 / 3,
    borderTopColor: '#B6B6B6'
  },
  cellBox: {
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: 1 / 3,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cellKey: {
    fontSize: 14,
    color: '#000',
    width: 60
  },
  cellVal: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 5,
    alignItems: 'center'
  },
  valTxt: {
    fontSize: 13,
    color: '#606266'
  },
  detailWarp: {
    height: 50,
    marginBottom: 15,
    paddingVertical: 5
  },
  detailTitle: {
    fontSize: 13,
    color: '#000',
    lineHeight: 20
  },
  detailTxt: {
    fontSize: 13,
    color: '#909399',
    lineHeight: 20
  }
});
