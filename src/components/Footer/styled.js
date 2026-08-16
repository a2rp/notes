import styled from "styled-components";

export const Styled = {
    Wrapper: styled.footer`
        margin-top: 72px;
        border-top: 1px solid #1f1f1f;
        background:
            radial-gradient(
                circle at 85% 10%,
                rgba(255, 255, 255, 0.035),
                transparent 28%
            ),
            #070707;

        .footerInner {
            width: min(calc(100% - 48px), 1440px);
            margin: 0 auto;
            padding: 52px 0 24px;
        }

        .footerTop {
            display: grid;
            grid-template-columns:
                minmax(280px, 0.8fr)
                minmax(0, 1.2fr);
            gap: 70px;
            padding-bottom: 38px;
        }

        .brandBlock {
            max-width: 430px;
        }

        .brandHeading {
            display: flex;
            align-items: center;
            gap: 14px;
        }

        .brandMark {
            width: 46px;
            height: 46px;
            flex: 0 0 46px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #303030;
            border-radius: 13px;
            color: #d4d4d4;
            background: #111111;
            font-size: 0.6875rem;
            font-weight: 900;
            letter-spacing: -0.03em;
        }

        .brandHeading > div {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .brandHeading strong {
            color: #f5f5f5;
            font-size: 1.25rem;
            font-weight: 800;
            line-height: 1;
            letter-spacing: -0.035em;
        }

        .brandHeading > div > span {
            color: #5f5f5f;
            font-size: 0.625rem;
            font-weight: 800;
            letter-spacing: 0.11em;
            text-transform: uppercase;
        }

        .brandBlock > p {
            margin: 20px 0 0;
            color: #737373;
            font-size: 0.8125rem;
            line-height: 1.8;
        }

        .storageInfo {
            width: fit-content;
            margin-top: 20px;
            padding: 9px 11px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            border: 1px solid #252525;
            border-radius: 999px;
            color: #666666;
            background: #0d0d0d;
            font-size: 0.625rem;
            font-weight: 700;
        }

        .statusDot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #a3a3a3;
            box-shadow:
                0 0 0 4px rgba(255, 255, 255, 0.035),
                0 0 12px rgba(255, 255, 255, 0.16);
            animation: statusPulse 2.2s ease-in-out infinite;
        }

        .footerLinks {
            display: grid;
            grid-template-columns: 1.3fr 0.7fr;
            gap: 42px;
        }

        .linkGroup {
            min-width: 0;
        }

        .groupTitle {
            display: block;
            margin-bottom: 14px;
            color: #525252;
            font-size: 0.625rem;
            font-weight: 800;
            letter-spacing: 0.14em;
            text-transform: uppercase;
        }

        .linkGrid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
        }

        .supportLinks {
            grid-template-columns: 1fr;
        }

        .linkGrid a {
            min-height: 46px;
            padding: 0 13px;
            display: flex;
            align-items: center;
            gap: 10px;
            border: 1px solid #242424;
            border-radius: 12px;
            color: #737373;
            background: #0d0d0d;
            font-size: 0.6875rem;
            font-weight: 700;
            transition:
                color 0.2s ease,
                background 0.2s ease,
                border-color 0.2s ease,
                transform 0.2s ease;
        }

        .linkGrid a:hover {
            color: #f5f5f5;
            border-color: #404040;
            background: #151515;
            transform: translateY(-2px);
        }

        .linkIcon {
            width: 28px;
            height: 28px;
            flex: 0 0 28px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #292929;
            border-radius: 8px;
            color: #666666;
            background: #111111;
            font-size: 0.8125rem;
            transition:
                color 0.2s ease,
                background 0.2s ease,
                transform 0.2s ease;
        }

        .linkGrid a:hover .linkIcon {
            color: #050505;
            background: #f5f5f5;
            transform: rotate(-5deg);
        }

        .footerBottom {
            min-height: 66px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
            border-top: 1px solid #1f1f1f;
        }

        .copyright {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
            color: #525252;
            font-size: 0.625rem;
            font-weight: 700;
        }

        .copyright a {
            color: #8a8a8a;
            transition: color 0.2s ease;
        }

        .copyright a:hover {
            color: #ffffff;
        }

        .separator {
            color: #343434;
        }

        .backToTop {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            color: #666666;
            font-size: 0.625rem;
            font-weight: 800;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            transition:
                color 0.2s ease,
                transform 0.2s ease;
        }

        .backToTop svg {
            transition: transform 0.2s ease;
        }

        .backToTop:hover {
            color: #ffffff;
        }

        .backToTop:hover svg {
            transform: translateY(-4px);
        }

        @keyframes statusPulse {
            0%,
            100% {
                opacity: 0.45;
                transform: scale(0.9);
            }

            50% {
                opacity: 1;
                transform: scale(1);
            }
        }

        @media (max-width: 980px) {
            .footerTop {
                grid-template-columns: 1fr;
                gap: 42px;
            }

            .brandBlock {
                max-width: 600px;
            }
        }

        @media (max-width: 700px) {
            .footerInner {
                width: min(calc(100% - 28px), 1440px);
                padding-top: 40px;
            }

            .footerLinks {
                grid-template-columns: 1fr;
            }

            .supportLinks {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (max-width: 520px) {
            .linkGrid,
            .supportLinks {
                grid-template-columns: 1fr;
            }

            .footerBottom {
                padding: 20px 0;
                align-items: flex-start;
                flex-direction: column;
            }
        }
    `,
};
