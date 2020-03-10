import * as React from 'react';
import { Text, View, Image, StyleSheet, FlatList, Dimensions, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { Card, Button } from 'react-native-elements';
import makale from './geciciveriler/makale.js';
import kullanici from './geciciveriler/kullanici.js';
import sorular from './geciciveriler/sorular';
import Dashboard from './Dashboard';
import Search from './Search';
import ProfilView from './ProfilView';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabView, SceneMap } from 'react-native-tab-view';
import Modal from 'react-native-modal';

function AnaSayfa({ navigation }) {
  return (
    <View style={styles.view}>
      <View style={styles.asheader}>
        <View style={styles.asheader}>
          <Icon name="user" size={40} color="orange" />
          <Text style={styles.textstyle}>Arayüz tercihi</Text>
          <Text style={styles.textstyle}>Kullanıcı Adı</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Ayarlar')}>
          <Icon name="cog" size={40} color="orange" />
        </TouchableOpacity>
      </View>
      <View style={styles.asbody}>
        <Dashboard />
      </View>
    </View>
  );
}
function Ayarlar() {
  return (
    <View style={styles.view}>
      <View style={styles.asbody}>
        <Card title="Hesap">
          <Text>Lorem ipsum dolor sit amet.</Text>
          <TextInput
            placeholder="..."
            style={{
              borderWidth: 0.5,
              paddingHorizontal: 20,
              paddingVertical: 0,
              height: 'auto',
              marginTop: 10,
              borderColor: '#e67300'
            }}
          />
        </Card>

        <Card title="Kişisel Bilgiler">
          <Text>Lorem ipsum dolor sit amet.</Text>
          <TextInput
            placeholder="..."
            style={{
              borderWidth: 0.5,
              paddingHorizontal: 20,
              paddingVertical: 0,
              height: 'auto',
              marginTop: 10,
              borderColor: '#e67300'
            }}
          />
        </Card>

        <Card title="Gizlilik">
          <Text>Lorem ipsum dolor sit amet.</Text>
          <TextInput
            placeholder="..."
            style={{
              borderWidth: 0.5,
              paddingHorizontal: 20,
              paddingVertical: 0,
              height: 'auto',
              marginTop: 10,
              borderColor: '#e67300'
            }}
          />
        </Card>

        <Button
          icon={<Icon name="sign-out" size={35} color="orange" style={{ marginRight: 10 }} />}
          title="Çıkış Yap"
          buttonStyle={{ width: 150, margin: 15, color : "#000" }}
          type="outline"
        />
      </View>
    </View>
  );
}

function Arama() {
  return (
    <View style={styles.view}>
      <Search />
    </View>
  );
}

const gelenSorular = () => {
  const [ isVisible, setIsVisible ] = React.useState(false);

  return (
    <View style={{}}>
      {sorular.map((u, i) => {
        if (u.type === 'incoming')
          return (
            <View>
              <Card title="Gelen Soru">
                <View key={i} style={styles.user}>
                  <Text style={styles.name}>{u.owner}</Text>
                  <Text>{u.content}</Text>
                </View>
                <View>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }} />
                    <View style={{ display: 'flex', flexDirection: 'row-reverse', flex: 1 }}>
                      <Button
                        style={{ width: 'min-content' }}
                        title="Cevapla"
                        type="outline"
                        onPress={() => setIsVisible(!isVisible)}
                      />
                      <Icon name="trash" size={35} color="orange" style={{ marginRight: 10 }} />
                    </View>
                  </View>
                </View>
              </Card>
              <Modal isVisible={isVisible}>
                <View style={{ flex: 1 }}>
                  <View style={{ flex: 0.5, backgroundColor: '#fff', padding: 10 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Soruyu Cevapla</Text>
                    <TextInput placeholder="Cevabiniz..." />
                    <Button title="Gonder" onPress={() => setIsVisible(!isVisible)} />
                  </View>
                </View>
              </Modal>
            </View>
          );
      })}
    </View>
  );
};

const sorulanSorular = () => (
  <View style={{}}>
    <View style={{}}>
      {sorular.map((u, i) => {
        if (u.type === 'outgoing')
          return (
            <Card title="Sorulan Soru">
              <View key={i} style={styles.user}>
                <Text style={styles.name}>{u.owner}</Text>
                <Text>Durum : {u.status === 'unanswered' ? 'Henuz Cevaplanmamis' : 'Sorunuz Cevaplandi'}</Text>
              </View>
              <View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }} />
                  <View style={{ display: 'flex', flexDirection: 'row-reverse', flex: 1 }}>
                    <Button style={{ width: 'min-content' }} title="Iptal Et" type="outline" />
                    <Button
                      style={{ width: 'min-content' }}
                      title="Yinele"
                      type="outline"
                      buttonStyle={{ marginRight: 10 }}
                    />
                  </View>
                </View>
              </View>
            </Card>
          );
      })}
    </View>
  </View>
);

const initialLayout = { width: Dimensions.get('window').width };

function Sorular() {
  const [ index, setIndex ] = React.useState(0);
  const [ routes ] = React.useState([
    { key: 'first', title: 'Gelen Sorular' },
    { key: 'second', title: 'Sorulan Sorular' }
  ]);

  const renderScene = SceneMap({
    first: gelenSorular,
    second: sorulanSorular
  });

  return (
    <View style={styles.view}>
      <View style={styles.asheader}>
        <View style={styles.asheader}>
          <Icon name="user" size={40} color="orange" />
          <Text style={styles.textstyle}>Arayüz tercihi</Text>
          <Text style={styles.textstyle}>Kullanıcı Adı</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Ayarlar')}>
          <Icon name="cog" size={40} color="orange" />
        </TouchableOpacity>
      </View>
      <View style={styles.asbody}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </View>
    </View>
  );
}

function Profil({ navigation }) {
  return (
    <View style={styles.view}>
      <View style={styles.asheader}>
        <View style={styles.asheader}>
          <Icon name="user" size={40} color="orange" />
          <Text style={styles.textstyle}>Arayüz tercihi</Text>
          <Text style={styles.textstyle}>Kullanıcı Adı</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Ayarlar')}>
          <Icon name="cog" size={40} color="orange" />
        </TouchableOpacity>
      </View>
      <View style={styles.asbody}>
        <ProfilView />
      </View>
    </View>
  );
}
function eklebuton() {
  return (
    <View style={styles.view}>
      <Text>Makale ekle</Text>
    </View>
  );
}
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const navigationOptionHandler = () => ({
  headerShown: false
});
function AnaSayfaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AnaSayfa" component={AnaSayfa} options={navigationOptionHandler} />
      <Stack.Screen name="Ayarlar" component={Ayarlar} options={navigationOptionHandler} />
    </Stack.Navigator>
  );
}

function ProfilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profil" component={Profil} options={navigationOptionHandler} />
      <Stack.Screen name="Ayarlar" component={Ayarlar} options={navigationOptionHandler} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            if (route.name === 'Ekle') {
              return <Icon name="plus-circle" size={70} color="orange" />;
            } else if (route.name === 'AnaSayfa') {
              return <Icon name="home" size={30} color="orange" />;
            } else if (route.name === 'Arama') {
              return <Icon name="search" size={30} color="orange" />;
            } else if (route.name === 'Sorular') {
              return <Icon name="question-circle" size={30} color="orange" />;
            } else {
              return <Icon name="user" size={30} color="orange" />;
            }
          }
        })}
        tabBarOptions={{
          activeTintColor: '#e67300',
          inactiveTintColor: 'orange',
          inactiveBackgroundColor: '#e6e6e6',
          activeBackgroundColor: '#e6e6e6',
          labelStyle: {
            fontWeight: 'bold'
          },
          showIcon: true
        }}
      >
        <Tab.Screen name="AnaSayfa" component={AnaSayfaStack} />
        <Tab.Screen name="Arama" component={Arama} />
        <Tab.Screen name="Ekle" component={eklebuton} />
        <Tab.Screen name="Sorular" component={Sorular} />
        <Tab.Screen name="Profil" component={ProfilStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#f2f2f2',
    flex: 1
  },
  header: {
    flex: 1
  },
  asheader: {
    borderRadius: 15,
    backgroundColor: '#f2f2f2',
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 2,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  asbody: {
    flex: 8
  },
  textstyle: {
    marginHorizontal: 10,
    fontSize: 16
  },
  name: {
    fontWeight: 'bold'
  }
});
