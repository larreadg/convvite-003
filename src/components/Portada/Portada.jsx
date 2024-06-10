import img01 from '../../assets/images/img_01.png'
import img02 from '../../assets/images/img_02.png'
import bf1 from '../../assets/images/bf_1.png'
import bf2 from '../../assets/images/bf_2.png'
import bf3 from '../../assets/images/bf_3.png'
import './Portada.css'

function Portada() {
    return (
        <section className='pantalla portada'>
            <img src={img01} alt='img01' className='portada_img01'/>
            <img src={img02} alt='img02' className='portada_img02'/>
            <img src={img02} alt='img02' className='portada_img02_bottom'/>
            <img src={bf1} alt='bf1' className='portada_bf1'/>
            <img src={bf2} alt='bf2' className='portada_bf2'/>
            <img src={bf3} alt='bf3' className='portada_bf3'/>

            <p className='portada_text_msg'>QUINCE AÑOS ATRÁS <br /> MIS PADRES SE COLMARON DE ALEGRÍA <br /> HOY DOY GRACIAS A DIOS POR REGALARME LA VIDA Y PODER CELEBRAR CON MIS AMIGOS Y FAMILIARES MI GRAN NOCHE DE FANTASÍA</p>
            <p className='portada_text_15'>MIS <span>15</span> AÑOS</p>
            <p className='portada_text_15_name_1'>Lara</p>
            <p className='portada_text_15_name_2'>Lujan</p>
            
            <section className='portada_fecha'>
                <p className='dia'>SÁBADO</p>
                <p className='fecha'>27</p>
                <p className='mes'>JULIO</p>
            </section>
        </section>
    )
}
  
export default Portada