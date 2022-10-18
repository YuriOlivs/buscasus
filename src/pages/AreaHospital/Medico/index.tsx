import { MenuBackground } from '../../../components/Menu';
import { MenuLinksHospital } from '../../../components/MenuLinks/MenuLinksHospital';
import { Button } from '../../../components/Button';

import { MagnifyingGlass, Trash, Pencil } from 'phosphor-react';

import './styles.css';

export function Medico() {
    return (
        <div>
            <MenuBackground menuLinks={<MenuLinksHospital />}>
                <div className="container-cad-medico">
                    <h3 className="titulo-medico">Cadastrar um novo médico</h3>
                    <form id="formMedico" autoComplete='off'>
                        <input type="hidden" name="idMedico" />
                        <div className="container-inputs-med">
                            <div className="input-med">
                                <label htmlFor="nomeMedico">Nome:</label>
                                <input type="text" id="nomeMedico" className="input-hospital" name="nomeMedico" />
                            </div>
                            <div className="input-med">
                                <label htmlFor="cpfMedico">CPF:</label>
                                <input type="text" id="cpfMedico" className="input-hospital" name="cpfMedico" />
                            </div>
                            <div className="input-med">
                                <label htmlFor="crmMedico">CRM:</label>
                                <input type="text" id="crmMedico" className="input-hospital" name="crmMedico" />
                            </div>
                            <div className="input-med">
                                <label htmlFor="idEspecialidade">Especialidade:</label>
                                <select id="idEspecialidade" className="input-hospital" name="idEspecialidade">
                                    <option value="0">Selecionar</option>
                                </select>
                            </div>
                            <div id="containerFotoMed" className="container-foto">
                                <input id="inputCaminhoImg" type="text" disabled />
                                <label className="btnFoto select-disable" htmlFor="fotoMedico">Escolher foto</label>
                            </div>
                            <input hidden type="file" accept=".jpg, .png" id="fotoMedico" placeholder="Foto do Médico" name="fotoMedico" />
                            <input type="hidden" name="idHospital" />
                        </div>
                        <div className="btn-container">
                            <Button.Cancel value="Cancelar" />
                            <Button.Submit value="Salvar" />
                        </div>
                    </form>
                </div>
                <div className="container-medico">
                    <div className="container-titulo">
                        <h3>Médicos cadastrados</h3>
                        <div className="container-inputs">
                            <div className="container-search select-disable">
                                <input id="inputSearch" type="search" className="input-search" placeholder="Buscar" />
                                <label htmlFor="inputSearch"></label>
                            </div>
                            <input type="button" className="btn-submit" value="Download" />
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Foto</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>CRM</th>
                                <th>Especialidade</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img className="foto select-disable" src="" /></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <div className="container-btn-med select-disable">
                                        <button className="btn-delete"></button>
                                        <button className="btn-edit"></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </MenuBackground>
        </div>
    )
}