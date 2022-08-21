import { useState, useEffect } from "react";
function Meme() {
  
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/jrj7.jpg"
  })

  const [allMemes, setAllMemes] = useState([])

  useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes")
      const data = await res.json()
      setAllMemes(data.data.memes)
    }
    getMemes() 
  }, [])

  function getMemeImage() {    
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const url = allMemes[randomNumber].url
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImage: url
    }))  
    
  }

  function handleChange(event) {
    const {name, value} = event.target
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }))
  }

  return (
    <main>
      <div className="form">
        <input
          name="topText"
          type="text"
          placeholder="Top text"
          onChange={handleChange}
          className="form--input"
          value={meme.topText}
        />
        <input
          name="bottomText"
          type="text"
          placeholder="Bottom text"
          onChange={handleChange}
          className="form--input"
          value={meme.bottomText}
        />
        <br />
        <button onClick={getMemeImage} className='form--button'>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
          <img src={meme.randomImage} className="meme--image" alt="" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}

export default Meme;
