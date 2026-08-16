import styled from "styled-components";

export const Styled = {
    Wrapper: styled.section`
        padding: 28px;
        border: 1px solid #252525;
        border-radius: 18px;
        background:
            radial-gradient(
                circle at top right,
                rgba(255, 255, 255, 0.035),
                transparent 34%
            ),
            #0b0b0b;
        box-shadow:
            0 24px 70px rgba(0, 0, 0, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.025);

        .toolbarHeader {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 32px;
            margin-bottom: 26px;
        }

        .sectionLabel {
            display: block;
            margin-bottom: 9px;
            color: #737373;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.16em;
            text-transform: uppercase;
        }

        h1 {
            margin: 0;
            color: #f5f5f5;
            font-size: clamp(30px, 4vw, 46px);
            font-weight: 700;
            line-height: 1;
            letter-spacing: -0.05em;
        }

        .toolbarHeader p {
            max-width: 560px;
            margin: 12px 0 0;
            color: #666666;
            font-size: 12px;
            line-height: 1.7;
        }

        .addButton {
            min-height: 44px;
            padding: 0 17px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            flex: 0 0 auto;
            border: 1px solid #e5e5e5;
            border-radius: 12px;
            color: #050505;
            background: #f5f5f5;
            font-family: inherit;
            font-size: 11px;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(255, 255, 255, 0.06);
            transition:
                transform 0.18s ease,
                background 0.18s ease,
                box-shadow 0.18s ease;
        }

        .addButton:hover {
            background: #ffffff;
            transform: translateY(-2px);
            box-shadow: 0 14px 34px rgba(255, 255, 255, 0.1);
        }

        .addButton svg {
            font-size: 15px;
            transition: transform 0.18s ease;
        }

        .addButton:hover svg {
            transform: rotate(90deg);
        }

        .toolbarBody {
            display: grid;
            grid-template-columns:
                minmax(280px, 1fr)
                minmax(150px, 0.28fr)
                minmax(150px, 0.28fr)
                auto;
            gap: 10px;
        }

        .searchBox,
        .filterBox {
            position: relative;
        }

        .searchBox > svg,
        .filterBox > svg {
            position: absolute;
            top: 50%;
            left: 14px;
            z-index: 2;
            color: #666666;
            font-size: 14px;
            transform: translateY(-50%);
            pointer-events: none;
        }

        input,
        select {
            width: 100%;
            height: 44px;
            border: 1px solid #292929;
            border-radius: 11px;
            outline: none;
            color: #d4d4d4;
            background: #111111;
            font-family: inherit;
            font-size: 11px;
            font-weight: 600;
            transition:
                border-color 0.18s ease,
                background 0.18s ease,
                box-shadow 0.18s ease;
        }

        input {
            padding: 0 42px 0 40px;
        }

        select {
            padding: 0 34px 0 40px;
            cursor: pointer;
        }

        input::placeholder {
            color: #525252;
        }

        input:focus,
        select:focus {
            border-color: #454545;
            background: #151515;
            box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.035);
        }

        select option {
            color: #e5e5e5;
            background: #111111;
        }

        .clearSearch {
            position: absolute;
            top: 50%;
            right: 10px;
            width: 26px;
            height: 26px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 0;
            border-radius: 8px;
            color: #666666;
            background: transparent;
            cursor: pointer;
            transform: translateY(-50%);
            transition:
                color 0.18s ease,
                background 0.18s ease;
        }

        .clearSearch:hover {
            color: #ffffff;
            background: #202020;
        }

        .clearFiltersButton {
            height: 44px;
            padding: 0 13px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            border: 1px solid #292929;
            border-radius: 11px;
            color: #737373;
            background: #111111;
            font-family: inherit;
            font-size: 10px;
            font-weight: 800;
            cursor: pointer;
            transition:
                color 0.18s ease,
                background 0.18s ease,
                border-color 0.18s ease,
                transform 0.18s ease;
        }

        .clearFiltersButton:hover {
            color: #ffffff;
            border-color: #404040;
            background: #191919;
            transform: translateY(-1px);
        }

        .toolbarFooter {
            margin-top: 18px;
            padding-top: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            border-top: 1px solid #1f1f1f;
        }

        .resultCount {
            display: flex;
            align-items: baseline;
            gap: 6px;
        }

        .resultCount strong {
            color: #f5f5f5;
            font-size: 16px;
            font-weight: 800;
        }

        .resultCount span,
        .toolbarHint {
            color: #525252;
            font-size: 10px;
            font-weight: 700;
        }

        @media (max-width: 950px) {
            .toolbarBody {
                grid-template-columns: 1fr 1fr;
            }

            .searchBox {
                grid-column: 1 / -1;
            }

            .clearFiltersButton {
                width: 100%;
            }
        }

        @media (max-width: 620px) {
            padding: 22px;

            .toolbarHeader {
                flex-direction: column;
                gap: 20px;
            }

            .addButton {
                width: 100%;
            }

            .toolbarBody {
                grid-template-columns: 1fr;
            }

            .searchBox {
                grid-column: auto;
            }

            .toolbarFooter {
                align-items: flex-start;
                flex-direction: column;
                gap: 8px;
            }
        }
    `,
};
