import {useState,createContext} from 'react'
import { obtenerDiferenciaYear,calcularMarca,calcularPlan,formatearDinero } from '../helpers'

const CotizadorContext=createContext()

const CotizadorProvider=({children})=>{
    const[datos,setDatos]=useState({
        marca:'',
        year:'',
        plan:''
    })

    const [error,setError]=useState('')
    const[resultado,setResultado]=useState(0)
    const [cargando,setCargando]=useState(false)

    const handleChangeDatos=e=>{
        setDatos({
            ...datos,
            [e.target.name]:e.target.value
        })
    }

    const cotizarSeguro=()=>{
        //Base proporcionada
        let resultado=2000
        //Diferencia de años
        const diferencia=obtenerDiferenciaYear(datos.year);
        //Hay que restar el 3% de cada año
        resultado-= ((diferencia*3)*resultado)/100
        //Calcular en Base a marca
        resultado*=calcularMarca(datos.marca)
        //En base al tipo de plan 
        resultado*=calcularPlan(datos.plan)
        
        resultado=formatearDinero(resultado)

        setCargando(true)
        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 3000);
    }
    return(
        <CotizadorContext.Provider
        value={{
            datos,
            handleChangeDatos,
            setError,
            error,
            cotizarSeguro,
            resultado,
            cargando
        }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export{
    CotizadorProvider
}

export default CotizadorContext