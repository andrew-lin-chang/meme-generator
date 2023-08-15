import React, {useState, useEffect} from "react";
import "./style.css";
// no longer using a local js file for memes, using fetch api
//import memesData from "../data/memesData"; 

export default function Meme() {

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMemes, setAllMemes] = useState([]);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(memeData => setAllMemes(memeData.data.memes))
    }, []); //no dependencies, only want to call API on first render

    console.log(allMemes)

    function getMemeImage() {
        const memesArray = allMemes;
        const randomNumber = Math.floor(Math.random() * memesArray.length); //Math.random returns value 0-1, is scaled by array length
        const {url} = memesArray[randomNumber]; //object destructuring to extract url 
        setMeme(prevMeme => ({
            ...prevMeme, //spread operator pulls in all of the prevMeme contents
            randomImage: url //only updates the image url
        }));
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name] : value
        }));
    }

    return (
        <main>
            <div className="form">
                <input 
                    className="form--input" 
                    placeholder="Top text"
                    onChange={handleChange}
                    value={meme.topText}
                    name="topText"
                />
                <input 
                    className="form--input" 
                    placeholder="Bottom text"
                    onChange={handleChange}
                    value={meme.bottomText}
                    name="bottomText"
                />
                <button 
                    className="form--button" 
                    onClick={getMemeImage}
                >
                    Get a new meme image
                </button>
            </div>
            <br />
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" alt="insert meme here"/>
                <h2 className="meme--text top">{meme.topText ? meme.topText : "Top Text"}</h2>
                <h2 className="meme--text bottom">{meme.bottomText ? meme.bottomText : "Bottom Text"}</h2>
            </div>
        </main>
    )
}