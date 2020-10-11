import React, { Component } from 'react'

import hatImg    from  '../img/hat.svg'
import peaceImg  from  '../img/peace.svg'
import docImg    from  '../img/doc.svg'
import policeImg from  '../img/police.svg'
import knifeImg  from  '../img/knife.svg'
import loveImg   from  '../img/love.svg'
import backArrow   from  '../img/back-arrow.svg'

export default class Choice extends Component {

  constructor(props) {
    super (props)

    this.state = {
      shuffleList: NaN
    }
  }
  players = this.props.players
  roles   = this.props.roles


  distribution () {
    let shufflePlayers = this.players.slice().sort(() => Math.random() - 0.5)
    let shuffleList = {
      'Мафия': [], 
      'Мирный': [], 
      'Доктор': [], 
      'Шриф': [], 
      'Маньяк': [], 
      'Любовница': []
    }

    this.roles.forEach((element, index) => {
      let key
      if (index === 0) {
        key = 'Мафия'
      }else if (index === 1){
        key = 'Мирный'
      }else if (index === 2){
        key = 'Доктор'
      }else if (index === 3){
        key = 'Шриф'
      }else if (index === 4){
        key = 'Маньяк'
      }else if (index === 5){
        key = 'Любовница'
      }  
      if (element > 1){
        for (let i = 0; i < element; i++)
          shuffleList[key].push(shufflePlayers.shift())
      } else if (element === 1){
        shuffleList[key].push(shufflePlayers.shift())
      }
      
      this.setState({
        shuffleList: shuffleList
      })
    })
  }
  

  render() {
    
    if (!this.state.shuffleList){
      this.distribution () 
    }

    return (
      <div className='container'>
        <div className='content'>
          
          <button className='btn-back choice__btn-back' onClick={() => { this.props.backStart () } } >
            <img 
              src = { backArrow }
              alt = 'Back'
            />
          </button>   
          
          <div className = 'choice'>
            <BadRoles   shuffleList = { this.state.shuffleList } />
            <GoodRoles  shuffleList = { this.state.shuffleList } />

            <div className = 'btn-box'>
              <button className = 'btn' onClick={() => { this.distribution () } }> Перемешать </button>
              <button className = 'btn' onClick={() => { this.props.toGame(this.state.shuffleList) } }> Начать </button>
            </div>
          </div>
        </div>
      </div>  
    )
  }
}

function BadRoles (props) {
  let mafia  = <></>
  let killer = <></>

  function renderList (key, img) {
    let role = <></>
    if (props.shuffleList[key].length > 0) {
      
      // Список
      props.shuffleList[key].forEach(( value ) => {
        role = <>{ role } <div> { value } </div></>
      }) 

      // Миниатюра над списком
      role = 
      <div className='choice-box'>
        <img src={ img } width='8%' alt=''/>
        { role }
      </div>
    }
    return role
  }
  
  if (props.shuffleList){
    mafia  = renderList  ('Мафия',  hatImg)
    killer  = renderList ('Маньяк', knifeImg)
  }

  return (
    <div className='box'>
      { mafia  }
      { killer }
    </div>
  )
}

function GoodRoles (props) {
  let peace  = <></>
  let doc = <></>
  let police = <></>
  let love = <></>
  
  function renderList (key, img) {
    let role = <></>
    if (props.shuffleList[key].length > 0) {
      // Список
      props.shuffleList[key].forEach(( value ) => {
        role = <>{ role } <div> { value } </div></>
      }) 

      // Миниатюра над списком
      role = 
      <div className='choice-box'>
        <img src={ img } width='8%' alt=''/>
        { role }
      </div>
    }
    return role
  }

  if (props.shuffleList){
    peace  = renderList  ('Мирный',    peaceImg)
    doc  = renderList    ('Доктор',    docImg)
    police  = renderList ('Шриф',      policeImg)
    love  = renderList   ('Любовница', loveImg)

  }

  return (
    <div className='box'>
      { peace  }
      { doc    }
      { police }
      { love   }
    </div>
  )
}