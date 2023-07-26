
module.exports = class ServicoCalculoFatura{
    constructor(repo) {
        this.repo = repo;
    }

    calcularTotalApresentacao(apre) {
        let total = 0;
        let peca = this.repo.getPeca(apre);
        switch (peca.tipo) {

        case "tragedia":
        total = 40000;
        if (apre.audiencia > 30) {
            total += 1000 * (apre.audiencia - 30);
        }
        break;
        
        case "comedia":
        total = 30000;
        if (apre.audiencia > 20) {
            total += 10000 + 500 * (apre.audiencia - 20);
        }
        total += 300 * apre.audiencia;
        break;

        default:
            throw new Error(`Peça desconhecia: ${peca.tipo}`);
        }

        return total;
    }
    
    // créditos para próximas contratações
    calcularCredito(apre) {
        let creditos = 0;
        creditos += Math.max(apre.audiencia - 30, 0);
        if (this.repo.getPeca.tipo === "comedia") 
            creditos += Math.floor(apre.audiencia / 5);
        return creditos;   
    }

    calcularTotalFatura(apresentacoes){
        let total = 0;
        for(let apre of apresentacoes){
            total += this.calcularTotalApresentacao(apre);
        }
        return total;
    }

    calcularTotalCreditos(apresentacoes){
     let total = 0;
        for(let apre of apresentacoes){
            total += this.calcularCredito(apre);
        }
        return total;
    }
}
