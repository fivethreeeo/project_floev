import Layout from '../layout/DefaultLayout'
import React from 'react'
import HelloWorld from '../components/Helloworld'
import { Modal, Button, List, WhiteSpace } from 'antd-mobile'
//import {  } from 'antd'

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      modal2: false,
    };
  }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  render(){
    return(
      <Layout title="Floev New Front">
        <div className="app">
          <HelloWorld />
        </div>
        <Button onClick={this.showModal('modal2')}>팝업</Button>
        <WhiteSpace />

        <Button>
          Primary
        </Button>
        <Modal
          popup
          visible={this.state.modal2}
          onClose={this.onClose('modal2')}
          animationType="slide-up"
          afterClose={() => { alert('afterClose'); }}
        >
          <List renderHeader={() => <div>리스트</div>} className="popup-list">
            <Button type="primary" onClick={this.onClose('modal2')}>닫기</Button>
          </List>
        </Modal>
      
      </Layout>
    )
  }
}

export default IndexPage