import styled from "styled-components";
export const Styled = {
 Wrapper: styled.div`height: 100vh; overflow: hidden; display: flex; flex-direction: column;
   .scrollTopButton { position: fixed; right: 22px; bottom: 22px; z-index: 10; width: 44px; height: 44px; display: grid; place-items: center; border: 1px solid var(--color-border); border-radius: 14px; color: #fff; background: var(--color-primary); box-shadow: 0 10px 28px var(--color-shadow); opacity: 0; pointer-events: none; transform: translateY(10px); transition: opacity .16s ease, transform .16s ease, background .16s ease, box-shadow .16s ease; }
   .scrollTopButton.show { opacity: 1; pointer-events: auto; transform: translateY(0); }
   .scrollTopButton:hover { background: var(--color-primary-hover); box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary) 20%, transparent), 0 10px 28px var(--color-shadow); }`,
 Header: styled.header`height: 60px; flex-shrink: 0;`,
 Main: styled.main`
   flex: 1; overflow-y: auto; position: relative;
   .studyNav { position: fixed; top: 60px; bottom: 0; left: 0; width: 248px; padding: 22px 14px; overflow-y: auto; background: var(--color-surface-2); border-right: 1px solid var(--color-border); z-index: 4; }
   .studyNavLabel { padding: 0 10px 10px; color: var(--color-text-muted); font-size: 11px; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
   .studyNav nav { display: grid; gap: 4px; }
   .studyNav a { display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px; border-radius: 10px; color: var(--color-text-secondary); text-align: left; font-size: 13px; font-weight: 800; text-decoration: none; line-height: 1.25; transition: background .16s ease, color .16s ease, transform .16s ease; }
   .studyNav a:hover, .studyNav a.active { background: var(--color-primary); color: #fff; }
   .studyNav a svg { flex: 0 0 auto; font-size: 16px; }
   .studyNav a:hover { transform: translateX(2px); }
   .studyNav p { margin: 18px 10px 0; color: var(--color-text-muted); font-size: 12px; }
   .contentWrapper { min-height: 100%; max-width: 1440px; margin: 0 0 0 248px; display: flex; flex-direction: column; padding: 15px; }
   .topicWrapper { display: none; }
   .topicWrapper.activeTopic { display: block; }
   .footerWrapper { flex-shrink: 0; }
   @media (max-width: 800px) { .studyNav { position: static; width: auto; margin: 12px; border: 1px solid var(--color-border); border-radius: 16px; max-height: 220px; } .studyNav nav { grid-template-columns: repeat(2, minmax(0, 1fr)); } .contentWrapper { margin-left: 0; } }
 `,
};


