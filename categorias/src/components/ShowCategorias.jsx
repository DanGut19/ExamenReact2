import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { alertaSuccess, alertaError, alertaWarning, alertaConfirmation } from '../functions';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const ShowCategorias = () => {
    const url = "https://api.escuelajs.co/api/v1/categories";
    const [categories, setCategories] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [titleModal, setTitleModal] = useState("");
    const [operacion, setOperation] = useState(1);

    const getCategories = async () => {
        const response = await axios.get(url);
        setCategories(response.data);
    }

    useEffect(() => {
        getCategories();
    });

    const openModal = (op, name, image, title) => {
        setId("");
        setName("");
        setImage("");
        setTitle("");
        setOperation(op);

        if (operation === 1) {
            setNameModal("Registrar Categoria");
        } else if (operation === 2) {
            setNameModal("Editar Categoria");
            setIdModal(id);
            setNameModal(name);
            setImageModal(image);
            setTitleModal(title);
            setOperation(2);
        }
    }

    const enviarSolicitud = async (url, metodo, parametros) => {
        let obj = {
            method: metodo,
            url: url,
            data: parametros,
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
            }
        };
        await axios(obj).then(() => {
            let mensaje;

            if (metodo === "POST"){
                mensaje = "Se Guardo la Categoria";
            }else if (metodo === "PUT"){
                mensaje = "Se Edito la Categoria";
            }else if (metodo === "DELETE"){
                mensaje = "Se Elimino la Categoria";
            }
            alertaError(mensaje, "success");
            document.getElementById("btnCerrandoModal").click();
            getCategories();
        }).catch((error) => {
            alertaError(error.response.data.message);
            console.log(error);
        });
    }

    const validar = () => {
        let payload;
        let metodo;
        let urlAxios;

        if (title === ""){
            alertaWarning("Escriba el nombre de la categoria", "Warning", "title");
        }else {
            payload = {
                title: title,
                name: name,
                image: ["https://i.imgur.com/QkIa5tT.jpeg"]
            };
            if (operation === 1){
                metodo = "POST";
                urlAxios = "https://api.escuelajs.co/api/v1/categories";
            } else {
                metodo = "PUT";
                urlAxios = "https://api.escuelajs.co/api/v1/categories" + id;
            }
            enviarSolicitud(urlAxios, metodo, payload);
        }
    }

    const deleteProducto = (id) => {
        let urlDelete = `https://api.escuelajs.co/api/v1/categories/${id}`;

        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Está seguro de eliminar el producto?',
            name: 'question',
            image: 'No habrá marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setId(id);
                enviarSolicitud(urlDelete, 'DELETE', {});
            }
        }).catch((error) => {
            alertaError(error);
            console.log(error);
        });
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
                                    <th>Title</th>
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
                                            <td>{categorie.title}</td>
                                            <td>{categorie.name}</td>
                                            <td>{categorie.image}</td>
                                            <td>
                                            <button onClick={() => openModal(2, categories.id,categories.title, categories.name, categories.image )} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalCategories'>
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
                                <imput type="text" id="title" className="form-control" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
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