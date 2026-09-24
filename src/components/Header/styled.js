import styled from "styled-components";

export const Styled = {
    Wrapper: styled.header`
        position: fixed;
        inset: 0 0 auto;
        z-index: 1000;
        width: 100%;
        min-height: 76px;
        padding: 0 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        border-bottom: 1px solid #202020;
        background: rgba(7,7,7,.94);
        backdrop-filter: blur(18px);
        .brand { display: inline-flex; align-items: center; gap: 12px; color: #f5f5f5; text-decoration: none; }
        .logo { width: 42px; height: 42px; padding: 5px; border: 1px solid #303030; border-radius: 12px; background: #111; object-fit: contain; }
        .brand > div { display: flex; flex-direction: column; gap: 3px; }
        .brandLabel { color: #666; font-size: .625rem; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
        .brand strong { font-size: 1.125rem; font-weight: 800; line-height: 1; }
        .nav { display: flex; align-items: center; gap: 8px; margin-left: auto; }
        .nav a { display: inline-flex; align-items: center; gap: 7px; padding: 9px 11px; border: 1px solid transparent; border-radius: 9px; color: #999; font-size: .78rem; text-decoration: none; transition: border-color .18s ease, color .18s ease, box-shadow .18s ease, text-shadow .18s ease; }
        .nav a:hover { border-color: #555; color: #fff; box-shadow: 0 0 14px rgba(255,255,255,.08); text-shadow: 0 0 10px rgba(255,255,255,.25); }
        .headerActions { display: flex; align-items: center; gap: 9px; }
        .noteCount { min-height: 38px; padding: 0 13px; display: inline-flex; align-items: center; border: 1px solid #292929; border-radius: 999px; color: #737373; background: #101010; font-size: .6875rem; font-weight: 700; }
        .menuButton { display: none; width: 40px; height: 40px; place-items: center; border: 1px solid #292929; border-radius: 10px; color: #bbb; background: #101010; cursor: pointer; transition: border-color .18s ease, box-shadow .18s ease; }
        .menuButton:hover { border-color: #f5f5f5; box-shadow: 0 0 14px rgba(255,255,255,.1); }
        @media (max-width: 720px) { .nav { position: absolute; top: calc(100% + 8px); right: 16px; display: none; width: min(230px, calc(100vw - 32px)); padding: 8px; border: 1px solid #292929; border-radius: 12px; background: #101010; box-shadow: 0 18px 40px rgba(0,0,0,.38); } .nav.open { display: grid; } .nav a { justify-content: flex-start; } .menuButton { display: grid; } .noteCount { display: none; } }
        @media (max-width: 420px) { min-height: 68px; padding: 0 16px; .logo { width: 36px; height: 36px; } }
    `,
};