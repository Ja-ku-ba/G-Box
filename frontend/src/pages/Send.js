import React from 'react'

const Send = () => {
  return (
    <div className="mb-3 inbox-list send">
        <div className='send-element'>
            <label for="exampleFormControlInput1" className="form-label recievers-label">Odbiorca/y</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="mail@przyklad.com, imie@nazwa.pl"></input>
        </div>

        <div className='send-element'>
            <label for="exampleFormControlTextarea1" className="form-label">Treść wiadomości</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

        <div className='send-element'>
            <label for="formFileMultiple" className="form-label">Załącz pliki</label>
            <input className="form-control" type="file" id="formFileMultiple" multiple></input>
        </div>
        <div className='send-element'>
            <button type="submit" className="btn">Wyslij</button>
        </div>
    </div>
  )
}

export default Send
