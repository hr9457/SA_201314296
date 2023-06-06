import React, { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';




export const Home = () => {

    const [getPoke, setPoke] = useState([]);
    const [getCard, setCard] = useState({name: "", img:""});
    const [buscar, setBuscar] = useState("");

    const pokeApi = async () => {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=50&offset=0`;
        const res = await fetch(url,{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        const resJson = await res.json();
        // setPoke(await resJson.results);

        resJson.results.forEach(async (element) => {
            // console.log(element);
            await fetch(element.url,{
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((data)=>{
                return data.json();
            }).then ( (data) => {
                setPoke(prev => [...prev, data]);
            });
        });    
    };

    const getPokemon = async (numero) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${numero}`;
        const res = await fetch(url,{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(data => {
            return data.json();
        });
        // setCard(res);
        console.log(await res);
        setCard(await res);
        return res;
    };


    useEffect(() => {
        pokeApi();
    },[]);

    return (        
        <>
            <h1>API REST Y SOAP</h1>
            
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>GET API REST - POKE API</Accordion.Header>
                    <Accordion.Body>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                getPoke.map((pokemon, i) => {
                                    return(
                                        <tr >
                                            <th>{i+1}</th>
                                            <th>{pokemon.name}</th>
                                            {/* <th>{console.log(pokemon)}</th> */}
                                            <th><img src={pokemon.sprites.front_default}></img></th>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table>

                    </Accordion.Body>
                </Accordion.Item>                
            </Accordion>

            <Card style={{ width: '18rem' }}>
            <img variant="top" src={getCard.sprites.front_default}/>
            <Card.Body>
                <Card.Title>{getCard.name}</Card.Title>
                <input type='text' placeholder='pokemon' className='search' onChange={ value => setBuscar(value.target.value)}></input>
                <Button variant="primary" onClick={() => getPokemon(buscar)}>Buscar</Button>
            </Card.Body>
            </Card>

        </>
    )
}
