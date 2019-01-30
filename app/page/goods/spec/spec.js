// 商品项 2018-10
import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {getSpecList} from "../../../libs/util";

export default class SpecBox extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      activeKey: null, // 活动状态图片
      skuId: null, //
      specs: [], // 规格
      color: '--',
      spec: '--'
    }
  };

  static defaultProps = {
    propsImg: [], // 颜色图片
    specs: [], // 规格
    skus: [], // skus 数据
    activeKey: null
  };

  componentWillReceiveProps (nextProps) {
    // 这里面的东西是需要再考虑的
    const {activeKey, specs} = nextProps;
    if (JSON.stringify(nextProps) == JSON.stringify(this.props)) {
      return
    }
    this.setState({
      activeKey: activeKey,
      specs: specs
    })
  }

  componentDidMount () {}

  render() {
    return (
      <View style={styles.specWarp}>
        <View style={styles.specTitleWarp}>
          <Text style={styles.specTitle}>已选中：{this.state.color}，{this.state.spec}，1件</Text>
        </View>
        <View style={styles.specData}>
          <View style={styles.specRow}>
            {
              this.props.propsImg.map(row => {
                return (
                  <TouchableOpacity onPress={() => {
                    const specs = getSpecList(this.props.skus, row.key);
                    this.setState({
                      activeKey: row.key,
                      specs: []
                    }, () => {
                      this.setState({specs: specs}, () => {
                        this.props.onPropsImg && this.props.onPropsImg(row.val)
                      })
                    })
                  }} style={[
                    styles.picCell,
                    row.key === this.state.activeKey && styles.picCellActive
                  ]} key={row.key}>
                    <Image source={{uri: row.val}} style={styles.picUri}/>
                  </TouchableOpacity>
                )
              })
            }
          </View>
          <View style={styles.specRow}>
            {
              this.state.specs.map(row => {
                return (row.quantity > 0) ? (
                  <TouchableOpacity onPress={() => {
                    this.setState({
                      skuId: row.skuId,
                      spec: row.spec,
                      color: row.color
                    }, () => {
                      this.props.onSkuId && this.props.onSkuId(row.skuId)
                    })
                  }} key={row.skuId} style={styles.sizeCell}>
                    <Text style={[
                      styles.sizeTxt,
                      (row.skuId === this.state.skuId) && styles.sizeActive
                    ]}>{row.spec}</Text>
                  </TouchableOpacity>
                ) : (
                  <View key={row.skuId} style={styles.sizeCell}>
                    <Text style={[styles.sizeTxt, styles.sizeDisabled]}>{row.spec}</Text>
                  </View>
                )
              })
            }
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  specWarp: {},
  specTitleWarp: {
    backgroundColor: '#EBEBEB',
    paddingHorizontal: 15
  },
  specTitle: {
    height: 28,
    lineHeight:28,
    fontSize:13,
    color: '#333',
    fontWeight: '500'
  },
  specData: {
    paddingHorizontal: 15,
    marginTop: 10
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingBottom: 5
  },
  picCell: {
    borderRadius: 2,
    paddingHorizontal: 2,
    paddingVertical: 2,
    backgroundColor: '#EBEBEB',
    marginRight: 1,
    marginBottom: 1
  },
  picCellActive: {
    backgroundColor: '#47B34F',
  },
  picActive: {
    borderColor: '#ca151e',
  },
  picUri: {
    width: 60,
    height: 60
  },
  sizeCell: {
    marginBottom: 1,
    marginRight: 1
  },
  sizeActive: {
    backgroundColor: '#47B34F',
    color: '#FFF'
  },
  sizeDisabled: {
    backgroundColor: '#F4F4F4',
    color: '#999'
  },
  sizeTxt: {
    width: 50,
    height: 25,
    lineHeight: 25,
    borderRadius: 2,
    fontSize: 11,
    color: '#000',
    textAlign: 'center',
    backgroundColor: '#EBEBEB',
    fontWeight: '500'
  }
});
