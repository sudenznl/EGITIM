import { createContext, useEffect, useState } from "react";

export const OpinionsContext = createContext({
  opinions: null,
  addOpinion: (opinion) => {},
  upvoteOpinion: (id) => {},
  downvoteOpinion: (id) => {},
});

//bileşen ilk açıldığında backend’e istek atıp tüm görüşleri (opinions) çekerek state’e kaydediyoruz:
export function OpinionsContextProvider({ children }) {
  const [opinions, setOpinions] = useState();

  useEffect(() => {
    async function loadOpinions() {
      const response = await fetch("http://localhost:3000/opinions");
      const opinions = await response.json();
      setOpinions(opinions);
    }

    loadOpinions();
  }, []);

  //burada da yeni görüşleri saklmak için backend'e istek gönderiyoruz:
  //adOpinion bağlamında bir yanıt aldığımızda gönderilen veriler güncelleniyor ve
  // eğer bir hata yanıtı yoksa backend kaydediyor ve görselesunuluyor :
  async function addOpinion(enteredOpinionData) {
    const response = await fetch("http://localhost:3000/opinions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredOpinionData),
    });

    if (!response.ok) {
      return;
    }

    const savedOpinion = await response.json();
    setOpinions((prevOpinions) => [savedOpinion, ...prevOpinions]);
  }

  // -----   votes(oylama)   ----- //

  async function upvoteOpinion(id) {
    const response = await fetch(
       `http://localhost:3000/opinions/${id}/upvote`,
      {
        method: "POST",
      }
    );

    if (!response.ok) 
    {
      return;
    }

    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return { ...opinion, votes: opinion.votes + 1 };
        }
        return opinion;
      });
    });
  }

  async function downvoteOpinion(id) {
    const response = await fetch(
      `http://localhost:3000/opinions/${id}/downvote`,
      {
        method: 'POST',
      }
    );

    if(!response.ok) 
    {
      return;
    }

    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return { ...opinion, votes: opinion.votes - 1 };
        }
        return opinion;
      });
    });
  }

  const contextValue = {
    opinions: opinions,
    addOpinion,
    upvoteOpinion,
    downvoteOpinion,
  };

  return <OpinionsContext value={contextValue}>{children}</OpinionsContext>;
}
