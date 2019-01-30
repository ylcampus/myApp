// 动画页头 2018-09
import React,{ Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Avatar, Header} from 'react-native-elements';

class MainHeader extends Component<props>{
  constructor(props){
    super(props);
  }

  componentDidMount() {}

  render(){
    return (
      <Header
        containerStyle={styles.containerStyle}
        statusBarProps={{backgroundColor: this.props.backgroundColor}}
        barStyle={this.props.barStyle}
        leftComponent={{ text: this.props.title, style: styles.title }}
        rightComponent={{ icon: 'line-weight', color: '#333' }}
      />
    );
  }
}

MainHeader.defaultProps = {
  backgroundColor: '#FFF',
  barStyle: 'dark-content',
  title: '主标题'
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#EDEDED',
    justifyContent: 'space-around',
    height: 46,
    paddingHorizontal: 16,
    paddingTop: 0,
    elevation: 0
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'sans-serif',
  }
});
export default MainHeader;
