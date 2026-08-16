import styled from "styled-components";

export const Styled = {
    Wrapper: styled.section`
        min-height: 68px;
        padding: 12px 16px;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 20px;
        align-items: center;
        border: 1px solid #252525;
        border-radius: 16px;
        background: #0b0b0b;

        .resultInfo {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 5px;
            color: #666666;
            font-size: 10px;
            font-weight: 700;
        }

        .resultInfo strong {
            color: #d4d4d4;
            font-size: 11px;
        }

        .paginationControls {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
        }

        .pageNumbers {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .navigationButton,
        .pageButton {
            width: 34px;
            height: 34px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #292929;
            border-radius: 10px;
            color: #737373;
            background: #111111;
            font-family: inherit;
            font-size: 11px;
            font-weight: 800;
            cursor: pointer;
            transition:
                color 0.18s ease,
                border-color 0.18s ease,
                background 0.18s ease,
                transform 0.18s ease;
        }

        .navigationButton {
            font-size: 15px;
        }

        .navigationButton:hover:not(:disabled),
        .pageButton:hover {
            color: #ffffff;
            border-color: #404040;
            background: #1b1b1b;
            transform: translateY(-2px);
        }

        .pageButton.active {
            color: #050505;
            border-color: #f5f5f5;
            background: #f5f5f5;
            box-shadow: 0 7px 20px rgba(255, 255, 255, 0.1);
        }

        .navigationButton:disabled {
            cursor: not-allowed;
            opacity: 0.28;
            transform: none;
        }

        .ellipsis {
            width: 24px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #525252;
            font-size: 11px;
            letter-spacing: 0.08em;
        }

        .pageSize {
            justify-self: end;
            display: flex;
            align-items: center;
            gap: 9px;
        }

        .pageSize label {
            color: #666666;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .pageSize select {
            min-width: 70px;
            height: 36px;
            padding: 0 28px 0 11px;
            border: 1px solid #292929;
            border-radius: 10px;
            outline: none;
            color: #d4d4d4;
            background: #111111;
            font-family: inherit;
            font-size: 10px;
            font-weight: 800;
            cursor: pointer;
        }

        .pageSize select:focus {
            border-color: #525252;
        }

        .pageSize option {
            color: #f5f5f5;
            background: #111111;
        }

        @media (max-width: 780px) {
            grid-template-columns: 1fr auto;

            .paginationControls {
                grid-column: 1 / -1;
                grid-row: 1;
            }

            .resultInfo {
                grid-column: 1;
                grid-row: 2;
            }

            .pageSize {
                grid-column: 2;
                grid-row: 2;
            }
        }

        @media (max-width: 520px) {
            grid-template-columns: 1fr;

            .pageNumbers {
                max-width: calc(100vw - 150px);
                overflow-x: auto;
                scrollbar-width: none;
            }

            .pageNumbers::-webkit-scrollbar {
                display: none;
            }

            .resultInfo,
            .pageSize {
                grid-column: 1;
                justify-self: center;
            }

            .resultInfo {
                grid-row: 2;
            }

            .pageSize {
                grid-row: 3;
            }
        }
    `,
};
