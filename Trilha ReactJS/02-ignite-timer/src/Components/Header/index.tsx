import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";
import LogoIgnite from '../../Assets/Logo.svg'
import { HeaderContainer } from "./styles";


export function Header() {
    return (
        <HeaderContainer>
            <img src={LogoIgnite} alt="" />
            <nav>
                <NavLink to="/" title="Contador" >
                    <Timer size={24} />
                </NavLink>
                <NavLink to="/history" title="Histórico" >
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}