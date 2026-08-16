import styled from "styled-components";

export const Styled = {
    Wrapper: styled.header`
        width: 100%;
        min-height: 76px;
        padding: 0 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        border-bottom: 1px solid #202020;
        background: rgba(7, 7, 7, 0.94);
        backdrop-filter: blur(18px);

        .brand {
            display: inline-flex;
            align-items: center;
            gap: 13px;
        }

        .brandIcon {
            width: 42px;
            height: 42px;
            flex: 0 0 42px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #303030;
            border-radius: 12px;
            color: #bdbdbd;
            background: #111111;
            font-size: 18px;
            transition:
                color 0.2s ease,
                background 0.2s ease,
                border-color 0.2s ease,
                transform 0.2s ease;
        }

        .brand:hover .brandIcon {
            color: #050505;
            background: #f5f5f5;
            border-color: #f5f5f5;
            transform: rotate(-5deg);
        }

        .brand > div {
            display: flex;
            flex-direction: column;
            gap: 3px;
        }

        .brandLabel {
            color: #666666;
            font-size: 0.625rem;
            font-weight: 800;
            letter-spacing: 0.16em;
            text-transform: uppercase;
        }

        .brand strong {
            color: #f5f5f5;
            font-size: 1.125rem;
            font-weight: 800;
            line-height: 1;
            letter-spacing: -0.03em;
        }

        .headerActions {
            display: flex;
            align-items: center;
            gap: 9px;
        }

        .noteCount {
            min-height: 38px;
            padding: 0 13px;
            display: inline-flex;
            align-items: center;
            border: 1px solid #292929;
            border-radius: 999px;
            color: #737373;
            background: #101010;
            font-size: 0.6875rem;
            font-weight: 700;
        }

        .githubLink {
            width: 40px;
            height: 40px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #292929;
            border-radius: 11px;
            color: #737373;
            background: #101010;
            font-size: 17px;
            transition:
                color 0.2s ease,
                background 0.2s ease,
                border-color 0.2s ease,
                transform 0.2s ease;
        }

        .githubLink:hover {
            color: #050505;
            background: #f5f5f5;
            border-color: #f5f5f5;
            transform: translateY(-2px);
        }

        @media (max-width: 520px) {
            min-height: 68px;
            padding: 0 16px;

            .noteCount {
                display: none;
            }
        }
    `,
};
