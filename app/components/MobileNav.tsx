"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap, Activity, Users, Trophy } from "lucide-react";
import styles from "../page.module.css";

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <button
                className={styles.hamburgerBtn}
                onClick={toggleMenu}
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
                <div className={styles.mobileMenuContent}>
                    <Link href="/features" className={styles.mobileNavLink} onClick={toggleMenu}>
                        <Activity size={20} /> Features
                    </Link>
                    <Link href="#pricing" className={styles.mobileNavLink} onClick={toggleMenu}>
                        <Trophy size={20} /> Pricing
                    </Link>
                    <Link href="#" className={styles.mobileNavLink} onClick={toggleMenu}>
                        <Users size={20} /> Community
                    </Link>
                    <div className={styles.mobileMenuDivider}></div>
                    <Link href="/login" className={styles.mobileNavButton} onClick={toggleMenu}>
                        Login
                    </Link>
                    <Link href="/signup" className={`${styles.mobileNavButton} ${styles.primary}`} onClick={toggleMenu}>
                        Start Your Arc <Zap size={16} fill="currentColor" />
                    </Link>
                </div>
            </div>
        </>
    );
}
