import './style.css';

export default function Header() {
    return (
        <header className="header">
            <img 
                src="./images/happypeepo.png" 
                alt="Happy peepo"
                className="header--image"
            />
            <h2 className='header--title' >Meme generator</h2>
            <h4 className='header--project' >React practice - Andrew Chang</h4>
        </header>
    )
}