import {useState} from 'react';

export default function Player({initialName, symbol, isActive, onChangeName}){
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false); //başlangıçta düzenleme moduna ihtiyaç olmayacağı için false başlattık.
   
    function handleEditClick(){
         //setIsEditing(isEditing ? false : true);   //isEditing true ise false yap, false ise true yapıyoruz.
        //setIsEditing(!isEditing); // =>true       //işlemindaha kısa hali.
        setIsEditing((editing) => !editing);  
        if(isEditing){
            onChangeName(symbol, playerName); 
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    } 

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    // let btnCaption = 'Edit';

    if (isEditing) {
        editablePlayerName = (
        <input type="text" required value={playerName} onChange={handleChange} />
    );
        //btnCaption = 'Save';
    }

    return(
        <li className={isActive ? 'active' : undefined}>
          <span className='player'>
              {editablePlayerName}
              <span className='player-symbol'>{symbol}</span>
          </span>
          <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}