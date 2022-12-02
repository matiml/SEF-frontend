import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import './BotConfig.scss';

const path = process.env.REACT_APP_API_URL;

function BotConfig() {
  const [prevSteps, setPrevSteps] = useState();

  const createSteps = async (steps) => {
    await axios.post(path + '/vendedores/steps', steps)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const steps = {
      step_0: data.get('step0'),
      step_1: data.get('step1'),
      step_2: data.get('step2'),
      step_3: data.get('step3'),
      step_4: data.get('step4'),
      step_5: data.get('step5'),
      step_6: data.get('step6'),
      step_7: data.get('step7'),
      step_8: data.get('step8'),
      step_9: data.get('step9'),
    }

    createSteps(steps)

    setTimeout(() => {
      emitAlert()
    }, 1000)
  }

  useEffect(() => {
    const getSteps = async () => {
      const { data } = await axios.get(path + '/vendedores/steps');
      setPrevSteps(data[0])
    }

    getSteps()
  }, [])

  const emitAlert = () => {
    Swal.fire({
      text: `Informacion guardada correctamente`,
      icon: 'success',
      cancelButtonText: 'Ok'
    })
  }

  return (
    <div className='bot-settings'>
      <form onSubmit={handleSubmit}>
        <textarea name="step0" placeholder='Paso 1' defaultValue={prevSteps && prevSteps.step_0.message} />
        <textarea name="step1" placeholder='Paso 2' defaultValue={prevSteps && prevSteps.step_1.message} />
        <textarea name="step2" placeholder='Paso 3' defaultValue={prevSteps && prevSteps.step_2.message} />
        <textarea name="step3" placeholder='Paso 4' defaultValue={prevSteps && prevSteps.step_3.message} />
        <textarea name="step4" placeholder='Paso 5' defaultValue={prevSteps && prevSteps.step_4.message} />
        <textarea name="step5" placeholder='Paso 6' defaultValue={prevSteps && prevSteps.step_5.message} />
        <textarea name="step6" placeholder='Paso 7' defaultValue={prevSteps && prevSteps.step_6.message} />
        <textarea name="step7" placeholder='Paso 8' defaultValue={prevSteps && prevSteps.step_7.message} />
        <textarea name="step8" placeholder='Paso 9' defaultValue={prevSteps && prevSteps.step_8.message} />
        <textarea name="step9" placeholder='Paso 10' defaultValue={prevSteps && prevSteps.step_9.message} />
        <button>Guardar</button>
      </form>
    </div>
  )
}

export default BotConfig;