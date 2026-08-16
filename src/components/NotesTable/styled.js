import styled from "styled-components";

export const Styled = {
    Wrapper: styled.section`
        overflow: hidden;
        border: 1px solid #252525;
        border-radius: 18px;
        background: #0b0b0b;
        box-shadow:
            0 22px 60px rgba(0, 0, 0, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.025);

        .tableScroller {
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
        }

        table {
            width: 100%;
            min-width: 1180px;
            border-collapse: collapse;
        }

        thead {
            background: #101010;
        }

        th {
            height: 54px;
            padding: 0 16px;
            border-bottom: 1px solid #262626;
            color: #737373;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.11em;
            text-align: left;
            text-transform: uppercase;
            white-space: nowrap;
        }

        td {
            padding: 17px 16px;
            border-bottom: 1px solid #1f1f1f;
            color: #a3a3a3;
            font-size: 12px;
            vertical-align: middle;
        }

        tbody tr {
            position: relative;
            background: #0b0b0b;
            transition:
                background 0.2s ease,
                box-shadow 0.2s ease;
        }

        tbody tr:hover {
            background: #111111;
            box-shadow: inset 3px 0 0 #737373;
        }

        tbody tr:last-child td {
            border-bottom: 0;
        }

        .pinnedRow {
            background: #0e0e0e;
        }

        .pinnedRow:hover {
            background: #141414;
            box-shadow: inset 3px 0 0 #d4d4d4;
        }

        .sortButton,
        .columnLabel {
            min-height: 54px;
            display: inline-flex;
            align-items: center;
            gap: 7px;
            border: 0;
            color: inherit;
            background: transparent;
            font: inherit;
            letter-spacing: inherit;
            text-transform: inherit;
        }

        .sortButton {
            padding: 0;
            cursor: pointer;
            transition: color 0.18s ease;
        }

        .sortButton:hover {
            color: #e5e5e5;
        }

        .sortIcon {
            min-width: 12px;
            display: inline-flex;
            color: #a3a3a3;
            font-size: 12px;
            transition: transform 0.18s ease;
        }

        .serialColumn,
        .serialCell {
            width: 56px;
            color: #525252;
            text-align: center;
        }

        .titleColumn {
            min-width: 260px;
        }

        .categoryColumn {
            min-width: 125px;
        }

        .tagsColumn {
            min-width: 180px;
        }

        .createdAtColumn,
        .updatedAtColumn {
            min-width: 165px;
        }

        .pinnedColumn {
            min-width: 115px;
        }

        .actionsColumn {
            min-width: 180px;
            text-align: right;
        }

        .titleContent {
            max-width: 330px;
        }

        .titleContent strong {
            display: block;
            overflow: hidden;
            margin-bottom: 6px;
            color: #f5f5f5;
            font-size: 0.8125rem;
            font-weight: 700;
            text-overflow: ellipsis;
            white-space: nowrap;
            transition: color 0.18s ease;
        }

        tr:hover .titleContent strong {
            color: #ffffff;
        }

        .titleContent span {
            display: block;
            overflow: hidden;
            color: #666666;
            font-size: 0.6875rem;
            line-height: 1.55;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .categoryBadge {
            min-height: 27px;
            padding: 0 9px;
            display: inline-flex;
            align-items: center;
            border: 1px solid #303030;
            border-radius: 999px;
            color: #a3a3a3;
            background: #151515;
            font-size: 9px;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .tagList {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 5px;
        }

        .tagList span {
            min-height: 25px;
            padding: 0 8px;
            display: inline-flex;
            align-items: center;
            border: 1px solid #262626;
            border-radius: 999px;
            color: #737373;
            background: #101010;
            font-size: 9px;
            font-weight: 700;
        }

        .moreTags {
            color: #a3a3a3 !important;
        }

        .dateCell {
            color: #737373;
            font-size: 0.625rem;
            white-space: nowrap;
        }

        .statusBadge {
            min-height: 28px;
            padding: 0 9px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            border: 1px solid #292929;
            border-radius: 999px;
            color: #737373;
            background: #111111;
            font-size: 9px;
            font-weight: 800;
            text-transform: uppercase;
        }

        .statusBadge.pinned {
            color: #d4d4d4;
            border-color: #404040;
            background: #1a1a1a;
        }

        .actionsCell {
            text-align: right;
        }

        .rowActions {
            display: flex;
            justify-content: flex-end;
            gap: 6px;
            opacity: 0.58;
            transform: translateX(4px);
            transition:
                opacity 0.18s ease,
                transform 0.18s ease;
        }

        tr:hover .rowActions {
            opacity: 1;
            transform: translateX(0);
        }

        .actionButton {
            width: 34px;
            height: 34px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #292929;
            border-radius: 10px;
            color: #737373;
            background: #111111;
            font-size: 14px;
            cursor: pointer;
            opacity: 0.78;
            transition:
                color 0.18s ease,
                background 0.18s ease,
                border-color 0.18s ease,
                transform 0.18s ease;
        }

        .actionButton:hover {
            color: #ffffff;
            border-color: #454545;
            background: #1c1c1c;
            transform: translateY(-2px);
        }

        .activePin {
            color: #d4d4d4;
            background: #1c1c1c;
            border-color: #404040;
        }

        .deleteAction:hover {
            color: #fecaca;
            border-color: rgba(239, 68, 68, 0.35);
            background: rgba(127, 29, 29, 0.2);
        }

        .emptyValue {
            color: #404040;
        }

        thead th {
            position: sticky;
            top: 0;
            z-index: 2;
            background: #101010;
        }

        tr:hover .actionButton {
            opacity: 1;
        }

        .activePin:hover {
            color: #050505;
            background: #ffffff;
        }

        .sortButton:hover .sortIcon {
            transform: translateY(-1px);
        }

        @media (max-width: 700px) {
            border-radius: 14px;

            td,
            th {
                padding-left: 13px;
                padding-right: 13px;
            }
        }
    `,

    EmptyState: styled.section`
        min-height: 340px;
        padding: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: 1px dashed #292929;
        border-radius: 18px;
        background: #0b0b0b;
        text-align: center;

        .emptyIcon {
            width: 54px;
            height: 54px;
            margin-bottom: 18px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #303030;
            border-radius: 15px;
            color: #a3a3a3;
            background: #141414;
            font-size: 21px;
        }

        h3 {
            margin: 0 0 8px;
            color: #f5f5f5;
            font-size: 20px;
            font-weight: 700;
        }

        p {
            max-width: 380px;
            margin: 0;
            color: #666666;
            font-size: 12px;
            line-height: 1.7;
        }
    `,
};
