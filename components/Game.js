import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity ,ImageBackground} from 'react-native';
import images from '../data.js'

const emptyBoard = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]];

export default function Game() {
  const [initialState, setInitialState] = useState(emptyBoard);
  const [questionImages, setQuestionImages] = useState(images[0]);
  const [currentRevealed, setCurrentRevealed] = useState({});
  const [ifAnswer, setIfAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);

  useEffect(()=>{
    initBoard();
  },[])

  const initBoard = () =>{
    let photoNum = Math.floor(Math.random()*7);
    let img = images[photoNum];

    var board = emptyBoard.map(function(arr) {
      return arr.slice();
    });
    setQuestionImages(img);
    revealed(board);
  }

  const revealed = (board) => {
    let obj = {...currentRevealed}
    let i = Math.floor(Math.random()*5);
    let j = Math.floor(Math.random()*4);
    var array = board.map(function(arr) {
      return arr.slice();
    });
    array[i][j] = 1;
    if(!currentRevealed[[i,j]]){
      obj[[i,j]] = true;
      setCurrentRevealed(obj);
    } else {
      revealed(board);
      return;
    }
    setInitialState(array);
  }

  const handleOnChange = (text) => {
    if(text === questionImages.name) {
      alert('You are correct')
      setIfAnswer(true);
      setScore(score + 10);
      setQuestionNumber(questionNumber + 1);
      setCurrentRevealed({});
      initBoard();
    }
  }

  return (
    <View style={styles.container}>

      <View style={[styles.box, styles.box0]}>
        <Text>{score}/100</Text>
      </View>

      <View style={[styles.box, styles.box1]}>
        <Text>Question {questionNumber}</Text>
      </View>


      <View style={[styles.box, styles.box2]}>
       <ImageBackground source={questionImages.url} style={styles.image}>
        <View style={{flexDirection: "row"}}>
          {initialState[0].map((item, index)=> {
            if(item === 0 ) {
              return <View style={styles.tile} key={index} />
            } else {
              return <View style={styles.revealed} key={index} />
            }
          })}
        </View>
        <View style={{flexDirection: "row"}}>
          {initialState[1].map((item, index)=> {
            if(item === 0 ) {
              return <View style={styles.tile} key={index} />
            } else {
              return <View style={styles.revealed} key={index} />
            }
          })}
        </View>
        <View style={{flexDirection: "row"}}>
          {initialState[2].map((item, index)=> {
            if(item === 0 ) {
              return <View style={styles.tile} key={index} />
            } else {
              return <View style={styles.revealed} key={index} />
            }
          })}
        </View>
        <View style={{flexDirection: "row"}}>
          {initialState[3].map((item, index)=> {
            if(item === 0 ) {
              return <View style={styles.tile} key={index} />
            } else {
              return <View style={styles.revealed} key={index} />
            }
          })}
        </View>
        <View style={{flexDirection: "row"}}>
          {initialState[4].map((item, index)=> {
            if(item === 0 ) {
              return <View style={styles.tile} key={index} />
            } else {
              return <View style={styles.revealed} key={index} />
            }
          })}
        </View>
       </ImageBackground>
      </View>



      <View style={[styles.box, styles.box3]}>
        <TextInput
          style={{height:40}}
          placeholder='Type your guess HERE'
          onChangeText={(text) => handleOnChange(text)} />
      </View>

      <View style={[styles.box, styles.box4]}>

      </View>

      <View style={[styles.box, styles.box5]}>
        <TouchableOpacity
          onPress={()=>revealed(initialState)}
          style ={styles.button}>
          <Text style={styles.buttonText}>Reavel MORE</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  box: {
    width: '100%',
    justifyContent:'center',
    alignItems:'center'
  },

  box0: {
    flex:1,
    backgroundColor: '#35D461'
  },

  box1: {
    flex:1,
    backgroundColor: '#F9E104'
  },

  box2: {
    flex:8,
    backgroundColor: '#F99D07'
  },

  box3: {
    flex:1,
    backgroundColor: '#882FF6',
    flexDirection: 'row',

  },

  box4: {
    flex:1,
    backgroundColor: '#37B6F6',
    flexDirection: 'row'
  },

  box5: {
    flex:1,
    backgroundColor: 'grey',
    width: '100%',

  },

  button: {
    backgroundColor: '#37B6F6',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  tile: {
    borderWidth: 1,
    width: 90,
    height: 90,
    backgroundColor:'green',
  },

  revealed: {
    borderWidth: 1,
    width: 90,
    height: 90,
  },

  image: {
    resizeMode: "cover",
    justifyContent: "center"
  },
});
