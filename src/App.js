import React, { Component } from 'react';

import './css/App.css';

import Start from './components/Start'
import Choice from './components/Choice'
import Game from './components/Game'

export default class App extends Component {
  constructor(props) {
    super (props);

    this.state = {
      // Состояние игры
      statusGame: 'Start', 

      // Имена играков
      players: [],

      // Очередь голосование играков
      playersQueue: [],

      // Роли
      roles: Array(6).fill(0),

      // История ходов
      history: []
    }
  }

  // Интерфейс для обновления состояния players компонентами
  upDataPlayers (date) {
    this.setState({
      players: date
    })
  }

  // Интерфейс для обновления состояния roles компонентами
  upDataRoles (date) {
    this.setState({
      roles: date
    })
  }

  // Обновление истории ходов
  upDataHistory (date) {
    this.setState({
      history: [...this.state.history, date]
    })
  }
  

  backStart () {
    this.setState({
      statusGame: 'Start', 
    })
  }

  toChoice () {
    this.setState({
      statusGame: 'Choice', 
    })
  }

  toGame (shuffleList) {
    let game = []
    for (let i in shuffleList) {
      for (let j = 0; j < shuffleList[i].length; j++) {
        game.push([i, shuffleList[i][j], true])
      }
    }
    
    this.setState({
      playersQueue: this.state.players,
      statusGame: 'Game', 
      shuffleList: shuffleList,
      game: game
    })
  }

  
  render() {
    if (this.state.statusGame === 'Start') {
      return (
        <Start 
          players       =  { this.state.players }
          roles         =  { this.state.roles   }

          upDataPlayers =  { ( date )  =>  this.upDataPlayers  ( date ) }
          upDataRoles   =  { ( date )  =>  this.upDataRoles    ( date ) }

          toChoice      =  { (      )  =>  this.toChoice       (      ) }
        /> 
      )
    } else if (this.state.statusGame === 'Choice') {
      return (
        <Choice 
          players   =  { this.state.players }
          roles     =  { this.state.roles   }

          backStart =  { (           ) => this.backStart (           ) }
          toGame    =  { (shuffleList) => this.toGame    (shuffleList) }
        />
      )
    } else if (this.state.statusGame === 'Game') {
      return (
        <Game 
          players       =  { this.state.playersQueue }
          game          =  { this.state.game }

          upDataHistory =  { ( date ) => this.upDataHistory ( date ) }

          toChoice      =  { () => this.toChoice () }
        />
      )
    } //else if (this.state.statusGame === 'end') {
  //     return (
  //       <End />
  //     )
  //   }
  // }
  }
}
