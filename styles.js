import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#233D4D',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box:{
        backgroundColor:'#233D4D', 
        justifyContent: 'center'
    },
    item:{
        alignItems:'center',
    },
    list:{
        width:'90%',
        alignSelf:'center',
        marginBottom:30
    },
    listButton:{
        width:60,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#FE7F2D",
        marginBottom:30,
        marginTop:30
    },
    loginBox:{
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor : '#FCCA46',
        fontSize: 20,
        margin:10,
        paddingLeft:10
    },
    modalTitle :{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'#FE7F2D',
        margin:50,
        fontWeight:'bold'
    },
    modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#619B8A",
        marginRight:30,
        marginLeft : 30,
        marginTop:50,
        marginBottom:80,
    },
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#FCCA46',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:5,
        marginBottom:20
    },
    registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        borderRadius:10,
        marginTop:30,
        backgroundColor:'#FCCA46'
    },
    registerButtonText:{
        color:'#619B8A',
        fontSize:15,
        fontWeight:'bold'
    },
    cancelButton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
        alignSelf:'center',
    },
    button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#FE7F2D",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10,
        marginBottom:30
    },
    buttonText:{
        color:'#233D4D',
        fontWeight:'200',
        fontSize:20
    },
    logoutText:{
        color:'#FE7F2D',
        fontWeight:'200',
        fontSize:20
    },
    drawer:{
        flex:1,
        justifyContent:'flex-end',
        paddingBottom:30
    },
    logout:{
        justifyContent:'center',
        padding:10,
        height:30,
        width:'100%'
    },
    formContainer:{
        flex:1,
        width:'100%',
        alignItems: 'center'
    },
    picker:{
        width:'80%',
        height:35,
        alignSelf:'center',
        backgroundColor:'#FCCA46',
        marginTop:20,
        marginBottom:20
    },
    GiveOrWant:{
        fontWeight:'bold',
        fontSize:20,
        color:'#233D4D',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#29b6f6',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100,
    },
    backRightBtnRight: {
        backgroundColor: '#29b6f6',
        right: 0,
    },
    backTextWhite: {
        color: '#FFF',
        fontWeight:'bold',
        fontSize:15
    }
});

export default styles