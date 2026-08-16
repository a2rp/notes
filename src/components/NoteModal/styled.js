import styled from "styled-components";

export const Styled = {
    Overlay: styled.div`
        position: fixed;
        inset: 0;
        z-index: 1200;
        padding: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-y: auto;
        background: rgba(0, 0, 0, 0.84);
        backdrop-filter: blur(12px);
    `,

    Modal: styled.div`
        width: min(100%, 760px);
        max-height: calc(100vh - 48px);
        overflow-y: auto;
        border: 1px solid #292929;
        border-radius: 20px;
        background:
            radial-gradient(
                circle at top right,
                rgba(255, 255, 255, 0.04),
                transparent 30%
            ),
            #0b0b0b;
        box-shadow:
            0 40px 120px rgba(0, 0, 0, 0.72),
            inset 0 1px 0 rgba(255, 255, 255, 0.03);

        .modalHeader {
            position: sticky;
            top: 0;
            z-index: 4;
            padding: 26px 28px;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 24px;
            border-bottom: 1px solid #222222;
            background: rgba(11, 11, 11, 0.96);
            backdrop-filter: blur(14px);
        }

        .sectionLabel {
            display: block;
            margin-bottom: 8px;
            color: #737373;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.16em;
            text-transform: uppercase;
        }

        h2 {
            margin: 0;
            color: #f5f5f5;
            font-size: clamp(26px, 4vw, 38px);
            font-weight: 700;
            letter-spacing: -0.045em;
        }

        .closeButton {
            width: 38px;
            height: 38px;
            flex: 0 0 38px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #292929;
            border-radius: 11px;
            color: #737373;
            background: #111111;
            font-size: 15px;
            cursor: pointer;
            transition:
                color 0.18s ease,
                background 0.18s ease,
                transform 0.18s ease;
        }

        .closeButton:hover {
            color: #ffffff;
            background: #1c1c1c;
            transform: rotate(4deg);
        }

        .formGrid {
            padding: 28px;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 20px;
        }

        .fullWidth {
            grid-column: 1 / -1;
        }

        .field {
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 9px;
        }

        .field > label {
            color: #737373;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.1em;
            text-transform: uppercase;
        }

        input,
        textarea,
        select {
            width: 100%;
            border: 1px solid #292929;
            border-radius: 12px;
            outline: none;
            color: #e5e5e5;
            background: #111111;
            font-family: inherit;
            font-size: 12px;
            transition:
                border-color 0.18s ease,
                background 0.18s ease,
                box-shadow 0.18s ease;
        }

        input,
        select {
            height: 44px;
            padding: 0 13px;
        }

        textarea {
            min-height: 220px;
            padding: 13px;
            resize: vertical;
            line-height: 1.75;
        }

        input::placeholder,
        textarea::placeholder {
            color: #525252;
        }

        input:focus,
        textarea:focus,
        select:focus {
            border-color: #454545;
            background: #151515;
            box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.035);
        }

        select option {
            color: #f5f5f5;
            background: #111111;
        }

        .characterCount,
        .fieldHint {
            color: #4f4f4f;
            font-size: 9px;
            font-weight: 700;
        }

        .characterCount {
            align-self: flex-end;
        }

        .inputWithIcon {
            position: relative;
        }

        .inputWithIcon svg {
            position: absolute;
            top: 50%;
            left: 13px;
            z-index: 1;
            color: #666666;
            font-size: 14px;
            transform: translateY(-50%);
            pointer-events: none;
        }

        .inputWithIcon input {
            padding-left: 38px;
        }

        .modalFooter {
            position: sticky;
            bottom: 0;
            z-index: 4;
            padding: 18px 28px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            border-top: 1px solid #222222;
            background: rgba(11, 11, 11, 0.96);
            backdrop-filter: blur(14px);
        }

        .shortcutHint {
            color: #4f4f4f;
            font-size: 0.625rem;
            font-weight: 700;
        }

        .footerActions {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .footerActions button {
            min-height: 42px;
            padding: 0 16px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            border-radius: 11px;
            font-family: inherit;
            font-size: 0.6875rem;
            font-weight: 800;
            cursor: pointer;
            transition:
                transform 0.18s ease,
                background 0.18s ease,
                border-color 0.18s ease;
        }

        .modalFooter button {
            min-height: 42px;
            padding: 0 16px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            border-radius: 11px;
            font-family: inherit;
            font-size: 10px;
            font-weight: 800;
            cursor: pointer;
            transition:
                transform 0.18s ease,
                background 0.18s ease,
                border-color 0.18s ease;
        }

        .cancelButton {
            border: 1px solid #292929;
            color: #737373;
            background: #111111;
        }

        .cancelButton:hover {
            color: #ffffff;
            background: #1a1a1a;
            transform: translateY(-1px);
        }

        .saveButton {
            border: 1px solid #e5e5e5;
            color: #050505;
            background: #f5f5f5;
        }

        .saveButton:hover {
            background: #ffffff;
            transform: translateY(-1px);
        }

        @media (max-width: 650px) {
            padding: 12px;

            .formGrid {
                grid-template-columns: 1fr;
                padding: 22px;
            }

            .fullWidth {
                grid-column: auto;
            }

            .modalHeader,
            .modalFooter {
                padding-left: 22px;
                padding-right: 22px;
            }

            .modalFooter {
                align-items: stretch;
                flex-direction: column;
            }

            .footerActions {
                width: 100%;
            }

            .footerActions button {
                flex: 1;
            }

            .modalFooter button {
                width: 100%;
            }
        }
    `,
};
