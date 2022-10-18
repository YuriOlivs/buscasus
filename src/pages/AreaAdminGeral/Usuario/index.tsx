import { MenuBackground } from '../../../components/Menu';
import { MenuLinksAdmin } from '../../../components/MenuLinks/MenuLinksAdmin';
import { Button } from '../../../components/Button';

import { MagnifyingGlass, Trash, Pencil } from 'phosphor-react';

import './styles.css';

export function Usuario() {
    return (
        <div>
            <MenuBackground menuLinks={<MenuLinksAdmin />}>
                <div className="container-geral">
                    <div className="container-column-admin">
                        <div className="container-cad-admin">
                            <h3 className="titulo-medico">Cadastrar novo administrador de um hospital</h3>
                            <form id="formAdminHospital">
                                <input type="hidden" name="idAdminHospital" />
                                <div>
                                    <label htmlFor="loginAdminHospital">Nome de usuário:</label>
                                    <input type="text" name="loginAdminHospital" id="loginAdminHospital" className="input-admin" />
                                </div>
                                <div className="input-icone">
                                    <label htmlFor="senhaAdminHospital">Senha:</label>
                                    <input type="password" name="senhaAdminHospital" id="senhaAdminHospital" className="input-admin" />
                                </div>
                                <div className="input-icone">
                                    <label htmlFor="confirmarSenha">Confirmar senha:</label>
                                    <input type="password" id="confirmarSenha" className="input-admin" />
                                </div>
                                <input type="hidden" name="tipoAdmin" value="1" />
                                <div>
                                    <label htmlFor="idHospital">Hospital:</label>
                                    <select id="idHospital" className="input-admin" name="idHospital">
                                        <option value="0">Selecionar</option>
                                    </select>
                                </div>
                                <div className="btn-container">
                                    <Button.Cancel value="Cancelar" />
                                    <Button.Submit value="Salvar" />
                                </div>
                            </form>
                        </div>

                        <div className="container-admin-hosp">
                            <h3>Administradores de hospitais cadastrados</h3>
                            <div className="container-search-download">
                                <div className="container-inputs">
                                    <div className="container-search select-disable">
                                        <input id="inputSearchAdmin" type="search" className="input-search" placeholder="Buscar" />
                                        <label htmlFor="inputSearchAdmin"></label>
                                    </div>
                                    <input type="button" className="btn-submit" value="Download" />
                                </div>
                            </div>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Nome de usuário</th>
                                        <th>Senha</th>
                                        <th>Id do Hospital</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <button className="btn-delete select-disable"></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="container-usuario">
                        <div className="container-titulo">
                            <h3>Usuários cadastrados</h3>
                            <div className="container-inputs">
                                <div className="container-search select-disable">
                                    <input id="inputSearchUsuario" type="search" className="input-search" placeholder="Buscar" />
                                    <label htmlFor="inputSearchUsuario"></label>
                                </div>
                            </div>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </MenuBackground>
        </div>
    )
}