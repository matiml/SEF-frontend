import React, { useState, useEffect } from 'react';
import { getSteps, createSteps } from '../../../services/bot';
import './BotConfig.scss';

function BotConfig() {
  const [prevSteps, setPrevSteps] = useState();
  const [authorized, setAuthorized] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const steps = {
      Step_0: data.get('step0') || '',
      Step_1: data.get('step1') || '',
      Step_2: data.get('step2') || '',
      Step_3: data.get('step3') || '',
      Step_4: data.get('step4') || '',
      Step_5: data.get('step5') || '',
      Step_6: data.get('step6') || '',
      Step_7: data.get('step7') || '',
      Step_8: data.get('step8') || '',
      Step_9: data.get('step9') || '',
    }

    createSteps(steps);
  }

  useEffect(() => {
    getSteps().then(res => setPrevSteps(res));

    const loggedUser = localStorage.getItem('loggedUser')
    const loggedJSON = JSON.parse(loggedUser)
    if (loggedJSON.role === 'admin') setAuthorized(true);
  }, [])

  return (
    <div className='bot-settings'>
      <form onSubmit={handleSubmit}>

        {
          prevSteps 
          ? authorized
            ? <>
              <textarea name="step0" placeholder='Paso 1' defaultValue={prevSteps[0].body} />
              <textarea name="step1" placeholder='Paso 2' defaultValue={prevSteps[1].body} />
              <textarea name="step2" placeholder='Paso 3' defaultValue={prevSteps[2].body} />
              <textarea name="step3" placeholder='Paso 4' defaultValue={prevSteps[3].body} />
              <textarea name="step4" placeholder='Paso 5' defaultValue={prevSteps[4].body} />
              <textarea name="step5" placeholder='Paso 6' defaultValue={prevSteps[5].body} />
              <textarea name="step6" placeholder='Paso 7' defaultValue={prevSteps[6].body} />
              <textarea name="step7" placeholder='Paso 8' defaultValue={prevSteps[7].body} />
              <textarea name="step8" placeholder='Paso 9' defaultValue={prevSteps[8].body} />
              <textarea name="step9" placeholder='Paso 10' defaultValue={prevSteps[9].body} />
            </>
            : <>
              <textarea className="readonly" name="step0" placeholder='Paso 1' defaultValue={prevSteps[0].body} readOnly />
              <textarea className="readonly" name="step1" placeholder='Paso 2' defaultValue={prevSteps[1].body} readOnly />
              <textarea className="readonly" name="step2" placeholder='Paso 3' defaultValue={prevSteps[2].body} readOnly />
              <textarea className="readonly" name="step3" placeholder='Paso 4' defaultValue={prevSteps[3].body} readOnly />
              <textarea className="readonly" name="step4" placeholder='Paso 5' defaultValue={prevSteps[4].body} readOnly />
              <textarea className="readonly" name="step5" placeholder='Paso 6' defaultValue={prevSteps[5].body} readOnly />
              <textarea className="readonly" name="step6" placeholder='Paso 7' defaultValue={prevSteps[6].body} readOnly />
              <textarea className="readonly" name="step7" placeholder='Paso 8' defaultValue={prevSteps[7].body} readOnly />
              <textarea className="readonly" name="step8" placeholder='Paso 9' defaultValue={prevSteps[8].body} readOnly />
              <textarea className="readonly" name="step9" placeholder='Paso 10' defaultValue={prevSteps[9].body} readOnly />
            </>
        : <h4>Cargando</h4>         
        }

        {
          authorized && <button>Guardar</button>
        }

      </form>
    </div>
  )
}

export default BotConfig;