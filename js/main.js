let paises = [
    {
        codigo: 1,
        nombre: 'Colombia'
    }
];

let dptos = [
    {
        codigo: '0001',
        nombre: 'Atlantico',
        pais: 1
    },
    {
        codigo: '0002',
        nombre: 'Bolivar',
        pais: 1
    }
];

let ciudades = [
    {
        codigo: '0001-1',
        nombre: 'Barranquilla',
        dpto: '0001',
        pais: 1
    },
    {
        codigo: '0001-2',
        nombre: 'Soledad',
        dpto: '0001',
        pais: 1
    },
    {
        codigo: '0002-1',
        nombre: 'Cartagena',
        dpto: '0002',
        pais: 1
    },
    {
        codigo: '0002-2',
        nombre: 'Turbaco',
        dpto: '0002',
        pais: 1
    }
];

function cargaDptos(codPais, element){
    element.innerHTML = '<option value="">[SELECCIONE UN DEPARTAMENTO]</option>\n';
    for (i = 0 ; i < dptos.length; i++) {
        if(dptos[i].pais == codPais){
            element.innerHTML = element.innerHTML + '<option value="'+dptos[i].codigo+'">'+
            dptos[i].nombre
            +'</option>\n';
        }            
    }   
}

function cargaCiudades(codPais, codDpto, element){
    element.innerHTML = '<option value="">[SELECCIONE UN CIUDAD]</option>\n';
    for (i = 0 ; i < ciudades.length; i++) {
        if((ciudades[i].pais == codPais) && (ciudades[i].dpto == codDpto)){
            element.innerHTML = element.innerHTML + '<option value="'+ciudades[i].codigo+'">'+
            ciudades[i].nombre
            +'</option>\n';
        }            
    }   
}

function appendResultado(cadena){
    let cosola = document.getElementById('consola');
    cosola.value = cosola.value + cadena + '\n';   
}

function cargarAjax(){
    let httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = ()=>{

        if(httpRequest.readyState === XMLHttpRequest.DONE){
            if(httpRequest.status == 200){
                let data =  httpRequest.responseText;
                if(data){
                    appendResultado(data);
                    let obj = JSON.parse(data);
                    let tbody =  document.querySelector('tbody');
                    let datos = "";
                    obj.forEach((element, index)=>{
                        datos = datos + "<tr><td>"+element.id+"</td><td>"+element.name+"</td><td>"+element.username+"</td><td>"+element.email+"</td><td>"+element.address.street+"</td><td>"+element.phone+"</td></tr>";
                    });
                    tbody.innerHTML = datos;
                }
            }else{
                appendResultado('Algo ha fallado respuesta:' + httpRequest.status);
            }
        }else{
            appendResultado('Esperando respuesta....');
        }    
    }
    httpRequest.open('GET','https://jsonplaceholder.typicode.com/users',true);
    httpRequest.send();
}

document.addEventListener('DOMContentLoaded',()=>{
    
    let selPaises  = document.getElementById('paises');
    let selDptos = document.getElementById('dptos');
    let selCiudades = document.getElementById('ciudades');
    let btnGenerar = document.getElementById('btnGenerar');
    let btnAnalizar = document.getElementById('analizar');
    let btnAJAX = document.getElementById('ajax');
        
    selPaises.addEventListener('change',(event)=>{
        cargaDptos(event.target.value,document.getElementById('dptos'));
    });

    selDptos.addEventListener('change',(event)=>{
        cargaCiudades(document.getElementById('paises').value, event.target.value, document.getElementById('ciudades'));
    });

    selPaises.innerHTML = '<option value="">[SELECCIONE UN PAIS]</option>\n';
    for (i = 0 ; i < paises.length; i++) {
        selPaises.innerHTML = selPaises.innerHTML + '<option value="'+paises[i].codigo+'">'+
            paises[i].nombre
            +'</option>\n';
    }
    
    btnGenerar.addEventListener('click',(event)=>{
        event.preventDefault;
        let ciudad = document.getElementById('ciudades');
        ciudades.forEach((element,index)=>{
            if(element.codigo ==ciudad.value){
                appendResultado(JSON.stringify(element));
            }
        });
    });

    btnAnalizar.addEventListener('click',(event)=>{
        try {
            let consola = document.getElementById('consola');
            let obj = JSON.parse(consola.value);
            console.log(obj);
            alert('Proceso terminado por favor revise la consola.');            
        } catch (error) {
            appendResultado(error.message);            
        }
    });

    btnAJAX.addEventListener('click',(event)=>{
        cargarAjax();        
    });
});