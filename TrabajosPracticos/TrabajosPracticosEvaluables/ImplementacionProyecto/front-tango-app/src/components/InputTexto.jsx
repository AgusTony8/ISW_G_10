import React from 'react';

function InputTexto(props){
        return(
            <div>
                <div className="input-group">
                    <input type="text" className={props.valido} value={props.value} placeholder={props.placeholder} aria-label={props.lebel} aria-describedby="addon-wrapping"
                    onChange={props.onChange} disabled={props.disabled}></input>
                    {props.error && <div className={props.feedbackClass}>{props.error}</div>} {/* Mostrar el mensaje de error */}
                </div>
            </div>
        )
}

export default InputTexto