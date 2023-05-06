import React from 'react'

const Send = () => {
  return (
    <div class="mb-3 inbox-list send">
        <div className='send-element'>
            <label for="exampleFormControlInput1" class="form-label recievers-label">Odbiorca/y</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="mail@przyklad.com, imie@nazwa.pl"></input>
        </div>

        <div className='send-element'>
            <label for="exampleFormControlTextarea1" class="form-label">Treść wiadomości</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

        <div className='send-element'>
            <label for="formFileMultiple" class="form-label">Załącz pliki</label>
            <input class="form-control" type="file" id="formFileMultiple" multiple></input>
        </div>
        <div className='send-element'>
            <button type="submit" class="btn">Wyslij</button>
        </div>
    </div>
  )
}

export default Send
