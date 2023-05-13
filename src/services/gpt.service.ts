import { ObjectId } from 'mongodb';
import { Configuration, OpenAIApi } from 'openai';

import { Form } from '@/interfaces';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Params {
  userId: ObjectId;
  formData: Form;
}

export const postGPT = async ({ userId, formData }: Params) => {
  const openai = new OpenAIApi(configuration);

  const prompt = `
    Una persona está interesada en adoptar un animal de una protectora de animales. La persona es un ${
      formData.adopter_sex === 'male' ? 'hombre' : 'mujer'
    } de ${formData.adopter_age as number} años de edad, que vive en ${
    formData.adopter_city
  }, ${formData.adopter_region}.${
    formData.adopter_is_working === 'true' ? 'Trabaja' : 'No trabaja'
  }.
  
  En cuanto al animal que quiere adoptar, se trata de un ${
    formData.animal_specie
  } localizado en ${formData.animal_region}, de raza ${
    formData.animal_breed
  } y con una edad de ${formData.animal_age as string}.
  
  En cuanto a información adicional: ${
    formData.animal_extra_info ?? 'No cuenta con información adicional'
  }.

  Teniendo en cuenta la información del adoptante y la del animal, debes hacer lo siguiente: 
  
  1. Escribe una lista de TREINTA (30) preguntas, que luego sirvan para decidir si esa persona es APTA o NO APTA para adoptar a ese animal en base a la información de ambos (adoptante y animal)
  2. Cada elemento de la lista empezará con un asterisco (*), no deberán ser numeradas.
  3. Las preguntas pueden ser de RESPUESTA LIBRE, SI o NO, de OPCIÓN MÚLTIPLE o RESPUESTAS CONCRETAS.
  
  Estos son algunos ejemplos que podrías tomar como referencia:
  * Tipo de vivienda (piso, casa, estudio…)
  * ¿Cuántos m2 tiene su vivienda?
  * En caso de tener jardín, ¿está convenientemente vallado para evitar que los perros puedan escaparse? ¿qué altura tiene la valla o qué tipo de protección tiene?
  * ¿La vivienda es en propiedad o arrendada?
  * En caso de que sea arrendada, ¿tiene conocimiento el propietario de la vivienda de que usted va a adoptar a un animal? y ¿está de acuerdo con ello?
  * ¿Tiene algún vecino que esté especialmente en contra de que habiten perros en las viviendas cercanas?
  * ¿Qué otras personas habitan en su casa? ¿están todos de acuerdo en adoptar a un perro?
  * ¿Tiene hijos? ¿Cuántos y qué edades tienen?
  * ¿Cómo son sus hijos? (tranquilos, traviesos, responsables…)
  * ¿Hay alguna persona con alergias en su familia?
  * ¿Trabaja actualmente?
  * Horario de trabajo:
  * ¿A qué dedica su tiempo libre?
  * ¿Qué necesidades diarias cree que tiene un perro?
  * ¿Cuánto tiempo cree que se debe dedicar al día a pasear al perro?
  * ¿Qué alimentación cree que es adecuada para un perro? (sobras, pan, pienso, comida casera…)
  * ¿Ha tenido alguna mala experiencia con algún perro?
  * ¿Por qué se ha decidido a adoptar a un perro?
  * ¿Quién ha tomado la decisión de adoptar al perro?
  * ¿Qué lugar de la vivienda estaría dedicada al perro?
  * ¿Habrá alguna habitación donde tenga prohibido entrar el perro? ¿cuál y por qué?
  * ¿Dónde dormirá el perro? (en una cama en el interior, en la cama del acogedor, en el pasillo, en el exterior, en una jaula…)
  * ¿Qué hará usted si el perro se sube al sofá?
  * ¿Ha tenido perro antes? En caso de que sea así, cuéntenos un poco sobre él/ellos: raza, tamaño, sexo, qué ocurrió con él/ellos, de qué murió/murieron, qué relación tuvo con ellos (compañía, trabajo, guarda…), si fueron comprados o adoptados y dónde adoptó en caso de ser así.
  * ¿Tiene actualmente otros animales en casa? En caso de que sea así, cuéntenos un poco sobre ellos: cuántos son, especie, raza, tamaño, edad, sexo, carácter, qué relación tiene usted con ellos (compañía, trabajo, guarda…), si son adoptados o comprados y dónde los adoptó en caso de ser así.
  * ¿Qué tipo de perro desea adoptar? (raza, tamaño, edad, sexo, tipo de pelo…)
  * ¿Qué carácter le gustaría que tuviera? (tranquilo, activo, cariñoso, independiente, valiente…)
  * ¿Cuánto tiempo pasaría el perro solo en casa?
  * ¿Cuánto tiempo y cuántas veces al día sacaría a pasear al perro?
  * ¿Por dónde pasearía al perro? (calle, jardín, campo, bosque, playa…)
  * ¿Tiene previsto dejarle suelto cuando lo saque a pasear? De ser así, ¿cuándo y dónde
  será? (siempre por la calle, sólo cuando vaya al parque…) 
  * ¿Ha visitado algún refugio de animales alguna vez? ¿Es socio, voluntario o padrino de algún refugio de animales? ¿Cuál?
`;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    const completion = response.data.choices[0].message;
    console.log('PROMPT: ', prompt);
    console.log('GPT RESPONSE: ', completion?.content);

    return completion?.content;
  } catch (error) {
    console.log('GPT ERROR: ', error);
    throw error;
  }
};
