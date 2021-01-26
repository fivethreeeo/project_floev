
export const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export const resetSurvey = () => {
    if (process.browser) {
        localStorage.removeItem('floev[currentStep]')
        localStorage.removeItem('floev[customer]')
        localStorage.removeItem('floev[birth]')
        localStorage.removeItem('floev[gender]')
        localStorage.removeItem('floev[hasWorn]')
        localStorage.removeItem('floev[purposes]')
        localStorage.removeItem('floev[purposeEtc]')
        localStorage.removeItem('floev[painDegree]')
        localStorage.removeItem('floev[painTypesEtc]')
        localStorage.removeItem('floev[size]')
        localStorage.removeItem('floev[loungeCode]')
        localStorage.removeItem('floev[requestDate]')
        localStorage.removeItem('floev[requestTime]')
        localStorage.removeItem('floev[name]')
        localStorage.removeItem('floev[phoneNumber]')
        localStorage.removeItem('floev[gender]')
        localStorage.removeItem('floev[gender]')
        localStorage.removeItem('floev[gender]')
    }
}