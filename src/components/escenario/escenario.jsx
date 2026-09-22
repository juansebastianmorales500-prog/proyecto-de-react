import Tortu from "./Tortu";
import BotonDerecho from "./BotonDerecho";
import BotonIzquierdo from "./BotonIzquierdo";
import BotonReinicio from "./BotonReinicio";
import { useState } from "react";
import "./escenario.css";

function Escenario() {

    const [posicion, setPosicion] = useState(0);
    function moverIzquierda() {
        if (posicion > -230) {
            setPosicion(posicion - 5);
        }

    }

    function moverDerecha() {
        if (posicion < 230) {
            setPosicion(posicion + 5);
        }

    }

    return (

        <div className="escenario">
            <h2>La tortuga marihuanera</h2>
            <Tortu posicion={posicion} />
            <div className="botones">
                <BotonIzquierdo mover={moverIzquierda}/>
                <BotonReinicio mover={()=>setPosicion(0)}/>
                <BotonDerecho mover={moverDerecha}/>
            </div>
            <h3 className="marcador">
                Posición actual: {posicion}px
            </h3>
        </div>

    );
}

export default Escenario;