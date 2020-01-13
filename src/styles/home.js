import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    serchbar:{
        borderRadius:10,
        backgroundColor:'#fff',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
      },
    sactionTitle: {
      fontSize:18,
      fontWeight:'bold',
    },
    catItem:{
        flex: 1,
        flexDirection:'column',
        justifyContent: 'space-between',
        alignContent:'center',
        alignItems: 'center',
        margin:5,
    },
    gridCol:{
        margin:3,
        borderRadius:10,
        borderWidth:2,
        borderColor:'#ccc',
    },
    productBtn:{
        flex: 1,
        flexDirection:'row',
        justifyContent: 'space-between',
        width:'100%',
        alignContent:'center',
        alignItems: 'center',
        borderTopColor:'#ccc',
        borderTopWidth:2,
    },
    

  });

  export default styles
  

