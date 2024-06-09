import { useEffect, useState } from 'react'
import { MSG_ASISTENCIA_NO, MSG_ASISTENCIA_SI, URL_PLANILLA } from '../../constants'
import { redirectToGoogleMaps } from '../../utils';
import Loader from '../shared/Loader/Loader';
import img04 from '../../assets/images/img_04.png'
import img02 from '../../assets/images/img_02.png'
import bf1 from '../../assets/images/bf_1.png'
import PropTypes from 'prop-types'
import './Main.css'

function Main({ jovenes, adultos, invitado }) {

    const [confirmacion, setConfirmacion] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    
        const fetchConfirmacion = async () => {
            try {
                
                const response = await fetch(`${URL_PLANILLA}?Persona=${invitado}`);
                const result = await response.json();
                const { data } = result
                if(data){
                    setConfirmacion(data.Asistencia === 'Sí, asistiré' ? 1 : 2);
                }
            } catch (error) {
                console.error('Hubo un problema al obtener la confirmación: ' + error.message);
            }
        };
        fetchConfirmacion();

    }, [invitado]);

    const handleAsistenciaClick = async (respuesta) => {
        const msg = respuesta === 'SI' ? MSG_ASISTENCIA_SI : MSG_ASISTENCIA_NO
        const confirmed = window.confirm(msg);
        if (confirmed) {
            try {
                setLoading(true);
                const body = new FormData()
                body.append('Persona', invitado)
                body.append('Asistencia', respuesta === 'SI' ? 'Sí, asistiré' : 'No asistiré')
                body.append('Jovenes', jovenes)
                body.append('Adultos', adultos)

                const response = await fetch(URL_PLANILLA, {
                    method: 'POST',
                    body,
                });

                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                setConfirmacion(respuesta === 'SI' ? 1 : 2);

                setLoading(false);

            } catch (error) {
                alert('Hubo un problema al enviar la confirmación: ' + error.message);
            }
        }
    };   
    
    return (
        <section className='pantalla main'>
            {loading && <Loader />}
            <img src={img04} alt='img04' className='main_img04'/>
            <img src={img02} alt='img02' className='main_img02'/>
            <img src={img02} alt='img02' className='main_img02_bottom'/>

            <p className='main_invitado'>{invitado}</p>
            <p className='main_text_msg'>JUNTO CON MI FAMILIA</p>
            <p className='main_text_msg'>TE ESPERAMOS PARA FESTEJAR ESTE DÍA QUE SERÁ INOLVIDABLE</p>

            <section className='main_text_group'>
                <section className='main_text_group_fiesta_wrap'>
                    <p className='main_text_group_fiesta'>Fiesta</p>
                    <img src={bf1} alt='bf1' className='main_text_group_bf1'/>
                </section>
                <p className='main_text_group_hora'>21:00 HS</p>
            </section>
            <p className='main_lugar'>DON BRUNO ROGA</p>
            <button className='btn_primary' onClick={() => redirectToGoogleMaps('https://goo.gl/maps/NeHccPUTr2879d2w9')}>UBICACIÓN</button>
            {confirmacion === 0 && (
                <>
                    <p className='main_text_msg mt-1'>FAVOR CONFIRMAR ASISTENCIA</p>
                    <button onClick={() => handleAsistenciaClick('SI')} className='btn_primary'>SÍ, ASISTIRÉ</button>
                    <button onClick={() => handleAsistenciaClick('NO')} className='btn_secondary'>NO PODRÉ ASISTIR</button>
                </>
            )}
            {confirmacion === 1 && (
                <section className='main_asistencia'>
                    <img src={bf1} alt='bf1' className='main_asistencia_bf1'/>
                    <p className='main_asistencia_text'>ASISTENCIA CONFIRMADA</p>
                    <img src={bf1} alt='bf1' className='main_asistencia_bf1_right'/>
                </section>
            )}
            {confirmacion === 2 && (
                <section className='main_asistencia'>
                    <img src={bf1} alt='bf1' className='main_asistencia_bf1'/>
                    <p className='main_asistencia_text'>NO ASISTIRÁS</p>
                    <img src={bf1} alt='bf1' className='main_asistencia_bf1_right'/>
                </section>
            )}

            <p className='main_tenida'>Tenida</p>
            <p className='main_tenida_text'>ELEGANTE</p>
        </section>
    )
}
  
Main.propTypes = {
    invitado: PropTypes.string.isRequired,
    jovenes: PropTypes.number.isRequired,
    adultos: PropTypes.number.isRequired,
};

export default Main