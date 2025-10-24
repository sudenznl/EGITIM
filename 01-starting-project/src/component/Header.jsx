import logo from '../assets/investment-calculator-logo.png';
import { useState } from 'react';
export default function Header(){
    return (
    <header id="header">
            <img src={logo} alt='Para Çantası' />
            <h1>Yatırım Hesaplayıcısı</h1>
        </header>
    );
} 