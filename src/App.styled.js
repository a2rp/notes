import styled from "styled-components";

export const Styled = {
    Wrapper: styled.div`
        min-height: 100vh;
        color: #f5f5f5;
        background:
            radial-gradient(
                circle at 12% -10%,
                rgba(255, 255, 255, 0.055),
                transparent 26%
            ),
            radial-gradient(
                circle at 88% 4%,
                rgba(255, 255, 255, 0.025),
                transparent 22%
            ),
            #050505;

        main {
            width: min(calc(100% - 48px), 1440px);
            margin: 0 auto;
            padding: 112px 0 0;
        }

        .tableSection {
            margin-top: 18px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        @media (max-width: 700px) {
            main {
                width: min(calc(100% - 28px), 1440px);
                padding-top: 96px;
            }
        }
    `,
};
