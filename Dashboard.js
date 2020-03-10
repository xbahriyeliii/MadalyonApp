import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import makale from './geciciveriler/makale';
export default class Dashboard extends Component {
  renderContactsItem = ({ item, index }) => {
    return (
      <TouchableOpacity>
        <View style={styles.box}>
          <Image style={{ width: 140, height: 120 }} source={{ uri: item.makale_foto }} />
          <View style={styles.rightbox}>
            <Text style={styles.header}>{item.makale_Ad}</Text>
            <Text style={styles.body}>
              {item.makale.length > 180 ? item.makale.substring(0, 180 - 3) + '...' : item.makale}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View>
        <FlatList renderItem={this.renderContactsItem} keyExtractor={(item) => item.makale_id} data={makale} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  box: {
    backgroundColor: '#e6e6e6',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16
  },
  body: {
    marginVertical: 10,
    width: 200
  }
});
