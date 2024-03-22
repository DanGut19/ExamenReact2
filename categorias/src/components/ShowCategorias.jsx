import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { alerta } from '../functions';

const ShowCategorias = () => {
    const url = "https://api.escuelajs.co/api/v1/categories";
    const [categories, setCategories] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const getCategories = async () => {
        const response = await axios.get(url);
        setCategories(response.data);
    }

    useEffect (() => {
        getCategories();
    });
    
  return (
    <div className='App'>
        <div className='container-fluid'>
            <div className='row mt-3'>
                <div className='col-md-4 offset-md-4'>
                    <div className='d-grid mx-auto'>
                        <button className='btn btn-dark'>
                            <i className='fa-solid fa-circle-plus'/>Añadir
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className='row mt-3'>
            <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                <div className='table-responsive'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Imagen</th>
                            </tr>
                        </thead>
                        <tbody className='table-gruop-divider'>
                            {
                                categories.map((categorie, i) => (
                                    <tr key={categorie.id}>
                                        <td>{i + 1}</td>
                                        <td>{categorie.id}</td>
                                        <td>{categorie.name}</td>
                                        <td>{categorie.image}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShowCategorias;