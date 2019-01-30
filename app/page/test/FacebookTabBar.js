import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

class FacebookTabBar extends React.Component {
  labels = [];
  nums = [];
  lines = [];

  constructor(props) {
    super(props);
    this.labels = []; // 标题
    this.nums = []; // 数量
    this.lines = []; // 下划线
  }

  componentDidMount() {
    this.props.scrollValue.addListener(this.setAnimationValue.bind(this));
  }

  setAnimationValue({ value }) {
    // 标题变化
    this.labels.forEach((label, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
      label.setNativeProps({
        style: { color: this.getColor(204, progress), fontSize: this.getFontSizeVal(15, progress, 1)}
      });
    });

    // 数据变化
    this.nums.forEach((num, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
      num.setNativeProps({
        style: { color: this.getColor(204, progress), fontSize: this.getFontSizeVal(14, progress, 2) }
      });
    });

    // 下划线颜色变化
    this.lines.forEach((line, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
      line.setNativeProps({
        style: { backgroundColor: this.getColor(this.props.bg, progress)}
      });
    });
  }

  render() {
    return <View style={[styles.tabs, this.props.style, {backgroundColor: `rgb(${this.props.bg},${this.props.bg},${this.props.bg})`}]}>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
          <View style={styles.tabWarp}>
            <Text ref={(label) => { this.labels[i] = label; }}>{tab}</Text>
            {
              this.props.vals.length && (
                <Text ref={(num) => { this.nums[i] = num; }}>({this.props.vals[i]})</Text>
              )
            }
            <View ref={(line) => { this.lines[i] = line; }} style={styles.line}></View>
          </View>
        </TouchableOpacity>;
      })}
    </View>;
  }
}
FacebookTabBar.defaultProps = {
  bg: '237',
  vals: []
};

// 获取颜色数据
FacebookTabBar.prototype.getColor = (val, progress) => {
  return `rgb(${val * progress}, ${val * progress}, ${val * progress})`;
};

// 字体大小渐变
FacebookTabBar.prototype.getFontSizeVal = (size, progress, scalc) => {
  return size - progress * scalc;
};

const styles = StyleSheet.create({
  tabs: {
    height: 44,
    flexDirection: 'row',
    backgroundColor: '#EDEDED',
  },
  tab: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 20
  },
  tabWarp: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    position: 'relative'
  },
  line: {
    height: 2,
    position: 'absolute',
    borderRadius: 2,
    bottom: 0,
    width: 36
  }
});

export default FacebookTabBar;
