import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from '../../components/Header'
import Extrato from '../../components/Extrato';
import Movements from '../../components/Movements';
import Actions from '../../components/Actions';

const list = [
  {
    id: 1,
    label: 'Enxuto',
    value: '23,90',
    date: '22/10/2023',
    type: 0 //despesas
  },
  {
    id: 2,
    label: 'Pix Cliente Unoon',
    value: '45,00',
    date: '23/10/2023',
    type: 1 //receita/entrada
  },
  {
    id: 3,
    label: 'Salário',
    value: '4.300,20',
    date: '23/10/2023',
    type: 1 //receita/entrada
  },
]


export default function Home() {
  return (
    <View style={styles.container}>

        <Header name="Nicole Siqueira"/>

        <Extrato saldo="9.250,90" gastos="-527,00"></Extrato>

        <Actions/>

        <Text style={styles.title}>Últimas Movimentações</Text>

        <FlatList
          style={styles.list}
          data={list}
          keyExtractor={ (item) => String(item.id)} //convertendo pra string
          showsVerticalScrollIndicator={false} //nao ter barra de rolagem
          renderItem={ ({ item }) => <Movements data={item} />} //passar em todos renderizando
        
        
        ></FlatList>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14,
  },
  list:{
    marginStart: 14,
    marginEnd: 14,
    color: '#fff'
  
  }

});
