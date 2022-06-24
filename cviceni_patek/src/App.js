import { useReducer, useState, useEffect } from 'react';
import './App.css';
import { Nadpis, PageContainer, Prvek, KontrolaButton } from './AppStyles';

const defaultObjednavka = {
  horske: false,
  horskeKs: 1,
  detske: false,
  detskeKs: 1,
  silnicni: false,
  silnicniKs: 1,
  gravel: false,
  gravelKs: 1,
  pocetDnu: 0,
  cyklonosic: 0,
  trida:0,
};

//useReducer
function setObjednavka(objednavka, action) {
  switch (action.type) {
    // case "update_text":
    //   return { ...objednavka, [action.key]: action.value };
    case "update_number":
      return { ...objednavka, [action.key]: parseFloat(action.value) };
    case "toggle_horske": return { ...objednavka, horske: !objednavka.horske };
    case "toggle_detske": return { ...objednavka, detske: !objednavka.detske };
    case "toggle_silnicni": return { ...objednavka, silnicni: !objednavka.silnicni };
    case "toggle_gravel": return { ...objednavka, gravel: !objednavka.gravel };
    default: return objednavka;
  }
};
function App() {
  const [finalPrice, setFinalPrice] = useState(0);
  const [checked, setChecked] = useState(0);
  const [showFinalPrice, setShowFinalPrice] = useState(0); //kvůli posunu
  const [objednavka, dispatch] = useReducer(setObjednavka, defaultObjednavka);

  //posun
  useEffect(() => {
    let newFinalPrice = objednavkaPrice(objednavka);
    setShowFinalPrice(newFinalPrice);
  }, [objednavka, showFinalPrice]);

  const objednavkaPrice = (objednavka) => {
    let ThisBasePrice = 0;
    let finalniCena = ThisBasePrice;

    if(objednavka.horske) {
      finalniCena += objednavka.horskeKs * 500;
    }

    if(objednavka.detske) {
      finalniCena += objednavka.detskeKs * 200;
    }

    if(objednavka.silnicni) {
      finalniCena += objednavka.silnicniKs * 1500;
    }

    if(objednavka.gravel) {
      finalniCena += objednavka.gravelKs * 2500;
    }

    // POČET DNŮ
    let pocetDnu = objednavka.pocetDnu;
    let newBasePrice
    newBasePrice = (finalniCena*pocetDnu);

    //PRISLUSENSTVI
    if(objednavka.cyklonosic === 1.05) {
      newBasePrice += (newBasePrice*0.05)
    }
    else if(objednavka.cyklonosic === 1.1) {
      newBasePrice += (newBasePrice*0.1)
    }
    console.log(newBasePrice);
    setFinalPrice(newBasePrice);

  if(newBasePrice>0) {
    return newBasePrice;
  }
  else {
    return 0;
  }

  }

  const checkPrice = (objednavka) => {
    if (objednavka.rozpocet >= finalPrice) {
      let checkOK = 1;
      setChecked(checkOK);
    } else {
      let checkNOK = 2;
      setChecked(checkNOK);
    }
  };

  return (
    <PageContainer>
      <h1>Půjčovna kol</h1>
    
      <Prvek>
      <Nadpis><br />Vyberte druh kola a počet kol k zapůjčení:</Nadpis>
      <input type="checkbox" id="horske" onChange={() => {
              dispatch({
                type: "toggle_horske",
              });
            }} />Horské kolo (500 Kč / den), 
            <strong>ks:</strong>
            <input type="number" id="horskeKs" value={objednavka.horskeKs} onChange={(e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "horskeKs",
            });
          }} />
            <br />
      <input type="checkbox" id="detske" onChange={() => {
              dispatch({
                type: "toggle_detske",
              });
            }} />Dětské kolo (200 Kč / den), <strong>ks:</strong><input type="number" id="detskeKs" value={objednavka.detskeKs} onChange={(e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "detskeKs",
              });
            }} /><br />
      <input type="checkbox" id="silnicni" onChange={() => {
              dispatch({
                type: "toggle_silnicni",
              });
            }} />Silniční kolo (1 500 Kč / den), <strong>ks:</strong><input type="number" id="silnicniKs" value={objednavka.silnicniKs} onChange={(e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "silnicniKs",
              });
            }}/><br />
      <input type="checkbox" id="gravel" onChange={() => {
              dispatch({
                type: "toggle_gravel",
              });
            }} />Gravel (2 500 Kč / den), <strong>ks:</strong><input type="number" id="silnicniKs" value={objednavka.gravelKs} onChange={(e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "gravelKs",
              });
            }}/><br />
     </Prvek>

    {/* POČET DNŮ */}
     <Prvek>
    <Nadpis>Počet dnů:</Nadpis>
    <br />
    <select id='pocetDnu' onClick={(e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "pocetDnu",
            });
          }}>
      <option value={1}>1 den</option>
      <option value={2}>2 dny</option>
      <option value={7}>týden</option>
      <option value={14}>14 dní</option>
    </select>
     </Prvek>

{/* CYKLONOSIČ */}
     <Prvek>
      <Nadpis>Cyklonosič:</Nadpis>
      <input type="radio" name="cyklonosic" value={1.05} onChange={(e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "cyklonosic",
              });
            }} />Cyklonosič střešní (+5% z celkové ceny zápůjčky navíc)<br/>
      <input type="radio" name="cyklonosic" value={1.1} onChange={(e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "cyklonosic",
              });
            }} />Cyklonosič na tažné zařízení (+10% z celkové ceny zápůjčky navíc)<br/>
      <input type="radio" name="cyklonosic" value={1.0} onChange={(e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "cyklonosic",
              });
            }} />Není třeba cyklonosič<br/>
     </Prvek>

    <Prvek><br/>
      <Nadpis>Konečná kalkulace:</Nadpis><br/>
      <label>Zadejte Váš rozpočet:</label>
      <input type="text" id="rozpocet" value={objednavka.rozpocet} onChange={(e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "rozpocet",
            });
          }} /><br/>
      <label>Finální cena:</label>
      <input type="text" value={showFinalPrice}/>
      <br/>
      <KontrolaButton checked={checked} onClick={() => {
            checkPrice(objednavka);
            console.log(checked);
          }}>
            Kontrola
          </KontrolaButton>
    </Prvek>

    </PageContainer>
  );
}

export default App;
