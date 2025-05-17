function main() {
    
    let coalMass = parseFloat(document.getElementById("coal").value) || 0;
    let oilMass = parseFloat(document.getElementById("oil").value) || 0;
    let gasMass = parseFloat(document.getElementById("gas").value) || 0;

    if ((isNaN(coalMass) || isNaN(oilMass) || isNaN(gasMass)) || (coalMass == 0 || oilMass == 0 || gasMass == 0)) {
        console.error("Помилка NaN/0");
        return;
    }

    const coalData = { Qr: 20.47, a_vykhid: 0.8, Ar: 25.20, r_vykhid: 1.5, eta_y: 0.985, kms: 0 };
    const oilData = { Qr: 39.48, a_vykhid: 1, Ar: 0.15, r_vykhid: 0, eta_y: 0.985, kms: 0 };
    const gasData = { Qr: 33.08, a_vykhid: 0.2, Ar: 0, r_vykhid: 0, eta_y: 0, kms: 0 }; 

    function computeEmissionFactor(data) {
        return (1e6 / data.Qr) * data.a_vykhid * (data.Ar / (100 - data.r_vykhid)) * (1 - data.eta_y) + data.kms;
    }

    function computeTotalEmission(km, data, mass) {
        return 1e-6 * km * data.Qr * mass;
    }

    let kmCoal = computeEmissionFactor(coalData);
    let kmOil = computeEmissionFactor(oilData);
    let kmGas = computeEmissionFactor(gasData);

    let ECoal = computeTotalEmission(kmCoal, coalData, coalMass);
    let EOil = computeTotalEmission(kmOil, oilData, oilMass);
    let EGas = computeTotalEmission(kmGas, gasData, gasMass);

    document.getElementById("coal-emission").innerText = kmCoal.toFixed(2) + " г/ГДж";
    document.getElementById("coal-combustion").innerText = ECoal.toFixed(2) + " т";
    document.getElementById("oil-emission").innerText = kmOil.toFixed(2) + " г/ГДж";
    document.getElementById("oil-combustion").innerText = EOil.toFixed(2) + " т";
    document.getElementById("gas-emission").innerText = kmGas.toFixed(2) + " г/ГДж";
    document.getElementById("gas-combustion").innerText = EGas.toFixed(2) + " т";
}
