import React, { Component } from 'react';
import { StyleSheet, View, FlatList,Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import AppHeader from '../components/AppHeader';
import db from '../config';
import styles from '../styles';
import SwipeableFlatlist from '../components/SwipeableFlatList';

export default class NotificationScreen extends Component{
  constructor(props) {
    super(props);

    this.state = {
      userId :  firebase.auth().currentUser.email,
      allNotifications : []
    };
    this.notificationRef = null
  }

  getNotifications=()=>{
    console.log(this.state.userId)
    this.notificationRef = db.collection("all_notifications").where("status", "==", "unread").where("targeted_user_id",'==',this.state.userId).onSnapshot((snapshot)=>{
      var allNotifications =  []
      snapshot.docs.map((doc) =>{
        var notification = doc.data()
        notification["doc_id"] = doc.id
        allNotifications.push(notification)
      });
      this.setState({
          allNotifications : allNotifications
      });
    })
  }

  componentDidMount(){
    this.getNotifications()
  }

  componentWillUnmount(){
    this.notificationRef()
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item,index}) =>{
      return (
        <ListItem
          key={index}
          leftElement = {<Text style = {styles.GiveOrWant} >{item.GiveOrWant}</Text>}
          title={item.itemName}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          subtitle={item.message}
          bottomDivider
        />
      )
 }


  render(){
    return(
      <View style={styles.container}>
          <AppHeader 
            title={"Notifications"} 
            navigation={this.props.navigation}
            leftComponent={<Icon name='bars' type='font-awesome' color='#FCCA46'  onPress={() => this.props.navigation.toggleDrawer()}/>}
          />
          {
            this.state.allNotifications.length === 0
            ?(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25}}>You have no Notifications</Text>
              </View>
            )
            :(
              <SwipeableFlatlist allNotifications={this.state.allNotifications}/>
            )
          }
      </View>
    )
  }
}