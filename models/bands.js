const Band = require("./band");

class Bands{
    constructor(){
        this.bands = [];
    }

    addBand(band = new Band()){
        //inserta una nueva banda en el arreglo
        this.bands.push(band);
    }

    getBands(){
        return this.bands;
    }

    deleteBand(id = ''){
        //.filter me filtra el arreglo de bandas
        this.bands = this.bands.filter(band=>band.id!=id);
        return this.bands;
    }

    voteBand(id =''){
        //.map transforma el elemente del arreglo seleccionado
        this.bands = this.bands.map(band=>{
            if(band.id === id){
                band.votes++;
                return band;
            }else{
                return band;
            }
        });
    }
}

module.exports = Bands;