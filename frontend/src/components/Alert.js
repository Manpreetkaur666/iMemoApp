import React, {useContext} from 'react'
import alertContext from '../context/alert/alertContext'


export const Alert = () => {
    const context = useContext(alertContext);
    const { alert } = context;
  
    const capitalize = (word)=>{
        if(word === 'danger'){
            word = "error"
        }
                const lower = word.toLowerCase();
                return lower.charAt(0).toUpperCase() + lower.slice(1);
            }
            return (
                <div style={{height: '50px'}}>
                {alert && <div className={`alert alert-${alert.typ} alert-dismissible fade show`} role="alert">
                   <strong>{capitalize(alert.typ)}</strong>: {alert.msg} 
                </div>}
                </div>
            )
}

export default Alert;











// import React from 'react'

// export function Alert(props) {
//     const capitalize = (word)=>{
//         const lower = word.toLowerCase();
//         return lower.charAt(0).toUpperCase() + lower.slice(1);
//     }
//     return (
//         <div style={{height: '50px'}}>
//         {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
//            <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg} 
//         </div>}
//         </div>
//     )
// }

// export default Alert;