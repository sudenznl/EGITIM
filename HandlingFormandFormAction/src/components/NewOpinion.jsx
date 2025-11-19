import { useActionState, use } from 'react';

import { OpinionsContext } from '../store/opinions-context';
import Submit from './Submit';

export function NewOpinion() {
  //backend için çağırıyoruz:
  const { addOpinion } = use(OpinionsContext);

  async function shareOpinionAction(prevState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    let errors = [];

    if (title.trim().length < 5) 
    {
      errors.push("Başlık en az 5 karakter bulundurmalı");
    }

    if (body.trim().length < 10 || body.trim().length > 300) 
    {
      errors.push("Metin en az 10 en fazla 300 karakter içermeli");
    }

    if (!userName.trim()) 
    {
      errors.push("İsminizi yazmalısınız");
    }

    if (errors.length > 0)
    {
      return {
        errors,
        enteredValues: {
          title,
          body,
          userName,
        },
      };
    } 

    //backend'e göndermek :
    await addOpinion({ title, body, userName });
    return { errors: null };
  }

  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Fikirlerini Paylaş!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">İsim</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Konu</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.tittle}
            />
          </p>
        </div>

        <p className="control">
          <label htmlFor="body">Senin Fikrin</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="error">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

      <Submit /> 
      </form>
    </div>
  );
}
