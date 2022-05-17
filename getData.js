const getData = async () => {
    try {
        const response = await fetch("./tasas.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Hubo un Error", error);
    }
}
export {getData};






