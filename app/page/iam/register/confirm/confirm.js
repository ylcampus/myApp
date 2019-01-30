// 客服中心 2018-10
import React,{ Component } from 'react';
import {StyleSheet, View, Text, Modal, Dimensions, TouchableOpacity} from 'react-native';
const {height} = Dimensions.get('window');
type props = {}

export default class Confirm extends Component<props>{
  constructor(props){
    super(props);
    this.state = {
      visible: true
    }
  }

  componentDidMount() {}

  render(){
    return (
      <Modal
        animationType="fade"
        transparent={true}
        hardwareAccelerated={true}
        visible={this.props.visible}
        onRequestClose={() => {}}>
        <View style={styles.modalWarp}>
          <View style={styles.modalBody}>
            <View style={styles.innerWarp}>
              <Text style={styles.innerHeader}>注册协议及隐私政策</Text>
              <View style={styles.innerBody}>
                <View style={styles.p}>
                  <Text style={styles.normal}>在您注册成为优乐用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，
                    <Text style={styles.blod}>请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，
                      因为这些条款可能会明确您应履行的义务或对您的权利有所限制）
                    </Text>
                  </Text>
                </View>
                <View style={styles.p}>
                  <Text style={styles.normal}>《优乐用户注册协议》</Text>
                  <View style={styles.splitLine}></View>
                  <Text style={styles.normal}>《优乐隐私政策》</Text>
                </View>
                <View style={styles.p}>
                  <Text style={styles.blod}>点击同意即表示您已阅读并同意
                    <Text style={styles.redTxt}>《优乐用户注册协议》</Text>
                    <Text style={styles.blod}>与</Text>
                    <Text style={styles.redTxt}>《优乐隐私政策》</Text>
                    <Text style={styles.blod}>，并允许我们将您的订单信息共享给为完成此订单所必须的第三方合作方。</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.innerFooter}>
                <TouchableOpacity onPress={() => { this.props.onCancel && this.props.onCancel() }}>
                  <Text style={styles.cancelBtn}>不同意</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.props.onEnter && this.props.onEnter() }}>
                  <Text style={styles.enterBtn}>同意</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalWarp: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  },
  modalBody: {
    height: height * 0.6,
    backgroundColor: '#FFF'
  },
  innerWarp:{
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
  innerHeader: {
    height: 50,
    backgroundColor: '#FFF',
    lineHeight: 50,
    fontSize: 20,
    color: '#303133',
    textAlign: 'center',
    borderBottomWidth: 1 / 3,
    borderBottomColor: '#CCC',
    paddingHorizontal: 20,
    fontWeight: '500'
  },
  innerBody: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 10
  },
  splitLine: {
    height:5
  },
  normal: {
    fontSize: 14,
    color: '#303133',
    lineHeight: 16
  },
  blod: {
    fontSize: 14,
    color: '#303133',
    lineHeight: 16,
    fontWeight: '500'
  },
  p: {
    marginVertical: 5
  },
  redTxt: {
    fontSize: 14,
    color: '#b4282d'
  },
  innerFooter: {
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1 / 3,
    borderTopColor: '#E6E6E6',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cancelBtn: {
    height: 46,
    width: 100,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 46,
    color: '#000',
    marginVertical: 2,
  },
  enterBtn: {
    marginVertical: 2,
    width: 100,
    height: 46,
    fontSize: 15,
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 46,
    backgroundColor: '#b4282d'
  }
});
