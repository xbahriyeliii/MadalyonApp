import React, { Component } from 'react';
import { View, Text ,FlatList,Image,TextInput,StyleSheet,TouchableOpacity} from 'react-native';
import makale from './geciciveriler/makale';
export default class Search extends Component {
    state = {
        text: '',
        data: makale,
    };
    serachfilter = text => {
        const newMakale =makale.filter(item=> {
            const listItem = `${item.makale_Ad.toLowerCase()}`
            return listItem.indexOf(text.toLowerCase()) > -1;
        })
        this.setState({
            data:newMakale,
        });
    };
  renderHeader =()=>{
      const {text} = this.state;
      return(
          <View style={styles.body}>
              <TextInput  
              onChangeText={text => {
                  this.setState({
                      text,
                  });
                  this.serachfilter(text);
              }}
              value={text} 
              placeholder="Search..." style={styles.inputstyle} 
             
              
              />
          </View>
      )
  }
  renderContactsItem = ({item,index}) => {
    return(
      <TouchableOpacity>
      <View style={styles.box}>
        <Image style={{width:50,height:60}}
        source={{uri: item.makale_foto}}/>
          <Text style={styles.header}>
            {item.makale_Ad}
          </Text>
          </View>

      </TouchableOpacity>
    )
  }
  
  render() {
    return (
      <View>
        <FlatList
            ListHeaderComponent={this.renderHeader()} 
            renderItem={this.renderContactsItem}
            keyExtractor= {(item)=>item.makale_id}
            data={this.state.data}
      />
      </View>
    );
  }
}
const styles = StyleSheet.create({
    inputstyle:{
        borderWidth:1,
        borderRadius:15,
        borderColor:'gray'
    },
    body:{
        padding:10,
    },
    box:{
        backgroundColor:'#e6e6e6',
        borderBottomColor:'orange',
        borderRadius:15,
        paddingHorizontal:10,
        paddingVertical:10,
        marginHorizontal:10,
        marginVertical:10,
        flexDirection:'row',
        alignItems:'center'
      },
    header:{
        marginHorizontal:10,
    }
})
