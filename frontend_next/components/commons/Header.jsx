"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaHeadset, FaUser, FaBars, FaTimes, FaCartArrowDown, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useAuthStore } from "@/store/authStore.js";   // ← Zustand store import
import Swal from "sweetalert2";

// import Chatbot from "@/components/support/Chatbot";
// import { getLogout } from "@/feature/auth/authAPI";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();

    const isLogin = useAuthStore((state) => state.isLogin);
    const logout = useAuthStore((state) => state.logout);

    const [menuOpen, setMenuOpen] = useState(false);
    const [purchaseMenuOpen, setPurchaseMenuOpen] = useState(false);
    const [purchaseActive, setPurchaseActive] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [closing, setClosing] = useState(false);

    /** 모바일 여부 체크 */
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    /** 현재 경로가 /products or /compare인지 체크 */
    // useEffect(() => {
    //     if (
    //         pathname.startsWith("/products/") ||
    //         pathname.startsWith("/compare")
    //     ) {
    //         setPurchaseActive(true);
    //     } else {
    //         setPurchaseActive(false);
    //     }
    // }, [pathname]);

    const handleMouseEnterPurchase = () => {
        if (!isMobile) setPurchaseMenuOpen(true);
    };

    const handleMouseLeaveHeader = () => {
        if (!isMobile) setPurchaseMenuOpen(false);
    };

    const handleMouseEnterOther = () => {
        if (!isMobile) setPurchaseMenuOpen(false);
    };

    const handleMobilePurchaseClick = () => {
        if (isMobile) setPurchaseMenuOpen((prev) => !prev);
    };

    /** 모바일 메뉴 닫기 */
    const closeMobileMenu = () => {
        if (!isMobile) return;
        setClosing(true);
        setTimeout(() => {
            setMenuOpen(false);
            setPurchaseMenuOpen(false);
            setClosing(false);
        }, 300);
    };

    /** 장바구니 접근 시 로그인 필요 */
    const handleCartClick = (e) => {
        if (!isLogin) {
            e.preventDefault();
            Swal.fire({
                icon: "warning",
                title: "로그인 필요",
                text: "로그인이 필요합니다."
            });
            router.push("/login");
        }
    };

    return (
        <>
            <header className="header" onMouseLeave={handleMouseLeaveHeader}>
                {/* 로고 */}
                <div className="header-left">
                    <Link href="/" className="logo">
                        Bicycle-App
                    </Link>
                </div>

                {/* 중앙 메뉴 */}
                <nav
                    className={`header-center ${menuOpen ? (closing ? "closing" : "open") : ""}`}
                >
                    <ul>
                        {/* 자전거 구매 */}
                        <li
                            onMouseEnter={handleMouseEnterPurchase}
                            onClick={handleMobilePurchaseClick}
                        >
                          <span className={`menu-item ${purchaseActive ? "active" : ""}`}>
                            자전거 구매
                              {isMobile && (
                                  <span className="toggle-arrow">
                                {purchaseMenuOpen ? " ▲" : " ▼"}
                              </span>
                              )}
                          </span>

                            {isMobile && purchaseMenuOpen && (
                                <ul className="mobile-submenu">
                                    <li><Link href="/products/mountain" onClick={closeMobileMenu}>산악</Link></li>
                                    <li><Link href="/products/road" onClick={closeMobileMenu}>로드</Link></li>
                                    <li><Link href="/products/lifestyle" onClick={closeMobileMenu}>라이프스타일</Link></li>
                                    <li><Link href="/products/electric" onClick={closeMobileMenu}>전기</Link></li>
                                    <li><Link href="/compare" onClick={closeMobileMenu}>비교하기</Link></li>
                                </ul>
                            )}
                        </li>

                        {/* 자전거 대여 */}
                        <li onMouseEnter={handleMouseEnterOther}>
                            <Link href="/rental" onClick={closeMobileMenu}>
                                자전거 대여
                            </Link>
                        </li>

                        {/* 여행지 추천 */}
                        <li onMouseEnter={handleMouseEnterOther}>
                            <Link href="/travel" onClick={closeMobileMenu}>
                                여행지 추천
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* 우측 아이콘 메뉴 */}
                <div className="header-right">

                    <Link href="/cart" className="icon-link" onClick={handleCartClick}>
                        <FaCartArrowDown className="icon" />
                    </Link>

                    <Link href="/support" className="icon-link">
                        <FaHeadset className="icon" />
                    </Link>

                    <button
                        className={`icon-link ${showChatbot ? "active" : ""}`}
                        onClick={() => setShowChatbot(!showChatbot)}
                    >
                        💬
                    </button>

                    {isLogin && (
                        <Link href="/mypage" className="icon-link">
                            <FaUser className="icon" />
                        </Link>
                    )}

                    {isLogin ? (
                        <button
                            className="icon-link logout"
                            onClick={() => {
                                logout();          // Zustand 로그아웃
                                router.refresh();  // 화면 갱신
                            }}
                        >
                            <FaSignOutAlt className="icon" />
                        </button>
                    ) : (
                        <Link href="/login" className="icon-link">
                            <FaSignInAlt className="icon" />
                        </Link>
                    )}

                    {/* 모바일 메뉴 */}
                    <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* PC 서브메뉴 */}
                {!isMobile && purchaseMenuOpen && (
                    <div className="submenu-container">
                        <div className="submenu-content">
                            <Link href="/products/mountain">산악</Link>
                            <Link href="/products/road">로드</Link>
                            <Link href="/products/lifestyle">라이프스타일</Link>
                            <Link href="/products/electric">전기</Link>
                            <Link href="/compare">비교하기</Link>
                        </div>
                    </div>
                )}
            </header>

            {/*{showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}*/}

            {menuOpen && isMobile && (
                <div className="dim" onClick={closeMobileMenu}></div>
            )}
        </>
    );
}
