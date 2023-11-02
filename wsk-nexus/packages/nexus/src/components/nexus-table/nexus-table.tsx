import _lodash from 'lodash';
import { Component, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';

export type rowCheckedVariant = 'checked' | 'indeterminate' | 'unchecked';
export type tableVariant = 'basic' | 'custom';
export type column = {
  field: string;
  label: string;
  isSortable?: boolean;
  cellRenderer?: Function;
  sortAscending?: Function;
  sortDescending?: Function;
  headerClass?: string;
  cellClass?: string;
};
export type columnState = column & { sortDirection?: string };

@Component({
  tag: 'nexus-table',
  shadow: false,
  styleUrl: 'nexus-table.scss'
})
export class NexusTable {
  /**
   * Nexus table id
   */
  @Prop() attrId: string;

  /**
   * Emit list of selected rows
   */
  @Event() rowSelect: EventEmitter<any[]>;

  /**
   * Emit current page details on table data change
   */
  @Event() tableChangeEvent: EventEmitter;

  /**
   * Table Type selection
   */
  @Prop() type: tableVariant = 'basic';

  /**
   * Table Header Data
   */
  @Prop() columns: any = [];

  /**
   * Current Page
   */
  @Prop({ mutable: true }) currentPage: number = null;

  /**
   * Row data for table content.
   */
  @Prop() rows: any[] = [];

  /**
   * Show/Hide table row pagination.
   */
  @Prop() pagination: boolean = false;

  /**
   * Default page size.
   */
  @Prop() pageSize: number = 10;

  /**
   * Page size options dropdown.
   */
  @Prop() pageSizeOpt: number[] = [5, 10, 25, 100];

  /**
   * Page size options dropdown visibility
   */
  @Prop() enablePageSizeOption: boolean = true;

  /**
   * Table footer page size lable.
   */
  @Prop() pageSizeLabel: string = null;

  /**
   * Table row selection.
   */
  @Prop() rowSelection: boolean = false;

  /**
   * Column Sort Icon - Ascending order.
   */
  @Prop() sortAscIcon: string = './assets/icons/navigation/ic_arrow_upward_24px.svg';

  /**
   * Column Sort Icon - Descending order.
   */
  @Prop() sortDescIcon: string = './assets/icons/navigation/ic_arrow_downward_24px.svg';

  /**
   * Column Sort Icon - Neutral state.
   */
  @Prop() sortDefaultIcon: string = './assets/icons/content/ic_sort_24px.svg';

  /**
   * Pass height of the table(in px)
   */
  @Prop() maxHeight: string = '';

  /**
   * Pass height of the table(in px)
   */
  @Prop() totalItems: number;

  /**
   * Internal column defination state.
   */
  @State() columnsState: columnState[] = [];

  /**
   * Internal row data state.
   */
  @State() rowsState: any[] = [];

  /**
   * Internal page size state.
   */
  @State() pageSizeState: number = 0;

  /**
   * Internal current page state.
   */
  @State() currentPageState: number = 1;

  /**
   * Internal all rows selected state
   */
  @State() tableSelectionState: rowCheckedVariant = 'unchecked';

  /**
   * Internal checked rows state
   */
  @State() checkedRowsState: any[] = [];

  /**
   * Internal active sort direction.
   */
  @State() currentSortDirection: string = null;

  /**
   * Internal active sort column.
   */
  @State() currentSortColumn: string = null;

  private isCustomType: boolean;
  private isCustomHeader: boolean;
  private isCustomBody: boolean;
  private isCustomFooter: boolean;

  constructor() {
    this.isCustomType = this.type === 'custom';
    this.isCustomHeader = this.isCustomType && this.columns.length === 0;
    this.isCustomBody = this.isCustomType && this.rows.length === 0;
    this.isCustomFooter = this.isCustomType && !this.pagination;
  }

  componentWillLoad() {
    this.columnsState = [...this.columns].map((col) => {
      col.cellRenderer = col.cellRenderer || this.defaultCellRenderer;
      col.sortAscending = col.sortAscending || this.defaultSortAscending;
      col.sortDescending = col.sortDescending || this.defaultSortDescending;

      return col;
    });

    this.pageSizeState = this.pageSizeOpt.includes(this.pageSize) ? this.pageSize : this.pageSizeOpt[0];

    this.rowsState = this.rows ? [...this.rows] : this.rowsState;

    this.setRowData();

    this.onCurrentPageChange(this.currentPage);
  }

  @Watch('currentPage')
  onCurrentPageChange(currentPage: number) {
    if (currentPage !== null) {
      if (currentPage < 1) {
        this.currentPageState = 1;
      } else {
        const totalPages = this.calculateTotalPages(this.pageSizeState, this.rowsState);
        if (currentPage > totalPages) {
          this.currentPageState = totalPages;
        } else {
          this.currentPageState = currentPage;
        }
      }
      this.currentPage = null;
    }
  }

  defaultCellRenderer = (value) => value;

  defaultSortAscending = (firstValue, secondValue, sortField) =>
    this.getObjValue(firstValue, sortField)?.toLowerCase() > this.getObjValue(secondValue, sortField)?.toLowerCase()
      ? 1
      : -1;

  defaultSortDescending = (firstValue, secondValue, sortField) =>
    this.getObjValue(firstValue, sortField)?.toLowerCase() < this.getObjValue(secondValue, sortField)?.toLowerCase()
      ? 1
      : -1;

  currentPageData(pageSize: number, currentPage: number, dataset = []) {
    return dataset.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }

  calculateTotalPages(pageSize: number, dataset = []) {
    const dataLength = this.totalItems || dataset.length;

    return Math.ceil(dataLength / pageSize);
  }

  emitPageChangeEvent() {
    const totalPages = this.calculateTotalPages(this.pageSizeState, this.rowsState);
    const eventData = {
      currentPage: this.currentPageState,
      pageSize: this.pageSizeState,
      sortColumn: this.currentSortColumn,
      sortDirection: this.currentSortDirection,
      totalPage: totalPages
    };
    this.tableChangeEvent.emit(eventData);
  }

  onCurrentPageChangeHandler(event: any) {
    event.stopPropagation();
    this.currentPageState = event.detail;
    this.emitPageChangeEvent();
  }

  onPageSizeChangeHandler(event: any) {
    this.pageSizeState = event.detail?.key;
    this.currentPageState = 1;
    this.emitPageChangeEvent();
  }

  updateColumnSortDirection(columnId: string, currentSortDirection: string) {
    let activeSortColumn;
    this.columnsState = this.columnsState.map((col) => {
      if (col.field === columnId) {
        if (!currentSortDirection) {
          col.sortDirection = 'asc';
        }

        if (currentSortDirection === 'asc') {
          col.sortDirection = 'dec';
        }

        if (currentSortDirection === 'dec') {
          col.sortDirection = null;
        }
        activeSortColumn = col;
      } else {
        col.sortDirection = null;
      }

      return col;
    });

    // Update component state with active sort column & sort direction
    if (activeSortColumn?.sortDirection) {
      this.currentSortColumn = activeSortColumn.field;
      this.currentSortDirection = activeSortColumn.sortDirection;
    } else {
      this.currentSortColumn = null;
      this.currentSortDirection = null;
    }

    if (this.checkedRowsState.length) {
      this.resetRowDataSelection();
    }

    return activeSortColumn;
  }

  sortHandler(columnId: string, currentSortDirection: string, updateSortDirection: boolean = false) {
    let activeSortColumn;

    if (updateSortDirection) {
      // Update sort direction on columns
      activeSortColumn = this.updateColumnSortDirection(columnId, currentSortDirection);
    } else {
      activeSortColumn = this.columnsState.find((col) => col?.field === columnId);
    }

    const _rows = this.rows ? [...this.rows] : this.rowsState;
    // Sort the row data
    if (this.currentSortDirection) {
      this.rowsState = _rows.sort((itemA, itemB) => {
        if (this.currentSortDirection === 'asc') {
          return activeSortColumn.sortAscending(itemA, itemB, this.currentSortColumn);
        }

        return activeSortColumn.sortDescending(itemA, itemB, this.currentSortColumn);
      });
    } else {
      // Reset row data
      this.rowsState = _rows;
    }
    this.emitPageChangeEvent();
  }

  // TODO- split logic for select all rows and setting rowState in two methods
  setRowData(isAllRowSelected?: boolean) {
    this.rowsState = this.rowsState.reduce((acc, cur, index) => {
      const nexusRowIndex = cur.nexusRowIndex || index;
      let { isRowSelected } = cur;

      if (this.rowSelection) {
        isRowSelected = cur.isRowSelected || false;
        if (typeof isAllRowSelected !== 'undefined') {
          if (isAllRowSelected) {
            this.checkedRowsState.push(cur);
          }
          isRowSelected = isAllRowSelected;
        }
      }

      return [
        ...acc,
        {
          ...cur,
          nexusRowIndex,
          isRowSelected: isRowSelected
        }
      ];
    }, []);

    if (this.currentSortColumn || this.currentSortDirection) {
      this.sortHandler(this.currentSortColumn, this.currentSortDirection);
    }
  }

  headerSelectHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    const isRowSelected = target.checked;

    this.checkedRowsState = [];
    this.setRowData(isRowSelected);
    this.emitSelectedRows();
  }

  resetRowDataSelection() {
    this.checkedRowsState = [];
    this.setRowData(false);
    this.emitSelectedRows();
  }

  rowSelectHandler(row) {
    this.checkedRowsState[row.nexusRowIndex] = row.isRowSelected ? row : null;
    this.checkedRowsState = [...this.checkedRowsState];
    this.emitSelectedRows();
  }

  emitSelectedRows() {
    const selectedRows = this.checkedRowsState.filter((row) => typeof row?.nexusRowIndex !== 'undefined');
    const dataSet = this.rowsState;

    if (selectedRows && dataSet) {
      if (selectedRows.length === dataSet.length) {
        this.tableSelectionState = 'checked';
      } else if (selectedRows.length > 0 && selectedRows.length < dataSet.length) {
        this.tableSelectionState = 'indeterminate';
      } else {
        this.tableSelectionState = 'unchecked';
      }
    }

    this.rowSelect.emit(selectedRows);
  }

  renderTableColumns() {
    const tableColumnMap = {};

    return this.columnsState.map((col) => {
      if (!tableColumnMap[col.field]) {
        tableColumnMap[col.field] = col;
      }

      let sortIcon;

      if (col.sortDirection === 'asc') {
        sortIcon = this.sortAscIcon;
      } else if (col.sortDirection === 'dec') {
        sortIcon = this.sortDescIcon;
      } else {
        sortIcon = this.sortDefaultIcon;
      }

      return (
        <th class={col.headerClass || ''} id={col.field}>
          <span>{col.label}</span>
          {col.isSortable ? (
            <nexus-icon
              alt={col.label}
              onClick={() => this.sortHandler(col.field, col.sortDirection, true)}
              src={sortIcon}
            ></nexus-icon>
          ) : null}
        </th>
      );
    });
  }

  renderPageNumberSelect() {
    return (
      <nexus-select
        type="custom"
        value={this.pageSizeState.toString()}
        onTriggerSelection={($event) => this.onPageSizeChangeHandler($event)}
      >
        {this.pageSizeOpt.map((size) => (
          <nexus-option label="size" value={size}>
            {size}
          </nexus-option>
        ))}
      </nexus-select>
    );
  }

  renderPageSizeLabel() {
    return <label class="nexus-pr-2 nexus-py-1">{this.pageSizeLabel}</label>;
  }

  renderPageSizeOptions() {
    return (
      <div class="nexus-flex-row">
        {this.pageSizeLabel && this.renderPageSizeLabel()}
        {this.pageSizeState > 0 && this.renderPageNumberSelect()}
      </div>
    );
  }

  renderTableRows() {
    const tableColumnMap = {};

    this.columnsState.forEach((col) => {
      if (!tableColumnMap[col.field]) {
        tableColumnMap[col.field] = col;
      }
    });

    const columnList = Object.keys(tableColumnMap);

    if (this.rowSelection) {
      columnList.unshift('rowSelection');
    }

    const tableRows = this.currentPageData(this.pageSizeState, this.currentPageState, this.rowsState);

    return tableRows.map((row) => (
      <tr>
        {columnList.map((fieldName) => {
          if (fieldName === 'rowSelection') {
            return (
              <td class="nexus-multi-select-col">
                <nexus-checkbox
                  checked={row.isRowSelected}
                  onInput={(event: any) => {
                    row.isRowSelected = event.target?.checked;
                    this.rowSelectHandler(row);
                  }}
                ></nexus-checkbox>
              </td>
            );
          }

          return (
            <td
              class={tableColumnMap[fieldName]?.cellClass || ''}
              innerHTML={this.getFieldPath(tableColumnMap[fieldName], row, fieldName)}
            ></td>
          );
        })}
      </tr>
    ));
  }

  renderTableFooter(numberOfColumns: number) {
    return (
      <tr>
        <td colSpan={this.rowSelection ? numberOfColumns + 1 : numberOfColumns}>
          <div class="nexus-table-footer">
            {this.enablePageSizeOption ? this.renderPageSizeOptions() : <div class="nexus-flex-row"></div>}
            <div class="nexus-flex-row">
              <nexus-pagination
                current={this.currentPageState}
                max={this.calculateTotalPages(this.pageSizeState, this.rowsState)}
                onChangeEvent={($event) => this.onCurrentPageChangeHandler($event)}
              ></nexus-pagination>
            </div>
          </div>
        </td>
      </tr>
    );
  }

  getFieldPath(coloum: any, row: any, field: string) {
    const fields = field.split('.');

    return fields.length > 1
      ? _lodash.get(coloum?.cellRenderer(row?.[fields[0]]), fields.splice(1).join('.'), '')
      : coloum?.cellRenderer(row?.[field]);
  }

  getObjValue(obj: any, field: string) {
    const fields = field.split('.');

    return fields.length > 1 ? _lodash.get(obj, field, '') : obj[field];
  }

  render() {
    const tableHeaders = this.renderTableColumns();
    const tableRows = this.renderTableRows();
    const tableFooter = this.pagination ? this.renderTableFooter(tableHeaders?.length) : null;

    return (
      <Host>
        <div class="nexus-table-wrapper">
          <table
            class={{
              'nexus-table': true,
              'nexus-table-custom': this.isCustomType
            }}
            id={`${this.attrId}_table`}
          >
            <thead>
              {this.isCustomHeader ? (
                <slot name="thead"></slot>
              ) : (
                <tr>
                  {this.rowSelection ? (
                    <th class="nexus-multi-select-col">
                      <nexus-checkbox
                        indeterminate={this.tableSelectionState === 'indeterminate'}
                        checked={this.tableSelectionState === 'checked' || this.tableSelectionState === 'indeterminate'}
                        onInput={(event: any) => this.headerSelectHandler(event)}
                      ></nexus-checkbox>
                    </th>
                  ) : null}
                  {...tableHeaders}
                </tr>
              )}
            </thead>
            <tbody style={{ maxHeight: `${this.maxHeight}px` }}>
              {this.isCustomBody ? <slot name="tbody"></slot> : tableRows}
            </tbody>
            <tfoot>{this.isCustomFooter ? <slot name="tfoot"></slot> : tableFooter}</tfoot>
          </table>
        </div>
      </Host>
    );
  }
}
