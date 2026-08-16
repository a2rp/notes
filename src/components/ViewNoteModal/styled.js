import styled from "styled-components";

export const Styled = {
    Overlay: styled.div`
        position: fixed;
        inset: 0;
        z-index: 1250;
        padding: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-y: auto;
        background: rgba(0, 0, 0, 0.84);
        backdrop-filter: blur(12px);
    `,

    Modal: styled.div`
        width: min(100%, 880px);
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

        .headerContent {
            min-width: 0;
        }

        .metaRow {
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 7px;
        }

        .categoryBadge,
        .pinnedBadge {
            min-height: 28px;
            padding: 0 9px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            border: 1px solid #303030;
            border-radius: 999px;
            color: #a3a3a3;
            background: #151515;
            font-size: 9px;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .pinnedBadge {
            color: #d4d4d4;
            border-color: #3d3d3d;
            background: #1a1a1a;
        }

        h2 {
            margin: 0;
            color: #f5f5f5;
            font-size: clamp(28px, 4vw, 42px);
            font-weight: 700;
            line-height: 1.08;
            letter-spacing: -0.045em;
            word-break: break-word;
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

        .modalBody {
            padding: 28px;
        }

        .contentBlock + .contentBlock {
            margin-top: 28px;
        }

        .sectionLabel {
            display: block;
            margin-bottom: 11px;
            color: #666666;
            font-size: 9px;
            font-weight: 800;
            letter-spacing: 0.15em;
            text-transform: uppercase;
        }

        .noteContent {
            padding: 20px;
            border: 1px solid #242424;
            border-radius: 14px;
            color: #c4c4c4;
            background: #101010;
            font-size: 13px;
            line-height: 1.9;
            white-space: pre-wrap;
            word-break: break-word;
        }

        .tagList {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
        }

        .tagList span {
            min-height: 30px;
            padding: 0 10px;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            border: 1px solid #292929;
            border-radius: 999px;
            color: #8a8a8a;
            background: #121212;
            font-size: 9px;
            font-weight: 700;
        }

        .metadataGrid {
            margin-top: 30px;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            border-top: 1px solid #252525;
            border-left: 1px solid #252525;
        }

        .metadataItem {
            min-width: 0;
            padding: 18px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-right: 1px solid #252525;
            border-bottom: 1px solid #252525;
            background: #0f0f0f;
        }

        .metadataIcon {
            width: 38px;
            height: 38px;
            flex: 0 0 38px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #303030;
            border-radius: 11px;
            color: #8a8a8a;
            background: #171717;
            font-size: 14px;
        }

        .metadataItem div {
            min-width: 0;
        }

        .metadataItem div span {
            display: block;
            margin-bottom: 5px;
            color: #555555;
            font-size: 9px;
            font-weight: 800;
            letter-spacing: 0.09em;
            text-transform: uppercase;
        }

        .metadataItem div strong {
            display: block;
            overflow: hidden;
            color: #bdbdbd;
            font-size: 10px;
            font-weight: 700;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .modalFooter {
            position: sticky;
            bottom: 0;
            z-index: 4;
            padding: 18px 28px;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            border-top: 1px solid #222222;
            background: rgba(11, 11, 11, 0.96);
            backdrop-filter: blur(14px);
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
                color 0.18s ease,
                background 0.18s ease,
                border-color 0.18s ease,
                transform 0.18s ease;
        }

        .closeAction {
            border: 1px solid #292929;
            color: #737373;
            background: #111111;
        }

        .closeAction:hover {
            color: #ffffff;
            background: #1a1a1a;
            transform: translateY(-1px);
        }

        .editAction {
            border: 1px solid #e5e5e5;
            color: #050505;
            background: #f5f5f5;
        }

        .editAction:hover {
            background: #ffffff;
            transform: translateY(-1px);
        }

        @media (max-width: 650px) {
            padding: 12px;

            .modalHeader,
            .modalBody,
            .modalFooter {
                padding-left: 22px;
                padding-right: 22px;
            }

            .metadataGrid {
                grid-template-columns: 1fr;
            }

            .modalFooter {
                flex-direction: column-reverse;
            }

            .modalFooter button {
                width: 100%;
            }
        }
    `,
};
