import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem,Badge} from 'react-native-elements'
import AppHeader from '../components/AppHeader'
import firebase from 'firebase';
import db from '../config';
import styles from '../styles';

export default class MyBarterScreen extends Component {
   constructor(){
     super()
     this.state = {
       userId : firebase.auth().currentUser.email,
       userName : "",
       allBarters : [],
       value:''
     }
     this.requestRef= null
   }

   static navigationOptions = { header: null };

   getUserDetails=(userId)=>{
     db.collection("users").where("email_id","==", userId).get().then((snapshot)=>{
       snapshot.forEach((doc) => {
         this.setState({
           "userName" : doc.data().first_name + " " + doc.data().last_name
         })
       });
     })
   }

   getAllBarters =()=>{
     this.requestRef = db.collection("My_Barter").where("user_id" ,'==', this.state.userId).onSnapshot((snapshot)=>{
       var allBarters = []
       snapshot.docs.map((doc) =>{
         var barters = doc.data()
         barters["doc_id"] = doc.id
         allBarters.push(barters)
       });
       this.setState({
         allBarters : allBarters
       });
     })
   }

   exchangeItems=(itemDetails)=>{
     if(itemDetails.status === "forExchange"){
       var requestStatus = "Barter Interested"
       db.collection("My_Barter").doc(itemDetails.doc_id).update({
         "status" : "Barter Interested"
       })
       this.sendNotification(itemDetails,requestStatus)
     }
     else{
       var requestStatus = "forExchange"
       db.collection("My_Barter").doc(itemDetails.doc_id).update({
         "status" : "forExchange"
       })
       this.sendNotification(itemDetails,requestStatus)
     }
   }

   sendNotification=(itemDetails,requestStatus)=>{
    var requestId = itemDetails.request_id
    var userId = itemDetails.user_id
    db.collection("all_notifications").where("request_id","==", requestId).where("user_id","==",userId).get().then((snapshot)=>{
      snapshot.forEach((doc) => {
        var message = ""
        if(requestStatus === "Book Sent"){
          message = this.state.BarterName + " sent you book"
        }else{
           message =  this.state.BarterName  + " has shown interest in donating the book"
        }
        db.collection("all_notifications").doc(doc.id).update({
          "message": message,
          "status" : "unread",
          "date"                : firebase.firestore.FieldValue.serverTimestamp()
        })
      });
    })
  }



   keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(
     <ListItem
       key={i}
       title={item.ItemName}
       subtitle={item.Description+"\nStatus : " + item.status}
       leftElement = {<Text style = {styles.GiveOrWant} >{item.GiveOrWant}</Text>}
       titleStyle={{ color: 'black', fontWeight: 'bold' }}
       rightElement={
           <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor : item.status === "forExchange" ? "green" : "red"
              }
            ]}
            onPress = {()=>{
              this.exchangeItems(item)
            }}
           >
             <Text style={{color:'#ffff'}}>{
               item.status === "forExchange" ? "forExchange" : "Send Item"
             }</Text>
           </TouchableOpacity>
         }
       bottomDivider
     />
   )

  getNumberOfUnreadNotifications(){
    db.collection('all_notifications').where('notification_status','==',"unread").where('email_id','==',this.state.barterId).onSnapshot((snapshot)=>{
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
          onPress={() =>this.props.navigation.navigate('Notification')}/>
         <Badge
          value={this.state.value}
         containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
      </View>
    )
  }

   componentDidMount(){
     this.getUserDetails(this.state.userId)
     this.getAllBarters()
     this.getNumberOfUnreadNotifications();
   }

   componentWillUnmount(){
     this.requestRef();
   }

   render(){
     return(
       <View style={styles.container}>
         <AppHeader 
            navigation={this.props.navigation} 
            title="My Barters" 
            leftComponent={<Icon name='bars' type='font-awesome' color='#FCCA46'  onPress={() => this.props.navigation.toggleDrawer()}/>} 
            rightComponent={<this.BellIconWithBadge {...this.props}/>}  
          />
         <View style={{flex:1}}>
           {
             this.state.allBarters.length === 0
             ?(
               <View>
                 <Text style={styles.modalTitle}>List of all My Barters</Text>
               </View>
             )
             :(
               <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allBarters}
                 renderItem={this.renderItem}
               />
             )
           }
         </View>
       </View>
     )
   }
   }
