import {useRef, forwardRef, useImperativeHandle} from 'react';
import { createPortal } from 'react-dom';
const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset}, ref){
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, ()=>{
        return{
            open(){
                dialog.current.showModal();
            }
        };
    } );

    return createPortal(
        <dialog ref={dialog} className="result-modal">
            {userLost && <h2>KAYBETTİN</h2>}
            {!userLost && <h2>Senin Süren : {score}</h2>}
            <p>
                Hedef zamanın : <strong>{targetTime} seconds.</strong> 
            </p>
            <p>
                zamanlayıcıyı durduğun süre {''} 
                <strong>{formattedRemainingTime} second left.</strong>
            </p>
            <form method="dialog" onSubmit={onReset}>
                <button>Kapat</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
});

export default ResultModal;