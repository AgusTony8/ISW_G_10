import React from 'react';

function InputTexto(props){
        return(
            <div>
                <h5>{props.titulo}</h5>
                <div className="input-group flex-nowrap">
                    <input type="text" className={props.valido} value={props.value} placeholder={props.titulo} aria-label={props.lebel} aria-describedby="addon-wrapping" onChange={props.onChange}></input>
                </div>
            </div>
        )
}

export default InputTexto