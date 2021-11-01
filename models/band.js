const { v4: uuidV4 } = require('uuid');

class Band{
    constructor(name='sin-nombre'){
        this.id = uuidV4();//identificador unico
        this.name = name;
        this.votes = 0
    }
}

//para importar es necesario exportar explicitamente
module.exports = Band;
