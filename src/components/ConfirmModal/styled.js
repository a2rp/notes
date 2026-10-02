import styled from "styled-components";

export const Styled = {
    Overlay: styled.div`
        position: fixed;
        inset: 0;
        z-index: 1000;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(7, 7, 7, 0.78);
        backdrop-filter: blur(10px);
    `,

    Modal: styled.div`
        position: relative;
        width: min(100%, 460px);
        padding: 30px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        background: linear-gradient(
            145deg,
            rgba(23, 23, 23, 0.98),
            rgba(12, 12, 12, 0.98)
        );
        box-shadow:
            0 32px 90px rgba(0, 0, 0, 0.46),
            inset 0 1px 0 rgba(255, 255, 255, 0.045);

        .closeButton {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 36px;
            height: 36px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(162, 162, 162, 0.1);
            border-radius: 11px;
            color: #737373;
            background: rgba(255, 255, 255, 0.02);
            font-size: 15px;
            cursor: pointer;
            transition:
                color 0.18s ease,
                background 0.18s ease,
                transform 0.18s ease;
        }

        .closeButton:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.07);
            transform: rotate(4deg);
        }

        .alertIcon {
            width: 54px;
            height: 54px;
            margin-bottom: 20px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(155, 155, 155, 0.18);
            border-radius: 17px;
            color: #bcbcbc;
            background: rgba(114, 114, 114, 0.08);
            font-size: 22px;
        }

        .label {
            display: block;
            margin-bottom: 8px;
            color: #9b9b9b;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.15em;
            text-transform: uppercase;
        }

        h2 {
            margin: 0;
            color: #fafafa;
            font-size: 26px;
            font-weight: 800;
            line-height: 1.2;
            letter-spacing: -0.04em;
        }

        p {
            margin: 14px 0 0;
            color: #a2a2a2;
            font-size: 13px;
            line-height: 1.75;
        }

        .actions {
            margin-top: 26px;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }

        .actions button {
            min-height: 44px;
            padding: 0 17px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            border-radius: 13px;
            font-family: inherit;
            font-size: 12px;
            font-weight: 800;
            cursor: pointer;
            transition:
                transform 0.18s ease,
                background 0.18s ease,
                border-color 0.18s ease,
                box-shadow 0.18s ease;
        }

        .cancelButton {
            border: 1px solid rgba(162, 162, 162, 0.12);
            color: #a2a2a2;
            background: rgba(255, 255, 255, 0.025);
        }

        .cancelButton:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.06);
            transform: translateY(-2px);
        }

        .confirmButton {
            border: 1px solid rgba(155, 155, 155, 0.18);
            color: #ffffff;
            background: linear-gradient(135deg, #727272, #888888);
            box-shadow: 0 12px 28px rgba(114, 114, 114, 0.16);
        }

        .confirmButton:hover {
            transform: translateY(-2px);
            box-shadow: 0 16px 34px rgba(114, 114, 114, 0.24);
        }

        @media (max-width: 480px) {
            padding: 24px;

            .actions {
                flex-direction: column-reverse;
            }

            .actions button {
                width: 100%;
            }
        }
    `,
};
