import styled from "styled-components";

export const Styled = {
    Wrapper: styled.article`
        position: relative;
        min-height: 310px;
        padding: 22px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 22px;
        background: linear-gradient(
            145deg,
            rgba(15, 23, 42, 0.86),
            rgba(8, 12, 20, 0.92)
        );
        box-shadow:
            0 18px 44px rgba(0, 0, 0, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.035);
        transition:
            transform 0.22s ease,
            border-color 0.22s ease,
            box-shadow 0.22s ease;

        &::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: radial-gradient(
                circle at top right,
                rgba(59, 130, 246, 0.08),
                transparent 38%
            );
            opacity: 0;
            transition: opacity 0.25s ease;
        }

        &:hover {
            transform: translateY(-4px);
            border-color: rgba(96, 165, 250, 0.18);
            box-shadow:
                0 24px 54px rgba(0, 0, 0, 0.24),
                inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        &:hover::before {
            opacity: 1;
        }

        &.pinned {
            border-color: rgba(56, 189, 248, 0.22);
            background: linear-gradient(
                145deg,
                rgba(15, 23, 42, 0.94),
                rgba(8, 20, 30, 0.94)
            );
        }

        .cardTop,
        .content,
        .tags,
        .cardBottom {
            position: relative;
            z-index: 1;
        }

        .cardTop {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 14px;
            margin-bottom: 24px;
        }

        .meta {
            min-width: 0;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 7px;
        }

        .category,
        .pinnedLabel {
            min-height: 28px;
            padding: 0 10px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            border-radius: 999px;
            font-size: 9px;
            font-weight: 800;
            letter-spacing: 0.11em;
            text-transform: uppercase;
        }

        .category {
            color: #93c5fd;
            border: 1px solid rgba(96, 165, 250, 0.14);
            background: rgba(37, 99, 235, 0.08);
        }

        .pinnedLabel {
            color: #67e8f9;
            border: 1px solid rgba(34, 211, 238, 0.14);
            background: rgba(6, 182, 212, 0.08);
        }

        .actions {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .iconButton {
            width: 34px;
            height: 34px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(148, 163, 184, 0.1);
            border-radius: 10px;
            color: #64748b;
            background: rgba(255, 255, 255, 0.02);
            font-family: inherit;
            font-size: 14px;
            cursor: pointer;
            transition:
                color 0.18s ease,
                background 0.18s ease,
                border-color 0.18s ease,
                transform 0.18s ease;
        }

        .iconButton:hover {
            color: #ffffff;
            border-color: rgba(96, 165, 250, 0.2);
            background: rgba(59, 130, 246, 0.1);
            transform: translateY(-2px);
        }

        .deleteButton:hover {
            color: #fecaca;
            border-color: rgba(248, 113, 113, 0.2);
            background: rgba(220, 38, 38, 0.1);
        }

        .content {
            flex: 1;
        }

        .content h3 {
            margin: 0 0 12px;
            color: #f8fafc;
            font-size: 21px;
            font-weight: 800;
            line-height: 1.2;
            letter-spacing: -0.035em;
            word-break: break-word;
        }

        .content p {
            display: -webkit-box;
            overflow: hidden;
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.75;
            white-space: pre-wrap;
            word-break: break-word;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
        }

        .tags {
            margin-top: 20px;
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
        }

        .tags span {
            min-height: 26px;
            padding: 0 9px;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            border: 1px solid rgba(148, 163, 184, 0.09);
            border-radius: 999px;
            color: #64748b;
            background: rgba(255, 255, 255, 0.018);
            font-size: 9px;
            font-weight: 700;
        }

        .tags svg {
            font-size: 10px;
        }

        .cardBottom {
            margin-top: 18px;
            padding-top: 15px;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .cardBottom span {
            color: #475569;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.06em;
            text-transform: uppercase;
        }
    `,
};
