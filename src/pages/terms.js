import React from 'react';
import { ScrollView , Text, StyleSheet } from 'react-native';

const Terms = () => {
   return (
      <ScrollView  style={styles.container}>
         <Text style={styles.paragraph}>The Intellectual Property disclosure will inform users that the contents, logo and other visual media you created is your property and is protected by copyright laws.</Text>
         <Text style={styles.paragraph}>A Termination clause will inform that users’ accounts on your website and mobile app or users’ access to your website and mobile (if users can’t have an account with you) can be terminated in case of abuses or at your sole discretion.</Text>
         <Text style={styles.paragraph}>A Governing Law will inform users which laws govern the agreement. This should the country in which your company is headquartered or the country from which you operate your website and mobile app.</Text>
         <Text style={styles.paragraph}>A Links To Other Web Sites clause will inform users that you are not responsible for any third party websites that you link to. This kind of clause will generally inform users that they are responsible for reading and agreeing (or disagreeing) with the Terms and Conditions or Privacy Policies of these third parties.</Text>
         <Text style={styles.paragraph}>If your website or mobile app allows users to create content and make that content public to other users, a Content section will inform users that they own the rights to the content they have created. The “Content” clause usually mentions that users must give you (the website or mobile app developer) a license so that you can share this content on your website/mobile app and to make it available to other users.</Text>
         <Text style={styles.paragraph}>The Intellectual Property disclosure will inform users that the contents, logo and other visual media you created is your property and is protected by copyright laws.</Text>
         <Text style={styles.paragraph}>A Termination clause will inform that users’ accounts on your website and mobile app or users’ access to your website and mobile (if users can’t have an account with you) can be terminated in case of abuses or at your sole discretion.</Text>
      </ScrollView >
   )
}
export default Terms

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
   },
   paragraph: {
      margin:10,
   }
 
 });
 