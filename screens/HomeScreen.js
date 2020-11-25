import React, { Component } from 'react';
import { View, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem, Icon, Badge } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config'
import AppHeader from '../components/AppHeader';
import styles from '../styles';

export default class HomeScreen extends Component{
  constructor(){
    super();
    this.state = {
      items : [],
      barterId : firebase.auth().currentUser.email,
      allDonations : [],
      value:''
    }
    this.requestRef= null
  }

  getItems =()=>{
    this.requestRef = db.collection("Exchange_Request").onSnapshot((snapshot)=>{
      var items = snapshot.docs.map(document => document.data());
      this.setState({
        items : items
      });
    })
  }

  componentDidMount(){
    this.getItems();
    this.getNumberOfUnreadNotifications();
  }

  componentWillUnmount(){
    this.requestRef();
  }
  
  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        style = {styles.item}
        title={item.ItemName}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        subtitle={item.Description}
        leftElement = {<Text style = {styles.GiveOrWant} >{item.GiveOrWant}</Text>}
        rightElement = {
          <TouchableOpacity 
            style={styles.listButton,{backgroundColor: item.status === 'forExchange' ? 'green' : 'red', width:'15%', borderRadius : 10 }}
            onPress = {()=>
              this.props.navigation.navigate("BarterDetails",{"details": item})
            }
          >
            <Text style={{color:'#fff', marginLeft : 10}}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    )
  }

  getNumberOfUnreadNotifications(){
    db.collection('all_notifications').where('status','==',"unread").where('email_id','==',this.state.barterId).onSnapshot((snapshot)=>{
      var unreadNotifications = snapshot.docs.map((doc) => doc.data())
      this.setState({
        value: unreadNotifications.length
      })
    })
  }

  BellIconWithBadge=()=>{
    return(
      <View>
        <Icon name='bell' type='font-awesome' color='#FCCA46' size={25}
          onPress={() =>this.props.navigation.navigate('Notifications')}/>
         <Badge
          value={this.state.value}
         containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
      </View>
    )
  }

  render(){
    return(
      <View style={styles.box}>
        <AppHeader
          leftComponent={<Icon name='bars' type='font-awesome' color='#FCCA46'  onPress={() => this.props.navigation.toggleDrawer()}/>} 
          title="Home" navigation ={this.props.navigation} 
          rightComponent={<this.BellIconWithBadge {...this.props}/>}          
        />
        <View>
          {
            this.state.items.length === 0
            ?(
              <View>
                <Text style={styles.modalTitle}>List Of All needed Items</Text>
              </View>
            )
            :(
              <FlatList
                style = {styles.list}
                keyExtractor={this.keyExtractor}
                data={this.state.items}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}