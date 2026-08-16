import styled from "styled-components";

export const Styled = {
    Wrapper: styled.section`
        padding: 26px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 24px;
        background: linear-gradient(
            145deg,
            rgba(15, 23, 42, 0.9),
            rgba(8, 12, 20, 0.92)
        );
        box-shadow:
            0 22px 60px rgba(0, 0, 0, 0.24),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);

        .formHeader {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 24px;
            margin-bottom: 28px;
        }

        .label {
            display: block;
            margin-bottom: 8px;
            color: #60a5fa;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.16em;
            text-transform: uppercase;
        }

        h2 {
            margin: 0;
            color: #f8fafc;
            font-size: clamp(24px, 3vw, 34px);
            font-weight: 800;
            line-height: 1.08;
            letter-spacing: -0.04em;
        }

        .formIcon {
            width: 46px;
            height: 46px;
            flex: 0 0 46px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(96, 165, 250, 0.18);
            border-radius: 15px;
            color: #93c5fd;
            background: rgba(37, 99, 235, 0.1);
            font-size: 19px;
        }

        .formBody {
            display: flex;
            flex-direction: column;
            gap: 18px;
        }

        .field {
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 9px;
        }

        .field label {
            color: #94a3b8;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.1em;
            text-transform: uppercase;
        }

        input,
        textarea,
        select {
            width: 100%;
            border: 1px solid rgba(148, 163, 184, 0.13);
            border-radius: 14px;
            outline: none;
            color: #e2e8f0;
            background: rgba(2, 6, 23, 0.42);
            font-family: inherit;
            font-size: 14px;
            transition:
                border-color 0.2s ease,
                background 0.2s ease,
                box-shadow 0.2s ease;
        }

        input,
        select {
            min-height: 46px;
            padding: 0 14px;
        }

        textarea {
            min-height: 180px;
            padding: 14px;
            resize: vertical;
            line-height: 1.7;
        }

        input::placeholder,
        textarea::placeholder {
            color: #475569;
        }

        input:focus,
        textarea:focus,
        select:focus {
            border-color: rgba(56, 189, 248, 0.48);
            background: rgba(2, 6, 23, 0.64);
            box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.08);
        }

        select {
            cursor: pointer;
        }

        select option {
            color: #e2e8f0;
            background: #0f172a;
        }

        .characterCount {
            align-self: flex-end;
            color: #475569;
            font-size: 10px;
            font-weight: 700;
        }

        .formRow {
            display: grid;
            grid-template-columns: minmax(160px, 0.55fr) minmax(0, 1.45fr);
            gap: 14px;
        }

        .inputWithIcon {
            position: relative;
        }

        .inputWithIcon svg {
            position: absolute;
            top: 50%;
            left: 14px;
            color: #64748b;
            font-size: 15px;
            transform: translateY(-50%);
            pointer-events: none;
        }

        .inputWithIcon input {
            padding-left: 40px;
        }

        .formActions {
            margin-top: 22px;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }

        .formActions button {
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
                transform 0.2s ease,
                border-color 0.2s ease,
                background 0.2s ease,
                box-shadow 0.2s ease;
        }

        .cancelButton {
            border: 1px solid rgba(148, 163, 184, 0.12);
            color: #94a3b8;
            background: rgba(255, 255, 255, 0.025);
        }

        .cancelButton:hover {
            color: #ffffff;
            border-color: rgba(148, 163, 184, 0.24);
            background: rgba(255, 255, 255, 0.06);
            transform: translateY(-2px);
        }

        .saveButton {
            border: 1px solid rgba(56, 189, 248, 0.16);
            color: #ffffff;
            background: linear-gradient(135deg, #2563eb, #0891b2);
            box-shadow: 0 12px 28px rgba(37, 99, 235, 0.18);
        }

        .saveButton:hover {
            transform: translateY(-2px);
            box-shadow: 0 16px 34px rgba(37, 99, 235, 0.25);
        }

        @media (max-width: 700px) {
            padding: 20px;

            .formRow {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 480px) {
            .formActions {
                flex-direction: column-reverse;
            }

            .formActions button {
                width: 100%;
            }
        }
    `,
};
