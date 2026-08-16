import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const columns = [
    {
        key: "title",
        label: "Title",
        sortable: true,
    },
    {
        key: "category",
        label: "Category",
        sortable: true,
    },
    {
        key: "tags",
        label: "Tags",
        sortable: false,
    },
    {
        key: "createdAt",
        label: "Created",
        sortable: true,
    },
    {
        key: "updatedAt",
        label: "Updated",
        sortable: true,
    },
    {
        key: "pinned",
        label: "Status",
        sortable: true,
    },
];

function TableHeader({ sortKey, sortDirection, onSort }) {
    const getSortIcon = (columnKey) => {
        if (sortKey !== columnKey) {
            return null;
        }

        return sortDirection === "asc" ? <FiChevronUp /> : <FiChevronDown />;
    };

    return (
        <thead>
            <tr>
                <th className="serialColumn">#</th>

                {columns.map((column) => (
                    <th key={column.key} className={`${column.key}Column`}>
                        {column.sortable ? (
                            <button
                                className="sortButton"
                                type="button"
                                onClick={() => onSort(column.key)}
                            >
                                <span>{column.label}</span>

                                <span className="sortIcon">
                                    {getSortIcon(column.key)}
                                </span>
                            </button>
                        ) : (
                            <div className="columnLabel">{column.label}</div>
                        )}
                    </th>
                ))}

                <th className="actionsColumn">Actions</th>
            </tr>
        </thead>
    );
}

export default TableHeader;
