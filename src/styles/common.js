import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
    },
    centerFlex: {
      flex: 1,
      flexDirection:'column',
      justifyContent: 'center',
      alignContent:'center',
      alignItems: 'center',
    },
    spaceFlex: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignContent:'center',
        alignItems: 'center',
      },
    inline:{
      flex: 1,
      flexDirection:'row',
      alignItems: 'center',
      alignContent:'center',
    },
    theme: {
        backgroundColor: '#e23439',
        color:'#fff',
    },
    themeText: {
      color:"#fff",
      fontSize:16,
      fontWeight:'bold',
      alignSelf:'center',
    },
    sactionWidth: {
      width: Width - 50,
    },
    fullWidth: {
        width: Width,
    },
    bold: {
      fontWeight: '700',
    },
    danger: {
      color: '#e93324',
    },
  
  });

  export default styles
  

