import { useReducer, useState, useEffect } from 'react';
import './App.css';
import { Nadpis, PageContainer, Prvek } from './AppStyles';

const defaultObjednavka = {
  horske: false,
  horskeKs: 0,
  detske: false,
  detskeKs: 0,
  silnicni: false,
  silnicniKs: 0,
  gravel: false,
  gravelKs: 0,
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
  const [showFinalPrice, setShowFinalPrice] = useState(0); //kvůli posunu
  const [objednavka, dispatch] = useReducer(setObjednavka, defaultObjednavka);

  //posun
  useEffect(() => {
    let newFinalPrice = objednavkaPrice(objednavka);
    setShowFinalPrice(newFinalPrice);
  }, [objednavka, showFinalPrice]);

  const objednavkaPrice = (objednavka) => {
    let finalniCena;
    let horskaCena;
    let detskaCena;
    let silnicniCena;
    let gravelCena;

    if(objednavka.horske) {
      horskaCena = (objednavka.horskeKs * 500);
      console.log(horskaCena);
    }

    if(objednavka.detske) {
      detskaCena = (objednavka.detskeKs * 200);
      console.log(detskaCena);
    }

    if(objednavka.silnicni) {
      silnicniCena = (objednavka.silnicniKs * 1500);
      console.log(silnicniCena);
    }

    if(objednavka.gravel) {
      gravelCena = (objednavka.gravelKs * 2500);
      console.log(gravelCena);
    }

    // let destinationPrice = objednavka.destinace;
    // setDestinationPrice(destinationPrice);
    // let pocetLetenek = objednavka.pocetLetenek;
    // setPocetLetenek(pocetLetenek);


  
    return finalniCena;

  }

  return (
    <PageContainer>
      <h1>Půjčovna kol</h1>
      
      {/* ještě dodělat */}
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
    <select>
      <option value={1}>1 den</option>
      <option value={2}>2 dny</option>
      <option value={3}>týden</option>
      <option value={4}>14 dní</option>
    </select>
     </Prvek>

{/* CYKLONOSIČ */}
     <Prvek>
      <Nadpis>Cyklonosič:</Nadpis>
      <input type="radio" name="cyklonosic" />Cyklonosič střešní (+5% z celkové ceny zápůjčky navíc)<br/>
      <input type="radio" name="cyklonosic" />Cyklonosič na tažné zařízení (+10% z celkové ceny zápůjčky navíc)<br/>
      <input type="radio" name="cyklonosic" />Není třeba cyklonosič<br/>
     </Prvek>

    <Prvek>
      <Nadpis>Konečná kalkulace:</Nadpis><br/>
      <label>Zadejte Váš rozpočet:</label>
      <input type="text" /><br/>
      <label>Finální cena:</label>
    <input type="text" value={showFinalPrice}/><br/>
      <label>Výsledek:</label>
      <input type="text" />
    </Prvek>

    </PageContainer>
  );
}

export default App;
