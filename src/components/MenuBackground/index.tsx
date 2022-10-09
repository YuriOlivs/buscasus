import { Link, useNavigate } from 'react-router-dom';
import UseAuth from '../../hooks/useAuth';
import './styles.css';

interface MenuBackgroundProps {
    children: React.ReactNode;
    menuLinks: React.ReactComponentElement<any>;
}

export function MenuBackground({ children, menuLinks }: MenuBackgroundProps) {
    const { signOut, hospitalName }: any = UseAuth();
    const navigate = useNavigate();

    return (
        <div>
            <div className="versao-incompativel">
                <h2 className="text-versao-incompativel">Versão incompatível!</h2>
            </div>

            <div className="container">

                <div className="item-1 select-disable">
                    <img src="../../logo.png" alt="Logo BuscaSUS" className="img-logo-admin" />
                    <h3>{hospitalName ? hospitalName : "Administrador Geral"}</h3>
                    <Link to="/"><button onClick={() => [signOut(), navigate("/")]} id="btnLogout" className="btn-logout">Sair</button></Link>
                </div>

                <div className="item-2 select-disable">
                    {menuLinks}
                    <div className="footer">
                        <svg className="svg-admin" viewBox="0 0 598 533" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="598" height="533" fill="#3eb08f" />
                            <path d="M72.5289 335.202C72.5289 335.202 208.283 422.418 263.491 204.927C318.698 -12.5636 454.452 74.6523 454.452 74.6523L551.023 246.59L169.099 507.14L72.5289 335.202Z" fill="#349684" />
                            <rect x="79" y="381" width="100" height="100" fill="#45CA99" />
                            <path d="M86.549 336.984C86.549 336.984 214.247 441.294 292.068 235.944C369.889 30.5944 497.587 134.905 497.587 134.905L577.179 316.748L398.978 466.604L166.141 518.827L86.549 336.984Z" fill="#45CA99" />
                        </svg>
                        <h5 className="text-footer">Pyxis © 2022</h5>
                    </div>
                </div>

                <main className="item-3">
                    {children}
                </main>

            </div>
        </div>
    )
}