import { useEffect, useState } from "react";
import axios from 'axios';
//need to make the beer file
import Beer from "./Beer";

const Bar = () => {
    const [beerData, setBeerData] = useState("");
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    let tempId;
    useEffect(() => {
        axios.get(`mongodb://localhost:27017/beerCollection`)
            .then((response) => {
                setBeerData(response.data);
                console.log("===========================");
                console.log(response.data);
                console.log(beerData);
                setLoaded(true)
            })
            .catch((error) => {
                setLoaded(true);
                setError(error);
            })
            .then(() => {
                console.log(beerData);
            });
    }, []);
    // const getBeerId = (id) => {
    //     axios.get(`mongodb://localhost:27017/beerCollection/${id}`)
    //         .then((response) => {
    //             setBeerData(response.data);
    //             setLoaded(true);
    //         }).catch((error) => {
    //             setLoaded(true);
    //             setError(error);
    //         });
    // }

    if (error === true) {
        return <h2>Oops,theres been an error please refresh the page</h2>
    } else if (!loaded) {
        return <h2>Please wait, data is loading</h2>
    } else {
        return (
            <div>
                <h2>Loads if the data is fine</h2>
                {/* <input type="number" name="beerId" onChange={(event) => tempId = (event.target.value)} /> */}
                {/* <button onClick={() => { getBeerId(tempId) }}>
                    Get Beer by Id
                </button> */}
                {beerData.map((beer) => {
                    return <Beer beerName={beer.beerName}/>
                })};
            </div>
        )
    }
}
export default Bar;

// description= {beer.description} image={beer.imageUrl} abv={beer.abv} alcoholFree={beer.alcoholFree} beerType={beer.beerType} 