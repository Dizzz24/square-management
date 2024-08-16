const defLevel = (totalTransaction) => {
    if (totalTransaction < 250_000) {
        return "Warga"
    } else if (totalTransaction < 500_000) {
        return 'Juragan';
    } else if (totalTransaction < 1_000_000) {
        return 'Sultan';
    } else {
        return 'Konglomerat';
    }
}

module.exports = defLevel