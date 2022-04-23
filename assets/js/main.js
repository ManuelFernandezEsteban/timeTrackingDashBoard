const url = '../../data.json';

const wrapper = document.querySelector('.wrapper');
const day = document.querySelector('#daily');
const week = document.querySelector('#weekly');
const month = document.querySelector('#monthly');

const timeframes = ['daily', 'weekly', 'monthly'];
    
const crearElement = (tipo, clase) => {
    const item = document.createElement(tipo);
    if (clase!=''){
        item.classList.add(clase);
    }    
    return item;
}

const enlazar = (hijo, padre) => {
    padre.append(hijo);
}

const previous = (time)=>{
    let texto = '';
    if (time===timeframes[0]){
        texto='Yesterday - ';
    }else if(time===timeframes[1]){
        texto='Last Week - ';
    }else{
        texto='Last Month - ';
    }
    return texto;
}

const dibujar = (data, timeframe) => {    
    
    data.forEach(element => {
        const card = crearElement('div', 'card');

        if (element.title!='Self Care'){
            card.classList.add(element.title);
        }else{
            card.classList.add('Self');
        }
        
        const cardContent = crearElement('div', 'card-content');        
        enlazar(cardContent, card);
        const wrapperContent = crearElement('div', 'wrapper-content')
        enlazar(wrapperContent, cardContent);
        const rowContentSup = crearElement('div', 'row-content-sup');        
        const type = crearElement('span', 'type');
        type.innerText = element.title;               
        const boton = crearElement('button','');
        const img = crearElement('img','');
        img.setAttribute('src','./assets/images/icon-ellipsis.svg');
        img.setAttribute('alt','tres puntos');       
        enlazar(img,boton);        
        enlazar(type,rowContentSup); 
        enlazar(boton,rowContentSup);       
        const rowContentinf = crearElement('div', 'row-content-inf');        
        const last = crearElement('span', 'last');
        last.innerText = previous(timeframe) + element.timeframes[timeframe].previous + 'hrs';
        const hours = crearElement('span', 'hours');
        hours.innerText = element.timeframes[timeframe].current + 'hrs';

        enlazar(hours,rowContentinf);
        enlazar(last,rowContentinf);
           
        enlazar(rowContentSup, wrapperContent);     
        enlazar(rowContentinf,wrapperContent);
        
        enlazar(card,wrapper);
        
    });

}
const destruirCards = ()=>{
    const cards = document.querySelectorAll('.card');
    cards.forEach(element => {
        element.remove();
        
    });
}

async function getData (direccion){

    const response = await fetch(direccion);
    const data = await response.json();
    return data;
}


const init = () => {   

       
    let datos = getData(url).then(data => {
        dibujar(data,timeframes[1]);
        week.classList.add('active');
        datos=data;
    });
    week.addEventListener('click',()=>{
        week.classList.add('active');
        day.classList.remove('active');
        month.classList.remove('active');
        destruirCards();
        dibujar(datos,timeframes[1]);
    })
    day.addEventListener('click',()=>{
        day.classList.add('active');
        week.classList.remove('active');
        month.classList.remove('active');
        destruirCards();
        dibujar(datos,timeframes[0]);
    })
    month.addEventListener('click',()=>{
        month.classList.add('active');
        day.classList.remove('active');
        week.classList.remove('active');
        destruirCards();
        dibujar(datos,timeframes[2]);
    })
}
