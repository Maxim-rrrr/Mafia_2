import React, { Component } from 'react'

import hat    from  '../img/hat.svg'
import peace  from  '../img/peace.svg'
import doc    from  '../img/doc.svg'
import police from  '../img/police.svg'
import knife  from  '../img/knife.svg'
import love   from  '../img/love.svg'


export default class Start extends Component {
  constructor(props) {
    super (props);

    this.state = {
      error: 'standard'
    }
  }
  
  players = this.props.players 
  roles = this.props.roles

 

  upDate() {
    this.props.upDataPlayers(this.players) 
    this.props.upDataRoles(this.roles) 
  }
 
  // Изменения input 
  changeInput (event, index) {

    this.players[index] = event.target.value

    this.upDate()
  }
  
  // Добавление играков
  addPlayers () {
    this.players = [...this.players, '']
    
    this.upDate()
  }

  // Удаление играков
  removePlayers ( index ) {
    if ( this.players.length - this.sumRoles() !== 0 ){
      let newPlayers = this.players   
      newPlayers.splice(index, 1);
  
      this.upDate()
      this.setState({
        error: 'standard'
      })
    } else {
      this.setState({
        error: 'minusPlayer'
      })
    }
  }

  // Сумма назначенных ролей
  sumRoles () {
    let sum = 0
    for (let i = 0; i < this.roles.length; i++){
      sum += this.roles[i]
    }
    
    return sum
  }
  
  // Сообщение об ошибке
  Error (message = 'standard') {
    if (message === 'standard') {
      return (
        <></>
      )
    } else if (message === 'names') {
      return (
        <div className='error'>
          Дайте имена всем игрокам
        </div>
      )
    } else if (message === 'roles') {
      return (
        <div className='error'>
          Распределите все роли
        </div>
      )
    } else if (message === 'minusPlayer') {
      return (
        <div className='error'>
          Сначала уберите роль для этого игрока
        </div>
      )
    } else if (message === 'nullPlayers') {
      return (
        <div className='error'>
          Назначьте играков 
        </div>
      )
    }
  }

  // Переход к следующему окну с обработкой ошибок
  toChoice () {
    let nameError = false
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i] === ''){
        nameError = true
      }
    }

    if (nameError) {
      this.setState({
        error: 'names'
      })
    } else if (this.players.length - this.sumRoles() !== 0) {
      this.setState({
        error: 'roles'
      })
    } else if (this.players.length === 0) {
      this.setState({
        error: 'nullPlayers'
      })
    } else {
      this.props.toChoice()
    }
    
  }

  render() {   
    // Вся колонка с inputs имём играков
    let inputList = this.props.players.map((value, index) => {          
      return ( 
        <InputName 
          value=          { value }
          index=          { index }
          key=            { index }
          removePlayers=  { ( index ) => this.removePlayers( index ) }
          onChange=       { ( event, index  ) => this.changeInput( event , index ) }
        /> 
      )    
    })
    
    // Вся колонка с ролями
    let rolesList = this.props.roles.map((value, index) => {   
      const imgs     = [hat, peace, doc, police, knife, love] 
      const roleName = ['Мафия', 'Мирный', 'Доктор', 'Шриф', 'Маньяк', 'Любовница']       
      
      return (
        <Role 
          name  = { roleName[index] }
          count = { value }
          img   = { imgs[index] }
          key   = { roleName[index] }
          index = { index }

          // Прибавить к роли 
          plus  = {(index) => {
            if (this.sumRoles() < this.players.length) {
              this.roles[index] += 1 
              this.upDate()
            }
          }}
          // Убавить от роли
          minus = {(index) => {
            if (this.roles[index] > 0) {
              this.roles[index] -= 1 
            }
            this.upDate()
          }}
          
        /> 
      )    
    })
    
    return (
      <>
        <div className='container'>
          <div className='content'>
            <div className='choice'>
                <div className='box'>
                  { inputList }  
                </div>
                
                <div className='box'>                   
                  { rolesList }
                  <div className="roles__loose">

                    Не выбранных ролей: { this.players.length - this.sumRoles() }
                  </div>
                </div>
                
                <div className='btn-box'>
                  <button className='btn' onClick={() => { this.addPlayers() } }> Добавить игрока </button>
                  <button className='btn' onClick={() => { this.toChoice()   } }> Распределить роли </button>
                </div>
            
            </div>
          </div>
        </div>  
        
        { this.Error(this.state.error) }
      </>
    )
  }
}

function InputName(props) {
  return (
    <>
      <div className='input-group'>
        <input 
          type=         'text'
          className=    'choice__input' 
          placeholder=  'Игрок'
          onChange=     { ( event ) => props.onChange( event, props.index ) } 
          index=        { props.index }
          value=        { props.value }
        />

        <button 
          className=  'del' 
          onClick=    { ( event ) => props.onChange( event, props.index ), () => props.removePlayers(props.index) }
        />

      </div>
    </>
  )
}

function Role (props) {
  return (
    <div className='role' key={ props.key }>
      <img src={ props.img } alt='alt'/>
      <span> { props.name } </span>
      <div className='role__number'>
        <div className='minus' onClick={ () => props.minus( props.index ) }></div>
        <div className='value'> { props.count } </div>
        <div className='plus' onClick={ () => props.plus( props.index ) }></div>
      </div>
    </div>
  )
}