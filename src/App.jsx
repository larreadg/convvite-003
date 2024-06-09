import Portada from './components/Portada/Portada'
import Main from './components/Main/Main'
import img03 from './assets/images/img_03.png'
import { useLocation } from 'react-router-dom'

function App() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const invitadoKey = queryParams.get('key');

  let jsonData = null
  try {
    jsonData = JSON.parse(decodeURIComponent(escape(atob(invitadoKey))));
  } catch(e){
    jsonData = {
      i : '',
      a : 0,
      j : 0
    };
  }

  return (
    <section className='root-container'>
      <img src={img03} alt='img03' className='root-container-img'/>
      <Portada/>
      <Main invitado={jsonData.i} adultos={jsonData.a} jovenes={jsonData.j}/>
    </section>
  )
}

export default App
