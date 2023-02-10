import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Pressable } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../styles/styles'



let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 5;
const WINNING_POINTS = 23;
const MIN_SPOT = 1;
const MAX_SPOT = 6;
const BONUS_POINTS_LIMIT = 63;
const BONUS_POINTS = 50;


export default Gameboard = () => {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [nbrOfWins, setNbrOfWins] = useState(0);
    const [sum, setSum] = useState(0);
    const [status, setStatus] = useState('');
    const [selectedDices, setSelectedDices] =
    useState(new Array(NBR_OF_DICES).fill(false));

     function getDiceColor(i) {
        return selectedDices[i] ? 'black' : 'steelblue';        
         
     }

     const selectDice = (i) => {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
     }

    const throwDices = () => {
        let sum = 0;
        for(let i = 0; i < NBR_OF_DICES; i++) {
            let randomNumber = Math.floor(Math.random() * 6 + 1);
            board[i] = 'dice-' + randomNumber;
            sum += randomNumber
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
    if ( nbrOfThrowsLeft === NBR_OF_THROWS) {
        setStatus('Game has not started');
    }
    if (nbrOfThrowsLeft < 0) {
        setNbrOfThrowsLeft(NBR_OF_THROWS-1);
        setNbrOfWins(0);
    }
}, [nbrOfThrowsLeft]);


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
return (
    <View style={styles.gameboard}>
        <Text style={styles.flex}>{row}</Text>
        <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
        <Text style={styles.gameinfo}>{status}</Text>
        <Pressable style={styles.button}
            onPress={() => throwDices()}>
            <Text style={styles.buttonText}>
                Throw dices
            </Text>
        </Pressable>
        <Text styles={styles.gameinfo}>Total: {sum}</Text>
    </View>
)
}