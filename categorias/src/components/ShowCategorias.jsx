import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { alerta } from '../functions';

const ShowCategorias = () => {
    const url = "https://api.escuelajs.co/api/v1/categories";
    const [categories, setCategories] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [titleModal, setTitleModal] = useState("");

    const getCategories = async () => {
        const response = await axios.get(url);
        setCategories(response.data);
    }

    useEffect(() => {
        getCategories();
    });

    const openModal = (op, name, image) => {
        setId("");
        setName("");
        setImage("");
        setOperation(op);

        if (operation === 1) {
            setNameModal("Registrar Categoria");
        } else if (operation === 2) {
            setNameModal("Editar Categoria");
            setIdModal(id);
            setNameModal(name);
            setImageModal(image);
        }
    }

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle="modal" data-bs-target="#modalCategories">
                                <i className='fa-solid fa-circle-plus' /> Añadir
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
                                            <td>
                                            <button onClick={() => openModal(2, categories.id, categories.name, categories.image )} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalCategories'>
                                                <i className='fa-solid fa-edit' />
                                            </button>
                                            <button onClick={() => deleteProducto(categories.id)} className='btn btn-danger'>
                                                <i className='fa-solid fa-trash' />
                                            </button>
                                        </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div id='modalCategories' className='modal face' aria-hidden="true">
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{titleModal}</label>
                            <button type='button' className='btn-close' data-bs-dismiss="modal" aria-label='close'/>
                        </div>
                        <div className='modal-body'>
                            <imput type="hidden" id="id"/>
                            <div className='imput-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'/></span>
                                <imput type="text" id="id" className="form-control" placeholder="id" value={id} onChange={(e) => setId(e.target.value)}/>
                            </div>
                            <div className='imput-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'/></span>
                                <imput type="text" id="name" className="form-control" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className='imput-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'/></span>
                                <imput type="text" id="image" className="form-control" placeholder="image" value={image} onChange={(e) => setImage(e.target.value)}/>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button className='btn btn-success'>
                                <i className='fa-solid fa-floppy-disk'/> Guardar
                            </button>
                            <button id='btnCerrarModal' className='btn btn-secondary' data-bs-dismiss="modal">
                                 Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowCategorias;