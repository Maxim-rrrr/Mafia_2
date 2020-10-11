import React, { Component } from 'react'

import hatImg      from  '../img/hat.svg'
import peaceImg    from  '../img/peace.svg'
import docImg      from  '../img/doc.svg'
import policeImg   from  '../img/police.svg'
import knifeImg    from  '../img/knife.svg'
import loveImg     from  '../img/love.svg'
import backArrow   from  '../img/back-arrow.svg'


export default class Game extends Component {
  constructor(props) {
    super (props);

    this.state = {
      day: 1,
      time: 'День', // Ночь
      message: 'Знакомство'
    }
  }

  render() {
    // let history = this.props.history

    return (
      <div className='container'>
        <div className='content'>
          <div className='title'>
            <button className='btn-back' onClick={() => { this.props.toChoice () } } >
              <img 
                src={ backArrow }
                alt='Back'
              />
            </button>
            <h2> { this.state.time } { this.state.day } <span className='tl'> { this.state.message } </span> </h2>
          </div>

          <div className='choice'>
            <RenderDayList
              players = { this.props.players }
              game = { this.props.game }
            />

            <div className='btn-box'>
              {/* <button className='btn' onClick={() => { this.distribution () } }> Перемешать </button>
              <button className='btn' onClick={() => { this.props.toGame(this.state.shuffleList) } }> Начать </button> */}
            </div>
          </div>

        </div>
      </div>  
    )
  }
}

function RenderDayList(props) {
  let players = props.players
  let game    = props.game

  let list = players.map((name) => {
    for (let i = 0; i < game.length; i++) {
      if ( game[i][1] === name ) {
        const imgs = {
          'Мафия': hatImg,
          'Мирный': peaceImg,
          'Доктор': docImg,
          'Шриф': policeImg, 
          'Маньяк': knifeImg, 
          'Любовница':loveImg
        }

        return <div className='role play-list'> <img src={ imgs[game[i][0]] } alt='' /> { name } </div>
      }
    } 
  })
  return (
    <div className='full-box'>
      { list }
    </div>
  )
}


