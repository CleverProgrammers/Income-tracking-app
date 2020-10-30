import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, Text, TextInput, Button, View, SafeAreaView } from 'react-native';
import Todo from './Todo';
import {BarChart, LineChart} from "react-native-chart-kit";
import moment from 'moment';

const App = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([
      { date: moment(), amount: 2000 },
      { date: moment().subtract(1, 'days'), amount: 2500 },
      { date: moment().subtract(1, 'days'), amount: 3500 },
      { date: moment().subtract(1, 'days'), amount: 3500 },
      { date: moment().subtract(1, 'days'), amount: 3500 },
      { date: moment().subtract(7, 'days'), amount: 3500 },
      { date: moment().subtract(6, 'days'), amount: 3500 },
      { date: moment().subtract(5, 'days'), amount: 3500 },
      { date: moment().subtract(4, 'days'), amount: 3500 },
      { date: moment().subtract(3, 'days'), amount: 4500 },
      { date: moment().subtract(2, 'days'), amount: 5500 },
      { date: moment().subtract(2, 'days'), amount: 5500 },
    ])
    const [transformedData, setTransformedData] = useState([]);

    useEffect(() => {
      setTransformedData(sortEntries(transformEntries(data)));
    }, [data])

    const [gigs, setGigs] = useState([
      {
        description: 'Freelance job with Qazi',
        amount: 499.99,
        timestamp: new Date()
      }
    ]);

    const getDates = () => transformedData.map(pair => pair.date.format('MM/DD'));
    const getAmounts = () => transformedData.map(pair => pair.amount);
    const transformEntries = entries => entries.reduce((entries, {date, amount}) => {
        let previousEntry = entries.find(({date: previousDate}) => previousDate.isSame(date));

        if (!previousEntry) {
            previousEntry = entries[entries.push({date, amount: 0}) - 1];
        }

        previousEntry.amount = previousEntry.amount + amount;

        return entries;
    }, []);
    const sortEntries = entries => entries.sort(({date: a}, {date: b}) => a.diff(b));

    console.log('DEBUG 🔥', data)
    console.log('The Dates ⏲️', getDates())
    console.log('The Amounts ⏲️', getAmounts())
    console.log('The Total grouped value 👽', transformEntries(data))

    useEffect(() => {
     setTotal(gigs.reduce((total, gig) => total+Number(gig.amount), 0));
    }, [gigs])

    const addGig = () => {
      setGigs([...gigs, {
        description: description,
        amount: amount
      }]);

      setData([
        ...data,
        { 
         date: moment(),
         amount: Number(amount)
        }
      ]);

      setDescription('');
      setAmount('');
    }

    return (
      <SafeAreaView>
        <View>
          <Text style={styles.titleText}>
            Let's build a React Native App for Freelance Devs to Track Income 🚀 🚀 🚀</Text>
        </View>
        <View>
          <Text>Bezier Line Chart</Text>
          <LineChart
            data={{
              labels: getDates(),
              datasets: [
                {
                  data: getAmounts()
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "green",
              backgroundGradientTo: "green",
              decimalPlaces: null, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
        <Text>Total Income: ${total} </Text>
        <TextInput 
          style={styles.input}
          value={description}
          placeholder='Enter a description'
          onChangeText={text => setDescription(text)}
        />
        <TextInput 
          style={styles.input}
          value={amount}
          placeholder='Enter the amount you made in USD ($)'
          keyboardType='numeric'
          onChangeText={text => setAmount(text)}
        />
        <Button disabled={!amount && !description} onPress={addGig} title='Add Gig 🚀'/>

        {gigs.map(gig => (
          <View>
            <Text>{gig.description}</Text>
            <Text>${gig.amount}</Text>
          </View>
        ))}

        
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    height: 40,
    borderColor: 'red',
    borderWidth: 1
  },
  titleText: {
    // backgroundColor: 'red',
    fontSize: 30,
    fontWeight: "bold",
  }, 
});

export default App;
