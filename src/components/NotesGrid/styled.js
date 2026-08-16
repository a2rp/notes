import styled from "styled-components";

export const Styled = {
    Wrapper: styled.section`
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;

        @media (max-width: 1100px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        @media (max-width: 700px) {
            grid-template-columns: 1fr;
        }
    `,

    EmptyState: styled.section`
        min-height: 360px;
        padding: 40px 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        border: 1px dashed rgba(148, 163, 184, 0.14);
        border-radius: 24px;
        background:
            radial-gradient(
                circle at center,
                rgba(37, 99, 235, 0.06),
                transparent 45%
            ),
            rgba(15, 23, 42, 0.34);

        .emptyIcon {
            width: 58px;
            height: 58px;
            margin-bottom: 18px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(96, 165, 250, 0.16);
            border-radius: 18px;
            color: #93c5fd;
            background: rgba(37, 99, 235, 0.08);
            font-size: 24px;
        }

        h3 {
            margin: 0 0 9px;
            color: #f8fafc;
            font-size: 22px;
            font-weight: 800;
            letter-spacing: -0.035em;
        }

        p {
            max-width: 420px;
            margin: 0;
            color: #64748b;
            font-size: 13px;
            line-height: 1.7;
        }
    `,
};
