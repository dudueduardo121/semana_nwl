import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'

import backIcons from '../../assets/images/icons/back.svg';
import logoImg from '../../assets/images/logo.svg';

interface PageHeaderProps {
    title: string; //title obrigatorio
    description?: string;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcons} alt="voltar"/>
                </Link>
                <img src={logoImg} alt="prof"/>
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                    {props.description && <p>{props.description}</p>}
                {props.children}
            </div>
        </header>
    );
}

export default PageHeader;