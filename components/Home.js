import React from 'react';
import { Text, View, TextInput, Pressable, Keyboard} from 'react-native';
import styles from '../styles/styles';
import { useState } from 'react';
import Gameboard from './Gameboard';


export default Home = ( {navigation} ) => {


    const [playerName, setPlayerName] = useState();
    const [hasPlayerName, setHasPlayerName] = useState(false);

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }


    return (
        <View styles={styles.container}>
            <Header></Header>
            <Text>Enter your name:</Text>
            { !hasPlayerName ? 
            <>
            <TextInput onChangeText={setPlayerName} autoFocus={true}></TextInput>
            <Pressable styles={styles.button} onPress={() => handlePlayerName(playerName)}>
                <Text styles={styles.buttonText}>Ok</Text>
            </Pressable>
            </>
            :
            <>
            <Text>Rules of the game:</Text>
            <Text>Good luck! {playerName}</Text>
            <Pressable onPress={() => navigation.navigate('Gameboard', {player : playerName})}>
                <Text>Play</Text>
            </Pressable>
            </>
            }
            <Footer></Footer>
         </View>

    
    )
}