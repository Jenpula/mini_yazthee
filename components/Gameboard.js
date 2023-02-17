import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Pressable } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../styles/styles'
import { NBR_OF_DICES, nbrOfThrowsLeft, nbrOfWins, NBR_OF_THROWS, BONUS_POINTS, BONUS_POINTS_LIMIT, WINNING_POINTS, MAX_SPOT } from '../constants/Game';
import { Grid, Col } from 'react-native-easy-grid';



let board = [];


export default Gameboard = ( {route} ) => {


   

    const [playerName, setPlayerName] = useState('');
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [nbrOfWins, setNbrOfWins] = useState(0);
    const [sum, setSum] = useState(0);
    const [status, setStatus] = useState('');
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES). fill(0));
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0))
    

    
const row = [];
for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
        <Pressable
        key={'row' + i}
        onPress={() => selectDice(i)}>
     <MaterialCommunityIcons
        name={board[i]}
        key={'row' + i}
        size={50}
        color={getDiceColor(i)}>
     </MaterialCommunityIcons>
     </Pressable>
    );
}

const pointsRow = [];
for (let spot = 0; spot < MAX_SPOT; spot++) {   
    pointsRow.push (
        <Col key={'points' + spot} >
            <Text style={styles.points} key={'points' + spot}>0</Text>
        </Col>
    )
}

const buttonRow = [];
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        buttonRow.push(
    <Col key={'buttonRow' + diceButton}>
        <Pressable
        key={'buttonRow' + diceButton}>
            <MaterialCommunityIcons
                name={'numeric-' + (diceButton + 1) + '-circle'}
                key={'buttonRow' + diceButton}
                size={40}
                color={'steelblue'}>
            </MaterialCommunityIcons>
        </Pressable>
    </Col>
    )
}

     function getDiceColor(i) {
    if (board.every((val, i, arr) => val === arr[0])) {
      return "orange";
    }
    else {
      return selectedDices[i] ? "black" : "steelblue";
    }
  }

     const selectDice = (i) => {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
     }

    const throwDices = () => {
        let sum = 0;
        for(let i = 0; i < NBR_OF_DICES; i++) {
            if(!selectedDices[i]) {
            let randomNumber = Math.floor(Math.random() * 6 + 1);
            board[i] = 'dice-' + randomNumber;
            sum += randomNumber
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
        setSum(sum);
    }
    
    const checkWinner = () => {
        if (sum >= WINNING_POINTS && nbrOfThrowsLeft > 0) {
            setStatus('You won');
           
        }
     else if (sum >= WINNING_POINTS && nbrOfThrowsLeft === 0) {
        setStatus('You won, game over');
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
      
    } 
    else if (nbrOfWins > 0 && nbrOfThrowsLeft === 0) {
        setStatus('You won, game over');
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    }
    else if (nbrOfThrowsLeft === 0) {
        setStatus('Game over');
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    }
    else {
        setStatus('Keep on throwing!');
    }
}

useEffect(() => {
    checkWinner();
    if ( playerName ===  '' && route.params?.player) {
        setPlayerName(route.params.player);
    }

    if ( nbrOfThrowsLeft === NBR_OF_THROWS) {
        setStatus('Game has not started');
    }
    if (nbrOfThrowsLeft < 0) {
        setNbrOfThrowsLeft(NBR_OF_THROWS-1);
        setNbrOfWins(0);
    }
}, [nbrOfThrowsLeft]);


return (
    
    <View style={styles.gameboard}>
        <Header></Header>
        <Text style={styles.flex}>{row}</Text>
        <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
        <Text style={styles.gameinfo}>{status}</Text>
        <Pressable style={styles.button}
            onPress={() => throwDices()}>
            <Text style={styles.buttonText}>
                Throw dices
            </Text>
        </Pressable>
        <View style={styles.dicepoints}><Grid>{pointsRow}</Grid></View>
        <View style={styles.dicepoints}><Grid>{buttonRow}</Grid></View>
        <Text styles={styles.gameinfo}>Total: {sum}</Text>
        <Text>You are {sum} away from bonus</Text>
        <Text styles={styles.author}>Player: {playerName}</Text>
        <Footer></Footer>
    </View>
)
}